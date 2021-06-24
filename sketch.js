var balloon,balloonImg, backgroundImg;
var database;
function preload(){
  backgroundImg = loadImage("image/Hot Air Ballon-01.png");
 balloonImg = loadAnimation("image/Hot Air Ballon-02.png","image/Hot Air Ballon-03.png"," image/Hot Air Ballon-04.png ");
}


function setup() {
  createCanvas(1200,500);
  database = firebase.database();
  
  var balloonpos = database.ref("balloon/height");
  
  balloonpos.on("value", readPosition, showError);
 balloon = createSprite(50, 300, 10, 10);
 balloon.addAnimation("Balloon", balloonImg);
 balloon.scale=0.4;
}



function draw() {
  background(backgroundImg);

  if(height!==undefined){
  if(keyDown("up")){
updatePosition(0,-10);
balloon.addAnimation("Balloon", balloonImg);
 balloon.scale=balloon.scale-0.01;
   // balloon.y = balloon.y-10;
  }
  if(keyDown("down")){
    updatePosition(0,+10);
    //balloon.y = balloon.y+10;
  }

  if(keyDown("left")){
    updatePosition(-10,0);
//    balloon.x = balloon.y-10;
  }
  // if(keyDown("right")){
  //   updatePosition(+10,0);
  //   //balloon.x = balloon.y+10;
  // }

  
  drawSprites();
}
}


function readPosition(data){
height =data.val();
balloon.x = height.x;
balloon.y = height.y;
}

function updatePosition(x,y){
  database.ref("balloon/height").set({
    x: height.x+x,
    y: height.y+y
  })
}


function showError(){

  console.log("this is an Error");
}
