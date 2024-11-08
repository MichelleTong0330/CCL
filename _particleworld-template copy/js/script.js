// CCLab Mini Project - 9.R Particle World Template

let numFountain = 1; // Decide the initial number of particles.

let fountain = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < numFountain; i++) {
    fountain[i] = new Fountain(width/2,height/2,random(255));
  }
  colorMode(HSB)
  // frameCount(10)
}

function draw() {
  background(50);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < fountain.length; i++) {
    let p = fountain[i];
    p.update();
    p.display();
  }

  for(let i = 0; i < numFountain; i+=2){
    fountain.push(new Fountain(width/2,height/2,random(255)))
    
  }
}

class Fountain {
  // constructor function
  constructor(startX, startY,c) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.c = c
    this.dia = 10;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.dia+=3

  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    noFill()
    stroke(this.c,50,80)
    ellipse(0, 0,this.dia,this.dia/3);

    pop();
  }
}
