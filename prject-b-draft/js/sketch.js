let photo1;
let cover1;
let picture;
let pictureIMG;
let camera;
let cameraIMG;
let cameraSelector = { video: {} };
let video;
let button;
let button1;
let button2;
let text1;
let buttonSound;
// let dragSound;
let isDragging = false;
let toolBroad;
let work1  = false;
let work2 = false;
let fountain = [];
let numFountain = 50;
let fountainY = 200;
let starfield;
let hintbox;
let music;


function preload(){
  cameraIMG =  loadImage("assets/camera.webp");
  penIMG = loadImage("assets/pen.jpg");
  buttonSound = loadSound("sounds/click.mp3");
  // dragSound = loadSound("sounds/dragging.mp3")
  music = loadSound("sounds/music.mp3")

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  colorMode(RGB, 255, 255, 255, 1);
  starfield = new Starfield();
  photo1 = new Photo();
  cover1 = new Cover();
  camera = new Camera(cameraIMG);
  text1 = new Text();
  toolBroad = new ToolBroad();
  hintbox = new hintBox();
  video = createCapture(VIDEO);
  video.size(160,120);
  video.hide();
  button = createButton('happy');
  button1 = createButton('sad');
  button2 = createButton('peace');
  button.mousePressed(happysnap);
  button1.mousePressed(sadsnap);
  button2.mousePressed(peacesnap);
  music.loop();
  navigator.mediaDevices.enumerateDevices().then(gotDevices);
}
  


function draw() {
  background(106,168,79);
  if (work1 == true){
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
 if(work2==true){
  starfield.update(); 
  starfield.display();
  } 
  photo1.display();
  photo1.update();
  cover1.display();
  cover1.update();
  camera.display();
  camera.update();
  hintbox.display();
  toolBroad.display();
  toolBroad.update();
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
    // fill(216,251,254);
    // rect(0,0,800,500);   
    translate(this.x, this.y);
      fill( 100, 200,this.hue,this.transparency);
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
    for (let i = 0; i < this.yArray.length; i++) {
      this.yArray[i] += 2; 
      if (this.yArray[i] > height) {
        
        this.yArray[i] = 0;
        this.xArray[i] = random(width); 
      }
    }
  }

  display(){
    fill(255,242,204);
    rect(0,0,800,500);
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
    this.hint = true;
    this.hint1 = false;
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
      textSize(13);
      textStyle(BOLD);
      fill(31,108,176);
      text('The photo will appear soon. Keep shaking!', hintbox.boxX+10,hintbox.boxY+15);
    }
    if (this.transparency <= 0){
      cover1.hint1 = false;
      fill(31,108,176);
      textSize(13);
      fill(0);
      textStyle(BOLD);
      fill(31,108,176);
      text('Great!Time to decorate!  ',hintbox.boxX+10,hintbox.boxY+40);
      text('The circles in the corner are clickable!',hintbox.boxX+10,hintbox.boxY+55);
      text('But you can only choose one.',hintbox.boxX+10,hintbox.boxY+70);
    }

    if(this.hint == true){
      fill(31,108,176);
      textStyle(BOLD);
      textSize(13);
      text('Choose a mood and click it!',hintbox.boxX+5,hintbox.boxY+20);
    }

    if(this.hint1 == true){
      fill(31,108,176);
      textSize(13);
      textStyle(BOLD);
      text('Drag the red point to pull the polaroid out!',hintbox.boxX+5,hintbox.boxY+40);
      text ('When u can not drag it anymore',hintbox.boxX+5,hintbox.boxY+55);
      text('click on the red dot',hintbox.boxX+5,hintbox.boxY+70);
    }
  }
}

class Cover {
  constructor() {
    this.x = width / 2;
    this.y = 280;
    this.coverRemoved = false;
    this.cover = true;
    this.dragCover = false;
    this.hint = false;
    this.hint1 = false;
  }

  update() {
    if (this.dragCover == true){
      this.y = mouseY;
    }
    if (mouseIsPressed == true && mouseY > 220 && mouseY < height-20 && this.y<475) {
      this.dragCover = true;
      // dragSound = true;
    } else{
      this.dragCover = false;
    }


    // if (this.dragCover == true&&photo1.dragPhoto == true)
    //   {
    //   dragSound.play();
    // }else{
    //   dragSound.stop();
    // }

    if (this.coverRemoved == true&&this.y>0) {
      this.y = this.y - 2;
    }

    if(this.y<0){
      photo1.hint1 = false;
      this.hint1 = true;
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
    if(this.hint1 == true){
      fill(31,108,176);
      textSize(13);
      textStyle(BOLD);
      text('Shake it to make the image appear',hintbox.boxX+5,hintbox.boxY+25);
    }
  }

}


class Camera{
  constructor(cameraIMG){
   this.x = width/2;
   this.y = height/2;
   this.camera = cameraIMG;
  //  this.cameraDisappear = false
  }
 
  update(){
  if(mouseIsPressed==true&&mouseX<width&&mouseY<height){
    this.y = this.y-3
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
    this.animationSwitchY = 510;
    this.hint = false;
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

      if(this.animationSwitchY>400){
        this.animationSwitchY -= 0.5;
      }
     }
    } 
   } 
  }
  

  display() {
    push();
    fill(234, 209, 220);
    stroke(213, 166, 189);
    rect(this.rectX , this.rectY, 450, 35);
    noStroke();
    fill(255,217,102);
    textSize(10);
    textStyle(NORMAL);
    circle(this.animationSwitchX,this.animationSwitchY,15);
    text('blue confetti',this.animationSwitchX-70,this.animationSwitchY);
    fill(247,211,211)
    circle(this.animationSwitchX,this.animationSwitchY+30,15);
    text('fallin stars',this.animationSwitchX-70,this.animationSwitchY+30);
    fill(56,118,29);
    text('original',this.animationSwitchX+40,this.animationSwitchY);
    circle(this.animationSwitchX+20,this.animationSwitchY,15);
    fill(224,102,102);
    rect(this.animationSwitchX+20,this.animationSwitchY+25,15,15);
    pop();
    push();
    textSize(20);
    for (let i = 0; i < this.emojis.length; i++) {
      fill(0);
      text(this.emojis[i], this.emojiX[i], this.emojiY[i]);
    }
    

    if(this.hint == true){
    fill(31,108,176);
    textSize(13);
    textStyle(BOLD);
    text('Wnna save it?Click the square!',hintbox.boxX+10,hintbox.boxY+25);
    pop();
    }
  }

  positionCheck() {
    for (let i = 0; i < this.emojis.length; i++) {
    let d = dist(mouseX, mouseY, this.emojiX[i], this.emojiY[i]);
    if (d <20){
      this.isDragging[i] = true
    }
    }
  }

  originalCheck(){
    let switchDistance4 = dist(mouseX, mouseY, this.animationSwitchX+20, this.animationSwitchY);
    if(switchDistance4 < 15){
      work1 = false;
      work2 = false;
    }
  }

  fountainCheck(){
    let switchDistance = dist(mouseX, mouseY, this.animationSwitchX, this.animationSwitchY);
    if(switchDistance < 20){
      work1 = true;
      work2 = false;
      this.hint = true;
    }
  }

  

  starsCheck(){
    let switchDistance2 = dist(mouseX, mouseY, this.animationSwitchX, this.animationSwitchY+30);
    if(switchDistance2 < 20){
      work2 = true;
      work1 = false;
      this.hint = true;
    }
  }

  shotCheck(){
    let switchDistance3 = dist(mouseX, mouseY, this.animationSwitchX+20, this.animationSwitchY+15);
    if(switchDistance3 < 5){
      saveCanvas('digitalPolaroid.jpg');
    }
  }
  
}

class hintBox{
  constructor(){
    this.boxX = 10;
    this.boxY = 300;
  }
  display(){
    push();
    stroke(111,168,220);
    strokeWeight(3);
    fill(207,226,243,0.3);
    rect(this.boxX,this.boxY,270,80);
    pop();
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

  toolBroad.starsCheck();
  toolBroad.positionCheck();
  toolBroad.fountainCheck();
  toolBroad.shotCheck();
  toolBroad.originalCheck();
  

} 

function mouseReleased() {
 
    for (let i = 0; i < toolBroad.emojis.length; i++) {
      toolBroad.isDragging[i] = false;
    }
  
}

function happysnap(){
  photo1.hint = false;
  photo1.hint1 = true;
  buttonSound.play();  
  photo1.y += 20;  
  cover1.y += 20;
  tint(255,116,194)
  photo1.pressShutter();
}

function sadsnap(){
  photo1.hint = false;
  photo1.hint1 = true;
  buttonSound.play();
  photo1.y += 20;  
  cover1.y += 20;
  tint(111,168,220);
  photo1.pressShutter();
}
function peacesnap(){
  photo1.hint = false;
  photo1.hint1 = true;
  buttonSound.play();
  photo1.y += 20;  
  cover1.y += 20;
  tint(182,215,168);
  photo1.pressShutter();
}
function gotDevices(deviceInfos) {
  for (let i = 0; i < deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.label === "HD Pro Webcam C920 (046d:082d)") {
      console.log(deviceInfo);
      cameraSelector.video = deviceInfo; 
      break;
    }
  }

  
}




