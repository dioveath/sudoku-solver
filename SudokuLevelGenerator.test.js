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

  function isValidMove(puzzle, x, y, number){
    if(puzzle[y][x] != 0) return true;

    for(let i = 0; i < 9; i++){
      if(puzzle[y][i] != 0 || puzzle[y][i] !== undefined)
        if(puzzle[y][i] == number) {
          return false;
        }

      if(puzzle[i][x] != 0 || puzzle[i][x] !== undefined)
        if(puzzle[i][x] == number) {
          return false;
        }

      let dx = Math.floor(x / 3) * 3 + (i % 3);
      let dy = Math.floor(y / 3) * 3 + Math.floor(i / 3);

      if(puzzle[dy][dx] != 0 || puzzle[dy][dx] !== undefined)
        if(puzzle[dy][dx] == number) return false;
    }

    return true;
  }


  // procedure backtrack(c) is
  //     if reject(P, c) then return
  //     if accept(P, c) then output(P, c)
  //     s ← first(P, c)
  //     while s ≠ NULL do
  //         backtrack(s)
  //         s ← next(P, s)  

  function backtrack(puzzle){
    if(isSudokuValid(puzzle)) return puzzle;
    let solvedPuzzle = puzzle.map(arr => arr.slice());
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(solvedPuzzle[i][j] != 0) continue;
        let solvable = false;
        for(let k = 1; k <= 9; k++){
          if(isValidMove(solvedPuzzle, j, i, k)) {
            let newPuzzle = solvedPuzzle.map(arr => arr.slice());
            newPuzzle[i][j] = k;
            let backTracked = backtrack(newPuzzle);
            if(backTracked == false) continue;
            else return backTracked;
            solvable = true;
          }
        }

        if(!solvable) return false;
      } 
    }

    return solvedPuzzle;
  }

  var printCounter = 0;
  function printPuzzle(puzzle){
    var stringOutput = "<b>" + ++printCounter + ". </b> <br> <br/>";
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

   let sudoku1 = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [0, 0, 0, 0, 0, 0, 0, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 0]
   ];

  let mediumSudoku = [
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

  // printPuzzle(sudoku(generateSudoku()));
  // printPuzzle(isSudokuValid(sudoku(generateSudoku())));
  // console.log(suffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));
// 5--3--4--6--7--8--9--1--2--
// 6--7--2--1--9--5--3--4--8--
// 1--9--8--3--4--2--5--6--7--
// 8--5--9--7--6--1--4--2--3--
// 4--2--6--8--5--3--7--9--1--
// 7--1--3--9--2--4--8--5--6--
// 9--6--1--5--3--7--2--8--4--
// 2--8--7--4--1--9--6--3--5--
// 3--4--5--2--8--6--1--7--9--


  printPuzzle(backtrack(sudoku1));

};  
