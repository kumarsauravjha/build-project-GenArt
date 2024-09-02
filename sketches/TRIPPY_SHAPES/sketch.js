function setup() {
  createCanvas(600, 600);
  noCursor();
  frameRate(30);
  colorMode(HSB, 360, 100, 100, 1); // Use HSB color mode for vibrant color changes
}

function draw() {
  background(220, 0.1); // Light gray background with transparency for a trailing effect
  
  let x = width / 2;
  let y = height / 2;
  
  strokeWeight(2);
  let hueValue = (frameCount % 360); // Cycle through hues
  
  // Increase the size and brightness of the mouse circle
  let size = cos(frameCount * 0.05) * 100 + 80; // Larger size for more dominance
  
  // Apply a vibrant and dominant fill color
  fill(hueValue, 80, 100, 0.9); // Bright and vibrant color
  stroke(0, 0, 0, 0.5); // Soft black stroke for contrast

  // Draw a larger circle at the mouse position with a glow effect
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(hueValue, 100, 100);
  circle(mouseX, mouseY, size);
  drawingContext.shadowBlur = 0; // Reset shadow for other elements

  // Add another rotating shape at the center
  push();
  translate(x, y);
  rotate(frameCount * 0.05);
  noFill();
  stroke((hueValue + 180) % 360, 100, 100);
  rectMode(CENTER);
  rect(0, 0, size * 0.5, size * 0.5); // Adjusted size to maintain balance with the mouse circle
  pop();
  
  // Add some randomly scattered smaller circles
  for (let i = 0; i < 5; i++) {
    let randomX = random(width);
    let randomY = random(height);
    let randomSize = random(10, 30); // Larger circles for better visibility
    fill((hueValue + 90) % 360, 70, 100, 0.8); // Brighter and more vibrant colors
    noStroke();
    circle(randomX, randomY, randomSize);
  }
}
