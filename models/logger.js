const mongoose = require("mongoose");

const logerrSchema = new mongoose.Schema({
  method: {
    type: String,
  },
  originalUrl: {
    type: String,
  },
  ip: {
    type: String,
  },
  host: {
    type: String,
  },
  os: {
    type: String,
  },
  platform: {
    type: String,
  },
  agent: {
    type: Object,
  },
});

const Logger = mongoose.model("Logger", logerrSchema);
module.exports = Logger;
