let video;
let myPhoto;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a video capture (aka webcam input)
  video = createCapture(VIDEO);
  
  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  video.size(640, 480);

  // In some browsers, you may notice that a second video appears onscreen! That's because p5js actually creates a <video> html element, which then is piped into the canvas – the added command below ensures we don't see it :)
  video.hide();

  myPhoto = new Photo()
}




function draw() { 

  myPhoto.update();
  myPhoto.display();
}


class Photo{
  constructor(){
    this.x = 100;
    this.y = 100;
    this.w = 640; //same as webcam
    this.h = 480; //same as webcam
    this.img = createImage(640, 480); // empty image with same dimensions as webcam
  }
  pressShutter(){
    // get the video's current frame
    let currentVideoFrame = video.get();
    // assign frame to this photo object:
    this.img = currentVideoFrame
  }
  update(){

  }
  display(){
    push();
    translate(this.x, this.y);
    scale(0.4); // bring image to the size i want

    rect(0, 0, this.w, this.h); // placeholder
    image(this.img, 0, 0)

    pop();
  }
}

function mousePressed(){
  myPhoto.pressShutter();
}