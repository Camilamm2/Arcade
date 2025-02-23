import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "../styles/battleship.css";
import { useParams, useNavigate } from "react-router-dom";

const gridSize = 10;

const shipTypes = [
  { name: "Portaaviones", size: 4, color: "red", max: 1 },
  { name: "Submarino", size: 3, color: "blue", max: 3 },
  { name: "Acorazado", size: 3, color: "green", max: 3 },
  { name: "Destructor", size: 2, color: "orange", max: 3 },
  { name: "Fragata", size: 1, color: "yellow", max: 2 },
];

const Battleship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playerBoard, setPlayerBoard] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const [shipsPlacedCount, setShipsPlacedCount] = useState(
    shipTypes.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
  );
  const [draggedShip, setDraggedShip] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(true);

  // Controla el arrastre de barcos
  const handleDragStart = (ship) => setDraggedShip(ship);

  // Función para cambiar la orientación
  const toggleOrientation = () => setIsHorizontal(!isHorizontal);

  // Verifica si el barco puede ser colocado en la posición deseada
  const canPlaceShip = (row, col, size, isHorizontal) => {
    for (let i = 0; i < size; i++) {
      if (
        isHorizontal
          ? col + i >= gridSize || playerBoard[row][col + i]
          : row + i >= gridSize || playerBoard[row + i][col]
      ) {
        return false;
      }
    }
    return true;
  };

  // Coloca el barco en el tablero
  const placeShip = (row, col, ship) => {
    const newBoard = playerBoard.map((r) => r.slice());
    for (let i = 0; i < ship.size; i++) {
      if (isHorizontal) {
        newBoard[row][col + i] = {
          type: "ship",
          color: ship.color,
          name: ship.name,
        };
      } else {
        newBoard[row + i][col] = {
          type: "ship",
          color: ship.color,
          name: ship.name,
        };
      }
    }
    setPlayerBoard(newBoard);
  };

  // Maneja la colocación de barcos
  const handleDrop = (row, col) => {
    if (draggedShip && canPlaceShip(row, col, draggedShip.size, isHorizontal)) {
      const currentShipCount = shipsPlacedCount[draggedShip.name];
      if (currentShipCount < draggedShip.max) {
        placeShip(row, col, draggedShip);
        setShipsPlacedCount((prev) => ({
          ...prev,
          [draggedShip.name]: currentShipCount + 1,
        }));
        setDraggedShip(null);
      } else {
        alert(`Ya se alcanzó el número máximo de ${draggedShip.name}`);
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // Verifica si todos los barcos han sido colocados antes de iniciar el juego
  const startGame = () => {
    const totalShips = shipTypes.reduce((acc, { max }) => acc + max, 0);
    const placedTotal = Object.values(shipsPlacedCount).reduce(
      (acc, count) => acc + count,
      0
    );

    if (placedTotal === totalShips) {
      navigate(`/user/${id}/game/3/play`, { state: { playerBoard } });
    } else {
      alert("Por favor, coloca todos los barcos antes de iniciar.");
    }
  };

  // Renderiza las celdas del tablero
  const renderBoard = () => (
    <Box className="attack-board">
      {playerBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onDrop={() => handleDrop(rowIndex, colIndex)}
            onDragOver={handleDragOver}
            style={{ backgroundColor: cell ? cell.color : "white" }}
          />
        ))
      )}
    </Box>
  );

  // Renderiza los barcos
  const renderShips = () => (
    <Box className="ships-container">
      {shipTypes.map((ship) => {
        const isDisabled = shipsPlacedCount[ship.name] >= ship.max;
        return (
          <div
            key={ship.name}
            className="ship-card"
            draggable={!isDisabled}
            onDragStart={() => handleDragStart(ship)}
            style={{
              backgroundColor: isDisabled ? "gray" : ship.color,
              color: "white",
              cursor: isDisabled ? "not-allowed" : "grab",
            }}
          >
            {ship.name} ({ship.size} casilla{ship.size > 1 ? "s" : ""})
          </div>
        );
      })}
      <button className="orientation-btn" onClick={toggleOrientation}>
        Cambiar a {isHorizontal ? "Vertical" : "Horizontal"}
      </button>
    </Box>
  );

  return (
    <Box className="battleship-container">
      <Typography variant="h4" className="title">
        Astucia Naval
      </Typography>
      {renderBoard()}
      {renderShips()}
      <button className="start-game-btn" onClick={startGame}>
        Iniciar Juego
      </button>
    </Box>
  );
};

export default Battleship;
