const fs = require('fs');
const path = require('path');

/**
 * Represents a logging session for tracking events with contextual information.
 * 
 * @class
 * @param {string} user - The unique identifier for the log session.
 * @param {Object} [context={}] - Optional context object, e.g., game information.
 * 
 * @property {Object} context - The context associated with the session.
 * @property {Array<string>} events - The list of logged event entries.
 * @property {string} user - The unique identifier for the session.
 * 
 * @example
 */
class LogSession {
  constructor(user,context = {}) {
    this.context = context; 
    this.events = [];
    this.user = user;
  }

  /**
   * Adds a new event entry to the session log with a timestamp and optional game context.
   *
   * @param {string} message - The event message to log.
   */
  addEvent(message) {
    const timestamp = new Date().toISOString();
    const entry = `${timestamp} ${this.user} ${message}`;
    this.events.push(entry);
  }

  /**
   * Writes the current session's events to a log file.
   * The log file is created (if it doesn't exist) in the specified directory,
   * with the filename based on the current date (YYYY-MM-DD.txt).
   * Each event is appended as a new line in the log file.
   *
   * @param {string} [logDir=path.join(__dirname, '../../logs')] - The directory where log files are stored.
   */
  writeToFile(logDir = path.join(__dirname, '../../logs')) {
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    const fileName = `${new Date().toISOString().slice(0, 10)}.txt`; 
    const fullPath = path.join(logDir, fileName);

    const data = this.events.map(e => e + '\n').join('');
    fs.appendFileSync(fullPath, data, 'utf8');
  }
}

module.exports = LogSession;
