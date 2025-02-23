import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "../styles/playBattleship.css";
import { axiosApi } from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import GameOver from "../components/repeatDialog";
const gridSize = 10;

const machineShipConfig = [
  { name: "Portaaviones", size: 4, color: "red" },
  { name: "Submarino", size: 3, color: "blue" },
  { name: "Submarino", size: 3, color: "blue" },
  { name: "Submarino", size: 3, color: "blue" },
  { name: "Destructor", size: 2, color: "orange" },
  { name: "Destructor", size: 2, color: "orange" },
  { name: "Destructor", size: 2, color: "orange" },
  { name: "Fragata", size: 1, color: "yellow" },
  { name: "Fragata", size: 1, color: "yellow" },
];

const PlayBattleship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tableNull = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const location = useLocation();
  const { playerBoard } = location.state || {};

  if (!playerBoard) {
    return (
      <Typography variant="h6">
        No se encontró la configuración de tu tablero.
      </Typography>
    );
  }

  // Estados para el tablero de la máquina, su vista y los ataques sobre el tablero del jugador
  const [machineBoard, setMachineBoard] = useState(tableNull);
  const [machineBoardView, setMachineBoardView] = useState(tableNull);
  const [playerAttackView, setPlayerAttackView] = useState(tableNull);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const board = generateMachineBoard();
    setMachineBoard(board);
  }, []);

  // Genera un tablero vacío (10x10)
  function generateEmptyBoard() {
    return Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
  }

  // Genera el tablero de la máquina colocando los barcos de forma aleatoria.
  function generateMachineBoard() {
    let board = generateEmptyBoard();
    for (let ship of machineShipConfig) {
      board = placeShipRandomly(board, ship);
    }
    return board;
  }

  // Coloca un barco en una posición aleatoria sin superposiciones.
  function placeShipRandomly(board, ship) {
    let placed = false;
    let newBoard = board.map((row) => row.slice());
    while (!placed) {
      const isHorizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (canPlaceShip(newBoard, ship.size, row, col, isHorizontal)) {
        for (let i = 0; i < ship.size; i++) {
          if (isHorizontal) {
            newBoard[row][col + i] = { ...ship };
          } else {
            newBoard[row + i][col] = { ...ship };
          }
        }
        placed = true;
      }
    }
    return newBoard;
  }

  // Valida si se puede colocar el barco en la posición deseada.
  function canPlaceShip(board, size, row, col, isHorizontal) {
    for (let i = 0; i < size; i++) {
      if (isHorizontal) {
        if (col + i >= gridSize || board[row][col + i]) return false;
      } else {
        if (row + i >= gridSize || board[row + i][col]) return false;
      }
    }
    return true;
  }

  // Maneja el ataque del jugador sobre el tablero de la máquina.
  const handleMachineBoardClick = (row, col) => {
    if (gameOver || !isPlayerTurn || machineBoardView[row][col]) return;

    const newView = machineBoardView.map((r) => r.slice());
    newView[row][col] = machineBoard[row][col] ? "hit" : "miss";
    setMachineBoardView(newView);

    if (checkAllShipsSunk(machineBoard, newView)) {
      setGameOver(true);
      setWinner("Player");
      return;
    }

    setIsPlayerTurn(false); // Pasa el turno a la máquina
    setTimeout(machineTurn, 1000);
  };

  // La máquina ataca de forma aleatoria en el tablero del jugador.
  const machineTurn = () => {
    let row, col;
    const newPlayerAttackView = playerAttackView.map((r) => r.slice());
    let found = false;

    while (!found) {
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * gridSize);
      if (!newPlayerAttackView[row][col]) {
        found = true;
      }
    }

    newPlayerAttackView[row][col] = playerBoard[row][col] ? "hit" : "miss";
    setPlayerAttackView(newPlayerAttackView);

    if (checkAllShipsSunk(playerBoard, newPlayerAttackView)) {
      setGameOver(true);
      setWinner("Machine");
    } else {
      setIsPlayerTurn(true); // Regresa el turno al jugador
    }
  };

  // Revisa si todas las celdas con barcos han sido atacadas ("hit")
  function checkAllShipsSunk(board, view) {
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (board[r][c] && view[r][c] !== "hit") {
          return false;
        }
      }
    }
    return true;
  }

  // Renderiza el tablero del jugador
  const renderPlayerBoard = () => (
    <Box className="player-board-container">
      <Typography variant="h6">Tu Tablero</Typography>
      <Box className="attack-board">
        {playerBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const attack = playerAttackView[rowIndex][colIndex];
            let content = "";
            let bgColor = cell ? cell.color : "white";

            if (attack === "hit") {
              bgColor = "darkred";
              content = "🔥";
            } else if (attack === "miss") {
              bgColor = "gray";
              content = "X";
            }

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  backgroundColor: bgColor,
                  cursor: "pointer",
                }}
              >
                {content}
              </div>
            );
          })
        )}
      </Box>
    </Box>
  );

  const renderMachineBoard = () => (
    <Box className="machine-board-container">
      <Typography variant="h6">Tablero del Enemigo</Typography>
      <Box className="attack-board">
        {machineBoardView.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            let content = "";
            let bgColor = "white";
            if (cell === "hit") {
              bgColor = "darkred";
              content = "🔥";
            } else if (cell === "miss") {
              bgColor = "gray";
              content = "X";
            }
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleMachineBoardClick(rowIndex, colIndex)}
                style={{
                  backgroundColor: bgColor,
                  cursor: "pointer",
                }}
              >
                {content}
              </div>
            );
          })
        )}
      </Box>
    </Box>
  );
  useEffect(() => {
    if (gameOver && winner === "Player") {
      axiosApi
        .post("/api/scores", { PlayerId: id, GameId: 3, Score: 1 })
        .catch((error) =>
          console.error("Error al guardar la puntuación:", error)
        );
    }
  }, [gameOver, winner, id]);
  return (
    <Box className="game-container">
      <Typography variant="h4">Astucia Naval </Typography>
      <Box className="boards">
        {renderPlayerBoard()}
        {renderMachineBoard()}
      </Box>
      {gameOver && (
        <GameOver
          openDialog={true}
          finalMessage={
            winner === "Player"
              ? "¡Ganaste!"
              : "La máquina gana. ¡Intenta de nuevo!"
          }
          id={id}
          resetGame={() => navigate(`/user/${id}/game/3`)}
        />
      )}
    </Box>
  );
};

export default PlayBattleship;
