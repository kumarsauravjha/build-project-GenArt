let pallete = ["#D8EC12", "#EC9696", "#FD3F04", "#29B4F3", "#32C338", "#D8AD2E"];

function setup() {
  createCanvas(600, 600);
  camera1 = createCapture(VIDEO);
  camera1.size(50, 50);
  camera1.hide();  
  noCursor();
}

function draw() {
  background("#0C0C0C");

  // Create a grid to display the webcam pixels as circles
  for(let camera_y = 0; camera_y < 50; camera_y++) {
    for(let camera_x = 0; camera_x < 50; camera_x++) {
      let x = camera_x * 10;
      let y = camera_y * 10;
      
      // Sample the color from the webcam feed
      let sample = camera1.get(camera_x, camera_y);
      let brightness = (sample[0] + sample[1] + sample[2]) / 3;
      
      // Choose color based on brightness
      let colorIndex = floor(map(brightness, 0, 255, 0, pallete.length));
      fill(pallete[colorIndex]);

      // Vary the size of the circle based on brightness
      let size = map(brightness, 0, 255, 5, 15);
      
      // Add a slight offset to create dynamic movement
      let xOffset = sin(frameCount * 0.1 + x * 0.05) * 2;
      let yOffset = cos(frameCount * 0.1 + y * 0.05) * 2;
      
      // Draw the circle
      noStroke();
      circle(x + xOffset, y + yOffset, size);
    }
  }
}
