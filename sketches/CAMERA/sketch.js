let x = 0;  // Change from y to x for horizontal movement

function setup() {
  createCanvas(600, 600);
  frameRate(30);  
  camera1 = createCapture(VIDEO);
  camera1.size(600, 600);
  camera1.hide();
}

function draw() {
  // A semi-transparent black background to create a trailing effect
  // background(0, 10);
     
  // Display the webcam feed as a vertical strip moving across the screen
  image(camera1, 
       x, 0 , width, height, // Adjust the dimensions for a vertical strip
       x, 0, width, height);

  // Draw an outline around the strip
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x, 0, 20, height);

  // Increment x to move the strip across the screen
  x = (x + 10) % width; // Move horizontally and wrap around
}
