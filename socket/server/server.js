const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")
app.use(cors());
const PORT = process.env.PORT || 7000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["POST","GET"]
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on localhost${PORT}`);
});
