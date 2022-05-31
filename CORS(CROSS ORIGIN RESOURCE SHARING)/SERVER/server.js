const express = require("express");
const app = express();
const PORT = process.env.PORT || 6060;
const cors = require("cors");

app.use(
  cors({
    origin: "https://127.0.0.1:5000",
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.json({ name: "Patrick", age: 34 });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
