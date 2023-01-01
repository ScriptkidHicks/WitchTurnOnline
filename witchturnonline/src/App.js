import './App.css';
import { Route, Routes } from 'react-router-dom';

import LoginLandingPage from './Pages/LoginLandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<LoginLandingPage></LoginLandingPage>} />
      </Routes>
    </div>
  );
}

export default App;
