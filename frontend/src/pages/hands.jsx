import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { axiosApi } from "../api/axios";
import piedraImg from "../assets/piedra.png";
import papelImg from "../assets/papel.png";
import tijeraImg from "../assets/tijera.png";
import "../styles/Hands.css";

const options = [
  { name: "Piedra", image: piedraImg },
  { name: "Papel", image: papelImg },
  { name: "Tijera", image: tijeraImg },
];

const getComputerChoice = () =>
  options[Math.floor(Math.random() * options.length)];

const determineWinner = (player, computer) => {
  if (player.name === computer.name) return "¡Es un empate!";
  if (
    (player.name === "Piedra" && computer.name === "Tijera") ||
    (player.name === "Papel" && computer.name === "Piedra") ||
    (player.name === "Tijera" && computer.name === "Papel")
  ) {
    return "🎉 ¡Ganaste esta ronda!";
  }
  return "💀 Perdiste esta ronda.";
};

const Hands = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("Haz tu elección");
  const [playerLives, setPlayerLives] = useState(3);
  const [computerLives, setComputerLives] = useState(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");

  useEffect(() => {
    if (playerLives === 0) {
      setFinalMessage("La máquina ganó el juego. ¡Intenta de nuevo!");
      setOpenDialog(true);
    } else if (computerLives === 0) {
      setFinalMessage(
        "¡Ganaste el juego! Eres un pro de Piedra, Papel o Tijera"
      );

      axiosApi
        .post("/api/scores", { PlayerId: id, GameId: 1, Score: 1 })
        .catch((error) =>
          console.error("Error al guardar la puntuación:", error)
        );

      setOpenDialog(true);
    }
  }, [playerLives, computerLives, id]);

  const playRound = (playerOption) => {
    const computer = getComputerChoice();
    setPlayerChoice(playerOption);
    setComputerChoice(computer);
    const gameResult = determineWinner(playerOption, computer);
    setResult(gameResult);

    if (gameResult.includes("¡Ganaste")) {
      setComputerLives((prev) => Math.max(prev - 1, 0));
    } else if (gameResult.includes("Perdiste")) {
      setPlayerLives((prev) => Math.max(prev - 1, 0));
    }
  };

  const resetGame = () => {
    setPlayerLives(3);
    setComputerLives(3);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("Haz tu elección");
    setOpenDialog(false);
  };

  return (
    <Box className="hands-container">
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Piedra, Papel o Tijeras
      </Typography>

      <Box className="vidas-container">
        <Typography variant="h6">Tus vidas:</Typography>
        {[...Array(playerLives)].map((_, i) => (
          <FaHeart key={i} color="red" />
        ))}
      </Box>

      <Box className="vidas-container">
        <Typography variant="h6">Vidas de la máquina:</Typography>
        {[...Array(computerLives)].map((_, i) => (
          <FaHeart key={i} color="white" />
        ))}
      </Box>

      <Box className="opciones-container">
        {options.map((option) => (
          <Button key={option.name} onClick={() => playRound(option)}>
            <img src={option.image} alt={option.name} width={100} />
          </Button>
        ))}
      </Box>

      <Box className="opciones-container">
        <Card className="eleccion-card">
          <CardContent>
            <Typography variant="h6" color="primary">
              Tú
            </Typography>
            {playerChoice ? (
              <img
                src={playerChoice.image}
                alt={playerChoice.name}
                width={80}
              />
            ) : (
              <Typography variant="h5">❔</Typography>
            )}
          </CardContent>
        </Card>

        <Card className="eleccion-card">
          <CardContent>
            <Typography variant="h6" color="secondary">
              La máquina
            </Typography>
            {computerChoice ? (
              <img
                src={computerChoice.image}
                alt={computerChoice.name}
                width={80}
              />
            ) : (
              <Typography variant="h5">❔</Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <Typography className="resultado">{result}</Typography>

      <Dialog open={openDialog} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle>Juego Terminado</DialogTitle>
        <DialogContent>
          <Typography>{finalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <button className="dialog-button replay-button" onClick={resetGame}>
            Repetir
          </button>
          <button
            className="dialog-button exit-button"
            onClick={() => navigate(`/user/${id}`)}
          >
            Salir
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Hands;
