var Notification = require("./notification");
var EmailNotification = require("./emailNotification");
var WeatherNotification = require("./weatherNotification");

class User {
  constructor(name) {
    this.name = name;
    this.notifications = [];
  }
  setFromObject(obj) {
    this.name = obj.name;
    obj.notifications.map((notification) => {
      let tempNotification;
      switch (notification._appName) {
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
}

module.exports = User;
