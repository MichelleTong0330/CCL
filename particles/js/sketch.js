let fountain = [];
let numFountain = 50;
let fountainY = 200;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  
  colorMode(HSB,360,100,100,100);
}

function draw() {
  //
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
    this.hue = random(50);
    this.onCanvas = true;

  }
  update(){
   

    // let ychange = fountain[i].y-fountain[i-1].y
    // this.speedY = map(ychange,0,100,-10,10)
    this.speedX = lerp(0,this.speedXR,0.1)*50
    this.transparency = map(Math.abs(this.speedX),0,10,0,100);
  
    // this.speedY = map(Math.abs(this.x-width/2),0,width/2,map(YMovement,0,1,-100,100),0)

    this.x+=this.speedX;

    // this.y = 200+this.speedY
    // this.circleY+=this.speedY
    // this.y+=this.speedY;
    

    // if(this.x>50||this.x<-50){
    //   this.onCanvas=false
    // }
    if(this.x > width||this.x<0){
      this.onCanvas = false;
    }
    
  }
  
  display(){    
    push();
    translate(this.x, this.y);
  
      fill(this.hue, 255, 255,this.transparency);
      noStroke();
      circle(0, 0, this.size);
    pop();
    
  }

}


