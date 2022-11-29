const Player = function (mark) {
  function getMark() {
    return mark;
  }

  return { getMark };
};

const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function getBoard() {
    return [...board];
  }

  function setBoard(newBoard) {
    board = newBoard;
  }

  return { getBoard, setBoard };
})();

const displayController = (function () {
  const containerMarks = document.querySelectorAll(".marks div");
  const containerBoard = document.querySelector(".board-container ");
  const containerSelect = document.querySelector(".select-container");

  const nodeReset = document.querySelector(".reset");
  const nodeTurn = document.querySelector(".middle span");
  const nodeBoard = document.querySelector(".board");
  const nodeBtnPlayer = document.querySelector(".ply");
  const nodeBtnComputer = document.querySelector(".cpu");

  function renderBoard() {
    const markup = gameBoard
      .getBoard()
      .map((arr, rowId) => {
        return arr
          .map(
            (cell, colId) =>
              `<div class="cell" data-loc='${rowId}${colId}'><span class="${cell}">${cell}</span></div>`
          )
          .join("");
      })
      .join("");

    nodeBoard.innerHTML = markup;
  }

  function renderTurn(text) {
    nodeTurn.textContent = text;
  }

  function addClick() {
    const nodeListCells = document.querySelectorAll(".cell");

    nodeReset.addEventListener("click", handleReset);

    nodeBtnPlayer.addEventListener("click", handleMode);
    nodeBtnComputer.addEventListener("click", handleComputerMode);

    containerMarks.forEach((mark) => {
      mark.addEventListener("click", handleChoice);
    });

    nodeListCells.forEach((cell) => {
      cell.addEventListener("click", handleMark);
    });
  }

  function handleReset() {
    game.restartGame();
    renderBoard();
    addClick();
  }

  function handleComputerMode() {
    alert("Not yet implemented dude :_)");
  }

  function handleMode() {
    if (!game.getChoice()) return;

    game.createPlayers();

    containerSelect.classList.add("hidden");
    containerBoard.classList.remove("hidden");

    renderTurn(game.playerTurn());
    renderBoard();
    addClick();

    game.setTurn(0);
  }

  function handleChoice() {
    containerMarks.forEach((div) => div.classList.remove("select"));

    this.classList.add("select");

    game.setChoice(this.dataset.choice);
  }

  function handleMark() {
    if (game.getGameStatus()) return;

    const current = game.playerTurn();

    game.addMarker(current, this.dataset.loc);

    renderTurn(current === "x" ? "o" : "x");
    renderBoard();
    addClick();
    game.winner();
  }

  return { addClick };
})();

const game = (function () {
  let turn = 0;
  let choice = "";
  let playerOne;
  let playerTwo;
  let isGameOver = false;

  function setChoice(opt) {
    choice = opt;
  }

  function getChoice() {
    return choice;
  }

  function getGameStatus() {
    return isGameOver;
  }

  function createPlayers() {
    if (choice !== "x") {
      playerOne = new Player("x");
      playerTwo = new Player(choice);
      return;
    }

    playerOne = new Player(choice);
    playerTwo = new Player("o");
  }

  function setTurn(num) {
    turn = num;
  }

  function playerTurn() {
    if (turn === 0) {
      turn = 1;
      return playerOne.getMark();
    } else {
      turn = 0;
      return playerTwo.getMark();
    }
  }

  function addMarker(mark, pos) {
    const row = +pos[0];
    const col = +pos[1];

    if (gameBoard.getBoard()[row][col] !== "") return;

    gameBoard.getBoard()[row][col] = mark;
  }

  function restartGame() {
    turn = 0;
    isGameOver = false;
    gameBoard.setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  }

  function rowCheck(arr) {
    return arr[0] !== "" && arr[0] === arr[1] && arr[0] === arr[2];
  }

  function reArangeArr(arr) {
    let newArr = [[], [], []];

    for (let i = 0; i < arr.length; i++) {
      newArr[0].push(arr[i][0]);
      newArr[1].push(arr[i][1]);
      newArr[2].push(arr[i][2]);
    }

    return newArr;
  }

  function winner() {
    const copy = [...gameBoard.getBoard()];

    // horizontal check
    for (let i = 0; i < copy.length; i++) {
      if (rowCheck(copy[i])) {
        isGameOver = true;
        return copy[i][0];
      }
    }

    // vertical check
    for (let i = 0; i < copy.length; i++) {
      if (rowCheck(reArangeArr(copy)[i])) {
        isGameOver = true;
        return copy[i][0];
      }
    }

    // diagonal check
    if (
      (copy[0][0] !== "" &&
        copy[0][0] === copy[1][1] &&
        copy[0][0] === copy[2][2]) ||
      (copy[0][2] !== "" &&
        copy[0][2] === copy[1][1] &&
        copy[0][2] === copy[2][0])
    ) {
      isGameOver = true;
      return copy[1][1];
    }

    // draw check
    let isDraw = [...copy[0], ...copy[1], ...copy[2]].every((el) => el !== "");
    if (isDraw) {
      isGameOver = true;
      return `Draw, no one wins`;
    }
  }

  function setup() {
    displayController.addClick();
  }

  return {
    getGameStatus,
    createPlayers,
    addMarker,
    setup,
    setChoice,
    getChoice,
    playerTurn,
    restartGame,
    setTurn,
    winner,
  };
})();

game.setup();
