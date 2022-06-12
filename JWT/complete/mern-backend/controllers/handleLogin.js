const User = require("../model/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function handleGetUsers(req, res) {
  const email = req.body.email;
  const inputPassword = req.body.password;
  const foundUser = await User.find({ email: email });
  if (foundUser.length > 0) {
    if (inputPassword === foundUser[0].password) {
      const user = {
        id: foundUser[0].id,
        fname: foundUser[0].fname,
        email: foundUser[0].email,
        lname: foundUser[0].lname,
        username: foundUser[0].username,
        password: foundUser[0].password
      };
      const refreshToken = foundUser[0].refreshToken;
      const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
      });
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, data) => {
          if (err) return res.send("refresh token is expired");
          async function updateToken() {
            const data = await User.updateOne(
              { id: foundUser[0].id },
              { $set: { accessToken: newAccessToken } }
            );
          }
          updateToken();
          res.send(newAccessToken);
        }
      );
    } else {
      res.send("Incorrect Data");
    }
  } else {
    res.send("Not Found");
  }
}
module.exports = handleGetUsers;
