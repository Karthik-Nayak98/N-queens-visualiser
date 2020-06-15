const board = document.getElementById("n-queen__board");
let table = document.getElementById("myTable");
const textbox = document.getElementById("numberbox");

const queen = '<i class="fas fa-chess-queen" style="color:blue"></i>';

let n;

async function isValid(r, col, n) {
  // Checking the queen in the same row
  for (let i = 0; i < r; ++i) {
    const row = document.getElementById(`Row${i}`);
    const column = row.getElementsByTagName("td")[col];
    column.style.backgroundColor = "yellow";
    const value = column.innerHTML;
    await new Promise((done) => setTimeout(() => done(), 500));

    if (value == queen) {
      column.style.backgroundColor = "red";
      return false;
    }
  }

  //Checking the upper diagonal
  for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
    const row = document.getElementById(`Row${i}`);
    const column = row.getElementsByTagName("td")[j];
    column.style.backgroundColor = "yellow";
    const value = column.innerHTML;
    await new Promise((done) => setTimeout(() => done(), 500));

    if (value == queen) {
      column.style.backgroundColor = "red";
      return false;
    }
  }

  // await delay(500);
  for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
    const row = document.getElementById(`Row${i}`);
    const column = row.getElementsByTagName("td")[j];
    column.style.backgroundColor = "yellow";
    const value = column.innerHTML;

    await new Promise((done) => setTimeout(() => done(), 500));

    if (value == queen) {
      column.style.backgroundColor = "red";
      return false;
    }
  }
  return true;
}

async function solveQueen(r, n) {
  if (r == n) return true;

  for (let i = 0; i < n; ++i) {
    if (await isValid(r, i, n)) {
      const row = document.getElementById(`Row${r}`);
      row.getElementsByTagName("td")[i].innerHTML = queen;

      if (await solveQueen(r + 1, n)) return true;
      row.getElementsByTagName("td")[i].innerHTML = "-";
    }
  }
  return false;
}

async function nQueen() {
  solveQueen(0, n);
  // if (solveQueen(0, n) == false) alert(`Cannot place all the queens`);
}

function getValue() {
  n = textbox.value;

  // board.removeChild(board.firstChild); // Removing the first child from the DOM
  while (board.childElementCount != 0) {
    board.removeChild(board.firstChild);
  }
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

  setTimeout(() => {
    nQueen();
  }, 500);
}
