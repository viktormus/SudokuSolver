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

//Declaring Some Variables
var areTheySame = [];


//Sum of all numbers in each nonet/row/column = 45

//initial sudoku assemblement (starting pos)
//each number slot is numbered: top left=first, bot right = last
//0 means there is no number assigned, ie. it has to be solved
//var sudoku = [7, 0, 2, 6, 0, 9, 0, 0, 1, 0, 6, 0, 1, 5, 0, 0, 0, 7, 0, 1, 0, 0, 8, 2, 3, 0, 0, 0, 0, 0, 0, 3, 0, 5, 0, 8, 5, 0, 0, 8, 0, 7, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 9, 0, 0, 9, 0, 7, 0, 0, 0, 0, 0, 4, 6, 0, 1, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 0, 0, 4];

var sudoku = [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 0, 0, 0, 7, 0, 0, 9, 0, 2, 0, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 4, 5, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 6, 8, 0, 0, 8, 5, 0, 0, 0, 1, 0, 0, 9, 0, 0, 0, 0, 4, 0, 0];


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
function stats() {
  var numbersToSolve = 0;
  var knownNumbers = 0;
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
//leastUnknowns();
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
//venn();
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
          }
        }
    }
    vennOptions.push(tempList);
    tempList = [];
    }
  }
}
vennAll();
console.log("Possible Solutions [Venn Diagram]");
console.log(vennOptions);


//Substitution of [100% Certain] Solutions (individual numbers) and removing used solutions from Venn Diagram list - aka clearance
function convertToNonet(number) {
  var one = Math.floor(number / 9);
  var two = number % 9;
  var result = convert(one, two);
  return result;
}
function convertToRow(number) {
  var result = Math.floor((number) / 9);
  return result;
}
function convertToColumn(number) {
  var result = number % 9;
  return result;
}

//There is a problem: if there are three potential spots for number 8 on the same row (at the same time, and 8 is an only option for that spot), the function will substitute all of them at the same time, which messes up the sudoku. This means that a previous number guess has been incorrect, as choosing eg. the first 8 will leave the other spots as 0, without further options available -> incomplete sudoku
//Need to check for this in the substitute() function, and cancel it if such situation is encountered. On one hand, its PITA (pain in the ass), but on the other hand, there's no need for further guessing, and we can weed out the incorrect guesses and go back immediately

function checkForMultiples() {
  for (i = 0; i < vennOptions.length; i++) {
    if (vennOptions[i].length == 1) {
      for (j = (i + 1); j < vennOptions.length; j++) {
        if (vennOptions[j].length == 1 && vennOptions[i][0] == vennOptions[j][0]) {
          console.log(i);
          console.log(j);
          console.log("Ok");
          var oneNonet = convertToNonet(i);
          var oneRow = convertToRow(i);
          var oneColumn = convertToColumn(i);
          var twoNonet = convertToNonet(j);
          var twoRow = convertToRow(j);
          var twoColumn = convertToColumn(j);
          console.log(oneNonet);
          console.log(twoNonet);
          console.log(oneRow);
          console.log(twoRow);
          console.log(oneColumn);
          console.log(twoColumn);
          if (oneNonet == twoNonet || oneRow == twoRow || oneColumn == twoColumn) {
            multipleNumber = vennOptions[i][0];
            console.log("No Solution Available: " + multipleNumber);
            return;
          }
        }
      }
    }
  }
}

var multipleNumber = 0;
var solvedNumbersOrder = [];
var guessedNumbersPosition = [];
function substitute() {
  multipleNumber = 0;
  checkForMultiples();
//  console.log(multipleNumber);
  if (multipleNumber != 0) {
    console.log("THIS SHOULD RETURN");
    printer();
    return;
  }
  var areThereSolutions = [];
  for (i = 0; i < vennOptions.length; i++) {  
    if (vennOptions[i].length == 1) {
      solvedNumbersOrder.push(i);
      var exit = vennOptions[i][0];
      sudoku.splice(i, 1, exit);
      areThereSolutions.push(true);
    }
  }
  if (areThereSolutions[0] != true) {
    checkTwos();
  }
  split();
  missing();
}
//substitute();
console.log("--- --- ---");
//check();


//What to do when there are no 100% correct solutions available?
//Just to let you know, future vigs, if you devine areTheySame immediately above this function, it doesn't work for some reason; the function executes prior to defining the variable...
function checkTwos() {
  for (i = 0; i < vennOptions.length; i++) {
    if (vennOptions[i].length == 2) {
      guessedNumbersPosition.push(i);
      solvedNumbersOrder.push(i);
      console.log(vennOptions[i]);
//      console.log(vennOptions);
      var secondNumber = vennOptions[i][1];
      areTheySame.push(secondNumber);
      var tryy = vennOptions[i][0];
      sudoku.splice(i, 1, tryy);
      break;
    }
  }
}

//Return substituted solutions to zero (clearance)
function returnToZero(pos) {
  for (j = pos; j < solvedNumbersOrder.length; j++) {
    sudoku.splice(solvedNumbersOrder[j], 1, 0);
  }
  for (k = 0; k < backwards; k++) {
    guessedNumbersPosition.pop();
    areTheySame.pop();
  }
  console.log(guessedNumbersPosition);
  console.log(areTheySame);
  console.log(...solvedNumbersOrder);
  var solidI = pos;
//  console.log("solidI: " + solidI);
  printer();
  var del = 81 - solidI;
  solvedNumbersOrder.splice(solidI, del);
  split();
  missing();
  vennAll();
}

function goBack() {
  console.log("goBack...");
  console.log("currentGuess " + currentGuess);
  console.log("vennOptions... " + vennOptions[guessedNumbersPosition[toBeReplaced]][1]);
        if (currentGuess == vennOptions[guessedNumbersPosition[toBeReplaced]][1]) {
        console.log("Both of the answer choices are exhausted and both of them are proved wrong. Taking another step back to try again...");
        toBeReplaced--;
        console.log("toBeReplaced: " + toBeReplaced);
        for (i = 0; i < 81; i++) {
          if (solvedNumbersOrder[i] == guessedNumbersPosition[toBeReplaced]) {
            returnToZero(i);
            guessedNumbersPosition.pop();
            areTheySame.pop();
            console.log("venn options for current pos: " + vennOptions[guessedNumbersPosition[toBeReplaced]]);
            console.log("toBeReplaced: " + toBeReplaced);
//            console.log(vennOptions);
            console.log(guessedNumbersPosition);
            console.log("second options: " + areTheySame);
            break;
          }
        }
        
      }
}

//Try another number out of two
var previousGuessedList = [];
var toBeReplaced = 0;
var currentGuess = 0;
var backwards = 0;
function tryAnother() {
 //   var back = 1;
 // if (sudoku[guessedNumbersPosition.length - 1] == ) {
 //   back = 2;
 //  guessedNumbersPosition.pop();
 // }
 // console.log(guessedNumbersPosition);
  console.log(areTheySame);
  
  
//  console.log("currentGuess: " + currentGuess);
//  guessedNumbersPosition.pop();
//  console.log("toBeReplaced: " + toBeReplaced);
//  console.log("guessedNumbersPosition[toBeReplaced]: " + guessedNumbersPosition[toBeReplaced]);
  backwards = 0;
  for (i = (areTheySame.length - 1); i > -1; i--) {
    if (sudoku[guessedNumbersPosition[i]] == areTheySame[i]) {
      backwards++;
      if (sudoku[guessedNumbersPosition[i - 1]] != areTheySame[i-1]) {
        break;
      }
    }
  }
  console.log(guessedNumbersPosition);
  console.log("Prev. G. List " + previousGuessedList);
  var lastItem = guessedNumbersPosition.length - 1;
  if (guessedNumbersPosition.length > previousGuessedList.length || (guessedNumbersPosition.length == previousGuessedList.length && sudoku[guessedNumbersPosition[lastItem]] != areTheySame[lastItem])) {
    backwards = 0;
  }
  console.log("backwards: " + backwards);
  toBeReplaced = guessedNumbersPosition.length - (1 + backwards);
  currentGuess = sudoku[guessedNumbersPosition[toBeReplaced]];
  console.log(toBeReplaced);
  console.log(currentGuess);
  console.log(guessedNumbersPosition);
  console.log(guessedNumbersPosition[toBeReplaced]);
  for (i = 0; i < 81; i++) {
    if (solvedNumbersOrder[i] == guessedNumbersPosition[toBeReplaced]) {

      returnToZero(i);
      previousGuessedList = guessedNumbersPosition;
      
//      console.log("guessedNumbersPosition[toBeReplaced]: " + guessedNumbersPosition[toBeReplaced]);

      /*
      var backSteps = 0;
      var dontMess = toBeReplaced;

      for (k = (guessedNumbersPosition.length - 1); k > -1; k--) {
        if (sudoku[guessedNumbersPosition[k]] == vennOptions[guessedNumbersPosition[k]][1]) {
          backSteps++;
          console.log("dontMess: " + dontMess);
          console.log("vennOptions.guessedNumbersPosition[dontMess]: " + vennOptions[guessedNumbersPosition[dontMess]][1]);
 //         console.log("currentGuess: " + currentGuess);
          dontMess--;
          
        }
      }
      console.log("backSteps " + backSteps);
      */



/*
      var deadLock = 0;
      var go = true;
      while (go) {
        deadLock++;
        goBack();
        console.log("MOROMORO!");
        console.log(sudoku[guessedNumbersPosition[toBeReplaced - 1]]);

        var previousOne = sudoku[guessedNumbersPosition[toBeReplaced - 1]];
        if (previousOne != areTheySame[guessedNumbersPosition.length - 2]) {
          console.log("goBack loop stops here");
          go = false;
        } else {
        console.log("goBack loop continues");
        }
        if (deadLock == 6) {
          go = false;
        }
      }
     */

      var secondTry = vennOptions[guessedNumbersPosition[toBeReplaced]][1];
      console.log("secondTry: " + secondTry);
      sudoku.splice(guessedNumbersPosition[toBeReplaced], 1, secondTry);
      console.log("...")
      printer();
      solvedNumbersOrder.push(guessedNumbersPosition[toBeReplaced]);
//      console.log(guessedNumbersPosition);
      console.log(...solvedNumbersOrder);
      split();
      missing();
      vennAll();
//      console.log(vennOptions);
//      console.log("If I just print i: " + i);
//      console.log("Printing solidI: " + solidI);
//      console.log(vennOptions);
//      console.log(guessedNumbersPosition[toBeReplaced]);
      break;
    }
  }
  
//  printer();
  stats();
}

//Recalls tryAnother() when necessary
function tryAnotherLoop() {

}

//One Solver Loop for Testing
function check() {
  vennAll();
  console.log(vennOptions);
}


//Solver Loop
var run = true;
var safetyStop = 0;
function solverLoop() {
  console.log("Initiating Solver Algorithm...");
  while (run) {
    var zerosStart = 0;
    var zerosEnd = 0;

    for (i = 0; i < sudoku.length; i++) {
      if (sudoku[i] == 0) {
        zerosStart++;
        
      } 
    }
    console.log("zerosStart: " + zerosStart);

    safetyStop++;
    vennAll();
    substitute();
//    printer();
//    console.log("...");

    if (multipleNumber != 0) {
      console.log("doubleNumber -> no solution. Running tryAnother()");
      tryAnother();
    }

    for (i = 0; i < sudoku.length; i++) {
      if (sudoku[i] == 0) {
        zerosEnd++;
      } 
    }
    console.log("zerosEnd: " + zerosEnd);

//Tähän koodi että jos on saman verran nollia kaks kierrosta putkeen, eli ratkasu ei etene, nii menee tuohon tryAnother funktioon
    if (zerosStart == zerosEnd) {
      if (zerosStart == 0) {
        printer();
        console.log("Congratulations! Your sudoku has been solved.");
        console.log("Time taken: ???");
        run = false;
      } else {
      printer();
//      console.log(...solvedNumbersOrder);
      console.log("The looper did " + safetyStop + " iterations before realizing that there is no solution with current numbers options.");
      tryAnother();
 //     safetyStop = 0;
 //    run = false;
      }
    }

    if (safetyStop == 10000) {
      console.log("safetyStop limit (10000 iterations) reached!");
      printer();
      console.log("Unable to solve... damn shame.");
      run = false;
    }
  }
}

solverLoop();
console.log("Misc Stats:");
console.log("'Challenged' by Eemeli Kyröläinen");
console.log("Time taken to code this: 17-21h [1-3h + 6h + 3-5h + 7h]");

/*
console.log(guessedNumbersPosition);
console.log("...");
console.log(...solvedNumbersOrder);
printer();
function testRun(rounds) {
  for (a = 0; a < rounds; a++) {
    vennAll();
    console.log("Round " + (a + 1));
//    console.log(vennOptions);
    substitute();
    printer();
  }
}
*/

/*
testRun(22);
console.log(guessedNumbersPosition);
console.log(...solvedNumbersOrder);
tryAnother();
testRun(5);
console.log(guessedNumbersPosition);
console.log("...");
console.log(...solvedNumbersOrder);
tryAnother();
testRun(8);
tryAnother();
testRun(5);
tryAnother();
testRun(14);
tryAnother();
*/