import "./App.css";
import { Route, Routes } from "react-router-dom";

import JoinRoomPage from "./Pages/JoinRoomPage";
import Base20InitiativePage from "./Pages/Base20InitiativePage";
import { useState } from "react";

import socket from "./Socket/Socket";

function App() {
  const [room, setRoom] = useState("");
  const [isGM, setIsGM] = useState(false);
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
        <Route path="/initiative">
          <Route
            path=":room"
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
