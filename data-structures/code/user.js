var Notification = require("./notification");
var EmailNotification = require("./emailNotification");
var WeatherNotification = require("./weatherNotification");

/** A class representing a user */
class User {
  #name = "";
  notifications = [];

  /**
   * Create a user given a name
   * @param {User} user - An object representation of a user
   */
  constructor({ name, notifications }) {
    this.#name = name;

    // Set notifications
    if (Array.isArray(notifications)) {
      notifications.map((notification) => {
        // Create a temporary generic notification
        let tempNotification = new Notification(notification);

        // Set notification type using getAppName()
        switch (tempNotification.appName) {
          case "Email":
            tempNotification = new EmailNotification(notification);
            break;
          case "Weather":
            tempNotification = new WeatherNotification(notification);
            break;
        }
        // Push notification into array
        this.notifications.push(tempNotification);
      });
    }
  }

  get name() {
    return this.#name;
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
      if (notification.isActive) {
        console.log(notification.notificationText());
      }
    });
  }

  toJSON() {
    return {
      name: this.#name,
      notifications: this.notifications,
    };
  }
}

module.exports = User;
