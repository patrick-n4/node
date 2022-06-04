const User = require("../model/db");

async function handleGetUsers(req, res) {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  if (user.length === 1) {
    const clientData = {
      id: user[0]._id,
      email: user[0].email,
      fname: user[0].fname,
      lname: user[0].lname
    };
    res.send(clientData);
  } else {
    res.send("signin");
  }
}
module.exports = handleGetUsers;
