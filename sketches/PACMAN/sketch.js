let grid;
let pacMan;
let dots = [];
let enemies = [];
let gridRows = 10;
let gridCols = 10;
let cellSize = 50;
let score = 0;
let gameOver = false;
let gameWon = false;
let restartTimer = 0;

function setup() {
  createCanvas(gridCols * cellSize, gridRows * cellSize);
  frameRate(5);  // Adjust the frame rate for smoother gameplay
  startNewGame();
}

function draw() {
  background(30);  // Dark background
  
  if (gameOver || gameWon) {
    handleGameEnd();
    return;
  }

  grid.paint();
  
  for (let dot of dots) {
    dot.paint();
  }
  
  pacMan.move();
  pacMan.paint();
  
  for (let enemy of enemies) {
    enemy.move();
    enemy.paint();
  }
  
  checkCollisions();
  checkWinCondition();
  
  displayScore();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    pacMan.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    pacMan.setDirection(1, 0);
  } else if (keyCode === UP_ARROW) {
    pacMan.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    pacMan.setDirection(0, 1);
  }
}

function startNewGame() {
  grid = new Grid(gridRows, gridCols, cellSize);
  pacMan = new PacMan(grid, 1, 1);
  dots = [];
  enemies = [];
  score = 0;
  gameOver = false;
  gameWon = false;
  
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      if (grid.isWalkable(i, j)) {
        dots.push(new Dot(i, j, cellSize));
      }
    }
  }
  
  // Add multiple enemies
  enemies.push(new Enemy(grid, 8, 8));
  // enemies.push(new Enemy(grid, 2, 7));
  enemies.push(new Enemy(grid, 5, 2));
}

function checkCollisions() {
  for (let i = dots.length - 1; i >= 0; i--) {
    if (pacMan.x === dots[i].x && pacMan.y === dots[i].y) {
      dots.splice(i, 1);
      score++;
    }
  }
  
  for (let enemy of enemies) {
    if (pacMan.x === enemy.x && pacMan.y === enemy.y) {
      gameOver = true;
      restartTimer = millis();
    }
  }
}

function checkWinCondition() {
  if (dots.length === 0) {
    gameWon = true;
    restartTimer = millis();
  }
}

function handleGameEnd() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 100, 100);
  if (gameOver) {
    text('Game Over', width / 2, height / 2);
  } else if (gameWon) {
    text('You Win!', width / 2, height / 2);
  }
  
  // Restart the game after a short delay
  if (millis() - restartTimer > 2000) {
    startNewGame();
  }
}

function displayScore() {
  textSize(20);
  fill(255);
  textAlign(LEFT, TOP);
  text(`Score: ${score}`, 10, 10);
}

class Grid {
  constructor(rows, cols, cellSize) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }
  
  paint() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] === 1) {
          fill(0);
          stroke(100);
          strokeWeight(2);
          rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        } else {
          fill(50);
          noStroke();
          rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }
  
  isWalkable(row, col) {
    return this.grid[row][col] === 0;
  }
}

class PacMan {
  constructor(grid, row, col) {
    this.grid = grid;
    this.x = col;
    this.y = row;
    this.dirX = 0;
    this.dirY = 0;
    this.mouthAngle = 0;
    this.mouthOpening = true;
  }
  
  setDirection(dx, dy) {
    this.dirX = dx;
    this.dirY = dy;
  }
  
  move() {
    let newX = this.x + this.dirX;
    let newY = this.y + this.dirY;
    
    if (this.grid.isWalkable(newY, newX)) {
      this.x = newX;
      this.y = newY;
    }

    // Animate the mouth opening and closing
    if (this.mouthOpening) {
      this.mouthAngle += 0.1;
      if (this.mouthAngle > PI / 4) {
        this.mouthOpening = false;
      }
    } else {
      this.mouthAngle -= 0.1;
      if (this.mouthAngle < 0) {
        this.mouthOpening = true;
      }
    }
  }
  
  paint() {
    fill(255, 255, 0);
    push();
    translate(
      this.x * this.grid.cellSize + this.grid.cellSize / 2,
      this.y * this.grid.cellSize + this.grid.cellSize / 2
    );
    let angle = 0;
    if (this.dirX === 1) angle = 0; // Right
    if (this.dirX === -1) angle = PI; // Left
    if (this.dirY === 1) angle = PI / 2; // Down
    if (this.dirY === -1) angle = -PI / 2; // Up
    rotate(angle);

    // Draw the Pac-Man body with mouth
    arc(0, 0, this.grid.cellSize * 0.8, this.grid.cellSize * 0.8, this.mouthAngle, TWO_PI - this.mouthAngle, PIE);

    pop();
  }
}

class Dot {
  constructor(row, col, cellSize) {
    this.x = col;
    this.y = row;
    this.cellSize = cellSize;
    this.glow = random(100, 255);
  }
  
  paint() {
    fill(255,this.glow, 193);
    noStroke();
    ellipse(
      this.x * this.cellSize + this.cellSize / 2,
      this.y * this.cellSize + this.cellSize / 2,
      this.cellSize * 0.3
    );

    // Make the dot pulsate
    this.glow = this.glow + sin(frameCount / 10) * 2;
  }
}

class Enemy {
  constructor(grid, row, col) {
    this.grid = grid;
    this.x = col;
    this.y = row;
  }
  
  move() {
    let possibleMoves = [];
    
    if (this.grid.isWalkable(this.y - 1, this.x)) possibleMoves.push({ x: 0, y: -1 });
    if (this.grid.isWalkable(this.y + 1, this.x)) possibleMoves.push({ x: 0, y: 1 });
    if (this.grid.isWalkable(this.y, this.x - 1)) possibleMoves.push({ x: -1, y: 0 });
    if (this.grid.isWalkable(this.y, this.x + 1)) possibleMoves.push({ x: 1, y: 0 });
    
    let move = random(possibleMoves);
    this.x += move.x;
    this.y += move.y;
  }
  
  paint() {
    // Add a gradient effect to the enemies
    let gradient = drawingContext.createRadialGradient(0, 0, this.grid.cellSize * 0.1, 0, 0, this.grid.cellSize * 0.4);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    drawingContext.fillStyle = gradient;

    push();
    translate(
      this.x * this.grid.cellSize + this.grid.cellSize / 2,
      this.y * this.grid.cellSize + this.grid.cellSize / 2
    );
    ellipse(0, 0, this.grid.cellSize * 0.8);
    pop();
  }
}
