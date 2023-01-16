import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_CLIENT_CONNECTION, {
  transports: ["websocket"],
});

export default socket;
