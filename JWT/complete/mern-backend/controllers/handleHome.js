const User = require("../model/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function handleGetUsers(req, res) {
  const accessToken = req.body.token;
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      async function searchToken() {
        const foundUser = await User.find({ accessToken: accessToken });
        if (foundUser.length !== 0) {
          const refreshToken = foundUser[0].refreshToken;
          const user = {
            id: foundUser[0].id,
            fname: foundUser[0].fname,
            email: foundUser[0].email,
            lname: foundUser[0].lname,
            username: foundUser[0].username
          };
          return jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, data) => {
              if (err) {
                return res.send("refresh token expired");
              }
              return jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (err, data) => {
                  if (err) {
                    const newAccessToken = jwt.sign(
                      user,
                      process.env.ACCESS_TOKEN_SECRET,
                      {
                        expiresIn: "15s"
                      }
                    );
                    async function updateToken() {
                      const data = await User.updateOne(
                        { id: user.id },
                        { $set: { accessToken: newAccessToken }  }
                      );
                    }
                    updateToken();
                    const userData = {
                      user: user,
                      token: newAccessToken
                    };
                    return res.send(userData);
                  }
                  const userData = {
                    user: user,
                    token: accessToken
                  };
                  return res.send(userData);
                }
              );
            }
          );
        } else {
          return res.send("signin");
        }
      }
      searchToken();
    } else {
      const user = {
        id: data.id,
        fname: data.fname,
        email: data.email,
        lname: data.lname,
        username: data.username
      };
      const userData = {
        token: accessToken,
        user: user
      };
      return res.send(userData);
    }
  });
}
module.exports = handleGetUsers;