function addMarker(mark, pos) {
  const row = +pos[0];
  const col = +pos[1];

  if (gameBoard.getBoard()[row][col] !== "") return;

  gameBoard.getBoard()[row][col] = mark;
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
    if (rowCheck(copy[i])) return "horizontal win";
  }

  // vertical check
  for (let i = 0; i < copy.length; i++) {
    if (rowCheck(reArangeArr(copy)[i])) return "vertical win";
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
    // copy[1][1]
    return "digonal win";
  }

  // draw
  let isDraw = [...copy[0], ...copy[1], ...copy[2]].every((el) => el !== "");
  if (isDraw) {
    return "A draw occured";
  }
}

function resetGame() {
  turn = 0;
  gameBoard.setBoard([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
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
