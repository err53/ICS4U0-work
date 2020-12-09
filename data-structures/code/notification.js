class Notification {
  constructor(appName) {
    this._appName = appName;
    this.active = true;
  }
  setFromObject(obj) {
    this._appName = obj._appName;
    this.active = obj.active;
    return this;
  }
  getAppName() {
    return this._appName;
  }
  notificationText() {
    return `Notification from ${this._appName}`;
  }
  dismiss() {
    this.active = false;
  }
}

module.exports = Notification;
