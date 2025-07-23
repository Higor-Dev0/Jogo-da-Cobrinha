const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = "right";
let food = randomFood();

function randomFood() {
    return {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function update(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'right') direction = 'left';
    if (key === 38 && direction !== 'down') direction = 'up';
    if (key === 39 && direction !== 'left') direction = 'right';
    if (key === 40 && direction !== 'up') direction = 'down';
}
document.addEventListener('keydown', update);

function gameOver() {
    clearInterval(jogo);
    alert('Game Over :(');
}

function iniciarJogo() {
    const head = snake[0];

    // Colisões com bordas
    if (head.x >= 16 * box && direction === "right") head.x = 0;
    if (head.x < 0 && direction === "left") head.x = 15 * box;
    if (head.y >= 16 * box && direction === "down") head.y = 0;
    if (head.y < 0 && direction === "up") head.y = 15 * box;

    // Colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = head.x;
    let snakeY = head.y;

    if (direction === "right") snakeX += box;
    else if (direction === "left") snakeX -= box;
    else if (direction === "up") snakeY -= box;
    else if (direction === "down") snakeY += box;

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {
        food = randomFood();
    }

    snake.unshift({ x: snakeX, y: snakeY });
}

const jogo = setInterval(iniciarJogo, 100);
