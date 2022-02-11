import React, { useState } from "react";
import "./Board.css";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const nextPlayer = updateNextPlayer(squares);
  const winner = calculateWinner(squares);
  const status = updateStatus(winner, squares, nextPlayer);

  const selectSquare = (square) => {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextPlayer;
    setSquares(squaresCopy);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        Restart
      </button>
    </div>
  );
};
const updateStatus = (winner, squares, nextPlayer) => {
  return winner
    ? `Player ${winner} wins`
    : squares.every(Boolean)
    ? `Draw`
    : `Next player: ${nextPlayer}`;
};

const updateNextPlayer = (squares) => {
  return squares.filter(Boolean).length % 2 === 0 ? "O" : "X";
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
