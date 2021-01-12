var fs = require("fs/promises");
var prompt = require("prompt-sync")();
var User = require("./user");
var Notification = require("./notification");
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

  // Create user if empty
  if (!db.user) {
    db.user = new User({ name: prompt("What is your name? ") });
  } else {
    db.user = new User(db.user);
  }

  // Create some notifications
  if (db.user.notifications.length == 0) {
    db.user.notifications.push(
      new WeatherNotification({ temperature: 10, conditions: "sunny" })
    );

    db.user.notifications.push(
      new EmailNotification({
        from: "Alice",
        to: "Bob",
        subject: "Test Email",
        body: `Hi there,\nThis is the body of the email\nRegards, Alice`,
      })
    );
  }

  // Print existing notifications
  db.user.printNotifications();
  console.log(); // send a newline to space stuff out

  console.log("initial state");
  console.log(JSON.stringify(db, null, 2));
  console.log(db.user.notifications[0].date);
  console.log(); // send a newline to space stuff out

  // update content
  db.user.notifications[0].updateWeather();
  db.user.notifications[1].replyToEmail("Alright, coolio!");
  db.user.clearNotifications();
  console.log(); // send a newline to space stuff out

  db.user.printNotifications();
  console.log(); // send a newline to space stuff out

  console.log("final state");
  console.log(JSON.stringify(db, null, 2));

  // Write to file
  await fs.writeFile("db.json", JSON.stringify(db));
})();
