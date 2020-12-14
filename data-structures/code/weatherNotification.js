var Notification = require("./notification");

/**
 * A random integer function with bounds
 * @param {number} min - The lowest value desired (inclusive)
 * @param {number} max - The highest value desired (inclusive)
 */
function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** A class representing a weather notification */
class WeatherNotification extends Notification {
  _temperature = 0;
  _conditions = "";

  /**
   * Create a weather notification
   * @param {number} temperature - The current temperature
   * @param {string} conditions - The current weather conditions
   */
  constructor(temperature, conditions) {
    super("Weather");
    this._temperature = temperature;
    this._conditions = conditions;
  }

  /**
   * Set the state of the weather notification from an object
   * @param {object} obj - An object representing an weather notification
   */
  setFromObject(obj) {
    super.setFromObject(obj);
    this._temperature = obj._temperature;
    this._conditions = obj._conditions;
    return this;
  }

  /**
   * Generate notification text for the weather notification
   */
  notificationText() {
    return `The temperature is ${this._temperature} degrees Celsius and it is currently ${this._conditions}`;
  }

  /** A placeholder function for updating the notification with current weather conditions */
  updateWeather() {
    // this would pull from an API but I'm lazy
    console.log("Weather updated!");
    this._temperature = randBetween(-10, 20);
  }
}

module.exports = WeatherNotification;
