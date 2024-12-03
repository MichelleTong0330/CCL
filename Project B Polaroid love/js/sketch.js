let photo1;
let cover1;
// let Photo
// let Cover
// let Imagingprocess = true


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");

  colorMode(RGB, 255, 255, 255, 1);

  photo1 = new Photo();
  cover1 = new Cover();
  
}

function draw() {
  background(220);
  photo1.display();
  photo1.update();
  cover1.display();
  cover1.update();

  // if (photo1.transparency >= 1){
  //   Imagingprocess = false
  // }
}

// if(Imagingprocess == true){
class Photo {
  constructor() {
    this.x = width / 2;
    this.y = 100;
    // this.motion1 = true;
    this.canBeshaked = false;
    this.transparency = 0;
  }

  update() {
    if (mouseIsPressed == true && mouseY - 100 > 0 && mouseY < 250) {
      this.y = mouseY;
    }

    if (this.canBeshaked == true) {
      this.x = mouseX;
      this.y = mouseY;
      this.transparency = this.transparency + 0.0005;
    }

    // if (cover1.y < 0) {
    //   cover1.cover = false;
    //   // this.motion1 = false;
    //   if (mouseIsPressed == true) {
    //     this.x = mouseX;
    //     this.y = mouseY;
    //   }
    // }
  }

  display() {
    push();
    translate(this.x, this.y);
    stroke("black");
    strokeWeight(3);
    fill("white");
    rect(-100, -100, 200, 220);
    fill("grey");
    rect(-80, -80, 160, 160);
    fill(249, 203, 1568, this.transparency);
    rect(-80, -80, 160, 160);
    pop();
  }
}

class Cover {
  constructor() {
    this.x = width / 2;
    this.y = 100;
    this.coverRemoved = false;
    this.cover = true;
  }

  update() {
    if (mouseIsPressed == true && mouseY - 100 > 0 && mouseY < 250) {
      this.y = mouseY;
    }

    if (this.coverRemoved == true) {
      this.y = this.y - 2;
    }
  }

  display() {
    if (this.cover == true) {
      push();
      translate(this.x, this.y);
      fill("rgb(54,52,52)");
      rect(-100, -100, 200, 220);
      quad(-97, 120, 97, 120, 80, 140, -80, 140);
      fill("red");
      noStroke();
      circle(0, 0, 5);
      pop();
    }
  }
}
// }

function mousePressed() {
  if (
    mouseY > 370 &&
    mouseY < 390 &&
    mouseX > 100 &&
    mouseX < 300 &&
    cover1.y >= 245
  ) {
    cover1.coverRemoved = true;
  }

  if (cover1.y < 0) {
    cover1.cover = false;
    photo1.canBeshaked = true;
  }
}

// shakeCheck(){

// }

