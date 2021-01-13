const User = require("../../data-structures/code/user");
const WeatherNotification = require("../../data-structures/code/weatherNotification");
const EmailNotification = require("../../data-structures/code/emailNotification");

const fs = require("fs/promises");
const random = require("random");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

let generateData = async (count) => {
  var db = {};

  db.user = new User({ name: "TestUser" });

  for (let i = 0; i < count; i++) {
    let isEmail = random.boolean();
    if (isEmail) {
      db.user.notifications.push(
        new EmailNotification({
          from: lorem.generateWords(1),
          to: lorem.generateWords(1),
          subject: lorem.generateSentences(1),
          body: lorem.generateParagraphs(1),
          date: randomDate(new Date(2000, 0, 0), new Date()),
        })
      );
    } else {
      db.user.notifications.push(
        new WeatherNotification({
          temperature: random.int(-20, 40),
          conditions: lorem.generateSentences(1),
          date: randomDate(new Date(2000, 0, 0), new Date()),
        })
      );
    }
  }

  // Write to file
  await fs.writeFile("db.json", JSON.stringify(db));
};

exports.generateData = generateData;

generateData(process.argv[2]);
