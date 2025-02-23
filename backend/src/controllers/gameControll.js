const { pool } = require("../config/db");

// Crear un usuario
const createUser = async (req, res) => {
  const { name } = req.body;
  const connection = await pool.getConnection();

  try {
    // Buscar si el usuario ya existe
    const [[resultsQuery]] = await connection.execute(
      `SELECT PlayerId FROM Users WHERE Name = ? LIMIT 1`,
      [name]
    );

    if (resultsQuery) {
      return res.status(200).json({ id: resultsQuery.PlayerId });
    }

    // Insertar nuevo usuario si no existe
    const [insertQuery] = await connection.execute(
      `INSERT INTO Users (Name) VALUES (?)`,
      [name]
    );

    if (!insertQuery.insertId) {
      return res.status(400).json({
        mensaje: "Ocurrió un error al crear el jugador en base de datos",
      });
    }

    res.status(200).json({ id: insertQuery.insertId });
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({ mensaje: "Error en el servidor: " + error.message });
  } finally {
    connection.release();
  }
};

// Registrar puntaje
const registerScore = async (req, res) => {
  const { PlayerId, GameId, Score } = req.body;

  const connection = await pool.getConnection();

  try {
    const [[player]] = await connection.execute(
      `SELECT PlayerId FROM Users WHERE PlayerId = ? LIMIT 1`,
      [PlayerId]
    );
    const [[game]] = await connection.execute(
      `SELECT GameId FROM Games WHERE GameId = ? LIMIT 1`,
      [GameId]
    );

    if (!player || !game) {
      return res.status(404).json({ mensaje: "Jugador o juego no encontrado" });
    }

    const [insertQuery] = await connection.execute(
      `INSERT INTO Scores (PlayerId, GameId, Score) VALUES (?, ?, ?)`,
      [PlayerId, GameId, Score]
    );

    if (!insertQuery.insertId > 0) {
      return res
        .status(400)
        .json({ mensaje: "Ocurrió un error al registrar el puntaje" });
    }

    res.status(200).json({
      mensaje: "Puntaje registrado correctamente",
      id: insertQuery.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el servidor: " + error.message });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener todos los rankings
const getAllRankings = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    // Consulta para obtener todos los puntajes, los nombres de los jugadores y los nombres de los juegos
    const [rankingQuery] = await connection.execute(
      `SELECT u.Name AS PlayerName, g.GameName, s.Score
       FROM scores s
       JOIN users u ON s.PlayerId = u.PlayerId
       JOIN games g ON s.GameId = g.GameId
       ORDER BY g.GameId, s.Score DESC`
    );

    // Organizar los jugadores en un ranking
    const rankings = {};
    rankingQuery.forEach((row) => {
      const gameName = row.GameName;
      if (!rankings[gameName]) {
        rankings[gameName] = [];
      }
      rankings[gameName].push({
        GameName: row.GameName,
        PlayerName: row.PlayerName,
        Score: row.Score,
      });
    });

    res.status(200).json({ rankings });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los rankings: " + error.message });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener listado de palabras con pistas
const getWordsWithHints = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    // Consulta para obtener todas las palabras y sus pistas
    const [wordsQuery] = await connection.execute(
      `SELECT word, hint FROM words ORDER BY id ASC`
    );

    res.status(200).json({ words: wordsQuery });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener las palabras: " + error.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  registerScore,
  getAllRankings,
  getWordsWithHints,
};
