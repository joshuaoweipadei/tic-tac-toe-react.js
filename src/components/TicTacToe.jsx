import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import { checkWinner, getBestMove } from '../GameLogic';

const TicTacToe = () => {
  const initialBoard = Array(4).fill(null).map(() => Array(4).fill(null).map(() => Array(4).fill(null)));
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [firstMove, setFirstMove] = useState('Computer');

  const handleClick = useCallback((layer, row, col) => {
    if (board[layer][row][col] || winner) return; // Prevent move if cell is occupied or there's a winner

    const newBoard = board.map((layerArr, lIndex) =>
      layerArr.map((rowArr, rIndex) =>
        rowArr.map((cell, cIndex) =>
          lIndex === layer && rIndex === row && cIndex === col ? currentPlayer : cell
        )
      )
    );

    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    setWinner(newWinner);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  });
  
  useEffect(() => {
    if (currentPlayer === 'O' && firstMove === 'Computer' && !winner) {
      const bestMove = getBestMove(board);
      if (bestMove) {
        handleClick(bestMove.layer, bestMove.row, bestMove.col);
      }
    }
  }, [currentPlayer, firstMove, winner, board, handleClick]);

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setCurrentPlayer('X');
    setFirstMove('Computer');
  };

  return (
    <div className="game">
      <h3>Tic-Tac-Toe Game with Computer</h3>
      <Board board={board} onClick={handleClick} />
      {winner && (
        <div>
          <p>Winner: {winner === 'X' ? 'Player wins' : 'Computer wins'}</p>
        </div>
      )}
      <button className='reset-btn' onClick={resetGame}>Reset the game</button>
    </div>
  );
};

export default TicTacToe;
