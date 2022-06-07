const User = require("../model/db");
const passwordHash = require("password-hash");
async function createUser(req, res) {
  const newUser = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: passwordHash.generate(req.body.password)
  };
  const registeringUserEmail = await User.find({ email: newUser.email });
  if (registeringUserEmail.length === 1) {
    return res.send("exists");
  }
  const registeringUserName = await User.find({ username: newUser.username });
  if (registeringUserName.length === 1) {
    return res.send("username already exists");
  }
  const user = await User.create(newUser);
  return res.send("created");
}

module.exports = createUser;
