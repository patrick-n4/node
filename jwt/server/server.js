const express = require("express");
const app = express();
const PORT = process.env.PORT || 7070;
require("dotenv").config();
const connnectDb = require("./configs/connect");
const path = require("path");
const cors = require("cors");
var whitelist = ["http://localhost:3000", "https://mern.vercel.app"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("You now have access to mongodb yes");
});
app.use("/login", require("./routers/login"));
app.use("/create", require("./routers/signUp"));
app.use("/home", require("./routers/home"));
app.use("/search", require("./routers/search"));

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
