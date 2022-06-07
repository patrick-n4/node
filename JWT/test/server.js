const express = require("express");
const PORT = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);

//Making posts
const posts = [
  { username: "Patrick", title: "Post 1" },
  { username: "Prince", title: "Post 2" }
];
app.use(express.json());
app.get("/posts", verifyToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"});
  res.send(token);
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) return res.send("Token Doesn't exists");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.send("Invalid Token");
    } else {
      req.user = data;
      next();
    }
  });
}
server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
