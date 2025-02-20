require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("¡Bienvenido a Arcade Colombia!");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.use("/jugadores", require("./routes/players"));
