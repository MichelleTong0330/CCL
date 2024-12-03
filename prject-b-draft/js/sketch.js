let photo1;
let cover1;
let picture;
let pictureIMG;
let camera;
let cameraIMG;
let video;
let button;
let button1;
let button2;
let text1;
let buttonSound;
let dragSound;
let isDragging = false;
let toolBroad;
let work1  = false;
let work2 = false;
let fountain = [];
let numFountain = 50;
let fountainY = 200;
let starfield;




function preload(){
  // pictureIMG = loadImage("assets/sun.webp");
  cameraIMG =  loadImage("assets/camera.webp");
  penIMG = loadImage("assets/pen.jpg");
  buttonSound = loadSound("sounds/click.mp3");
  dragSound = loadSound("sounds/dragging.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  colorMode(RGB, 255, 255, 255, 1);

  photo1 = new Photo();
  cover1 = new Cover();
  camera = new Camera(cameraIMG);
  // pen = new Pen(penIMG);
  text1 = new Text();
  // for (let i = 0;i<5;i++){
  //   baseY[i] = i * 30 + 200;
  // }
  // for (let i = 0;i<5;i++){
  toolBroad = new ToolBroad;
  // }

  starfield = new Starfield();
  


  video = createCapture(VIDEO);
  video.size(160,120);
  button = createButton('happy');
  button1 = createButton('sad');
  button2 = createButton('peace');
  button.mousePressed(happysnap);
  button1.mousePressed(sadsnap);
  button2.mousePressed(peacesnap);

  
}
  


function draw() {
  background(220);
  photo1.display();
  photo1.update();
  cover1.display();
  cover1.update();
  camera.display();
  camera.update();
  
  if(work2==true){
    starfield.update(); 
    starfield.display();
  }
  toolBroad.display();
  toolBroad.update();
  
  if (work1 && fountain.length < numFountain) {
    for (let i = 0; i < numFountain; i++) {
      fountain.push(new Fountain(width / 2, fountainY));
    }
  }

  if (work1 == true){
  for(let i = 0; i < fountain.length; i++){
    fountain[i].update();
    fountain[i].display();
  }
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
class Starfield{
  constructor(){
    this.xArray = [];
    this.yArray = [];
    this.numStars = 100;
    this.createStars();
  }

  createStars(){
    for (let i = 0; i < this.numStars; i++) {
      this.xArray.push(random(width));
      this.yArray.push(random(height));
    }
  }

  update(){
    let GradientChange = sin(frameCount * 0.01);
    let GradientChange2 = -sin(frameCount * 0.01);
    this.starsGradient = map(GradientChange, -1, 1, 0, 0.6);
    this.starsGradient2 = map(GradientChange2, -1, 1, 0, 0.6);
  }

  display(){
    noStroke();
    for (let iStars = 0; iStars < this.xArray.length; iStars++) {
      let starsX = this.xArray[iStars];
      let starsY = this.yArray[iStars];
      
      if (iStars < this.xArray.length / 2) {
        fill(255, 255, 255, this.starsGradient);  
      } else {
        fill(249, 174, 45, this.starsGradient2);  
      }
      
      circle(starsX, starsY, 10);  
    }
  }
}

class Photo {
  constructor() {
    this.x = width / 2;
    this.y = 280;
    this.xPreFrame = this.x;
    this.yPreFrame = this.y;
    this.canBeshaked = false;
    this.transparency = 1;
    this.showText = false;
    this.img = createImage(160,120);
    this.dragPhoto = false;
  }

  pressShutter(){
    let currentVideoFrame = video.get();
    this.img = currentVideoFrame
  }

  update() {
    if (this.dragPhoto == true){
      this.y = mouseY;
    }
    if (mouseIsPressed == true && mouseY > 220 && mouseY < height-20 && this.y<475)
    {
      this.dragPhoto = true;
    }else{
      this.dragPhoto= false;
    }

    if (this.canBeshaked == true) {
      this.x = mouseX;
      this.y = mouseY;
      

      let distance = dist(this.x, this.y, this.xPreFrame, this.yPreFrame);

      if(distance > 20){
        this.transparency = max(0,this.transparency - 0.1);
      }

      if (distance > 0) {
        this.xPreFrame = this.x;
        this.yPreFrame = this.y;
      }

      console.log(this.transparency)

      if (distance < 0.00001 && this.transparency > 0&&this.transparency < 9) {
        this.showText = true; 
      } else {
        this.showText = false;
      }

      if (this.transparency == 0){
        this.x = width/2
        this.y = 400
        this.dragPhoto = false;
        // this.scaleIndex = max(1.3,this.scaleIndex+0.2)
      }

      
    }
    

  }

  display() {
    push();
    translate(this.x, this.y);
    // scale(this.scaleIndex);
    stroke("black");
    strokeWeight(3);
    fill("white");
    rect(-100, -220, 200, 180);
    push();
    translate(-80,-200);
    scale(0.265);
    // image(this.img, 0, 0)
    pop()
    image(this.img, -80,- 200)
    fill(126, 126, 126,this.transparency);
    rect(-80, -200, 160, 120);
    pop();
    if (this.showText == true) {
      noStroke();
      fill(0);
      textSize(10);
      textAlign(CENTER);
      text('The photo will appear soon. Keep shaking!', 100,100);
    }
    if (this.transparency <= 0){
      text('congratulation!!!',100,100)
    }
  }
}

class Cover {
  constructor() {
    this.x = width / 2;
    this.y = 280;
    this.coverRemoved = false;
    this.cover = true;
    this.dragCover = false
  }

  update() {
    if (this.dragCover == true){
      this.y = mouseY;
    }
    if (mouseIsPressed == true && mouseY > 220 && mouseY < height-20 && this.y<475) {
      this.dragCover = true
      dragSound.play();
    } else{
      this.dragCover = false;
      
    }
    // else if(this.y>375){
    //   this.y=this.y
    // }

    if (this.coverRemoved == true) {
      this.y = this.y - 2;
      // shout(){
      //   this
      // }
    }
  }

  display() {
    if (this.cover == true) {
      push();
      translate(this.x, this.y);
      scale(1);
      fill("rgb(54,52,52)");
      rect(-100, -220, 200, 180);
      quad(-97, -40, 97, -40, 80, -20, -80, -20);
      fill("red");
      noStroke();
      circle(0, 0, 5);
      pop();
    }
  }
}
// }

class Camera{
  constructor(cameraIMG){
   this.x = width/2;
   this.y = height/2;
   this.camera = cameraIMG;
  //  this.cameraDisappear = false
  }
 
  update(){
  if(mouseIsPressed==true&&mouseX<width&&mouseY<height){
    this.y = this.y-2
  }
  }
 
  display(){
   push();
     translate(this.x, this.y);
     push();
     translate(0,0);
     scale(0.20);
     image(this.camera,-1095, -1700);
     pop();
   pop();
  }
}


class Text{
  constructor(){
    this.x = 10
    this.y = 10
  }
  update(){
    if(mouseIsPressed==true){
      this.x = mouseX;
      this.y = mouseY;
  }
}
  display(){
    text('😜',this.x,this.y);
  }
}

class ToolBroad {
  constructor() {
    this.rectX = 30; 
    this.rectY = 510; 
    this.emojiY = [];
    this.emojiX = [];
    this.emojis = ['😜', '😇', '😐', '🌟', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    for(let i=0;i<this.emojis.length;i++){
      this.emojiX.push(this.rectX+15+30*i);
      this.emojiY.push(this.rectY+25);
    }
    this.isOveremoji = false
    this.isDragging = []

    this.animationSwitchX = 700;
    this.animationSwitchY = 400;
  }

  update() {
    for (let i = 0;i<this.emojis.length;i++){
      if (this.isDragging[i] == true) { 
      this.emojiX[i] = mouseX;
      this.emojiY[i] = mouseY;
      }
    }
    for (let i = 0;i<5;i++){
    if(photo1.transparency == 0){
       if(this.rectY>450){
      this.rectY = this.rectY-0.5
      for (let i = 0;i<this.emojis.length;i++){
      this.emojiY[i] = this.emojiY[i]-0.5
      }

      if(this.animationSwitchY>700){
        this.animationSwitchY -= 0.5;
      }
    }
  }
} 

    // if(photo1.transparency == 0 && this.animationSwitchY>700){
    //   this.animationSwitchY = this.animationSwitchY-0.5;
    // }
  }
  

  display() {
    push();
    fill(234, 209, 220);
    stroke(213, 166, 189);
    for(let i =0;i<5;i++){
    rect(this.rectX , this.rectY, 420, 35);
    noStroke();
    fill(255,217,102);
    circle(this.animationSwitchX,this.animationSwitchY,15);
  }
    pop();
    push();
    textSize(20);
    for (let i = 0; i < this.emojis.length; i++) {
      text(this.emojis[i], this.emojiX[i], this.emojiY[i]);
    }
    pop();
  }

  positionCheck() {
    for (let i = 0; i < this.emojis.length; i++) {
    let d = dist(mouseX, mouseY, this.emojiX[i], this.emojiY[i]);
    if (d <20){
      this.isDragging[i] = true
    }
    }
  }

  animationCheck(){
    let switchDistance = dist(mouseX, mouseY, this.animationSwitchX, this.animationSwitchY)
    if(switchDistance < 20){
      work1 = true;
      work2 = true;
    }
  }
  
}


function mousePressed() {
  if (
    mouseY > 450 &&
    mouseY < 480&&
    mouseX > 300 &&
    mouseX < 500 &&
    cover1.y >= height-35
  ) {
    cover1.coverRemoved = true;
    cover1.dragCover = false;
  }

  if (cover1.y < 0) {
    cover1.cover = false;
    photo1.canBeshaked = true;
  }

  
  toolBroad.positionCheck();
  toolBroad.animationCheck();

} 

function mouseReleased() {
 
    for (let i = 0; i < toolBroad.emojis.length; i++) {
      toolBroad.isDragging[i] = false;
    }
  
}

function happysnap(){
  buttonSound.play();  
  photo1.y += 20;  
  cover1.y += 20;
  tint(255,116,194)
  photo1.pressShutter();
}

function sadsnap(){
  buttonSound.play();
  photo1.y += 20;  
  cover1.y += 20;
  tint(111,168,220);
  photo1.pressShutter();
}
function peacesnap(){
  buttonSound.play();
  photo1.y += 20;  
  cover1.y += 20;
  tint(182,215,168);
  photo1.pressShutter();
}




