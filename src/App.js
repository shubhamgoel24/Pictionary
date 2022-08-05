import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Game from './pages/game';
import Home from './pages/home';
import Room from './pages/room';
import {SocketContext, socket} from './socket';
function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<Room />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
