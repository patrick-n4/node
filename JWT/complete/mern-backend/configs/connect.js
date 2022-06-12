const mongoose = require("mongoose");
require("dotenv").config();
const connnectDb = mongoose
  .connect("mongodb://localhost/mern")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => console.log("Database failed to connect"));

module.exports = connnectDb;
