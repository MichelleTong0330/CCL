let video;
let button;
let button1;
let button2;

function setup(){
  createCanvas(320, 240);
  background(51);
  video = createCapture(VIDEO);
  video.size(320,240);
  button = createButton('happy');
  button1 = createButton('sad');
  button2 = createButton('peace');
  button.mousePressed(happysnap);
  button1.mousePressed(sadsnap);
  button2.mousePressed(peacesnap);
  colorMode(RGB, 255, 255, 255, 1);
}

function happysnap(){
  tint(255,116,194)
  image(video,0,0);
}

function sadsnap(){
  tint(111,168,220);
  image(video,0,0);
}

function peacesnap(){
  tint(182,215,168);
  image(video,0,0);
}

function draw(){

}