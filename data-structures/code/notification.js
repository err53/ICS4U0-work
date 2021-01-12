/**
 * Class representing a notification from a generic app
 * Can be expanded on through inheritance to provide the user with more functionality
 */
class Notification {
  #appName;
  #active;
  #date;

  /**
   * Create a generic notification
   * @param {Notification} notification An object representing a notification
   */
  constructor({ appName, active, date }) {
    this.#appName = appName ? appName : "";
    this.#active = active ? active : true;
    this.#date = date ? new Date(date) : new Date(Date.now());
  }

  /**
   * Get the name of the app
   */
  get appName() {
    return this.#appName;
  }

  /**
   * Get the text of your notification
   */
  get notificationText() {
    return `Notification from ${this.#appName}`;
  }

  /**
   * Get whether the notification is currently active
   */
  get active() {
    return this.#active;
  }

  /**
   * Dismiss the notification
   */
  dismiss() {
    this.#active = false;
  }

  /**
   * Get the notification date
   */
  get date() {
    return this.#date;
  }

  /**
   * Set the notification date
   * @param {Date} date The new date object
   */
  set date(date) {
    this.#date = date;
  }

  toJSON() {
    return {
      appName: this.#appName,
      active: this.#active,
      date: this.#date,
    };
  }
}

module.exports = Notification;
