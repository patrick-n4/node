const mongoose = require("mongoose");
require("dotenv").config();
const connnectDb = mongoose
  .connect(
    "mongodb+srv://patrick:patrick-db@mern.zyywvcu.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => console.log("Database failed to connect"));

module.exports = connnectDb;
