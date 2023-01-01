const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log("I am sending data " + data)
        socket.broadcast.emit("receive_message", {message: data.message})
    })

    socket.off("send_message", (data) => {
        console.log("off " + data);
    })

    socket.on("disconnect", () => {
        socket.removeAllListeners();
    })
} )

