const uuidv4 = require('uuid/v4');

module.exports = class Event {
  constructor(payload) {
    this.type = this.constructor.name;
    this.id = uuidv4();
    this.timestamp = new Date();
    this.payload = payload;
  }
};
