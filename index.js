// === Canvas Setup ===
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// === Game Variables ===
let box = 20;
let snake = [{x: 200, y: 200}];
let direction = 'RIGHT';
let star = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box
};
let score = 0;
let speed = 100; // Base speed (milliseconds between moves)
let gameInterval;

// === Event Listeners ===
document.addEventListener('keydown', setDirection);

// === Set Snake Direction ===
function setDirection(event) {
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

// === Draw Snake ===
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#333';
    ctx.strokeRect(snake[i].x, snake[i.y], box, box);
  }
}

// === Draw Star (Food) ===
function drawStar() {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(star.x + box/2, star.y + box/2, box/2, 0, Math.PI * 2);
  ctx.fill();
}

// === Check Collision ===
function collision(newHead, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

// === Main Draw Function ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawSnake();
  drawStar();

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === 'LEFT') headX -= box;
  if (direction === 'UP') headY -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'DOWN') headY += box;

  let newHead = {x: headX, y: headY};

  if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height || collision(newHead, snake)) {
    clearInterval(gameInterval);
    document.getElementById('gameOver').classList.remove('hidden');
    return;
  }

  if (headX === star.x && headY === star.y) {
    score++;
    star = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
    
    // === Increase Speed ===
    speed = Math.max(30, speed - 5); // Minimum speed limit (30ms)
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, speed);
  } else {
    snake.pop();
  }

  snake.unshift(newHead);

  // Draw Score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
}

// === Restart Game ===
function restartGame() {
  snake = [{x: 200, y: 200}];
  direction = 'RIGHT';
  score = 0;
  speed = 200;
  document.getElementById('gameOver').classList.add('hidden');
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, speed);
}

// === Start the Game ===
restartGame();
