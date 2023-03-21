function setCanvasSize() {
  const maxWidth = Math.floor(window.innerWidth * 0.9);
  const maxHeight = Math.floor(window.innerHeight * 0.5);
  const size = Math.min(maxWidth, maxHeight);
  const gridSize = 20;

  const adjustedSize = Math.floor(size / gridSize) * gridSize;
  canvas.width = adjustedSize;
  canvas.height = adjustedSize;
}


const canvas = document.getElementById("gameCanvas");
setCanvasSize();
const ctx = canvas.getContext("2d");
const snakeImage = new Image();
snakeImage.src = "snakeimage.jpg";
const foodImage = new Image();
foodImage.src = "foodimage.png";

const snakeSpeed = 100;
let snake = [{ x: 300, y: 300 }];
let food = { x: 200, y: 200 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameOver = false;
let interval;



function startGame() {
  document.addEventListener("keydown", changeDirection);
  interval = setInterval(updateGame, snakeSpeed);
  document.getElementById("restartBtn").addEventListener("click", restartGame);
  }

  function updateGame() {
  if (gameOver) {
  return;
  }

  moveSnake();

  if (hasSnakeCollidedWithItself() || hasSnakeEatenFood()) {
  gameOver = true;
  showGameOver();
  return;
  }

  drawCanvas();
  }

  function moveSnake() {
  const head = {
  x: snake[0].x + direction.x,
  y: snake[0].y + direction.y
  };

  head.x = head.x >= canvas.width ? 0 : head.x < 0 ? canvas.width - 20 : head.x;
  head.y = head.y >= canvas.height ? 0 : head.y < 0 ? canvas.height - 20 : head.y;

  snake.unshift(head);
  snake.pop();
  }

  function changeDirection(e) {
  if (e.key === "ArrowUp" && direction.y === 0) {
  direction = { x: 0, y: -20 };
  } else if (e.key === "ArrowDown" && direction.y === 0) {
  direction = { x: 0, y: 20 };
  } else if (e.key === "ArrowLeft" && direction.x === 0) {
  direction = { x: -20, y: 0 };
  } else if (e.key === "ArrowRight" && direction.x === 0) {
  direction = { x: 20, y: 0 };
  }
  }

  function hasSnakeCollidedWithItself() {
  for (let i = 1; i < snake.length; i++) {
  if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
  return true;
  }
  }
  return false;
  }

  function hasSnakeEatenFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
  generateNewFood();
  increaseSnakeLength();
  updateScore();
  return false;
  }
  return false;
  }

  function generateNewFood() {
  food = {
  x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
  y: Math.floor(Math.random() * (canvas.height / 20)) * 20
  };
  }

  function increaseSnakeLength() {
  snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
  }

  function updateScore() {
  score += 10;
  document.getElementById("score").innerText = score;
  }

  function showGameOver() {
  clearInterval(interval);
  document.getElementById("finalScore").innerText = score;
  document.getElementById("gameOver").classList.remove("hidden");
  }

  function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "green";
  for (const segment of snake) {
  ctx.drawImage(snakeImage, segment.x, segment.y, 20, 20);
  }

  // Draw food
  ctx.drawImage(foodImage, food.x, food.y, 20, 20);
  }

  function restartGame() {
  snake = [{ x: 300, y: 300 }];
  food = { x: 200, y: 200 };
  direction = { x: 0, y: 0 };
  score = 0;
  gameOver = false;
  updateScore();
  document.getElementById("gameOver").classList.add("hidden");
  interval = setInterval(updateGame, snakeSpeed);
  }

  startGame();
