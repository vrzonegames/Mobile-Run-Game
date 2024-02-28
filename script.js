const player = document.getElementById('player');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let score = 0;

let isJumping = false;
let isGameOver = false;
let obstacles = [];

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart() {
  if (!isJumping && !isGameOver) {
    isJumping = true;
    jump();
  }
}

function handleTouchEnd() {
  // No action needed for touch end
}

function jump() {
  let position = 0;
  const jumpInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(jumpInterval);
      const fallInterval = setInterval(() => {
        if (position === 0) {
          clearInterval(fallInterval);
          isJumping = false;
        } else {
          position -= 5;
          player.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 5;
      player.style.bottom = position + 'px';
    }
  }, 20);
}

function moveObstacle(obstacle) {
  let position = 100;
  const moveInterval = setInterval(() => {
    if (position < -50) {
      clearInterval(moveInterval);
      game.removeChild(obstacle);
      obstacles = obstacles.filter(item => item !== obstacle);
      createObstacle();
    } else if (position > 0 && position < 10 && player.style.bottom === '0px') {
      score++;
      scoreDisplay.innerText = 'Score: ' + score;
    } else if (
      position <= 50 &&
      position >= 0 &&
      obstacle.offsetLeft <= player.offsetLeft + player.offsetWidth &&
      obstacle.offsetLeft + obstacle.offsetWidth >= player.offsetLeft &&
      player.style.bottom === '0px'
    ) {
      clearInterval(moveInterval);
      endGame();
    } else {
      position -= 1;
      obstacle.style.left = position + '%';
    }
  }, 20);
}

function createObstacle() {
  if (!isGameOver) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '100%';
    game.appendChild(obstacle);
    obstacles.push(obstacle);
    moveObstacle(obstacle);
  }
}

function endGame() {
  isGameOver = true;
  alert('Game Over! Your score: ' + score);
  resetGame();
}

function resetGame() {
  isGameOver = false;
  isJumping = false;
  score = 0;
  scoreDisplay.innerText = 'Score: 0';
  obstacles.forEach(obstacle => game.removeChild(obstacle));
  obstacles = [];
  player.style.bottom = '0px';
  createObstacle();
}

createObstacle();
