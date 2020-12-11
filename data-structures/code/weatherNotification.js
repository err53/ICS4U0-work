var Notification = require("./notification");

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class WeatherNotification extends Notification {
  _temperature = 0;
  _conditions = "";
  constructor(temperature, conditions) {
    super("Weather");
    this._temperature = temperature;
    this._conditions = conditions;
  }
  setFromObject(obj) {
    super.setFromObject(obj);
    this._temperature = obj._temperature;
    this._conditions = obj._conditions;
    return this;
  }
  notificationText() {
    return `The temperature is ${this._temperature} degrees Celsius and it is currently ${this._conditions}`;
  }
  updateWeather() {
    // this would pull from an API but I'm lazy
    console.log("Weather updated!");
    this._temperature = randBetween(-10, 20);
  }
}

module.exports = WeatherNotification;
