const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 50;
const tileCount = canvas.width / gridSize;
let snakeImage = new Image();
let foodImage = new Image();
snakeImage.src = 'snakeimage.jpg';
foodImage.src = 'foodimage.png';

let snake = [{x: gridSize * 2, y: gridSize * 2}];
let food = {x: 0, y: 0};
let score = 0;
let speed = {x: 1, y: 0};

document.addEventListener('keydown', moveSnake);
generateFood();

// Добавлено: функция для проверки загрузки изображений
function imagesLoaded() {
  return snakeImage.complete && foodImage.complete;
}

function gameLoop() {
  if (!imagesLoaded()) {
    setTimeout(gameLoop, 50);
    return;
  }
  updateSnakePosition();
  checkForGameOver();
  drawGame();
  setTimeout(gameLoop, 250);
}

function updateSnakePosition() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = {...snake[i - 1]};
  }
  snake[0].x += speed.x * gridSize;
  snake[0].y += speed.y * gridSize;
}

function checkForGameOver() {
  if (snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= canvas.width || snake[0].y >= canvas.height) {
    snake = [{x: gridSize * 2, y: gridSize * 2}];
    speed = {x: 1, y: 0};
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      snake = [{x: gridSize * 2, y: gridSize * 2}];
      speed = {x: 1, y: 0};
    }
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(({x, y}) => {
    ctx.drawImage(snakeImage, x, y, gridSize, gridSize);
  });
  ctx.drawImage(foodImage, food.x, food.y, gridSize, gridSize);
  if (snake[0].x === food.x && snake[0].y === food.y) {
    generateFood();
    snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
    score++; // Увеличиваем счёт
    document.getElementById('score').textContent = score; // Обновляем счётчик очков на странице
  }
}



function generateFood() {
  let isValidPosition;
  do {
    food = {
      x: Math.floor(Math.random() * tileCount) * gridSize,
      y: Math.floor(Math.random() * tileCount) * gridSize
    };
    isValidPosition = true;
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === food.x && snake[i].y === food.y) {
        isValidPosition = false;
        break;
      }
    }
  } while (!isValidPosition);
}

function moveSnake(event) {
  const arrowKeys = {
    37: {x: -1, y: 0}, // Left
    38: {x: 0, y: -1}, // Up
    39: {x: 1, y: 0}, // Right
    40: {x: 0, y: 1} // Down
  };

  const newDirection = arrowKeys[event.keyCode];

  if (newDirection) {
    const oppositeDirection = (speed.x === -newDirection.x && speed.y === -newDirection.y);

    if (!oppositeDirection) {
      speed = newDirection;
    }
  }
}

gameLoop();

document.getElementById('upArrow').addEventListener('click', () => setDirection(0, -1));
document.getElementById('leftArrow').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('rightArrow').addEventListener('click', () => setDirection(1, 0));
document.getElementById('downArrow').addEventListener('click', () => setDirection(0, 1));

function setDirection(x, y) {
  const oppositeDirection = (speed.x === -x && speed.y === -y);
  if (!oppositeDirection) {
    speed = {x, y};
  }
}
