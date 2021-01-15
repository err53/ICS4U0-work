const Notification = require("./notification");

/** This represents a notification sent by an email app */
class EmailNotification extends Notification {
  #from;
  #to;
  #subject;
  #body;

  /**
   * Creates an email notification
   * @param {string} from - The user who sent the email
   * @param {string} to - The user who received the email
   * @param {string} subject - The subject of the email
   * @param {string} body - The body of the email
   */
  constructor({ from, to, subject, body, ...props }) {
    super({ ...props, appName: "Email" });
    this.#from = from ? from : "";
    this.#to = to ? to : "";
    this.#subject = subject ? subject : "";
    this.#body = body ? body : "";
  }

  /**
   * Generate notification text for the email notification
   */
  notificationText() {
    return `New email from ${this.#from}:\n\x1b[4m${this.#subject}\x1b[0m\n${
      this.#body
    }`;
  }

  /**
   * A placeholder function for sending a reply to an email
   * @param {string} content - The content of the reply
   */
  replyToEmail(content) {
    // This would send a reply if this was a real implementation
    console.log(`Email sent with following content:\n${content}`);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      from: this.#from,
      to: this.#to,
      subject: this.#subject,
      body: this.#body,
    };
  }
}

module.exports = EmailNotification;
