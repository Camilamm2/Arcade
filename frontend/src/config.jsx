import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Games from "./pages/games";
import RankingChart from "./pages/ranking";
import Hands from "./pages/hands";
import Hanged from "./pages/hanged";
import PlayBattleship from "./pages/playBattleship";
import Battleship from "./pages/battleships";
import BlockBackButton from "./components/block";
function App() {
  return (
    <Router>
      {/* <BlockBackButton /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:id" element={<Games />} />
        <Route path="/user/:id/ranking" element={<RankingChart />} />
        <Route path="/user/:id/game/1" element={<Hands />} />
        <Route path="/user/:id/game/2" element={<Hanged />} />
        <Route path="/user/:id/game/3" element={<Battleship />} />
        <Route path="/user/:id/game/3/play" element={<PlayBattleship />} />
      </Routes>
    </Router>
  );
}

export default App;
