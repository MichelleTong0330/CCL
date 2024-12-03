let cameraSelector = { video: {} };//leon's code at the bottom uses this variable 
let button;
let capture;

function setup() {
  createCanvas(720, 400);
  background(51);
  capture = createCapture(cameraSelector);
  capture.size(360, 200);
  capture.hide(); 
  button = createButton('snap');
  button.mousePressed(takesnap);
  colorMode(RGB, 255, 255, 255, 1);
  navigator.mediaDevices.enumerateDevices().then(gotDevices);
}


// LEON's code adapted from: https://github.com/processing/p5.js/issues/1043
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



function takesnap() {
  
  image(capture, 0, 0);// this line keeps drawing the latest pixels from camera onto the canvas

}

function draw() {
  // background(51);
  
}
