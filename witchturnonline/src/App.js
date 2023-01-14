import "./App.css";
import { Route, Routes } from "react-router-dom";

import JoinRoomPage from "./Pages/JoinRoomPage";
import Base20InitiativePage from "./Pages/Base20InitiativePage";
import { useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [room, setRoom] = useState("12");
  const [isGM, setIsGM] = useState(false);

  const socket = io(process.env.REACT_APP_CLIENT_CONNECTION, {
    transports: ["websocket"],
  });
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <JoinRoomPage
              room={room}
              setRoom={setRoom}
              isGM={isGM}
              setIsGM={setIsGM}
              socket={socket}
            />
          }
        />
        <Route
          path="/Initiative"
          element={
            <Base20InitiativePage
              room={room}
              setRoom={setRoom}
              isGM={isGM}
              setIsGM={setIsGM}
              socket={socket}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
