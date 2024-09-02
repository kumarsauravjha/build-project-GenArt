let shapes = [];
let numShapes = 50; // Increased number of shapes
let maxMove = 100; // Maximum movement range for shapes and text
let shapeSize = 80; // Base size for shapes

let textObj;
let bgImage;

function preload() {
  bgImage = loadImage('genAI_background.png'); // Load the background image
  // customFont = loadFont('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap'); // Load the font

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(80);
  textFont('Space Grotesk');

  // Initialize the floating text as an object
  textObj = {
    x: width / 2,
    y: height / 2,
    xSpeed: random(-2, 2), // Increased speed for faster movement
    ySpeed: random(-2, 2),
    size: 50, // Size for easier interaction checks
  };

  // Initialize shapes with random positions and velocities
  for (let i = 0; i < numShapes; i++) {
    shapes.push({
      x: random(width),
      y: random(height),
      size: random(20, shapeSize),
      xSpeed: random(-2, 2), // Increased speed for faster movement
      ySpeed: random(-2, 2),
      type: random(["circle", "square"]),
    });
  }

  frameRate(30); // Set a reasonable frame rate for smooth performance
}

function draw() {
  background(bgImage);

  // Update and draw the floating text
  updatePosition(textObj);
  checkMouseInteraction(textObj);

  fill(0);
  noStroke();
  text("Saurav's Generative", textObj.x, textObj.y);
  textSize(40);
  text("Art Gallery", textObj.x, textObj.y + 60);

  // Update and draw shapes
  noStroke();
  fill(0, 50); // Semi-transparent shapes
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    updatePosition(shape);
    checkMouseInteraction(shape);

    if (shape.type === "circle") {
      ellipse(shape.x, shape.y, shape.size);
    } else if (shape.type === "square") {
      rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    }
  }
}

// Function to update position with screen wrap-around
function updatePosition(obj) {
  obj.x += obj.xSpeed;
  obj.y += obj.ySpeed;

  if (obj.x > width) obj.x = 0;
  if (obj.x < 0) obj.x = width;
  if (obj.y > height) obj.y = 0;
  if (obj.y < 0) obj.y = height;
}

// Function to check for mouse interaction
function checkMouseInteraction(obj) {
  let d = dist(mouseX, mouseY, obj.x, obj.y);
  if (d < 100) {
    let angle = atan2(obj.y - mouseY, obj.x - mouseX);
    obj.x += cos(angle) * 5; // Increased interaction intensity
    obj.y += sin(angle) * 5;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
