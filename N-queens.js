const chessBoard = document.getElementById("n-queen-board");
const textbox = document.getElementById("numberbox");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

const queen = '<i class="fas fa-chess-queen" style="color:#000"></i>';


textbox.autofocus = false;
let n,
  speed = 0,
  Board = 0,
  tempSpeed,
  flag = false;

// Creating array for all the possible arrangements of the N-Queen
let array = [0, 2, 1, 1, 3, 11, 5, 41, 93];

// Storing the state of the boards;
let position = {};

// Setting the slider value onSlide
sliderValue.innerHTML = slider.value;
speed = (100 - slider.value) * 9;
tempSpeed = speed;

slider.oninput = function () {
  sliderValue.innerHTML = slider.value;
  speed = slider.value;
  speed = (100 - speed) * 9;
  tempSpeed = speed;
};

// To clear all the colors of the previous state.
function clearColor(board) {
  for (let j = 0; j < n; ++j) {
    const table = document.getElementById(`table-${board}`);
    const row = table.firstChild.childNodes[j];
    for (let k = 0; k < n; ++k)
      (j + k) & 1
        ? (row.getElementsByTagName("td")[k].style.backgroundColor = "#FF9F1C")
        : (row.getElementsByTagName("td")[k].style.backgroundColor = "#FCCD90");
  }
}

async function isValid(board, r, col, n) {
  //Setting the current box color to orange
  const table = document.getElementById(`table-${board}`);
  const currentRow = table.firstChild.childNodes[r];
  currentColumn = currentRow.getElementsByTagName("td")[col];
  currentColumn.innerHTML = queen;
  // currentColumn.style.backgroundColor = "#FF9F1C";

  await new Promise((done) => setTimeout(() => done(), speed));

  // Checking the queen in the same column
  for (let i = r - 1; i >= 0; --i) {
    const table = document.getElementById(`table-${board}`);
    const row = table.firstChild.childNodes[i];
    const column = row.getElementsByTagName("td")[col];

    const value = column.innerHTML;

    if (value == queen) {
      column.style.backgroundColor = "#FB5607";
      currentColumn.innerHTML = "-"
      return false;
    }
    column.style.backgroundColor = "#ffca3a";
    await new Promise((done) => setTimeout(() => done(), speed));
  }

  //Checking the upper left diagonal
  for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
    const table = document.getElementById(`table-${board}`);
    const row = table.firstChild.childNodes[i];
    const column = row.getElementsByTagName("td")[j];
    const value = column.innerHTML;

    if (value == queen) {
      column.style.backgroundColor = "#FB5607";
      currentColumn.innerHTML = "-"
      return false;
    }
    column.style.backgroundColor = "#ffca3a";
    await new Promise((done) => setTimeout(() => done(), speed));
  }

  // Checking the upper right diagonal
  for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
    const table = document.getElementById(`table-${board}`);
    const row = table.firstChild.childNodes[i];
    const column = row.getElementsByTagName("td")[j];

    const value = column.innerHTML;

    if (value == queen) {
      column.style.backgroundColor = "#FB5607";
      currentColumn.innerHTML = "-"
      return false;
    }
    column.style.backgroundColor = "#ffca3a";
    await new Promise((done) => setTimeout(() => done(), speed));
  }
  return true;
}

async function solveQueen(board, r, n) {
  if (r == n) {
    ++Board;
    let table = document.getElementById(`table-${Board}`);
    for (let k = 0; k < n; ++k) {
      let row = table.firstChild.childNodes[k];
      row.getElementsByTagName("td")[position[Board - 1][k]].innerHTML = queen;
    }
    position[Board] = position[Board - 1];
    return true;
  }

  for (let i = 0; i < n; ++i) {
    await new Promise((done) => setTimeout(() => done(), speed));
    clearColor(board);
    if (await isValid(board, r, i, n)) {
      board = Board;
      await new Promise((done) => setTimeout(() => done(), speed));
      clearColor(board);
      let table = document.getElementById(`table-${board}`);
      let row = table.firstChild.childNodes[r];
      row.getElementsByTagName("td")[i].innerHTML = queen;

      position[board][r] = i;

      if (await solveQueen(board, r + 1, n))
        clearColor(board);

      board = Board;
      await new Promise((done) => setTimeout(() => done(), speed));
      table = document.getElementById(`table-${board}`);
      row = table.firstChild.childNodes[r];
      row.getElementsByTagName("td")[i].innerHTML = "-";

      if (position[board][r] != null) {
        delete position[board][r];
      }
    }
  }
}

async function nQueen() {

  position[Board] = {};
  await solveQueen(Board, 0, n,);
  clearColor(Board);
}

let timeout;
pauseButton.onclick = async function pause() {
  // timeout = await new Promise((done) => setTimeout(() => done(), 10000000000));
  speed = 100000000;
  flag = true;
};

// playButton.onclick = function clicking() {
//   if (flag === true) {
//     speed = tempSpeed;
//     flag = true;
//     console.log(`inside pause-play ${speed}`);
//     clearTimeout(timeout)
//   }
//   else
//     visualise();
// }


playButton.onclick = async function visualise() {
  n = textbox.value;

  position = {};
  console.log(position);
  if (n > 8 || n < 0) {
    alert("Cannot process that value");
    return;
  }
  flag = true;
  // Removing all the of previous execution context 
  while (chessBoard.hasChildNodes())
    chessBoard.removeChild(chessBoard.lastChild);

  const arrangement = document.getElementById("queen-arrangement");

  while (arrangement.hasChildNodes())
    arrangement.removeChild(arrangement.firstChild)

  let para = document.createElement("p");
  para.setAttribute("class", "queen-info");
  para.innerHTML = `For ${n}x${n} board, ${array[n] - 1} arrangements are possible.`;
  arrangement.appendChild(para);

  //Adding the same child to the DOM
  if (chessBoard.childElementCount == 0) {
    for (let i = 0; i < array[n]; ++i) {
      let div = document.createElement('div');
      let table = document.createElement("table");
      let header = document.createElement("h4");
      div.setAttribute("id", `div-${i}`)
      header.innerHTML = `Board ${i + 1}`
      table.setAttribute("id", `table-${i}`);
      header.setAttribute("id", `paragraph-${i}`);
      chessBoard.appendChild(div);
      div.appendChild(header);
      div.appendChild(table);
    }
  }

  for (let k = 0; k < array[n]; ++k) {
    let table = document.getElementById(`table-${k}`);
    for (let i = 0; i < n; ++i) {
      const row = table.insertRow(i); // inserting ith row
      row.setAttribute("id", `Row${i}`);
      for (let j = 0; j < n; ++j) {
        const col = row.insertCell(j); // inserting jth column
        (i + j) & 1
          ? (col.style.backgroundColor = "#FF9F1C") : (col.style.backgroundColor = "#FCCD90");
        col.innerHTML = "-";
        col.style.border = "0.5px solid #373f51";
      }
    }
  }
  await nQueen();
};
