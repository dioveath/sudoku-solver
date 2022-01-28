window.onload = () => {


  function getSolvableSudoku(){
    var sudoku = [];
    for(var i = 0; i < 9; i++)
      sudoku.push(new Array(9));

    var startPoint = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    startPoint = suffle(startPoint);

    for(var y = 0; y < 9; y++){
      for(var x = 0; x < 9; x++){
        
        // createRandom 3x3
        

      }
    }

    return sudoku;
  }

  function suffle(array){
    for(var i = 0; i < array.length; i++){
      var rand = Math.floor(Math.random() * array.length);
      var temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
    }
    return array;
  }
  

  function getPossibleValues(puzzle, x, y){
    var possibleValues = 0;
    if(puzzle[y][x] == 0)
      possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    else if(puzzle[y][x] instanceof Array)
      possibleValues = puzzle[y][x];

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

    return possibleValues;
  }

  console.log(getSolvableSudoku());
  // console.log(suffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

};  
