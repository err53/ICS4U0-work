
/** 
 * Class representing a notification from a generic app
 * Can be expanded on through inheritance to provide the user with more functionality
 */
class Notification {
  _appName = "";
  _active = true;

  /**
   * Create a generic notification
   * @param {string} appName - The name of the app
   */
  constructor(appName) {
    this._appName = appName;
  }

  /**
   * Set the state of a generic notification from an object
   * @param {object} obj - An object representing a notification
   */
  setFromObject(obj) {
    this._appName = obj._appName;
    this._active = obj._active;
    return this;
  }

  /**
   * Return the name of the app
   */
  getAppName() {
    return this._appName;
  }

  /**
   * Get the text of your notification
   */
  notificationText() {
    return `Notification from ${this._appName}`;
  }

  /**
   * Get whether the notification is currently active
   */
  isActive() {
    return this._active
  }

  /**
   * Dismiss the notification
   */
  dismiss() {
    this._active = false;
  }
}

module.exports = Notification;
