/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  colorMode(RGB, 255, 255, 255, 1);

  // ...except to adjust the dancer's name on the next line:
  dancer = new DancingWaffles(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  //drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class DancingWaffles {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.legY1 = 65
    this.legX1 = -20
    this.legX2 = 20
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    let MovemetFunction = sin(frameCount * 0.0256);
    this.WM = map(MovemetFunction, -1, 1, 120, 150);
    let WaffleMovement = sin(frameCount * 0.0133);
    let WaffleMovement2 = sin(frameCount * 0.0266);
    this.WA = map(WaffleMovement, -1, 1, -30, 30);
    this.WAR = map(WaffleMovement, -1, 1, -30, 30);
    this.WAC = map(WaffleMovement2,-1,1,0,0.7,1)
    this.WMinsideheight = map(MovemetFunction, -1, 1, 42, 53);
    this.WMinsideArc = map(MovemetFunction, -1, 1, 85, 110);
    this.WMinsideWidth = map(MovemetFunction, -1, 1, 50, 53);
    this.WMinsideheightOFWidth = map(MovemetFunction, -1, 1, 25, 30);
    
  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    
    //legs
    console.log(mouseX - 200, mouseY - 200);
    //push()
    stroke(135,84,4)
    strokeWeight(5)
    if(this.WA>0){
      
      push()
    rotate(radians(this.WAR))
    line(15,35,20,65)
      line(15,65,25,65)
      pop()
      line(-15,35,-20,65)
      line(-25,65,-15,65)
    }
    if(this.WA<0){
      push()
    rotate(radians(this.WAR))
    line(-15,35,-20,65)
      line(-25,65,-15,65)
      pop()
      line(15,35,20,65)
      line(15,65,25,65)
      
    }
    push()
    rotate(radians(this.WA));
    scale(0.7)

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    fill(242, 179, 78);
    stroke(247, 146, 45);
    strokeWeight(5);
    ellipse(0, 0, 150, this.WM);
    arc(5, 5, 110, this.WMinsideArc, 0, HALF_PI, PIE);
    arc(5, -5, 110, this.WMinsideArc, PI + HALF_PI, 0, PIE);
    arc(-5, -5, 110, this.WMinsideArc, PI, PI + HALF_PI, PIE);
    arc(-5, 5, 110, this.WMinsideArc, HALF_PI, PI, PIE);

    line(30, this.WMinsideheight, 30, 5); //
    line(30, -this.WMinsideheight, 30, -5); //
    line(-30, this.WMinsideheight, -30, 5); //
    line(-30, -this.WMinsideheight, -30, -5); //
    line(
      5,
      -this.WMinsideheightOFWidth,
      this.WMinsideWidth,
      -this.WMinsideheightOFWidth
    );
    line(
      5,
      this.WMinsideheightOFWidth,
      this.WMinsideWidth,
      this.WMinsideheightOFWidth
    );
    line(
      -5,
      -this.WMinsideheightOFWidth,
      -this.WMinsideWidth,
      -this.WMinsideheightOFWidth
    );
    line(
      -5,
      this.WMinsideheightOFWidth,
      -this.WMinsideWidth,
      this.WMinsideheightOFWidth
    );

    noStroke();
    fill("black");
    circle(30, -10, 10);
    circle(-30, -10, 10);
    stroke("black");
    noFill();
    curve(-30, -30, -15, 10, 15, 10, 30, -30);
    fill(245,112,112,this.WAC)
    noStroke()
    ellipse(-40,10,20,15)
    ellipse(40,10,20,15)
    pop();
    
    
    
    
    

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    this.drawReferenceShapes();
    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}
