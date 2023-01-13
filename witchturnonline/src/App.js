import "./App.css";
import { Route, Routes } from "react-router-dom";

import JoinRoomPage from "./Pages/JoinRoomPage";
import InitiativePage from "./Pages/InitiativePage";
import { useState } from "react";

function App() {
  const [room, setRoom] = useState("12");
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
            />
          }
        />
        <Route
          path="/Initiative"
          element={
            <InitiativePage
              room={room}
              setRoom={setRoom}
              isGM={isGM}
              setIsGM={setIsGM}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
