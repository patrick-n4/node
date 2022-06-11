const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  fname: String,
  lname: String,
  email: String,
  username: String,
  password: String,
  refreshToken: String,
  accessToken: String
});

module.exports = mongoose.model("User", userSchema);
