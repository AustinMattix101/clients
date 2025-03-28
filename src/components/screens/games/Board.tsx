import React, { useState } from 'react'

/* eslint-disable @typescript-eslint/no-unused-vars */
function Square(props:any) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function calculateWinner(squares:any) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

const Board: React.FC = () => {
    const [value, setValue] = useState("");

    // const renderSquare: React.FC = (i) => {
    //     return (
    //     <Square
    //         value={this.props.squares[i]}
    //         onClick={() => this.props.onClick(i)}
    //     />
    //     );
    // }
  return (
    <Square />
  )
}

export default Board;

// class Board extends React.Component {
//     renderSquare(i) {
//       return (
//         <Square
//           value={this.props.squares[i]}
//           onClick={() => this.props.onClick(i)}
//         />
//       );
//     }
  
//     render() {
//       return (
//         <div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }


//     handleClick(i) {
//       const history = this.state.history.slice(0, this.state.stepNumber + 1);
//       const current = history[history.length - 1];
//       const squares = current.squares.slice();
//       if (calculateWinner(squares) || squares[i]) {
//         return;
//       }
//       squares[i] = this.state.xIsNext ? "X" : "O";
//       this.setState({
//         history: history.concat([
//           {
//             squares: squares
//           }
//         ]),
//         stepNumber: history.length,
//         xIsNext: !this.state.xIsNext
//       });
//     }
  
//     jumpTo(step) {
//       this.setState({
//         stepNumber: step,
//         xIsNext: (step % 2) === 0
//       });
//     }
  
//     render() {
//       const history = this.state.history;
//       const current = history[this.state.stepNumber];
//       const winner = calculateWinner(current.squares);
  
//       const moves = history.map((step, move) => {
//         const desc = move ?
//           'Go to move #' + move :
//           'Go to game start';
//         return (
//           <li key={move}>
//             <button onClick={() => this.jumpTo(move)}>{desc}</button>
//           </li>
//         );
//       });
  
//       let status;
//       if (winner) {
//         status = "Winner: " + winner;
//       } else {
//         status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//       }