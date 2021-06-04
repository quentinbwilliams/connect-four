const WIDTH = 7;
const HEIGHT = 6;

class Game {
  constructor() {
    this.board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    this.players = [player1, player2];
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.currentPlayer = player1;
    this.gameOver = false;
  }
  move(y, x, currentPlayer) {
    this.addMoveToBoard(y, x, board, currentPlayer);
    checkForWin(board);
    if (checkForWin()) {
      setTimeout(
        () => window.alert(`Player ${currentPlayer} is the winner!`),
        200
      );
      return (this.gameOver = true);
    }
    this.checkForTie(board);
    // switchPlayer(currentPlayer);
  }
  addMoveToBoard(y, x, board, currentPlayer) {
    if (this.board[y][x] === null) {
      this.board[y][x] = this.currentPlayer;
    } else {
      window.alert("Invalid location");
      return;
    }
  }
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
  }
  checkForTie() {
    if (this.board[0].every((cell) => cell !== null)) {
      window.alert("Tie Game!");
    }
  }
}

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        this.board[y][x] === this.currentPlayer
    );
  }
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
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
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

let player1Color = document.querySelector("#player1-color");
const player1 = new Player(`${player1Color}`);

let player2Color = document.querySelector("#player2-color");
const player2 = new Player(`${player2Color}`);

const htmlBoard = document.getElementById("board");

//! RENDER GAME UI //

function makeHtmlBoard() {
  makeHeadCells();
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function makeHeadCells() {
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handlePlayerMove);
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
}

function handlePlayerMove(evt) {
  if (!gameOver) {
    let x = +evt.target.id;
    let y = findY(x);
    move(y, x, currentPlayer);
    placeInTable(y, x);
    switchPlayer();
  } else {
    return;
  }
}

function placeInTable(y, x) {
  const cell = document.getElementById(`${y}-${x}`);
  const gamePiece = document.createElement("div");
  gamePiece.classList.add(`piece`, `p${currentPlayer}`, `${y}-${x}`);
  cell.append(gamePiece);
}

function findY(x) {
  if (board[5][x] === null) {
    return 5;
  } else if (board[4][x] === null) {
    return 4;
  } else if (board[3][x] === null) {
    return 3;
  } else if (board[2][x] === null) {
    return 2;
  } else if (board[1][x] === null) {
    return 1;
  } else if (board[0][x] === null) {
    return 0;
  }
  return null;
}

makeHtmlBoard();
