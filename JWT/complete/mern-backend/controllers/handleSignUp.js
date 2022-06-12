const User = require("../model/db");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
require("dotenv").config();

async function createUser(req, res) {
  const newUser = {
    id: uuid(),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  const registeringUserEmail = await User.find({ email: newUser.email });
  if (registeringUserEmail.length === 1) {
    return res.send("email already exists");
  }
  const registeringUserName = await User.find({ username: newUser.username });
  if (registeringUserName.length === 1) {
    return res.send("username already exists");
  }
  const accessToken = handleCreateToken(newUser);
  const refreshToken = jwt.sign(newUser, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.create({
    ...newUser,
    refreshToken: refreshToken
  });
  function handleCreateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m"
    });
  }
  res.cookie("auth", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  // console.log(req.cookies);
  res.send({ token: accessToken });
}

module.exports = createUser;
