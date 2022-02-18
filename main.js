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
    width: 48,
    height: 48,
    value: 0,
    isClicked: false,
    isModifiable: false,
  };

  var button = {
    x: 0,
    y: 0,
    width: 128,
    height: 48,
    text: "Button"
  };

  var textField = {
    x: 0,
    y: 0,
    width: 128,
    height: 48,
    label: "TextField Label",
    text: "TextField Text",
    isActive: false,
  };

  var sudokuPuzzle = generateSudoku(10);
  var sudokuBoard = buildSodukoBoard(sudokuPuzzle);

  // inputs
  var currentActive = undefined;
  var generateButton = Object.create(button);
  var diffLevelTextField = Object.create(textField);

  init();
  update();

  function init(){
    generateButton.x = width/2 - generateButton.width/2;
    generateButton.y = height - 100;
    generateButton.text = "Generate";

    diffLevelTextField.label = "Difficulty Level";
    diffLevelTextField.text = "10";
    diffLevelTextField.x = width/2 - diffLevelTextField.width/2;
    diffLevelTextField.y = height - 200;
  }

  function update(){

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    renderSodukoBoard(sudokuBoard);
    renderUIs();
    requestAnimationFrame(update);
  }

  function checkInput(click){
    for(var i = 0; i < 9; i++){ 
      for(var j = 0; j < 9; j++){
        var b = sudokuBoard[i][j];
        if(!b.isModifiable) continue;
        if(pointRectCollision(click, b)) {
          // b.isClicked = !b.isClicked;
          if(!b.isClicked) {
            currentActive = b;
            b.isClicked = true;
          } else {
            currentActive = null;
            b.isClicked = false;
          }
          return;
        }
      }
    }

    if(currentActive != null) {
      currentActive.isClicked = false;
      currentActive = null;
    }
    
  }

  function checkUIs(click){
    if(pointRectCollision(click, generateButton)) {
      sudokuPuzzle = generateSudoku(diffLevelTextField.text);
      sudokuBoard = buildSodukoBoard(sudokuPuzzle);
    }

    if(pointRectCollision(click, diffLevelTextField)) {
      diffLevelTextField.isActive = true;
      console.log("a");
    } else {
      diffLevelTextField.isActive = false;      
    }


  }
  

  function buildSodukoBoard(sudoku){
    var sodukoBoard = [];
    for(var i = 0; i < 9; i++){
      sodukoBoard[i] = new Array();
      for(var j = 0; j < 9; j++){
        var b = Object.create(block);
        var offx = width/2;
        var offy = b.height/2 * 9 + 30;

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
    for(var i = 0; i < 9; i++) { 
      for(var j = 0; j < 9; j++){
        var b = sudokuBoard[i][j];

        context.strokeStyle = "white";
        context.lineWidth = 2;        
        context.strokeRect(b.x, b.y, b.width, b.height);
        
        context.fillStyle = !b.isModifiable ? "#115588" : b.value ? isValidMove(sudokuPuzzle, j, i, b.value) ? "#118855" : "brown" : "black";
        context.fillRect(b.x, b.y, b.width, b.height); 

        if(b == currentActive) {
          context.fillStyle = "lightblue";
          context.fillRect(b.x, b.y, b.width, b.height); 
        }

        context.fillStyle = "white";
        context.font = "20px Inconsolata";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(b.value ? b.value : "", b.x + b.width/2, b.y + b.height/2);        
      }


    }

    for(let i = 0; i < 9; i++) {
      context.strokeStyle = "white";
      context.lineWidth = 4;
      context.strokeRect(sudokuBoard[0][Math.floor(i%3) * 3].x, sudokuBoard[Math.floor(i/3) * 3][0].y, sudokuBoard[i][0].width * 3, sudokuBoard[i][0].height * 3);
    }

  }

  function renderUIs(){
    context.fillStyle = "#881144";
    context.fillRect(generateButton.x, generateButton.y, generateButton.width, generateButton.height);
    context.fillStyle = "white";
    context.font = "20px Inconsolata";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(generateButton.text, generateButton.x + generateButton.width/2, generateButton.y + generateButton.height/2);

    context.fillStyle = "#448811";
    context.fillRect(diffLevelTextField.x, diffLevelTextField.y, diffLevelTextField.width, diffLevelTextField.height);
    context.fillStyle = "white";
    context.font = "20px Inconsolata";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(diffLevelTextField.label, diffLevelTextField.x + diffLevelTextField.width/2, diffLevelTextField.y - 20);        
    context.fillText(diffLevelTextField.text, diffLevelTextField.x + diffLevelTextField.width/2, diffLevelTextField.y + diffLevelTextField.height/2);
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

    checkUIs({
      x: e.offsetX,
      y: e.offsetY
    });
  });

  document.addEventListener('mousemove', (e) => {
    e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    e.preventDefault();

    if(currentActive != null){
      let newValue = 0;
      if(e.keyCode >= 48 && e.keyCode <= 57) {
        newValue = e.keyCode - 48;
      }
      currentActive.value = newValue;
      sudokuPuzzle[currentActive.i][currentActive.j] = newValue;

      currentActive.isClicked = false;
      currentActive = null;
      if(isSudokuValid(sudokuPuzzle)){
        console.log("solved!!!!");
      }
    }

    if(diffLevelTextField.isActive){
      if(e.keyCode >= 48 && e.keyCode <= 57) {
        diffLevelTextField.text += "" + e.keyCode - 48;
        if(!(parseInt(diffLevelTextField.text) >= 0 && parseInt(diffLevelTextField.text) <= 65))
          diffLevelTextField.text = diffLevelTextField.text.slice(0, -1);          
      }
      if(e.keyCode == 8) {
        diffLevelTextField.text = diffLevelTextField.text.slice(0, -1);
      }
    }


  });



};
