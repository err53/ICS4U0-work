var Notification = require("./notification");
var EmailNotification = require("./emailNotification");
var WeatherNotification = require("./weatherNotification");

/** A class representing a user */
class User {
  name = "";
  notifications = [];

  /**
   * Create a user given a name
   * @param {string} name - The name of the user
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Set the state of the user given an object representation
   * @param {object} obj - An object representation of a user
   */
  setFromObject(obj) {
    // Set name
    this.name = obj.name;

    // Set notifications
    obj.notifications.map((notification) => {
      // Create a temporary generic notification
      let tempNotification = new Notification().setFromObject(notification);

      // Set notification type using getAppName()
      switch (tempNotification.getAppName()) {
        case "Email":
          tempNotification = new EmailNotification();
          break;
        case "Weather":
          tempNotification = new WeatherNotification();
          break;
        default:
          tempNotification = new Notification();
      }
      // Push notification into array
      this.notifications.push(tempNotification.setFromObject(notification));
    });
    return this;
  }

  /** Clear all notifications */
  clearNotifications() {
    this.notifications.map((notification) => {
      notification.dismiss();
    });
  }

  /** Print all notifications that are active */
  printNotifications() {
    console.log("Here are the notifications: ");
    this.notifications.map((notification) => {
      if (notification.isActive()) {
        console.log(notification.notificationText());
      }
    });
  }
}

module.exports = User;
