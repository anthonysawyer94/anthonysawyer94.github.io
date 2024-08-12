let board;
let boardSize = 4;
let score = 0;

function initializeBoard() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    score = 0; // Reset score when restarting
    document.getElementById('score').textContent = `Score: ${score}`;
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    const emptyTiles = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === null) emptyTiles.push({ r, c });
        }
    }
    if (emptyTiles.length === 0) return;

    const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% for 4
}

function updateBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const tile = document.createElement('div');
            const value = board[r][c];
            if (value) {
                tile.classList.add('tile', `tile-${value}`);
                tile.textContent = value;
            } else {
                tile.classList.add('tile');
            }
            boardElement.appendChild(tile);
        }
    }

    document.getElementById('score').textContent = `Score: ${score}`;
}

function slideRow(row) {
    let arr = row.filter(tile => tile !== null);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            score += arr[i] * 2; // Increase score based on the value of the merged tiles
            arr[i] *= 2;
            arr[i + 1] = null;
        }
    }
    arr = arr.filter(tile => tile !== null);
    while (arr.length < boardSize) {
        arr.push(null);
    }
    return arr;
}

function slideTiles(direction) {
    for (let i = 0; i < boardSize; i++) {
        let row;
        if (direction === 'left' || direction === 'right') {
            row = board[i];
            if (direction === 'right') row.reverse();
            row = slideRow(row);
            if (direction === 'right') row.reverse();
            board[i] = row;
        } else {
            row = board.map(r => r[i]);
            if (direction === 'down') row.reverse();
            row = slideRow(row);
            if (direction === 'down') row.reverse();
            for (let j = 0; j < boardSize; j++) {
                board[j][i] = row[j];
            }
        }
    }
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            slideTiles('up');
            break;
        case 'ArrowDown':
            slideTiles('down');
            break;
        case 'ArrowLeft':
            slideTiles('left');
            break;
        case 'ArrowRight':
            slideTiles('right');
            break;
        default:
            return;
    }
    addRandomTile();
    updateBoard();
    checkGameOver();
}

function restartGame() {
    initializeBoard();
}

function checkGameOver() {
    let gameOver = true;

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === null) {
                gameOver = false;
                break;
            }
            if (r < boardSize - 1 && board[r][c] === board[r + 1][c]) {
                gameOver = false;
                break;
            }
            if (c < boardSize - 1 && board[r][c] === board[r][c + 1]) {
                gameOver = false;
                break;
            }
        }
    }

    if (gameOver) {
        document.getElementById('status').textContent = 'Game Over!';
    } else {
        document.getElementById('status').textContent = '';
    }
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
initializeBoard();

function goBack() {
    window.location.href = 'games.html';
}