let grid;
let pacMan;
let dots = [];
let enemies = [];
let gridRows = 10;
let gridCols = 10;
let cellSize = 60;
let score = 0;

function setup() {
  createCanvas(gridCols * cellSize, gridRows * cellSize);
  grid = new Grid(gridRows, gridCols, cellSize);
  pacMan = new PacMan(grid, 1, 1);
  
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      if (grid.isWalkable(i, j)) {
        dots.push(new Dot(i, j, cellSize));
      }
    }
  }
  
  enemies.push(new Enemy(grid, 8, 8));
  // enemies.push(new Enemy(grid, 2, 7));
  enemies.push(new Enemy(grid, 5, 2));
}

function draw() {
  background(220);
  frameRate(5);
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
  
  textSize(20);
  fill(0);
  text(`Score: ${score}`, 10, 20);
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

function checkCollisions() {
  for (let i = dots.length - 1; i >= 0; i--) {
    if (pacMan.x === dots[i].x && pacMan.y === dots[i].y) {
      dots.splice(i, 1);
      score++;
    }
  }
  
  for (let enemy of enemies) {
    if (pacMan.x === enemy.x && pacMan.y === enemy.y) {
      noLoop();
      textSize(32);
      textAlign(CENTER, CENTER);
      text('Game Over', width / 2, height / 2);
    }
  }
}

function checkWinCondition() {
  if (dots.length === 0) {
    noLoop();
    textSize(32);
    textAlign(CENTER, CENTER);
    text('You Win!', width / 2, height / 2);
  }
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
        } else {
          fill(255);
        }
        rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
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
  }
  
  paint() {
    fill(255, 255, 0);
    ellipse(
      this.x * this.grid.cellSize + this.grid.cellSize / 2,
      this.y * this.grid.cellSize + this.grid.cellSize / 2,
      this.grid.cellSize * 0.8
    );
  }
}

class Dot {
  constructor(row, col, cellSize) {
    this.x = col;
    this.y = row;
    this.cellSize = cellSize;
  }
  
  paint() {
    fill(255, 182, 193);
    ellipse(
      this.x * this.cellSize + this.cellSize / 2,
      this.y * this.cellSize + this.cellSize / 2,
      this.cellSize * 0.3
    );
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
    fill(255, 0, 0);
    ellipse(
      this.x * this.grid.cellSize + this.grid.cellSize / 2,
      this.y * this.grid.cellSize + this.grid.cellSize / 2,
      this.grid.cellSize * 0.8
    );
  }
}
