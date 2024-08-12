const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballRadius = 10;
let ballSpeedX = 0;
let ballSpeedY = 0;
let hoopX = canvas.width / 2 - 50;
let hoopY = 50;
let hoopWidth = 100;
let hoopHeight = 10;
let gravity = 0.2;
let isShooting = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hoop
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(hoopX, hoopY, hoopWidth, hoopHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();

    // Update ball position
    if (isShooting) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        ballSpeedY += gravity;

        // Check for collision with hoop
        if (ballX > hoopX && ballX < hoopX + hoopWidth && ballY - ballRadius < hoopY + hoopHeight) {
            score += 1;
            document.getElementById('score').textContent = `Score: ${score}`;
            resetBall();
        }

        // Check for ball out of bounds
        if (ballY > canvas.height || ballX < 0 || ballX > canvas.width) {
            resetBall();
        }
    }

    requestAnimationFrame(draw);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballSpeedX = 0;
    ballSpeedY = 0;
    isShooting = false;
}

function shootBall() {
    if (!isShooting) {
        ballSpeedX = Math.random() * 4 - 2; // Random horizontal speed
        ballSpeedY = -6; // Fixed vertical speed
        isShooting = true;
    }
}

function handleKeyPress(event) {
    if (event.code === 'Space') {
        shootBall();
    }
}

function restartGame() {
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    resetBall();
}

function showInstructions() {
    const modal = document.getElementById('instructionsModal');
    modal.style.display = 'flex';
}

function closeInstructions() {
    const modal = document.getElementById('instructionsModal');
    modal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('instructionsModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('keydown', handleKeyPress);
draw();

function goBack() {
    window.location.href = 'games.html';
}

