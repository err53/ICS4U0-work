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
  #temperature;
  #conditions;

  /**
   * Create a weather notification
   * @param {number} temperature - The current temperature
   * @param {string} conditions - The current weather conditions
   */
  constructor({ temperature, conditions, ...props }) {
    super({ ...props, appName: "Weather" });
    this.#temperature = temperature ? temperature : 0;
    this.#conditions = conditions ? conditions : 0;
  }

  /**
   * Generate notification text for the weather notification
   */
  notificationText() {
    return `The temperature is ${
      this.#temperature
    } degrees Celsius and it is currently ${this.#conditions}`;
  }

  /** A placeholder function for updating the notification with current weather conditions */
  updateWeather() {
    // this would pull from an API but I'm lazy
    console.log("Weather updated!");
    this.#temperature = randBetween(-10, 20);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      temperature: this.#temperature,
      conditions: this.#conditions,
    };
  }
}

module.exports = WeatherNotification;
