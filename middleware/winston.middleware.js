const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf((level, message, label, timestamp) => {
  return `${timestamp} [${label}] ${level} : ${timestamp}`;
});

const logger = winston.createLogger({
  level: "error",
  levels: winston.config.npm.colors,
  myFormat,

  transports: new winston.transports.console(),
});
