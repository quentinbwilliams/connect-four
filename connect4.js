/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currentPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //* TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // this could be improved by creating the board dynamically, but wouldn't that fuck with the check for win protocol?
  const board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
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

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  //! TODO: write the real version of this, rather than always returning 0
  // y is the first number in the id, it represents the height coordinate for the game piece. The lowest coordinate (ie. the bottom row) is 5. 0 is the top row. The x and y values are the same but their coordinate pairs are reversed. Their values are inverted, so the top level of the board is the lowest value (0)
  // Should call this function in placeInTable()?
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //* TODO: make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  const gamePiece = document.createElement("div");
  gamePiece.classList.add("piece");
  gamePiece.classList.add(`p${currentPlayer}`);
  cell.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  window.alert(`${currentPlayer} won!`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  1 -
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currentPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame\
  // checkForTie()
  // if (checkForTie) {

  // }

  // * TODO: switch currPlayer 1 <-> 2
  switchPlayer(currentPlayer);
}

//? Question: I originally wrote this function with currentPlayer as an argument & the currentPlayer value wouldn't update on the global scope after calling the function. Once I removed the argument, the function worked the way it should (by updating the global value). Why is this?
const switchPlayer = () => {
  currentPlayer = currentPlayer === "1" ? "2" : "1";
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

  // TODO: read and understand this code. Add comments to help you.
  //! Wtf
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
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

makeBoard();
makeHtmlBoard();
