// const mongoose = require("mongoose");
const db = require("./config/db");
const dotenv = require("dotenv").config();
const app = require("./app.js");

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import app from "./app.js";

//
// mongoose.connect(process.env.DATABASE_LOCAL_URI).then(() => {
//   console.log("Connected to MongoDB");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
