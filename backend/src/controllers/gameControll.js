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

// Obtener el ranking de un juego por puntaje
const getGameRanking = async (req, res) => {
  const { GameId, rows, first, sortOrder } = req.query;

  const connection = await pool.getConnection();

  try {
    const order = sortOrder === "1" ? "ASC" : "DESC";

    const [resultsQuery] = await connection.execute(
      `
            SELECT U.Name, S.Score
            FROM Scores S
            JOIN Users U ON S.PlayerId = U.PlayerId
            WHERE S.GameId = ?
            ORDER BY S.Score ${order}
            LIMIT ? OFFSET ?`,
      [GameId, rows, first]
    );

    let total = 0;
    if (first === "0") {
      const [resultsTotal] = await connection.execute(
        `SELECT COUNT(DISTINCT PlayerId) total FROM Scores WHERE GameId = ?`,
        [GameId]
      );
      total = resultsTotal.total;
    }

    res.status(200).json({ results: resultsQuery, total });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener el ranking: " + error.message });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar un jugador (y sus puntajes asociados)
const deleteUser = async (req, res) => {
  const { PlayerId } = req.query;

  const connection = await pool.getConnection();

  try {
    const [deleteQuery] = await connection.execute(
      "DELETE FROM Users WHERE PlayerId = ?",
      [PlayerId]
    );

    if (deleteQuery.affectedRows <= 0) {
      return res
        .status(500)
        .json({ mensaje: "Error al eliminar el jugador de la base de datos" });
    }

    res.status(200).json({ mensaje: "Jugador eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el servidor: " + error.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  registerScore,
  getGameRanking,
  deleteUser,
};
