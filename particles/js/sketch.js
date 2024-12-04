let fountain = [];
let numFountain = 20;
let fountainY = 200;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  
  colorMode(RGB, 255, 255, 255, 1);
}

function draw() {
  background(0);

  for(let i = 0; i < numFountain; i++){
    fountain.push(new Fountain(width/2,fountainY));
  }

  for(let i = 0; i < fountain.length; i++){
    fountain[i].update();
    fountain[i].display();
  }

  for(let i = fountain.length-1; i >=0; i--){
    if(fountain[i].onCanvas == false){
      fountain.splice(i, 1);

    }
  let YMovement = noise(frameCount*0.01);
  fountainY = height/2+map(YMovement,0,1,-height/2,height/2);
}
}

class Fountain{
  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
    this.circleY = startY;
    this.size = random(2,4);
    this.speedY = 0;
    this.speedX = 0;
    this.transparency = 100;
    this.speedXR = random(-2,2);
    this.hue = random(255);
    this.onCanvas = true;

  }
  update(){
    this.speedX = lerp(0,this.speedXR,0.1)*80
    this.transparency = map(Math.abs(this.speedX),0,10,0,50);
    this.x+=this.speedX;
    if(this.x > width||this.x<0){
      this.onCanvas = false;
    }
    
  }
  
  display(){    
    push();
    translate(this.x, this.y);
  
      fill(this.hue, 100, 200,this.transparency);
      noStroke();
      circle(0, 0, this.size);
    pop();
    
  }

}


