const express = require("express");
const router = express.Router();
const {
  createUser,
  registerScore,
  getAllRankings,
  getWordsWithHints,
} = require("../controllers/gameControll");

router.post("/usuarios/crear", createUser);
router.post("/scores", registerScore);
router.get("/rankingAll", getAllRankings);
router.get("/words", getWordsWithHints);
module.exports = router;
