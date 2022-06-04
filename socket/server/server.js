const express = require("express");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 7000;
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: "http://localhost:3000",
  methods: ["POST", "GET"]
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });
  console.log(socket)
});

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
