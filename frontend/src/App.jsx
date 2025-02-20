import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/login"; // Ajusta según el nombre de tu archivo
import Games from "../src/pages/games"; // Página de destino donde se verá el ID

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:id" element={<Games />} />
      </Routes>
    </Router>
  );
}

export default App;
