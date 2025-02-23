import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import GameOver from "../components/repeatDialog";
import "../styles/hanged.css";
import { axiosApi } from "../api/axios";
import hanged0 from "../assets/hanged0.png";
import hanged1 from "../assets/hanged1.png";
import hanged2 from "../assets/hanged2.png";
import hanged3 from "../assets/hanged3.png";
import hanged4 from "../assets/hanged4.png";
import hanged5 from "../assets/hanged5.png";
import hanged6 from "../assets/hanged6.png";
import hanged7 from "../assets/hanged7.png";

const hangedImages = [
  hanged0,
  hanged1,
  hanged2,
  hanged3,
  hanged4,
  hanged5,
  hanged6,
  hanged7,
];

const alphabet = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(
  ","
);

const Hanged = () => {
  const { id } = useParams();
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [lives, setLives] = useState(7);
  const [gameOver, setGameOver] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axiosApi.get("/api/words");
        setWords(response.data.words);
      } catch (error) {
        console.error("Error al obtener las palabras:", error);
      }
    };

    fetchWords();
  }, [id]);

  useEffect(() => {
    if (words.length > 0) {
      initializeGame();
    }
  }, [words]);

  const initializeGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
    setGuessedLetters([]);
    setLives(7);
    setGameOver(false);
    setFinalMessage("");
  };

  const handleLetterClick = (letter) => {
    if (guessedLetters.includes(letter) || gameOver) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!selectedWord.word.includes(letter)) {
      setLives((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!selectedWord) return;

    const wordLetters = selectedWord.word.split("");
    const isWinner = wordLetters.every((letter) =>
      guessedLetters.includes(letter)
    );

    if (isWinner) {
      setFinalMessage("¡Felicidades, ganaste!");
      axiosApi
        .post("/api/scores", { PlayerId: id, GameId: 2, Score: 1 })
        .catch((error) =>
          console.error("Error al guardar la puntuación:", error)
        );
      setGameOver(true);
    } else if (lives <= 0) {
      setFinalMessage(`¡Perdiste! La palabra era: ${selectedWord.word}`);
      setGameOver(true);
    }
  }, [guessedLetters, lives, selectedWord, id]);

  const renderWord = () => {
    if (!selectedWord) return "";
    return selectedWord.word
      .split("")
      .map((letter, index) => (
        <span key={index}>
          {guessedLetters.includes(letter) ? letter : "_"}{" "}
        </span>
      ));
  };

  return (
    <Box className="hanged-container">
      <Typography variant="h3" className="title">
        Juego del Ahorcado
      </Typography>
      <Typography variant="h6" className="hint">
        Pista: {selectedWord?.hint}
      </Typography>
      <Box className="image-container">
        <img
          src={hangedImages[7 - lives]}
          alt="Ahorcado"
          className="hanged-image"
        />
      </Box>
      <Typography variant="h4" className="word-display">
        {renderWord()}
      </Typography>
      <Box className="alphabet-buttons">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            className="letter-button"
            onClick={() => handleLetterClick(letter)}
            disabled={guessedLetters.includes(letter) || gameOver}
          >
            {letter}
          </Button>
        ))}
      </Box>
      <GameOver
        openDialog={gameOver}
        finalMessage={finalMessage}
        id={id}
        resetGame={initializeGame}
      />
    </Box>
  );
};

export default Hanged;
