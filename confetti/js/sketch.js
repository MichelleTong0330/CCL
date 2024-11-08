let confettis = [];
let numConfetti = 100;
let backgroundHUE;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }

  backgroundHUE=random(255)
  colorMode(HSB);
}

function draw() {
  background(backgroundHUE,30,255);
  // color, saturation(饱和度),brightness

  if(mouseIsPressed==true){
    for(let i = 0; i < numConfetti; i++){
      confettis.push(new Confetti(mouseX, mouseY))
      
    }
  }

  
  fill(0)
  text(confettis.length,20,20)


  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }

  // if(confettis.length<20){
 //delete elements in the array: splice(index, number want to delete)
 //                        where start to cut, cut how many since
  //delete the oldest one

  //比20大了就减直到20
  // while( confettis.length>1000){
  //   confettis.splice(0,1)
  // }

  // delete as long as the coonfetti is out of the canvas
  for(let i = confettis.length-1; i >=0; i--){
    //check its onCanvas value
    if(coonfettis[i].onCanvas == flase){
      //delete if not on the canvas
      confettis.splice(i,1)
    }

  }
}
//excelarate
class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2); //move randomly to left or right
    this.speedY = random(-1, -3); //only upwards 
    
    this.hue = random(255)

    this.onCanvas = true
  }
  update(){
    
    this.x+=this.speedX;
    this.y+=this.speedY;
    //gravity
    this.speedY+=0.1
    this.speedX*=0.99

    if(this.y>height){
      this.onCanvas = false
    }


    
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.hue, 255, 255);
      noStroke();
      circle(0, 0, this.size);

    pop();
  }

}


function mousePressed(){
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(mouseX, mouseY))
  }
}






