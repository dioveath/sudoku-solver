window.onload = () => {

  function isSudokuValid(board){
    var sum = 45;
    for(var i = 0; i < 9; i++){
      var sumy = 0;
      var sumx = 0;
      var sumd = 0;
      for(var j = 0; j < 9; j++) {
        sumy += board[j][i];
        sumx += board[i][j];
        sumd += board[Math.floor(j/3)][j%3];
      }

      if(sumx != sum || sumx != sum || sumd != sum) return false;
    }

    return true;
  }

  function sudoku(puzzle) {
    var iteration = 30;
    for(var iter = 0; iter < iteration; iter++){
      printPuzzle(puzzle);
      for(var i = 0; i < 9; i++){
	for(var j = 0; j < 9; j++){
          if(puzzle[i][j] == 0 || puzzle[i][j] instanceof Array) {
            var pValues = getPossibleValues(puzzle, j, i);
            puzzle[i][j] = pValues.length == 1 ? pValues[0] : pValues;
          }
	}
      }      
    }
    return puzzle;
  }

  function generateSudoku(){
    let sudoku = [];
    for(let i = 0; i < 9; i++) {
      sudoku[i] = new Array();
      for(let j = 0; j < 9; j++)
        sudoku[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];      
    }

    let iter = 20;
    for(let k = 0; k < iter; k++){
      for(let i = 0; i < 9; i+=3){
        for(let j = 0; j < 9; j+=3){
          let x = j + Math.floor(Math.random() * 3);
          let y = i + Math.floor(Math.random() * 3);
          console.log(x, y);
          let pValues = getPossibleValues(sudoku, x, y);
          console.log("pValues: " + pValues);
          if(!(pValues instanceof Array)) continue;
          if(pValues.length == 1) {
            sudoku[y][x] = pValues[0];
            continue;
          }
          let shuffleArray =suffle(pValues);
          sudoku[y][x] = pValues[0];
        }
      }
    }

    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(sudoku[i][j] instanceof Array) {
          sudoku[i][j] = 0;
        }
      }
    }

    return sudoku;
  }  

  function suffle(array){
    for(var i = 0; i < array.length; i++){
      var rand = i + Math.floor(Math.random() * (array.length - i));
      var temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
    }
    return array;
  }

  function getPossibleValues(puzzle, x, y){
    var possibleValues = 0;
    console.log("possibleValues: " + puzzle[y][x]);
    possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // if(puzzle[y][x] == 0)
    // else if(puzzle[y][x] instanceof Array)
    //   possibleValues = puzzle[y][x];

    for(var j = 0;j < 9; j++){
      
      // horizontal check
      if(possibleValues.includes(puzzle[y][j])){
        possibleValues.splice(possibleValues.indexOf(puzzle[y][j]), 1);
      }

      // vertical check
      if(possibleValues.includes(puzzle[j][x])){
        possibleValues.splice(possibleValues.indexOf(puzzle[j][x]), 1);
      }

      // 3x3 box check
      var offx = Math.floor(x/3);
      var offy = Math.floor(y/3);
      var value = puzzle[offy * 3 + Math.floor(j/3)][offx * 3 + j%3];
      if(possibleValues.includes(value)){
        possibleValues.splice(possibleValues.indexOf(value), 1);
      }            
    }

    return possibleValues.length == 0 ? [0] : possibleValues;
  }

  function isSodukoValid(board){
    var sum = 45;
    for(var i = 0; i < 9; i++){
      var sumy = 0;
      var sumx = 0;
      var sumd = 0;
      for(var j = 0; j < 9; j++) {
        sumy += board[j][i];
        sumx += board[i][j];
        sumd += board[Math.floor(j/3)][j%3];
      }

      if(sumx != sum || sumx != sum || sumd != sum) return false;
    }

    return true;
  }

  function sudoku(puzzle) {
    var iteration = 20;
    for(var iter = 0; iter < iteration; iter++){
      for(var i = 0; i < 9; i++){
	for(var j = 0; j < 9; j++){
          if(puzzle[i][j] == 0 || puzzle[i][j] instanceof Array) {
            var pValues = getPossibleValues(puzzle, j, i);
            puzzle[i][j] = pValues.length == 1 ? pValues[0] : pValues;
          }
	}
      }    
    }
    return puzzle;
  }

  function backtrack(puzzle){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        
      } 
    }
  }

  function printPuzzle(puzzle){
    var stringOutput = "";
    for(var i = 0; i < 9; i ++){
      for(var j = 0; j < 9; j++){
        stringOutput += JSON.stringify(puzzle[i][j]) + "--";
      }
      stringOutput += "\n";
    }
    var output = document.getElementById("output");
    output.innerHTML += stringOutput;
    output.innerHTML += "========================================\n" ;
  }  

  printPuzzle(sudoku(generateSudoku()));
  // printPuzzle(isSudokuValid(sudoku(generateSudoku())));
  // console.log(suffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

};  
