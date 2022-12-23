import './App.css';
import styled from 'styled-components';
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
