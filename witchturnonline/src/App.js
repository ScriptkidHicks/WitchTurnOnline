import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginLandingPage from "./Pages/LoginLandingPage";
import InitiativePage from "./Pages/InitiativePage";
import { useState } from "react";

function App() {
  const [room, setRoom] = useState("");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={<LoginLandingPage room={room} setRoom={setRoom} />}
        />
        <Route
          path="/Initiative"
          element={<InitiativePage room={room} setRoom={setRoom} />}
        />
      </Routes>
    </div>
  );
}

export default App;
