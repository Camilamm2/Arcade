const express = require("express");
const router = express.Router();
const {
  createUser,
  registerScore,
  getGameRanking,
  deleteUser,
} = require("../controllers/gameControll");

// Ruta para crear un jugador
router.post("/usuarios/crear", createUser);

// Ruta para registrar un puntaje de un jugador
router.post("/puntajes", registerScore);

// Ruta para obtener el ranking de un juego
router.get("/ranking", getGameRanking);

// Ruta para eliminar un jugador
router.delete("/usuarios/eliminar", deleteUser);

module.exports = router;
