let saveCvs;
let canvas;
let saveCvsBool = false;

// Function for first canvas
function sketch1(p) {
  p.setup = function () {
    canvas = p.createCanvas(500, 400);
    canvas.parent("p5-canvas-container");
    p.background(0);
  };
  p.draw = function () {
    p.circle(p.mouseX, p.mouseY, 50);
  };
  p.mousePressed = function () {
    // STORE THE FIRST CANVAS IN A VARIABLE >>
    saveCvs = p.get();
    saveCvsBool = true;
    // console.log(saveCvs);

    // MAKE SECOND CANVAS VISIBLE >>
    document.getElementById("test-p5-canvas-container").style.visibility =
      "visible";

    // HIDE FIRST CANVAS + DISPLAY SECOND CANVAS >>
    // document.getElementById("test-p5-canvas-container").style.display = "block";
    // document.getElementById("p5-canvas-container").style.display = "none";
  };
}

// Run first p5 instance
new p5(sketch1);
