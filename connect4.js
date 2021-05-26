//! GAME LOGIC //

const WIDTH = 7;
const HEIGHT = 6;

let currentPlayer = 1;

let gamePiece = [];

let board = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const htmlBoard = document.getElementById("board");

function move(y, x, currentPlayer) {
  makeGamePiece(y, x, board);
  checkForWin(board);
  if (checkForWin()) {
    window.alert(`Player ${currentPlayer} won!`);
  }
  checkForTie(board);
  switchPlayer(currentPlayer);
}

function makeGamePiece(y, x, board) {
  if (board[y][x] === null) {
    board[y][x] = currentPlayer;
  } else {
    window.alert("Invalid location");
    return;
  }
}

const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
};

function checkForTie() {
  if (board[0].every((cell) => cell !== null)) {
    window.alert("Tie Game!");
  }
}

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currentPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
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
        return true;
      }
    }
  }
}

//! RENDER GAME UI //

function placeInTable(y, x) {
  //* TODO: make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  const gamePiece = document.createElement("div");
  gamePiece.classList.add(`piece`, `p${currentPlayer}`, `${y}-${x}`);
  console.log(board);
  cell.append(gamePiece);
}

//* TODO: add comment for this code
// Nested for loops - inner loop runs 7 times (the value of WIDTH) then the outer loop is executed once. The innner loop completes a full cycle for every one time the outer loop is executed.
// Whenever the outer loop runs, a new table row is created. Every time the inner loop runs, a new table cell is created for that row. Each cell is appeneded to a table row; each iteration of the outer loop appends a table row to the
// Cell creation - Each cell is created with a unique id, which is composed of the values for y and x at that particular instance of the loop. It would be more intuitive if the id could represent standard x and y graph coordinates, which require a lot of refactoring.

function makeHeadCells() {
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
}

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

function handleClick(evt) {
  let x = +evt.target.id;
  let y = findY(x);
  move(y, x, currentPlayer);
  placeInTable(y, x);
}

makeHtmlBoard();
