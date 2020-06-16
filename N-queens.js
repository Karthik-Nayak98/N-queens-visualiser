const board = document.getElementById("n-queen__board");
let table = document.getElementById("myTable");
const textbox = document.getElementById("numberbox");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");

const queen = '<i class="fas fa-chess-queen" style="color:#3A86FF"></i>';

let n, speed;

// Setting the slider value onSlide
sliderValue.innerHTML = slider.value;
slider.oninput = function () {
  sliderValue.innerHTML = slider.value;
  speed = slider.value;
};

// Adding the gradient value based on slider value
// slider.addEventListener("mousemove", function () {
//   const val = slider.value;
//   const color = `linear-gradient(90deg, #ffba08 ${val}%, #e8eddf ${val}%)`;
//   slider.style.background = color;
// });

// To clear all the colors of the previous state.
function clearColor() {
  for (let j = 0; j < n; ++j) {
    const row = document.getElementById(`Row${j}`);
    for (let k = 0; k < n; ++k)
      row.getElementsByTagName("td")[k].style.backgroundColor = "#FDFFFC";
  }
}

async function isValid(r, col, n) {
  //Setting the current box color to orange
  const currentRow = document.getElementById(`Row${r}`);
  currentColumn = currentRow.getElementsByTagName("td")[col];
  currentColumn.style.backgroundColor = "#FF9F1C";

  await new Promise((done) => setTimeout(() => done(), 500));
  // Checking the queen in the same row
  for (let i = r - 1; i >= 0; --i) {
    const row = document.getElementById(`Row${i}`);
    const column = row.getElementsByTagName("td")[col];

    const value = column.innerHTML;

    if (value == queen) {
      column.style.backgroundColor = "#FB5607";

      return false;
    }
    column.style.backgroundColor = "#ffe66d";
    await new Promise((done) => setTimeout(() => done(), 500));
  }

  //Checking the upper diagonal
  for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
    const row = document.getElementById(`Row${i}`);
    const column = row.getElementsByTagName("td")[j];
    const value = column.innerHTML;

    if (value == queen) {
      column.style.backgroundColor = "#FB5607";
      return false;
    }
    column.style.backgroundColor = "#ffe66d";
    await new Promise((done) => setTimeout(() => done(), 500));
  }

  // Checking the upper left diagonal
  for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
    const row = document.getElementById(`Row${i}`);
    const column = row.getElementsByTagName("td")[j];

    const value = column.innerHTML;

    if (value == queen) {
      column.style.backgroundColor = "#FB5607";

      return false;
    }
    column.style.backgroundColor = "#ffe66d";
    await new Promise((done) => setTimeout(() => done(), 500));
  }
  return true;
}

async function solveQueen(r, n) {
  if (r == n) return true;

  for (let i = 0; i < n; ++i) {
    await new Promise((done) => setTimeout(() => done(), 500));
    clearColor();
    if (await isValid(r, i, n)) {
      await new Promise((done) => setTimeout(() => done(), 500));
      clearColor();
      const row = document.getElementById(`Row${r}`);
      row.getElementsByTagName("td")[i].innerHTML = queen;

      if (await solveQueen(r + 1, n)) {
        clearColor();
        return true;
      }
      await new Promise((done) => setTimeout(() => done(), 500));
      row.getElementsByTagName("td")[i].innerHTML = "-";
    }
  }
  return false;
}

async function nQueen() {
  if ((await solveQueen(0, n)) == false) clearColor();
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

  nQueen();
}
