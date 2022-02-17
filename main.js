window.onload = () => {
  
  const canvas = document.getElementById("canvas"),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  var block = {
    x: 0,
    y: 0,
    i: 0,
    j: 0,
    width: 64,
    height: 64,
    value: 0,
    isClicked: false,
    isModifiable: false,
  };

  var sudokuPuzzle = generateSudoku(2);
  var sudokuBoard = buildSodukoBoard(sudokuPuzzle);

  console.log(sudokuPuzzle);
  console.log(sudokuBoard);

  // inputs
  var currentActive = undefined;

  update();

  function update(){

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    renderSodukoBoard(sudokuBoard);
    requestAnimationFrame(update);
  }

  function checkInput(click){
    for(var i = 0; i < 9; i++){ 
      for(var j = 0; j < 9; j++){
        var b = sudokuBoard[i][j];
        if(!b.isModifiable) continue;
        if(pointRectCollision(click, b)) {
          b.isClicked = !b.isClicked;
          if(b.isClicked)
            currentActive = b;
          else
            currentActive = null;
          return;
        }
      }
    }
    currentActive = null;
  }

  function buildSodukoBoard(sudoku){
    var sodukoBoard = [];
    for(var i = 0; i < 9; i++){
      sodukoBoard[i] = new Array();
      for(var j = 0; j < 9; j++){
        var b = Object.create(block);
        var offx = width/2;
        var offy = height/2;

        b.value = sudoku[i][j] === undefined ? 0 : sudoku[i][j];
        b.isModifiable = sudoku[i][j] == 0;
        b.x = offx + (j-4) * b.width - b.width/2;
        b.y = offy + (i-4) * b.height - b.height/2;
        b.i = i;
        b.j = j;
        sodukoBoard[i].push(b);
      }
    }

    return sodukoBoard;
  }

  function renderSodukoBoard(sudokuBoard){
    for(var i = 0; i < 9; i++)
      for(var j = 0; j < 9; j++){
        var b = sudokuBoard[i][j];

        context.strokeStyle = "white";
        context.lineWidth = 2;        
        context.strokeRect(b.x, b.y, b.width, b.height);
          
        context.fillStyle = !b.isModifiable ? "gray" : b.value ? isValidMove(sudokuPuzzle, j, i, b.value) ? "lightblue" : "yellow" : "black";
        context.fillRect(b.x, b.y, b.width, b.height); 

        if(b == currentActive) {
          context.fillStyle = "red";
          context.fillRect(b.x, b.y, b.width, b.height); 
        }

        context.fillStyle = "green";
        context.font = "20px Georgia";
        context.textAlign = "center";
        context.fillText(b.value ? b.value : "", b.x + b.width/2, b.y + b.height/2);        
      }
  }


  // function createRandomSoduko(){
  //   return s;
  // }

  function isSodukoValid(soduko){
    var sum = 45;
    for(var i = 0; i < 9; i++){
      var sumy = 0;
      var sumx = 0;
      var sumd = 0;
      for(var j = 0; j < 9; j++) {
        sumy += soduko[j][i];
        sumx += soduko[i][j];
        
        sumd += soduko[Math.floor(j/3)][j%3];
      }

      console.log(sumx,sumy,sumd);
      if(sumx == sum && sumx == sum && sumd == sum) return true;
    }

    return false;
  } 


  function pointRectCollision(point, rect){
    return point.x >= rect.x && point.x <= rect.x + rect.width
      && point.y >= rect.y && point.y <= rect.y + rect.height;
  }


  document.addEventListener('click', (e) => {
    e.preventDefault();
    checkInput({
      x: e.offsetX,
      y: e.offsetY
    });
  });

  document.addEventListener('mousemove', (e) => {
    e.preventDefault();
  });

  document.addEventListener("keypress", (e) => {
    if(currentActive != null){
      let newValue = 0;
      if(e.keyCode >= 48 && e.keyCode <= 57) {
        newValue = e.keyCode - 48;
      }
      currentActive.value = newValue;
      sudokuPuzzle[currentActive.i][currentActive.j] = newValue;
      console.log(sudokuPuzzle);
      currentActive = null;
      if(isSudokuValid(sudokuPuzzle)){
        console.log("solved!!!!");
      }
    }

  });



};
