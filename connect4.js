const WIDTH = 7;
const HEIGHT = 6;

let currentPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

//  makeBoard: create in-JS board structure:
//  board = array of rows, each row is array of cells  (board[y][x])

function makeBoard() {
  //* TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // this could be improved by creating the board dynamically
  return (board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
}

//* TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

const htmlBoard = document.getElementById("board");
function makeHtmlBoard() {
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //* TODO: add comment for this code
  // Nested for loops - inner loop runs 7 times (the value of WIDTH) then the outer loop is executed once. The innner loop completes a full cycle for every one time the outer loop is executed.
  // Whenever the outer loop runs, a new table row is created. Every time the inner loop runs, a new table cell is created for that row. Each cell is appeneded to a table row; each iteration of the outer loop appends a table row to the
  // Cell creation - Each cell is created with a unique id, which is composed of the values for y and x at that particular instance of the loop. It would be more intuitive if the id could represent standard x and y graph coordinates, which require a lot of refactoring.

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

//* TODO: write the real version of this, rather than always returning 0

//? How could I do this without hard-coding the iteration? Use the HEIGHT value decrement the y value and return first y without a piece!

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

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //* TODO: make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  const gamePiece = document.createElement("div");
  // gamePiece.classList.add("piece");
  gamePiece.classList.add(`piece`, `p${currentPlayer}`, `${y}-${x}`);
  // board.push(gamePiece.classList.value);
  console.log(board);
  cell.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  //! TODO: pop up alert message -- verify working
  window.alert(`${currentPlayer} won!`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findY(x);
  // place piece in board and add to HTML table
  // ! TODO: add line to update in-memory board -- update in DOM?
  board[y][x] = currentPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currentPlayer} won!`);
  }

  // TODO: check for tie
  // ! TODO: check if all top row cells are filled & there is no winner; if so call, call endGame
  // checkForTie()
  // if (checkForTie) {

  // }

  // * TODO: switch currPlayer 1 <-> 2
  switchPlayer(currentPlayer);
}

//? Question: I originally wrote this function with currentPlayer as an argument & the currentPlayer value wouldn't update on the global scope after calling the function. Once I removed the argument, the function worked the way it should (by updating the global value). Why is this?
const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
};

function checkForTie() {
  checkEachCell();
  return cells.every(
    ([y, x]) => y === HEIGHT && x === WIDTH && board[(y, x)] === currentPlayer
  );
}

function switchPlayers(currentPlayer) {
  if (currentPlayer === 1) {
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  }
  console.log(`player value inside function: ${currentPlayer}`);
  return currentPlayer;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function findOneOrTwo() {}

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
        board[(y, x)] === currentPlayer
    );
  }
  console.log("checking");
  // TODO: read and understand this code. Add comments to help you.
  //! Comment this code
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      var horizontal = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vertical = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagonalDownRight = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagonalDownLeft = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (
        _win(horizontal) ||
        _win(vertical) ||
        _win(diagonalDownRight) ||
        _win(diagonalDownLeft)
      ) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
