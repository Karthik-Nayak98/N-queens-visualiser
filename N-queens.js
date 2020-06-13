let table = document.getElementById("myTable");
const textbox = document.getElementById("numberbox");
const board = document.getElementById("n-queen__board");

let rows, cols;

getValue = () => {
  rows = textbox.value;
  cols = textbox.value;

  board.removeChild(board.firstChild); // Removing the child from the DOM

  //Adding the same child to the DOM
  if (board.childElementCount == 0) {
    table = document.createElement("TABLE");
    table.setAttribute("id", "myTable");
    board.appendChild(table);
  }

  for (let i = 0; i < rows; ++i) {
    let row = table.insertRow(i); // inserting ith row
    for (let j = 0; j < cols; ++j) {
      let col = row.insertCell(j); // inserting jth column
      col.innerHTML = "-";
    }
  }
};
