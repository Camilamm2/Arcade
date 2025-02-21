import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import piedraPapelTijera from "../assets/piedra-papel-tijeras.png";
import ahorcado from "../assets/ahorcado.png";
import astuciaNaval from "../assets/astucia-naval.png";
import { FaRankingStar } from "react-icons/fa6";
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
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGameSelection = (gameId) => {
    navigate(`/user/${id}/game/${gameId}`);
  };

  const handleRankingClick = () => {
    navigate(`/user/${id}/ranking`);
  };

  return (
    <Box className="games-container" position="relative">
      <Typography variant="h4" className="games-title">
        ¿Qué juego deseas jugar?
      </Typography>

      <Box position="absolute" top={16} right={16}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRankingClick}
          startIcon={<FaRankingStar />}
        >
          Puntajes
        </Button>
      </Box>

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
