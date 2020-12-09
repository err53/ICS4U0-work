class Notification {
  constructor(appName) {
    this._appName = appName;
    this._active = true;
  }
  setFromObject(obj) {
    this._appName = obj._appName;
    this._active = obj._active;
    return this;
  }
  getAppName() {
    return this._appName;
  }
  notificationText() {
    return `Notification from ${this._appName}`;
  }
  isActive() {
    return this._active
  }
  dismiss() {
    this._active = false;
  }
}

module.exports = Notification;
