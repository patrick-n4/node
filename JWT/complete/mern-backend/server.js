const express = require("express");
const app = express();
const PORT = process.env.PORT || 4041;
require("dotenv").config();
const connnectDb = require("./configs/connect");
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).send("You here");
});
app.use("/home", require("./routers/home"));
app.use("/signup", require("./routers/signUp"));
app.use("/login", require("./routers/login"));
app.use("/search", require("./routers/search"));
app.use("/token", require("./routers/refreshToken"));
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
