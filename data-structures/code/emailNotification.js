const Notification = require("./notification")

/** This represents a notification sent by an email app */
class EmailNotification extends Notification {
  _from = "";
  _to = "";
  _subject = "";
  _body = "";

  /**
   * Creates an email notification
   * @param {string} from - The user who sent the email
   * @param {string} to - The user who received the email
   * @param {string} subject - The subject of the email
   * @param {string} body - The body of the email
   */
  constructor(from, to, subject, body) {
    super("Email");
    this._from = from;
    this._to = to;
    this._subject = subject;
    this._body = body;
  }

  /**
   * Set the state of the email notification from an object
   * @param {object} obj - An object representing an email notification
   */
  setFromObject(obj) {
    super.setFromObject(obj);
    this._from = obj._from;
    this._to = obj._to;
    this._subject = obj._subject;
    this._body = obj._body;
    return this;
  }

  /**
   * Generate notification text for the email notification
   */
  notificationText() {
    return `New email from ${this._from}:\n\x1b[4m${this._subject}\x1b[0m\n${this._body}`;
  }

  /**
   * A placeholder function for sending a reply to an email
   * @param {string} content - The content of the reply
   */
  replyToEmail(content) {
    // This would send a reply if this was a real implementation
    console.log(`Email sent with following content:\n${content}`)
  }
}

module.exports = EmailNotification;
