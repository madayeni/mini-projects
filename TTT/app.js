const squares = document.querySelectorAll(".square");
const boardDOM = document.querySelector("board");
const stats = document.querySelectorAll(".stats span");
const restart = document.querySelector(".restart");

let xWins = 0,
  oWins = 0,
  ties = 0;
let turn = "X";
const board = Array(9).fill("");
let gameOver = false;

const clearBoard = () => {
  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }
};

const toggleTurn = () => {
  turn = turn === "X" ? "O" : "X";
};

const updateBoard = (turn, index) => {
  board[index] = turn;
};

const printBoard = () => {
  rows = [];
  for (let i = 0; i < 9; i += 3) {
    rows.push(board.slice(i, i + 3));
  }
  //rows.forEach(row => console.log(row))
};

const isGameOver = () => {
  return winner() || tie();
};

const winDOM = (win) => {
  win.forEach((digit) => {
    squares[digit].classList.add("win");
  });
};

const winner = () => {
  wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let win of wins) {
    [n1, n2, n3] = win;
    if (!board[n1] || !board[n2] || !board[n3]) {
      continue;
    }
    if (board[n1] === board[n2] && board[n2] === board[n3]) {
      winDOM(win);
      return true;
    }
  }
  return false;
};

const tie = () => {
  if (winner()) {
    return false;
  }
  for (let i of board) {
    if (i === "") {
      return false;
    }
  }
  return true;
};

const updateStats = (turn) => {
  if (tie()) {
    ties++;
    stats[2].textContent = ties;
  } else if (turn === "X") {
    xWins++;
    stats[0].textContent = xWins;
  } else {
    oWins++;
    stats[1].textContent = oWins;
  }
};

const clickHandler = (e) => {
  const index = parseInt(e.target.id[1]);
  if (gameOver || board[index]) {
    return;
  }
  e.target.classList.add(turn);
  e.target.textContent = turn;
  updateBoard(turn, index);
  printBoard();
  if (isGameOver()) {
    gameOver = true;
    updateStats(turn);
  }
  toggleTurn();
};

const restartHandler = () => {
  clearBoard();
  turn = "X";
  gameOver = false;
  squares.forEach((square) => {
    square.classList.remove("X");
    square.classList.remove("O");
    square.classList.remove("win");
    square.textContent = "";
  });
};

squares.forEach((square) => square.addEventListener("click", clickHandler));
restart.addEventListener("click", restartHandler);
