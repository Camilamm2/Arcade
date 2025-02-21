import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Games from "./pages/games";
import RankingChart from "./pages/ranking";
import Hands from "./pages/hands";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:id" element={<Games />} />
        <Route path="/user/:id/ranking" element={<RankingChart />} />
        <Route path="/user/:id/game/1" element={<Hands />} />
      </Routes>
    </Router>
  );
}

export default App;
