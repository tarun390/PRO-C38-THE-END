var PLAY=1;
var END=0;
var gameState=PLAY;
var player,player_running;
var jungle,backImage;
var invGround,invGround2;
var bananasGroup,banana_image;
var obstaclesGroup1,obstacle_image;
var score;
var gameover,gameover_img

function preload() {
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png",);
  
  backImage = loadImage("images/jungle.jpg");
  
  banana_image = loadImage("images/banana.png");
  
  obstacle_image = loadImage("images/stone.png");

  gameover_img = loadImage("images/gameover.png")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  jungle = createSprite(683,590,9999,9999);
  jungle.addImage(backImage);
  jungle.scale=1.35
  // jungle.VelocityX=-4
  // jungle.x = jungle.width/2;
  
  player = createSprite(300,180,20,50);
  player.addAnimation("escaped",player_running);
  player.scale=0.3
  
  invGround = createSprite(683,768,1366,100);

  invGround2 = createSprite(200,-10,400,10);
  invGround2.visible=false
  
  score=0;

  gameover = createSprite(700,100,300,10);
  gameover.addImage(gameover_img)
  gameover.visible=false
  
  
  bananasGroup = new Group();
  obstaclesGroup1 = new Group();

  camera.position.x = player.position.x + 400;
  camera.position.y = displayHeight/2;
  
}       

function draw() {
  background(128);
  stroke("red");
  fill("red");
  textSize(14);
  text("Score: "+ score,1300,50);
  
  if(gameState === PLAY){
    
    //  player.velocityX = -10;
    
    // if(jungle.x < 0){
    //   jungle.x = jungle.width/2;
    // }
    
    if(keyWentDown("space")){
      player.velocityY = -12 ;
    }
    
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(invGround);
    player.collide(invGround2);
    
    switch(score){
      case 10:player.scale=0.12;
              break;
      case 20:player.scale=0.14;
              break;
      case 30:player.scale=0.16;
              break;
      case 40:player.scale=0.18;
              break;
      default:break;
    }

    jungle.depth = score.depth;
    score.depth = score.depth + 1;
    
    callBanana();
    
    callStone();
    
    edge = createEdgeSprites();
    player.collide(edge[0])
    
    if (bananasGroup.isTouching(player)){
      bananasGroup.destroyEach();
      score=score+1
    }
    
    if(obstaclesGroup1.isTouching(player)){
      gameState=END
    }
  }
  
  else if(gameState===END){
    jungle.velocityX = 0;

    player.scale=0;
    player.velocityY = 0;

    obstaclesGroup1.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);

    obstaclesGroup1.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

    gameover.visible=true

    if(keyWentDown("r")){
      player.scale=0.3;
      reset();
    }
  }
   drawSprites();
}
 
function callBanana(){
  
  if(World.frameCount % 190 === 0) {
    var banana = createSprite(1366,120,40,10);
    banana.addImage("food",banana_image);
    banana.y = Math.round(random(100,1000));
    banana.scale = 0.1;
    banana.velocityX = -7 ;
    banana.lifetime = 300;
    bananasGroup.add(banana);
  }
}

function callStone(){
  if (World.frameCount % 70 === 0){
    var stone1 = createSprite(1366,665,10,40);
    stone1.addImage("obby",obstacle_image);
    stone1.velocityX = -11;          
    stone1.scale = 0.2;
    stone1.lifetime = 300;
    obstaclesGroup1.add(stone1);
  }
}
function reset(){
  gameState = PLAY;

  gameover.visible = false;
  
  obstaclesGroup1.destroyEach();
  bananasGroup.destroyEach();
  
  player.velocityX=-10;
  
  score = 0;
}
 

