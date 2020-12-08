var Notification = require("./notification");

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class WeatherNotification extends Notification {
  constructor(temperature, conditions) {
    super("Weather");
    this.temperature = temperature;
    this.conditions = conditions;
  }
  setFromObject(obj) {
    super.setFromObject(obj);
    this.temperature = obj.temperature;
    this.conditions = obj.conditions;
    return this;
  }
  notificationText() {
    return `The temperature is ${this.temperature} degrees Celsius and it is currently ${this.conditions}`;
  }
  updateWeather() {
    // this would pull from an API but I'm lazy
    console.log("Weather updated!");
    this.temperature = randBetween(-10, 20);
  }
}

module.exports = WeatherNotification;
