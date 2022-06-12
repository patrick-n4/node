const User = require("../model/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function handleToken(req, res) {
  const token = req.body.token;
  const foundUser = await User.find({ accessToken: token });
  if (foundUser.length != 0) {
    const user = {
      id: foundUser[0].id,
      fname: foundUser[0].fname,
      lname: foundUser[0].lname,
      email: foundUser[0].email,
      username: foundUser[0].username
    };
    const refreshToken = foundUser[0].refreshToken;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, data) => {
            if (err) {
              return res.send("refresh token expired");
            }
            const newAccessToken = jwt.sign(
              user,
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "15s" }
            );
            async function updateToken() {
              const data = await User.updateOne(
                { id: user.id },
                { $set: { accessToken: newAccessToken } }
              );
            }
            updateToken();
            return res.send(newAccessToken);
          }
        );
      }
      return res.send(token);
    });
  } else {
    return res.send("signin");
  }
}
module.exports = handleToken;
