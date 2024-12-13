console.log
let angleInDegrees = 90;
let anglesInDegrees = 45;
let c1;
let c2;
let c4;
let c5;
let dreamFound = false;
let movingstuff1 = true;
let movingstuff2 = true;
let regularB = true;
let iArc = 0;
let maxCirclerad = 50;
let Xspeed = 2;
let Yspeed = 1;
let butterflyX = 50;
let butterflyY = 80;
let butterflyX1 = 0;
let butterflyY1 = 50;
let xArray = [];
let yArray = [];
let initialSizeOfArray = 100;
let DreamlightX = 200;
let DreamlightY = 400;
let ClickX = 600;
let ClickY = 400;
let hintText1 = true;
let hintText2 = false;
let butterflyX1M = 2;
let scaleCmode 
let scaleC 
let rotateCDegree = 30
let rotateC
let rotateCDDegree = 120
let rotateCD
let heartIMG
let heart = true;


function preload(){
heartIMG = loadImage("assets/heart-png-15.png");
}
function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  colorMode(RGB, 255, 255, 255, 1);
  for (let iStars = 0; iStars < initialSizeOfArray; iStars++) {
    xArray[iStars] = random(0, width);
    yArray[iStars] = random(0, height);
  }
}

function draw() {
  background(252, 211, 169);
  scaleCmode = cos(frameCount * 0.01);
  scaleC = map(scaleCmode, -1, 1, 0.3, 1);
  rotateC=radians(rotateCDegree)
  rotateCD=radians(rotateCDDegree)
// let butterflyX1M = 2;
//     let butterflyY1M = 2 * sin((1 / 2) * frameCount * 0.1);
  noFill();
  strokeWeight(3);
  stroke(255, 232, 209);
  rect(175, 125, 450, 250);
  line(0, 0, 175, 125);
  line(625, 125, 800, 0);
  line(0, 500, 175, 375);
  line(625, 375, 800, 500);
  


  //window
  rect(185, 135, 430, 160);
  for (let xW = 140; xW < 285; xW = xW + 12) {
    noStroke();
    fill(148, 75, 0, 0.8);
    quad(190, xW, 610, xW, 615, xW + 10, 190, xW + 10);
    fill(255, 217, 102, 0.5);
    quad(635, xW + 15, 760, xW + 90, 760, xW + 100, 635, xW + 25);
  }

  //tan zi
  noStroke();
  for (let i = 0; i < 90; i++) {
    let distanceBetweenEllipses = 2;
    let eH = 80 - i * distanceBetweenEllipses; //eH:ellipseHeight
    fill(224, 102, 102, 0.1);
    ellipse(400, 440, 4 * eH, eH);
    fill(245, 105, 66, 0.2);
    ellipse(400, 440, 2 * eH, eH / 2);
  }

  //lights
  //light
  fill(255, 187, 0, 0.8);
  circle(330, 365, 30);
  fill(255, 187, 0, 0.5);
  circle(330, 365, 60);

  fill(255, 242, 204, 0.7);
  rect(340, 30, 120, 10);
  fill(255, 224, 48);
  arc(400, 40, 80, 60, 0, PI);
  fill(255, 217, 50, 0.6);
  arc(400, 40, 100, 80, 0, PI);

  stroke(0, 0, 0, 0.7);
  strokeWeight(3);
  line(250, 420, 250, 305);
  noFill();
  curve(240, 500, 250, 305, 330, 315, 360, 600);
  fill(0, 0, 0, 0.9);
  arc(330, 360, 60, 100, PI, 0);
  if(heart == true){
  push();
  scale(0.1);
  image(heartIMG,3200,3600);
  pop();
  };



  //pot
  drawFlowerPot(580, 390, 36, 24);

  //flowers
  let angle = radians(angleInDegrees);
  push();
  translate(580, 340);
  rotate(angle);
  noStroke();
  fill(234 + frameCount * 0.1, 209 - frameCount * 0.1, 220 - frameCount * 0.1);
  circle(0, 0, 10);
  for (let angleChange = 0; angleChange <= 360; angleChange += 45) {
    push();
    rotate(radians(angleChange));
    ellipse(0, -25, 10, 30);
    pop();
  }
  pop();
  angleInDegrees++;

  if (butterflyX1 > 600 && butterflyX1 < 610) {
    fill(255, 0, 0, 0.5);
    let bugX = random(320, 340);
    let bugY = random(365, 370);
    circle(bugX, bugY, 5);
  }
  if (regularB == true) {
    //butterfly previous

    let wingChange = sin(frameCount * 0.03);
    let wingX = map(wingChange, -1, 1, -50, -20);
    let wingY = map(wingChange, -1, 1, -30, -50);
    let wingChange2 = cos(frameCount * 0.03);
    let wingX2 = map(wingChange, -1, 1, 50, 20);
    let wingY2 = map(wingChange, -1, 1, -30, -50);
    // let butterflyX1M = 2;
    let butterflyY1M = 2 * sin((1 / 2) * frameCount * 0.1);
    push();
    translate(butterflyX1, butterflyY1);
    scale(scaleC);
    rotate(rotateC);
    beginShape();
    stroke(122, 75, 200);
    fill(122, 100, 225);
    vertex(0, 0);
    quadraticVertex(wingX, wingY, -10, +30);
    vertex(-20, +60);
    quadraticVertex(-10, +30, 0, +30);
    vertex(0, 0);
    quadraticVertex(wingX2, wingY2, +10, +30);
    vertex(+20, +60);
    quadraticVertex(+10, +30, 0, +30);
    vertex(0, 0);
    vertex(-10, -20);
    vertex(0, 0);
    vertex(+10, -20);
    endShape();
    pop();
    butterflyX1 = butterflyX1 + butterflyX1M;
    butterflyY1 = butterflyY1 + butterflyY1M;
   
    if (butterflyX1 > width+30||butterflyX1<-30) {
      butterflyX1M = - butterflyX1M
      butterflyY1 += 20;
      rotateCDegree= -rotateCDegree
      if (butterflyY1 > height) {
        butterflyY1 = 50;
      }
    }
   
  }
  //hint
  if (hintText1 == true) {
    textSize(15)
    text(
      "I see something apears in the room, it is shining and pinky. So attractive!!",
      40,
      90
    );
  }
  if (hintText2 == true) {
    fill(148, 75, 0, 0.8);
    text("Welcome back to order", 350, 80);
  }
  //DREAM
  if (dreamFound == true) {
    colorMode(RGB, 255, 255, 255, 1);
    fill(45, 46, 59);
    rect(0, 0, 800, 500);

    //twinkling stars
    let GradientChange = sin(frameCount * 0.01);
    let GradientChange2 = -sin(frameCount * 0.01);
    let starsGradient = map(GradientChange, -1, 1, 0, 0.6);
    let starsGradient2 = map(GradientChange2, -1, 1, 0, 0.6);
    noStroke();

    for (let iStars = 0; iStars < xArray.length; iStars++) {
      let starsX = xArray[iStars];
      let starsY = yArray[iStars];
      if (iStars < xArray.length / 2) {
        fill(255, 255, 255, starsGradient);
      } else {
        fill(249, 174, 45, starsGradient2);
      }
      circle(starsX, starsY, 10);
    }
    //arc spinning
    let angles = radians(anglesInDegrees);
    c1 = color(149, 0, 255);
    c2 = color(235, 210, 252);
    c4 = color(255, 0, 217);
    c5 = color(255, 217, 250);
    let amt = map(mouseX, 0, width, 0, 1);
    let amt2 = map(mouseY, 0, width, 0, 1);
    let c3 = lerpColor(c1, c2, amt);
    let c6 = lerpColor(c4, c5, amt2);
    push();
    translate(width / 2, height / 2);

    for (iArc = 0; iArc < maxCirclerad; iArc += 10) {
      noFill();
      stroke(c3);
      strokeWeight(1);
      let numPI = map(iArc, 0, 400, 0, 1);
      arc(0, 0, iArc, iArc, numPI, numPI * random(0, 4));

      arc(-250, -250, iArc, iArc, numPI, numPI * random(0, 4));
      stroke(c6);
      arc(-100, -100, iArc, (3 / 2) * iArc, numPI * random(0, 4), numPI);
      rotate(angles);
    }

    pop();
    anglesInDegrees = anglesInDegrees + 0.01;
    iArc += 0.5;
    maxCirclerad += 2;

    if (movingstuff1 == true) {
      let wingChange = sin(frameCount * 0.03);
      let wingX = map(wingChange, -1, 1, -50, -20);
      let wingY = map(wingChange, -1, 1, -30, -50);
      let wingChange2 = cos(frameCount * 0.03);
      let wingX2 = map(wingChange, -1, 1, 50, 20);
      let wingY2 = map(wingChange, -1, 1, -30, -50);
      push();
      translate(butterflyX, butterflyY);
      scale(scaleC);
      rotate(rotateCD);
      beginShape();
      stroke(255, random(0, 100), random(200, 255));
      fill(255, random(0, 100), random(200, 255));
      vertex(0, 0);
      quadraticVertex(wingX, wingY, -10, +30);
      vertex(-20, +60);
      quadraticVertex(-10, +30, 0, +30);
      vertex(0, 0);
      quadraticVertex(wingX2, wingY2, +10, +30);
      vertex(+20, +60);
      quadraticVertex(+10, +30, 0, +30);
      vertex(0, 0);
      vertex(-10, -20);
      vertex(0, 0);
      vertex(+10, -20);
      endShape();

      if (butterflyX > width || butterflyX < 0) {
        Yspeed = Yspeed;
        Xspeed = -Xspeed;
        rotateCDDegree= -rotateCDDegree
      }
      if (butterflyY > height || butterflyY < 0) {
        Xspeed = Xspeed;
        Yspeed = -Yspeed;
        rotateCDDegree= rotateCDDegree+90
      }
      butterflyX = butterflyX + Xspeed;
      butterflyY = butterflyY + Yspeed;

      pop();
    }
    if (keyIsPressed == true) {
      if (key === "w" || key === "a" || key === "s" || key === "d") {
        //scaleC++
        iArc -= 5.5;
        maxCirclerad -= 5.5;
        if (maxCirclerad < 10) {
          maxCirclerad -= 0;
        }
        scaleC += 0.001;
        if (scaleC > 0.5) {
          scaleC += 0;
        }
      }
    }

    if (movingstuff2 == true) {
      let lightFunction = sin(frameCount * 0.01);
      let lightRad = map(lightFunction, 0, 1, 5, 50);
      let lightFunction2 = cos(frameCount * 0.03);
      let lightRad2 = map(lightFunction2, 0, 1, 5, 60);
      fill(247, 19, 2);
      circle(DreamlightX, DreamlightY, lightRad);

      if (
        DreamlightX < butterflyX + 20 &&
        DreamlightX > butterflyX - 20 &&
        DreamlightY < butterflyY + 20 &&
        DreamlightY > butterflyY - 20
      ) {
        butterflyX = DreamlightX;
        butterflyY = DreamlightY;
      }
    }
    fill(252, 252, 252)
    textSize(15)
    text(
      "cathch the chaotic love and moderate it before its disorder power invades every corner of your life!*use<wasd>",
      20,
      50
    );
    text(
      "The previous adventurer told me that sending it to where the magic is most powerful id the only way to kill it",
      20,
      70
    );
    text("However, you can choose to stay or not.", 20, 90);

    if (keyIsPressed == true) {
      if (key === "w") {
        DreamlightY = DreamlightY - 1;
      } else if (key === "s") {
        DreamlightY = DreamlightY + 1;
      } else if (key === "d") {
        DreamlightX = DreamlightX + 1;
      } else if (key === "a") {
        DreamlightX = DreamlightX - 1;
      }
    }
    if (
      DreamlightX < width / 2 + 10 &&
      DreamlightX > width / 2 - 10 &&
      butterflyX < width / 2 + 10 &&
      butterflyX > width / 2 - 10 &&
      DreamlightY < height / 2 + 10 &&
      DreamlightY > height / 2 - 10 &&
      butterflyY < height / 2 + 10 &&
      butterflyY > height / 2 - 10
    ) {
      movingstuff1 = false;
      movingstuff2 = false;
      dreamFound = false;
      hintText1 = false;
      hintText2 = true;
      regularB = false;
      heart = false;
    }
    if (maxCirclerad > 4000) {
      movingstuff2 = false;
      butterflyX = 400;
      butterflyY = 250;
    } else {
      movingstuff2 = true;
    }
  }
}
function mousePressed() {
  if (mouseX > 300 && mouseX < 360 && mouseY > 360 && mouseY < 390) {
    dreamFound = true;
  }
}

function drawFlowerPot(x, y, w, h) {
  fill(150, 75, 0);
  noStroke();
  rect(x - w / 2, y - h / 3, w, h / 3, 4, 4, 1, 1);
  fill(160, 82, 45);
  beginShape();
  vertex(x - w / 2, y - h / 3);
  vertex(x + w / 2, y - h / 3);
  vertex(x + w / 2 + 4, y - h);
  vertex(x - w / 2 - 4, y - h);
  endShape(CLOSE);

  fill(139, 69, 19);
  rect(x - w / 2 - 4, y - h, w + 8, 4, 1);
}
