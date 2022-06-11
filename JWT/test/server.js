const express = require("express");
const PORT = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const posts = [
  { username: "Patrick", title: "Post 1" },
  { username: "Prince", title: "Post 2" }
];
let refreshTokens = [];
app.use(express.json());
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.send("Refresh token doesn't exist");
  if (!refreshTokens.includes(refreshToken))
    return res.send("Refresh token not found");
  jwt.verify(refreshToken, process.env.ACCESS_REFRESH_TOKEN, (err, data) => {
    if (err) res.sendStatus(403);
    const accessToken = generateAccessToken({ name: data.name });
    res.json({ accessToken });
  });
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.ACCESS_REFRESH_TOKEN);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
app.delete("/logout", (req, res) => {
  refreshTokens = [];
  res.send("Token deleted successfully");
});
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}
server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});



