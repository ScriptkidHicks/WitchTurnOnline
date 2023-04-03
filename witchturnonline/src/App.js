import "./App.css";
import { Route, Routes } from "react-router-dom";

import JoinRoomPage from "./Pages/JoinRoomPage";
import Base20InitiativePage from "./Pages/Base20InitiativePage";
import { useState } from "react";

import socket from "./Socket/Socket";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const [room, setRoom] = useState("");
  const [isGM, setIsGM] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerLoggedIn, setPlayerLoggedIn] = useState(false);

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
              playerName={playerName}
              setPlayerName={setPlayerName}
              playerLoggedIn={playerLoggedIn}
              setPlayerLoggedIn={setPlayerLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          exact
          element={
            <LoginPage
              playerName={playerName}
              setPlayerName={setPlayerName}
              playerLoggedIn={playerLoggedIn}
              setPlayerLoggedIn={setPlayerLoggedIn}
            />
          }
        />
        <Route path="/initiative" exact>
          <Route
            path=":room"
            element={
              <Base20InitiativePage
                room={room}
                setRoom={setRoom}
                isGM={isGM}
                setIsGM={setIsGM}
                socket={socket}
                playerName={playerName}
                playerLoggedIn={playerLoggedIn}
                setPlayerLoggedIn={setPlayerLoggedIn}
              />
            }
          />
        </Route>
        <Route path="/About" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
