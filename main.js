

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
    width: 64,
    height: 64,
    value: 0,
    isClicked: false,
  };

  var currentActive = undefined;
  

  var soduko = buildSodukoBoard();


  update();

  function update(){

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    renderSodukoBoard();
    requestAnimationFrame(update);
  }

  function checkInput(click){
    for(var i = 0; i < 9; i++){ 
      for(var j = 0; j < 9; j++){
        var b = soduko[i][j];
        if(pointRectCollision(click, b)) {
          b.isClicked = !b.isClicked;
          if(b.isClicked)
            currentActive = b;
        } else {
          b.isClicked = false;
        }

      }
    }
  }

  function buildSodukoBoard(){
    var sodukoBoard = [];

    // var soduko = createRandomSoduko();

    for(var i = 0; i < 9; i++){
      sodukoBoard[i] = new Array();
      for(var j = 0; j < 9; j++){
        var b = Object.create(block);

        var offx = width/2;
        var offy = height/2;
        
        b.x = offx + (j-4) * b.width - b.width/2;
        b.y = offy + (i-4) * b.height - b.height/2;
        sodukoBoard[i].push(b);
      }
    }

    return sodukoBoard;
  }

  function renderSodukoBoard(){
    for(var i = 0; i < 9; i++)
      for(var j = 0; j < 9; j++){
        var b = soduko[i][j];

        context.strokeStyle = "white";
        context.lineWidth = 2;        
        context.strokeRect(b.x, b.y, b.width, b.height);
          

        context.fillStyle = b.value ? "gray" : "black";
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




};
