require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<h1>I am afraid you have severly misunderstood what this server portion is for.</h1>"
  );
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST"],
    credentials: true,
    withCredentials: true,
  },
});

const roomsInUse = new Map();

const rooomCodeCharacters = "abcdefghijklmnopqrstuvwxyz123456789";

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("send_message", (data) => {
      SendMessage(socket, data, io);
    });
    socket.on("generate_room", (data) => {
      GenerateRoom(socket, data, io);
    });
    socket.on("join_room", (data) => {
      JoinRoom(socket, data, io);
    });
    socket.on("disconnect", (data) => {
      Disconnect(socket, data);
    });
    socket.on("check_room_validity", (data) => {
      console.log("check room valid1");
      CheckRoom(socket, data, io);
    });

    io.of("/").adapter.on("create-room", (room) => {
      console.log(`room ${room} was created`);
    });

    io.of("/").adapter.on("delete-room", (room) => {
      console.log(`room ${room} was deleted`);
      DeleteRoom(room);
    });
  }
}

function SendMessage(socket, data, io) {
  console.log(`emitting the message to the room: ${data.message}`);
  io.to(data.room).emit("receive_message", {
    message: data.message,
    offset: data.offset,
  });
}

function CheckRoom(socket, data, io) {
  let socketid = socket.id;
  let roomExists = roomsInUse.has(data.room);
  if (roomExists) {
    io.to(socket.id).emit("room_valid", { room: data.room });
  } else {
    io.to(socket.id).emit("room_not_valid", { room: data.room });
  }
}

function GenerateRandomRoomCode() {
  let roomCode = "";
  for (let i = 0; i < 6; i++) {
    roomCode +=
      rooomCodeCharacters[
        Math.floor(Math.random() * rooomCodeCharacters.length)
      ];
  }
  return roomCode;
}

function GenerateRoom(socket, data, io) {
  let roomViable = false;
  let roomCode = "";

  while (!roomViable) {
    roomCode = GenerateRandomRoomCode();
    if (!roomsInUse.has(roomCode)) {
      roomViable = true;
    }
  }
  roomsInUse.set(roomCode, true);
  io.to(socket.id).emit("room_generated", { room: roomCode });
}

function JoinRoom(socket, data) {
  socket.join(data.room);
  io.to(data.room).emit("new_member");
}

function DeleteRoom(room) {
  roomsInUse.delete(room);
  console.log(roomsInUse);
}

function Disconnect(socket, data) {
  socket.removeAllListeners();
}

io.on("connection", (socket) => {
  console.log("new connection");
  new Connection(io, socket);
});

server.listen(process.env.PORT, () => {
  console.log(process.env.ORIGIN);
  console.log(process.env.PORT);
  console.log("SERVER IS RUNNING");
});
