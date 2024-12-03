let bugSound;
let bug1;
let plant1
function preload(){
  //from the index file, the sound is to be found at
bugSound = loadSound("sounds/8000__cfork__cf_fx_bloibb.mp3");
}


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  bug1 = new Bug();
  plant1 = new plant(width/2,height/2)
}

function draw() {
  //
  background(220);
  bug1.update();
  bug1.display();
  plant1.update();
  plant1.display();
}



class Bug{
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.sound = bugSound;
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
    this. moving = false;
  }

  update(){
    if (this.moving==true){
    this.x += this.speedX
    this.y += this.speedY
    }

    //bounce
    if(this.x < 0 || this.x > width){
      this.speedX = -this.speedX;
      this.shout()
    }
    if(this.y < 0 || this.y > height){
      this.speedY = -this.speedY;
      this.shout()
    }
  }

  shout(){
    this.sound.play();
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(0);
    circle(0, 0, 2);
    pop();
  }
}

class plant{
 constructor(startX,startY){
 this.x = startX
 this.y = startY
 this.plantheight = 0
 this.watered = false
 }

 update(){
  if(this.watered == true){
  if(this.plantheight<=100){
 this.plantheight++
  }
 }
 }



 display(){
  push();
  translate(this.x,this.y);
  //pot
  noStroke()
  fill('brown')
  rect(-20,-40,40,40)

  //plant
  stroke('green')
  strokeWeight(10);
  line(0,-40,0,-40-this.plantheight)
  pop();
 }

 checkClicked(){
  console.log("was I clicked??????")
  if(mouseX>this.x-20&&
    mouseY<this.x+20&&
    mouseY>this.y-40&&
    mouseY<this.y
  ){
    console.log("clicked!!!")
    this.watered = true
  }
 }
}

function mousePressed(){
  bug1.moving = true

  plant1.checkClicked()
}