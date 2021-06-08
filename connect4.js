//! GAME LOGIC !//

class Game {
  constructor(y, x, color1, color2) {
    this.height = y;
    this.width = x;
    this.player1 = color1;
    this.player2 = color2;
    this.currentPlayer = this.player1 || this.player2;
    this.makeBoard = (HEIGHT, WIDTH) => {
      const board = [];
      for (let y = 0; y < HEIGHT; y++) {
        let newRow = new Array(WIDTH).fill(null);
        board.push(newRow);
      }
      return board;
    };
    this.board = this.makeBoard(this.height, this.width);
    this.gameOver = false;
    this.switchPlayer = () => {
      this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
    };

    this.checkForTie = () => {
      if (this.board[0].indexOf(null) === -1) {
        console.log("Tie Game!");
      }
    };
    this.checkForWin = (height, width) => {
      this.height = height;
      this.width = width;
      function _win(cells) {
        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < height &&
            x >= 0 &&
            x < width &&
            this.board[y][x] === this.currentPlayer.color
        );
      }
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const horiz = [
            [y, x],
            [y, x + 1],
            [y, x + 2],
            [y, x + 3],
          ];
          const vert = [
            [y, x],
            [y + 1, x],
            [y + 2, x],
            [y + 3, x],
          ];
          const diagDR = [
            [y, x],
            [y + 1, x + 1],
            [y + 2, x + 2],
            [y + 3, x + 3],
          ];
          const diagDL = [
            [y, x],
            [y + 1, x - 1],
            [y + 2, x - 2],
            [y + 3, x - 3],
          ];

          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            console.log("win");
            this.gameOver = true;
            return true;
          }
        }
      }
    };
    this.playerMove = (y, x) => {
      this.board[y][x] = this.currentPlayer.color;
      let move = [y, x];
      this.currentPlayer.moves.push(move);
      this.switchPlayer();
      if (this.checkForWin()) {
        return `${this.currentPlayer} wins!`;
      }
    };
  }
}

// class Player {
//   constructor(num, color) {
//     this.player = num;
//     this.color = color;
//     this.moves = [];
//   }
// }

const submit = document.querySelector("#submit");
submit.addEventListener("click", () => {
  const game = initializeGame();
  return game;
});

function initializeGame() {
  p1color = document.querySelector("#player1-color").value;
  p2color = document.querySelector("#player2-color").value;
  const game = new Game(5, 6, p1color, p2color);
  return game;
}

// const player1 = new Player(1, "red");

// const player2 = new Player(2, "black");

// const game = new Game(7, 6);

// console.log();

// game.playerMove(2, 0);
// game.playerMove(2, 1);
// game.playerMove(2, 2);
// game.playerMove(1, 0);

// console.log(game.board);
// console.log(player1);
// console.log(player2);

// let matches = [];

// this.checkForWin = () => {};
//     this.getHorizWins = () => {
//       let horizWins = [];
//       for (let y = 0; y < this.height; y++) {
//         for (let x = 0; x < this.width; x++) {
//           const horiz = [
//             [y, x],
//             [y, x + 1],
//             [y, x + 2],
//             [y, x + 3],
//           ];
//           horizWins.push(horiz);
//         }
//       }
//       return horizWins;
//     };
//     this.getVertWins = () => {
//       let vertWins = [];
//       for (let y = 0; y < this.height; y++) {
//         for (let x = 0; x < this.width; x++) {
//           const vert = [
//             [y, x],
//             [y + 1, x],
//             [y + 2, x],
//             [y + 3, x],
//           ];
//           vertWins.push(vert);
//         }
//       }
//       return vertWins;
//     };
//     this.getDiagDRWins = () => {
//       let diagDRWins = [];
//       for (let y = 0; y < this.height; y++) {
//         for (let x = 0; x < this.width; x++) {
//           const diagDR = [
//             [y, x],
//             [y + 1, x + 1],
//             [y + 2, x + 2],
//             [y + 3, x + 3],
//           ];
//           diagDRWins.push(diagDR);
//         }
//       }
//       return diagDRWins;
//     };
//     this.getDiagDLWins = () => {
//       let diagDLWins = [];
//       for (let y = 0; y < this.height; y++) {
//         for (let x = 0; x < this.width; x++) {
//           const diagDL = [
//             [y, x],
//             [y + 1, x - 1],
//             [y + 2, x - 2],
//             [y + 3, x - 3],
//           ];
//           diagDLWins.push(diagDL);
//         }
//       }
//       return diagDLWins;
//     };
//     this.horizWins = this.getHorizWins().reverse();
//     this.vertWins = this.getVertWins().reverse();
//     this.diagDRWins = this.getDiagDRWins().reverse();
//     this.diagDLWins = this.getDiagDLWins().reverse();
//     this.winCoords = [
//       ...this.horizWins,
//       ...this.vertWins,
//       ...this.diagDRWins,
//       ...this.diagDLWins,
//     ];
// this.checkForWin = () => {
//   for (let i = 0; i < matchArray.length; i++) {
//     return currentPlayer.moves.includes((pair) => matchArray[i].each(pair));
//   }
// };
