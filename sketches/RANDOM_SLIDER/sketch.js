let pallete = ["#D8EC12", "#EC9696", "#FD3F04", "#29B4F3", "#32C338", "#D8AD2E"];
let spaceSlider;

function setup() {
  createCanvas(600, 600);
  frameRate(5);
  spaceSlider = createSlider(20, 150, 50);
  colorMode(HSB, 360, 100, 100, 1);
  angleMode(DEGREES); // Use degrees for angle calculations
  // noLoop(); // Generate the pattern only once
}

function draw() {
  background("#F9F9F9");
  translate(width / 2, height / 2); // Center the drawing
  
  let symmetry = 8; // Number of symmetry lines
  let angle = 360 / symmetry; // Angle between each symmetry line
  
  for (let i = 0; i < symmetry; i++) {
    rotate(angle);
    drawPattern();
    scale(-1, 1); // Mirror the drawing
    drawPattern();
    scale(-1, 1); // Reset scale
  }
}

function drawPattern() {
  let stepSize = spaceSlider.value();
  let maxRadius = width / 2;
  strokeWeight(2);
  
  for (let r = stepSize; r < maxRadius; r += stepSize) {
    let noiseVal = noise(r * 0.1);
    let shapeType = floor(noiseVal * 4); // Randomly choose shape
    let c = color(random(pallete));
    c.setAlpha(0.7); // Set transparency
    
    stroke(c);
    fill(c);
    
    if (shapeType == 0) {
      ellipse(0, r, r * 0.5, r * 0.5);
    } else if (shapeType == 1) {
      rect(-r * 0.25, r * 0.25, r * 0.5, r * 0.5);
    } else if (shapeType == 2) {
      triangle(-r * 0.5, r * 0.5, r * 0.5, r * 0.5, 0, r * 0.1);
    } else {
      line(-r * 0.5, r * 0.5, r * 0.5, r * 0.5);
    }
  }
}

function mousePressed() {
  redraw(); // Regenerate the pattern on mouse press
}
