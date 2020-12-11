var fs = require("fs/promises");
var prompt = require("prompt-sync")();
var User = require("./user");
var WeatherNotification = require("./weatherNotification");
var EmailNotification = require("./emailNotification");

(async () => {
  var db = {};
  try {
    const data = await fs.readFile("db.json");
    db = JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }

  if (!db.user) {
    db.user = new User(prompt("What is your name? "));
  } else {
    db.user = new User().setFromObject(db.user);
  }

  if (db.user.notifications.length == 0) {
    db.user.notifications.push(new WeatherNotification(10, "sunny"));

    db.user.notifications.push(
      new EmailNotification(
        "Alice",
        "Bob",
        "Test Email",
        `Hi there,\nThis is the body of the email\nRegards, Alice`
      )
    );
  }

  db.user.printNotifications()
  console.log(); // send a newline to space stuff out

  console.log("initial state");
  console.log(JSON.stringify(db, null, 2));
  console.log(); // send a newline to space stuff out

  // update content
  db.user.notifications[0].updateWeather();
  db.user.notifications[1].replyToEmail("Alright, coolio!");
  db.user.clearNotifications();
  console.log(); // send a newline to space stuff out

  db.user.printNotifications()
  console.log(); // send a newline to space stuff out

  console.log("final state");
  console.log(JSON.stringify(db, null, 2));
  fs.writeFile("db.json", JSON.stringify(db));
})();
