require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.SERVER_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(origin)
  console.log("SERVER IS RUNNING");
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("I am sending data " + data);
    socket.to(data.room).emit("receive_message", { message: data.message });
  });

  socket.on("join_room", (data) => {
    console.log(data.room);
    socket.join(data.room);
  });

  socket.on("leave_room", (data) => {
    console.log("Leaving room: " + data.room);
    socket.leave(data.room);
  });

  socket.off("send_message", (data) => {
    console.log("off " + data);
  });

  socket.on("disconnect", (data) => {
    console.log("disconnecting " + data);
    socket.removeAllListeners();
  });
});
