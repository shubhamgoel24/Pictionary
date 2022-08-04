import ReactDOM from "react-dom";
import Board from './pages/board';
import Home from './pages/home';
import {SocketContext, socket} from './socket';
function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Board />
      <Home />
    </SocketContext.Provider>
  );
}

export default App;
