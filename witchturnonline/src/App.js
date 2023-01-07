import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginLandingPage from "./Pages/LoginLandingPage";
import InitiativePage from "./Pages/InitiativePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LoginLandingPage></LoginLandingPage>} />
        <Route path="/Initiative" element={<InitiativePage />} />
      </Routes>
    </div>
  );
}

export default App;
