const board = document.getElementById("n-queen__board");
let table = document.getElementById("myTable");
const textbox = document.getElementById("numberbox");

const queen = '<i class="fas fa-chess-queen" style="color:blue"></i>';

let n;

function isValid(r, col, n) {
  // Checking the queen in the same row
  for (let i = 0; i < r; ++i) {
    let x = 0;
    while (x != 1000000) {
      ++x;
    }
    const row = document.getElementById(`Row${i}`);
    const value = row.getElementsByTagName("td")[col].innerHTML;
    if (value == queen) return false;
  }

  //Checking the upper diagonal
  for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
    let x = 0;
    while (x != 1000000) {
      ++x;
    }
    const row = document.getElementById(`Row${i}`);
    const value = row.getElementsByTagName("td")[j].innerHTML;
    if (value == queen) return false;
  }

  for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
    let x = 0;
    while (x != 1000000) {
      ++x;
    }
    const row = document.getElementById(`Row${i}`);
    const value = row.getElementsByTagName("td")[j].innerHTML;
    if (value == queen) return false;
  }

  return true;
}

function solveQueen(r, n) {
  if (r == n) return true;

  for (let i = 0; i < n; ++i) {
    let x = 0;
    while (x != 1000000) {
      ++x;
    }
    if (isValid(r, i, n)) {
      const row = document.getElementById(`Row${r}`);
      row.getElementsByTagName("td")[i].innerHTML = queen;

      if (solveQueen(r + 1, n)) return true;

      row.getElementsByTagName("td")[i].innerHTML = "-";
    }
  }
  return false;
}
function nQueen() {
  solveQueen(0, n);
  // if (solveQueen(0, n) == false) alert(`Cannot place all the queens`);
}

function getValue() {
  // console.log(textbox.value);
  // if (textbox.value == 0) alert("Cannot place a queen");

  n = textbox.value;

  board.removeChild(board.firstChild); // Removing the first child from the DOM

  //Adding the same child to the DOM
  if (board.childElementCount == 0) {
    table = document.createElement("TABLE");
    table.setAttribute("id", "myTable");
    board.appendChild(table);
  }

  for (let i = 0; i < n; ++i) {
    const row = table.insertRow(i); // inserting ith row
    row.setAttribute("id", `Row${i}`);
    for (let j = 0; j < n; ++j) {
      const col = row.insertCell(j); // inserting jth column
      col.innerHTML = "-";
    }
  }
  // console.log(table);
  // const row1 = document.getElementById("Row0");
  // const col1 = row1.getElementsByTagName("td");
  // col1[0].innerHTML = queen; //setting the value of board[0][0] as queen
  nQueen();
}
