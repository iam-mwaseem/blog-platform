const Logger = require("../models/logger");

const logger = async (req, res, next) => {
  try {
    const logs = await Logger.create({
      method: req.method,
      originalUrl: req.originalUrl,
      ip: req.ip || req.socket.remoteAddress,
      host: req.hostname,
      agent: req.useragent,
    });
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = logger;
