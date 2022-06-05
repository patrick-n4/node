const express = require("express");
const app = express();
const PORT = process.env.PORT || 7070;
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(express.json());

const posts = [
  {
    username: "Patrick",
    title: "Post 1"
  },
  {
    username: "Prince",
    title: "Post 2"
  }
];

app.get("/posts", verifyToken, (req, res) => {
  const user = req.user.name;
  res.json(posts.filter((post) => post.username === user));
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "14"
  });
  res.json({ acessToken: acessToken });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) return res.send("There is no token please");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send("You are not allowed to use the token");
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
