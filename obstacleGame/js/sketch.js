let numSquares = 10;
let squares = [];
let myFly;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  //should be in the setup()
  for (let i = 0; i < numSquares; i++) {
    squares.push(new Square(random(width, 2*width), random(height)));
  }
  
  myFly = new Fly();
}

function draw() {
  background(220);

  
  for (let i = 0; i < squares.length; i++) {
    squares[i].display();
    squares[i].update();
  }

  myFly.dispaly();
  myFly.update();

  for (let i = 0; i < squares.length; i++) {
    squares[i].checkCollison(myFly.x, myFly.y)
}
}

class Square {
  constructor(startX, startY) {  
    this.x = startX;
    this.y = startY;
    this.speedX = -1;
    this.size = random(20, 50);
  }

  update() {
    this.x += this.speedX;
    if (this.x < 0) {
      this.x = width;
      this.y = random(height);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255);
    rect(0, 0, this.size, this.size); 
    pop();
  }

  checkCollision(otherX,otherY){
    if(otherX > this.x&&
      otherX < this.x-this.size&&
      otherY >this.y&&
      otherY< this.y+this.size
    ){
      console.log('Collision!!!!')
    }
  }


}

class Fly{
  constructor(){
    this.x = width/3;
    this.y = height/2;
    this.speedY = 0;
    this.radios = 5
  }

  update(){

    if(this.y< height-this.radios){
    this.speedY += 0.1
    }
    if (keyIsPressed == true&& key=='w'){
      this.speedY -=0.2
    }
    this.y += this.speedY

    if(this.y >= height-this.radios){
      this.y = height-this.radios;
    }
    

  }

  dispaly(){
    push();
    translate(this.x,this.y);
    fill(0);
    circle(0, 0, this.radios)
  }
}
