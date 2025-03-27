/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Board from './Board';
import './Game.css';

const Game: React.FC = (props) => {
    const [history, setHistory] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const [status, setStatus] = useState("");
    const [moves, setMoves] = useState("");

  return (
    <div className="game">
        {/* <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div> */}
    </div>
  )
}

export default Game;