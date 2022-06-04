const User = require("../model/db");
const passwordHash = require("password-hash");
async function handleGetUsers(req, res) {
  const email = req.body.email;
  const user = await User.find({ email: email });
  if (user.length != 0) {
    if (passwordHash.verify(req.body.password,user[0].password)) {
      const client = { id: user[0]._id, email: user[0].email };
      res.send(client);
    } else {
      res.send("Incorrect Data");
    }
  } else {
    res.send("Not Found");
  }
}
module.exports = handleGetUsers;
