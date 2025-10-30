import React, { useState, useEffect } from "react";
import "./NumberGuessGame.css";

export default function NumberGuessGame() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("bestScore");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (gameOver && (!bestScore || attempts < bestScore)) {
      localStorage.setItem("bestScore", JSON.stringify(attempts));
      setBestScore(attempts);
    }
  }, [gameOver]);

  const handleGuess = (e) => {
    e.preventDefault();
    if (gameOver) return;

    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("⚠️ Please enter a number between 1 and 100.");
      return;
    }

    setAttempts(attempts + 1);

    if (num === target) {
      setMessage(`🎉 Correct! The number was ${target}. You guessed in ${attempts + 1} tries.`);
      setGameOver(true);
    } else if (num < target) {
      setMessage("🔼 Too low! Try a higher number.");
    } else {
      setMessage("🔽 Too high! Try a lower number.");
    }

    setGuess("");
  };

  const restartGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(0);
    setMessage("Guess a number between 1 and 100");
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <div className="game-box">
        <h1>🎯 Number Guessing Game</h1>
        <p className="subtitle">I'm thinking of a number between 1 and 100.</p>

        <form onSubmit={handleGuess} className="form">
          <input
            type="number"
            className="guess-input"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
          />
          <button
            type="submit"
            className="guess-button"
            disabled={gameOver}
          >
            Guess
          </button>
        </form>

        <p className="message">{message}</p>

        <div className="stats">
          <p>Attempts: <span>{attempts}</span></p>
          {bestScore && <p className="best">🏆 Best Score: {bestScore} attempts</p>}
        </div>

        {gameOver && (
          <button onClick={restartGame} className="restart-button">
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
