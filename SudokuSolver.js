function intro() {
  console.log("Sudoku Solver Algorithm");
  console.log("Normal Sudokus:");
  console.log("- Rectangular shape");
  console.log("- 3x3 boxes (=nonets)");
  console.log("- 3x3 slots in each box");
  console.log("Solving Criteria:");
  console.log("- Numbers 1-9 exactly once in each nonet");
  console.log("- Numbers 1-9 exactly once in each horizontal row");
  console.log("- Numbers 1-9 exactly once in each vertical column");
}
intro();

//Sum of all numbers in each nonet/row/column = 45

//initial sudoku assemblement (starting pos)
//each number slot is numbered: top left=first, bot right = last
//0 means there is no number assigned, ie. it has to be solved
var sudoku = [7, 0, 2, 6, 0, 9, 0, 0, 1, 0, 6, 0, 1, 5, 0, 0, 0, 7, 0, 1, 0, 0, 8, 2, 3, 0, 0, 0, 0, 0, 0, 3, 0, 5, 0, 8, 5, 0, 0, 8, 0, 7, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 9, 0, 0, 9, 0, 7, 0, 0, 0, 0, 0, 4, 6, 0, 1, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 0, 0, 4];
//Unable to solve the following sudoku:
//var sudoku = [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 0, 0, 0, 7, 0, 0, 9, 0, 2, 0, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 4, 5, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 6, 8, 0, 0, 8, 5, 0, 0, 0, 1, 0, 0, 9, 0, 0, 0, 0, 4, 0, 0];

//If sudoku.length = 81, it's correct
//console.log(sudoku.length);

console.log("Initial Situation");
//Printer
function printer() {
  for (j = 1; j < 10; j++) {
    var tempLimit = 9 * j;
    var tempList = [];
    for (i = tempLimit - 9; i < tempLimit; i++) {
      tempList.push(sudoku[i]);
      if (i != 0 && (i + 1) % 3 == 0) {
        tempList.push("|");
      }
    }
    tempList.pop();
    console.log(tempList.join("  "));
    if (tempLimit == 27 || tempLimit == 54) {
      console.log("- - - - - - - - - - - - - - - -");
    }
//    console.log(tempLimit);
  }
}
printer();

//Statistics
var numbersToSolve = 0;
var knownNumbers = 0;
function stats() {
  for (i = 0; i < sudoku.length; i++) {
    if (sudoku[i] == 0) {
      numbersToSolve++;
    } else {
      knownNumbers++;
    }
  }
  console.log("-> Known numbers: " + knownNumbers);
  console.log("-> Numbers to solve: " + numbersToSolve);
}
stats();

//Division of sudoku into manageable parts. Creating an object
var sudokuObj = {
  nonets: [],
  rows: [],
  columns: [],
}

function split() {
  sudokuObj.nonets = [];
  sudokuObj.rows = [];
  sudokuObj.columns = [];
  for (j = 0; j < 61; j += 3) {
    var nonet = [];
    for (i = j; i < 81; i++) {
      nonet.push(sudoku[i]);
      if (nonet.length % 3 == 0) {
        i += 6;
      }
      if (nonet.length == 9) {
        break;
      }
    }
    if (j == 6 || j == 33 || j == 60) {
      j += 18;
    }
    sudokuObj.nonets.push(nonet);
  }
  for (j = 1; j < 10; j++) {
    var tempLimit = 9 * j;
    var row = [];
    for (i = tempLimit - 9; i < tempLimit; i++) {
      row.push(sudoku[i]);
     }
    sudokuObj.rows.push(row);    
  }
  for (j = 0; j < 9; j++) {
    var column = [];
    for (i = j; i < 81; i += 9) {
      column.push(sudoku[i]);
    }
    sudokuObj.columns.push(column);
  }
}

split();
//console.log(sudokuObj);


//Finding Missing Numbers (can be shortened using a method)
var options = [9, 8, 7, 6, 5, 4, 3, 2, 1];
var missingNonets = [];
var missingRows = [];
var missingColumns = [];
function missing() {
  missingNonets = [];
  missingRows = [];
  missingColumns = [];
  var tempList = [];
  var isThere = [];
  for (i = 0; i < 9; i++) {
    for (j = 1; j < 10; j++) {
      for (k = 0; k < 9; k++) {
        if (sudokuObj.nonets[i][k] == j) {
          isThere.push(true);
          }
        }
      if (isThere != null && isThere[0] != true) {
        tempList.push(j);
      }
      isThere = [];
    }
    missingNonets.push(tempList);
    tempList = [];
  }
    for (i = 0; i < 9; i++) {
    for (j = 1; j < 10; j++) {
      for (k = 0; k < 9; k++) {
        if (sudokuObj.rows[i][k] == j) {
          isThere.push(true);
          }
        }
      if (isThere != null && isThere[0] != true) {
        tempList.push(j);
      }
      isThere = [];
    }
    missingRows.push(tempList);
    tempList = [];
  }
    for (i = 0; i < 9; i++) {
    for (j = 1; j < 10; j++) {
      for (k = 0; k < 9; k++) {
        if (sudokuObj.columns[i][k] == j) {
          isThere.push(true);
          }
        }
      if (isThere != null && isThere[0] != true) {
        tempList.push(j);
      }
      isThere = [];
    }
    missingColumns.push(tempList);
    tempList = [];
  }
}
missing();
/*
console.log("Missing numbers in nonets");
console.log(missingNonets);
console.log("Missing numbers in rows");
console.log(missingRows);
console.log("Missing numbers in columns");
console.log(missingColumns);
*/

//Finding least numbers to solve in based on nonets, then rows&columns
var leastN = 0;
var leastR = 0;
var leastC = 0;
function leastUnknowns() {
  for (i = 1; i < 9; i++) {
    if (missingNonets[leastN].length > missingNonets[i].length) {
      leastN = i;
    }
  }
  for (i = 1; i < 9; i++) {
    if (missingRows[leastR].length > missingRows[i].length) {
      leastR = i;
    }
  }
  for (i = 1; i < 9; i++) {
    if (missingColumns[leastC].length > missingColumns[i].length) {
      leastC = i;
    }
  }
}
leastUnknowns();
//console.log(leastN);
//console.log(leastR);
//console.log(leastC);
//console.log("--- --- ---");


//Venn Diagram potentiaalisista lukuista helpoimpaan kohtaan
var potentialEz = [];
function venn() {
  var isThere = false;
  for (i = 0; i < missingRows[leastR].length; i++) {
//    if (missingRows[leastR][i] != 0) {
      for (j = 0; j < missingColumns[leastC].length; j++) {
        for (k = 0; k < missingNonets[leastN].length; k++) {
          if (missingRows[leastR][i] == missingColumns[leastC][j] && missingRows[leastR][i] == missingNonets[leastN][k]) {
            potentialEz.push(missingRows[leastR][i]);
            break;
//          }
        }
      }
    }
  }
}
venn();
//console.log(potentialEz);

//Venn Diagram Generalization for all number slots
var vennOptions = [];
function convert(i, j) {
  switch (true) {
    case (i < 3 && j < 3):
      return 0;
      break;
    case (i < 3 && j < 6):
      return 1;
      break;
    case (i < 3 && j < 9):
      return 2;                
      break;
    case (i < 6 && j < 3):
      return 3;
      break;
    case (i < 6 && j < 6):
      return 4;
      break;
    case (i < 6 && j < 9):           
      return 5;
      break;
    case (i < 9 && j < 3):
      return 6;
      break;
    case (i < 9 && j < 6):
      return 7;
      break;
    case (i < 9 && j < 9):
      return 8;
      break;
  }
}

function vennAll() {
  vennOptions = [];
  var tempList = [];
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (sudokuObj.rows[i][j] == 0) {
        for (l = 0; l < missingRows[i].length; l++) {
          for (k = 0; k < missingColumns[j].length; k++) {
            for (m = 0; m < missingNonets[convert(i,j)].length; m++) {
              if (missingRows[i][l] == missingColumns[j][k] && missingRows[i][l] == missingNonets[convert(i,j)][m]) {
                tempList.push(missingRows[i][l]);
              }
            }
//           console.log(missingRows[i][l]);
//           console.log(missingColumns[j][k]);
//           console.log("...")

          }
        }
    }
    vennOptions.push(tempList);
    tempList = [];
    }
  }
}
vennAll();
//console.log(vennOptions);


//Substitution of [100% Certain] Solutions (individual numbers) and removing used solutions from Venn Diagram list - aka clearance
function convertToNonet(number) {
  var one = Math.floor(number / 9);
  var two = number % 9;
  var result = convert(one, two);
  return result;
}
function convertToRow(number) {
  var result = Math.floor((number) / 9)
  return result;
}
function convertToColumn(number) {
  var result = number % 9;
  return result;
}

function substitute() {
  for (i = 0; i < vennOptions.length; i++) {
    
    if (vennOptions[i].length == 1) {
      var exit = vennOptions[i][0];
      sudoku.splice(i, 1, exit);
    }
  }
  split();
  missing();
}
substitute();
console.log("--- --- ---");


//Solver Loop
var run = true;
var holder = 0;
var safetyStop = 0;
function solverLoop() {
  console.log("Initiating Solver Algorithm...");
  while (run) {
    safetyStop++;
    vennAll();
    substitute();
//    printer();
//    console.log("...");
    var zeroCheck = 0;
    holder = 0;
    for (i = 0; i < sudoku.length; i++) {
      if (sudoku[i] == 0) {
        holder++;
      } 
    }
    if (holder == 0) {
     run = false;
    }
    if (safetyStop == 50) {
      run = false;
    }
  }
  printer();
  if (safetyStop == 50) {
    console.log("Unable to solve... damn shame.");
  } else {
    console.log("Congratulations! Your sudoku has been solved.");
    console.log("Time taken: ???");
  }
}

solverLoop();