var Notification = require("./notification");
var EmailNotification = require("./emailNotification");
var WeatherNotification = require("./weatherNotification");

class User {
  name = "";
  notifications = [];
  constructor(name) {
    this.name = name;
  }
  setFromObject(obj) {
    this.name = obj.name;
    obj.notifications.map((notification) => {
      let tempNotification = new Notification().setFromObject(notification);
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
      this.notifications.push(tempNotification.setFromObject(notification));
    });
    return this;
  }
  clearNotifications() {
    this.notifications.map((notification) => {
      notification.dismiss();
    });
  }
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
