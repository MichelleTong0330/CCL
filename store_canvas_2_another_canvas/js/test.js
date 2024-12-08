// Function for second canvas
function sketch2(p) {
  p.setup = function () {
    let testCvs = p.createCanvas(500, 400);
    testCvs.parent("test-p5-canvas-container");
    p.background(220);
  };
  p.draw = function () {
    // p.square(p.mouseX, p.mouseY, 50);
    if (saveCvsBool) {
      // DRAW THE CAPTURED CANVAS IN THE SECOND CANVAS >>
      p.image(saveCvs, 0, 0);
    }
  };
}

// Run second p5 instance
new p5(sketch2);
