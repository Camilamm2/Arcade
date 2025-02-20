import { useNavigate, useParams } from "react-router-dom"; // useParams para obtener el userId desde la URL
import { Box, Typography } from "@mui/material";
import piedraPapelTijera from "../assets/piedra-papel-tijeras.png";
import ahorcado from "../assets/ahorcado.png";
import astuciaNaval from "../assets/astucia-naval.png";
import "../styles/games.css";

const games = [
  {
    id: 1,
    name: "Manos",
    image: piedraPapelTijera,
  },
  {
    id: 2,
    name: "Ahorcado",
    image: ahorcado,
  },
  {
    id: 3,
    name: "Astucia Naval",
    image: astuciaNaval,
  },
];

const Games = () => {
  const { id } = useParams(); // Obtenemos el userId desde la URL
  const navigate = useNavigate(); // Hook de React Router para redirigir a las rutas

  const handleGameSelection = (gameId) => {
    navigate(`/user/${id}/game/${gameId}`); // Usamos el userId desde la URL para la navegación
  };

  return (
    <Box className="games-container">
      <Typography variant="h4" className="games-title">
        ¿Qué juego deseas jugar?
      </Typography>
      <Box className="games-list">
        {games.map((game) => (
          <Box
            key={game.id}
            className="game-item"
            onClick={() => handleGameSelection(game.id)}
          >
            <img src={game.image} alt={game.name} />
            <Box className="game-name-overlay">{game.name}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Games;
