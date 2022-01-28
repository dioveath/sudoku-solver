window.onload = function(){

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
    var iteration = 10;
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

  function getPossibleValues(puzzle, x, y){
    var possibleValues = 0;
    if(puzzle[y][x] == 0)
      possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    else if(puzzle[y][x] instanceof Array)
      possibleValues = puzzle[y][x];

    for(var j = 0;  j < 9; j++){
      
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

    return possibleValues;
  }

  var solvableSoduko = [
    [5, 3, 0,  0, 7, 0,  0, 0, 0], 
    [6, 0, 0,  1, 9, 5,  0, 0, 0], 
    [0, 9, 8,  0, 0, 0,  0, 6, 0], 

    [8, 0, 0,  0, 6, 0,  0, 0, 3], 
    [4, 0, 0,  8, 0, 3,  0, 0, 1], 
    [7, 0, 0,  0, 2, 0,  0, 0, 6], 

    [0, 6, 0,  0, 0, 0,  2, 8, 0], 
    [0, 0, 0,  4, 1, 9,  0, 0, 5], 
    [0, 0, 0,  0, 8, 0,  0, 7, 9]
  ];

  var easySolvableSoduko = [
    [7, 0, 0,  4, 2, 0,  9, 0, 1],
    [2, 0, 0,  3, 1, 9,  0, 5, 7],
    [0, 9, 3,  7, 5, 6,  8, 0, 4],

    [9, 5, 8,  2, 0, 0,  7, 0, 0],
    [4, 0, 0,  0, 0, 0,  0, 0, 0],
    [0, 0, 0,  0, 0, 0,  2, 0, 8],

    [5, 4, 6,  1, 0, 7,  0, 9, 0],
    [3, 7, 0,  0, 9, 0,  0, 8, 5],
    [8, 0, 0,  5, 4, 0,  0, 0, 0]
  ];
 

  var mediumSudoku = [
    [5, 0, 7,  2, 0, 0,  0, 9, 0],
    [0, 0, 6,  0, 3, 0,  7, 0, 1],
    [4, 0, 0,  0, 0, 0,  0, 6, 0],

    [1, 0, 0,  4, 9, 0,  0, 0, 7],
    [0, 0, 0,  5, 0, 8,  0, 0, 0],
    [8, 0, 0,  0, 2, 7,  0, 0, 5],

    [0, 7, 0,  0, 0, 0,  0, 0, 9],
    [2, 0, 9,  0, 8, 0,  6, 0, 0],
    [0, 4, 0,  0, 0, 9,  3, 0, 8]
  ];


  var validSoduko = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];


  var possibleSoudko = sudoku(easySolvableSoduko);

  // var stringOutput = "";
  // for(var i = 0; i < 9; i ++){
  //   for(var j = 0; j < 9; j++){
  //     stringOutput += JSON.stringify(possibleSoudko[i][j]) + "--";
  //   }
  //   stringOutput += "\n";
  // }

  // printPuzzle(possibleSoudko);

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

};
