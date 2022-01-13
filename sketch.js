var bg
var player,playerImage,playerShooting
var zombie , zombieImage
var zombieGroup
var bullet , bulletImage ,bulletGroup
var score = 0
var gameState="play"
var life = 3
var heart1Img,heart2Img,heart3Img
var heart
var lose,win,explosion




function preload(){
  bg = loadImage("assets/bg.jpeg")
  playerImage = loadImage("assets/shooter_2.png")
  playerShooting = loadImage("assets/shooter_3.png")
  zombieImage = loadImage("assets/zombie.png")
  bulletImage = loadImage("assets/bullet.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  explosion = loadSound("assets/explosion.mp3")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
// creating player sprite
player=createSprite(100,600,20,20)
player.addImage(playerImage)
player.scale=0.5
//player.debug=true
player.setCollider("rectangle",0,0,220,500)

// Craete heart
 heart=createSprite(windowWidth/2+400,80,30,30)
 heart.addImage(heart3Img)
 heart.scale=0.3


// create group for the zombie
zombieGroup=new Group()
bulletGroup=new Group()


}



function draw() {

  background(bg);  
  drawSprites();
 


  textSize(50)
  fill("blue")
text("score="+score,windowWidth/2,80)

 // text("life="+life,windowWidth/2,150)

if(gameState==="play"){
  createZombie();
  bulletShoot();
  

  if(keyDown("UP_ARROW")){
    player.y-=5
  }
  
  if(keyDown("DOWN_ARROW")){
    player.y+=5
  }

  if(bulletGroup.isTouching(zombieGroup)){
 
    for(var i = 0 ; i < zombieGroup.length;i++){
          if(bulletGroup.isTouching(zombieGroup[i])){
            zombieGroup[i].destroy()
            bulletGroup.destroyEach()
            score+=1
          }
    }
  }

  if(player.isTouching(zombieGroup)){
     lose.play()
    for(var a =0 ; a< zombieGroup.length;a++){
       if(player.isTouching(zombieGroup[a])){
         zombieGroup[a].destroy()
         life-=1
       }
    }
  }

  if(life===2){
    heart.addImage(heart2Img)
 }
 
 if(life===1){
    heart.addImage(heart1Img)
 }
 
 if(life===0){
    heart.visible=false
    gameState="end"
 }

 if(score===5){
   gameState="win"
   win.play()
 }

}

if(gameState==="end"){
   player.destroy()
   zombieGroup.setVelocityXEach(0)
   zombieGroup.setLifetimeEach(-1)

   textSize(100)
   fill("green")
   text("GAME OVER",windowWidth/2-100,windowHeight/2)

}

if(gameState==="win"){

  text("YOU HAVE WON",500,500)
  zombieGroup.destroyEach()


}

}


function createZombie(){
    if(frameCount%60===0){
      zombie=createSprite(windowWidth-50,random(0,600),30,30)
      zombie.addImage(zombieImage)
      zombie.velocityX=-5;
      zombie.scale=0.20;
      zombie.lifetime=300
      zombieGroup.add(zombie)
     // zombie.debug=true
      zombie.setCollider("rectangle",0,0,400,1000)
    }
}

function bulletShoot(){
    if(keyWentDown("space")){
      bullet=createSprite(player.x,player.y,20,20)
      bullet.addImage(bulletImage)
      bullet.scale=0.067
      bullet.velocityX=10;
      bulletGroup.add(bullet)
      //bullet.debug=true
      bullet.setCollider("rectangle",0,0,300,300)
      explosion.play()
      
      bullet.depth=player.depth;
      player.depth+=1

      player.addImage(playerShooting)
    }

    else if(keyWentUp("space")){
      player.addImage(playerImage)
    }
}