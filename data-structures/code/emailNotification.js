const Notification = require("./notification")

class EmailNotification extends Notification {
  constructor(from, to, subject, body) {
    super("Email");
    this._from = from;
    this._to = to;
    this._subject = subject;
    this._body = body;
  }
  setFromObject(obj) {
    super.setFromObject(obj);
    this._from = obj._from;
    this._to = obj._to;
    this._subject = obj._subject;
    this._body = obj._body;
    return this;
  }
  notificationText() {
    return `New email from ${this._from}:\n\x1b[4m${this._subject}\x1b[0m\n${this._body}`;
  }
  replyToEmail(content) {
    // This would send a reply if this was a real implementation
    console.log(`Email sent with following content:\n${content}`)
  }
}

module.exports = EmailNotification;
