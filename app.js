const express = require("express");
const useragent = require("express-useragent");
const morgan = require("morgan");
const apiLogger = require("./middleware/logger.middleware");
const apiRoutes = require("./routes");

//1.Application level middleware[bounds to instance of an app object]
const app = express();

app.use(express.json());
app.use(useragent.express());

// app.use(morgan("combined"));
app.use(apiLogger);
// app.set("view engine", "ejs");

app.use("/api/v1", apiRoutes);

module.exports = app;
