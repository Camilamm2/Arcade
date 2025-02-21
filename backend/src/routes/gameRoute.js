const express = require("express");
const router = express.Router();
const {
  createUser,
  registerScore,
  getAllRankings,
} = require("../controllers/gameControll");

router.post("/usuarios/crear", createUser);
router.post("/scores", registerScore);
router.get("/rankingAll", getAllRankings);

module.exports = router;
