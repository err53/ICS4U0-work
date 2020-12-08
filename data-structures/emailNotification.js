const Notification = require("./notification")

class EmailNotification extends Notification {
  constructor(from, to, subject, body) {
    super("Email");
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }
  setFromObject(obj) {
    super.setFromObject(obj);
    this.from = obj.from;
    this.to = obj.to;
    this.subject = obj.subject;
    this.body = obj.body;
    return this;
  }
  notificationText() {
    return `New email from ${this.from}:\n\x1b[4m${this.subject}\x1b[0m\n${this.body}`;
  }
  replyToEmail(content) {
    // This would send a reply if this was a real implementation
    console.log(`Email sent with following content:\n${content}`)
  }
}

module.exports = EmailNotification;
