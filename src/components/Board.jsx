import React from 'react';

const Cell = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((layer, layerIndex) => (
        <div key={layerIndex} className="layer">
          {layer.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => (
                <Cell
                  key={cellIndex}
                  value={cell}
                  onClick={() => onClick(layerIndex, rowIndex, cellIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
