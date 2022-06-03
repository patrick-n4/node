const express = require("express");
const PORT = process.env.PORT || 7000;
const app = express();
app.get("/", (req, res) => {
  res.send("Hello I am running on 7000");
});
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
