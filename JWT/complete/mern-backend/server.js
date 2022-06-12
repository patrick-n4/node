const express = require("express");
const app = express();
const PORT = process.env.PORT || 4041;
require("dotenv").config();
const connnectDb = require("./configs/connect");
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
const cookieParser = require("cookie-parser");

app.get("/", (req, res) => {
  res.status(200).send("You here");
});

app
  .use(express.json())
  .use(function (req, res, next) {
    cors({ corsOptions });
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept"
    );
    next();
  })
  .use(cookieParser())
  .use(express.urlencoded({ extended: true }))
  .use("/home", require("./routers/home"))
  .use("/signup", require("./routers/signUp"))
  .use("/login", require("./routers/login"))
  .use("/search", require("./routers/search"))
  .use("/token", require("./routers/refreshToken"))
  .get("*", (req, res) => {
    res.status(404).send("Page Not Found");
  });
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
