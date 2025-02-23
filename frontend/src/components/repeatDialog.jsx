import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../styles/repeatDialog.css";

const GameOver = ({ openDialog, finalMessage, id, resetGame }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default GameOver;
