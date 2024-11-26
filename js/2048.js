let board;
let boardSize = 4;
let score = 0;
let isGameActive = true; // Variable to track the game state

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game when the page is loaded
    initializeBoard();
    document.addEventListener('keydown', handleKeyPress);
});

function initializeBoard() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    score = 0; // Reset score when restarting
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('status').textContent = '';
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
    const hiTable = document.getElementById('highScoresTable');
    hiTable.style.display = 'none'; 
    isGameActive = true;
}

async function checkGameOver() {
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
        if (isGameActive) { // Check if the game is still active
            
            document.getElementById('status').textContent = 'Game Over!';
            console.log('Your Score', score);
            const madeLeaderBoard = await checkIfNewHiScore(score);
            console.log('Made Leaderboard?:', madeLeaderBoard);
            //Check to see if player Got in the top 10 LeaderBoard
            if (madeLeaderBoard) {
                // Ask the user if they want to join the leaderboard
                const wantsToJoin = confirm("You made the Leaderboard! Do you want to Enter your name?");
                if (wantsToJoin) {
                    let playerName;
                    while (true) {
                        playerName = prompt("Enter your name to join LeaderBoard!");
                        if (playerName && playerName.trim() !== '') {
                            break
                        } else {
                            alert('Must Enter a Name')
                        }
                    }
                    
                    const hiTable = document.getElementById('highScoresTable');
                    hiTable.style.display = 'flex'; 
                    const data = {
                        player: playerName,
                        score: score
                    }
        
                    // Send the POST request to your PHP script
                    fetch('2048-hi-score', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Display the response message
                        //alert('worked' + JSON.stringify(data));
                    })
                    .catch(error => console.error('Error:', error));
        
                    isGameActive = false; // Set the game state to inactive
                    setTimeout(() => {
                        fetchHighScores();
                      }, 100); 
                }

            }
        }
    } else {
        document.getElementById('status').textContent = '';
    }
}
function toggleHighScore() {
    const scores = document.getElementById('highScoresTable');
    const toggle = document.getElementById('toggle');

    if(scores.style.display === 'none') {
        fetchHighScores()
        scores.style.display = 'flex';
        toggle.textContent = "Close High Scores"
    } else {
        scores.style.display = 'none';
        toggle.textContent = 'Show High Scores';
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


// Swipe functionality for touch devices
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe left
            handleMove('ArrowLeft');
        } else {
            // Swipe right
            handleMove('ArrowRight');
        }
    } else {
        if (yDiff > 0) {
            // Swipe up
            handleMove('ArrowUp');
        } else {
            // Swipe down
            handleMove('ArrowDown');
        }
    }

    // Reset values
    xDown = null;
    yDown = null;
}

function handleMove(direction) {
    switch (direction) {
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
    }
    addRandomTile();  // Add a random tile after each move
    updateBoard();    // Update the board display
    checkGameOver();  // Check if the game is over
}

async function checkIfNewHiScore(score) {
    try{
        const res = await fetch('2048-hi-score');
        const data = await res.json();
        let scores = [];
        for(let i = 0; i < data.length; i ++) {
            const s = Number(data[i].score);
            scores.push(s);
        }
        const min = Math.min(...scores);
        return score > min;
    } catch(error) {
        console.error('Error fetching high scores:', error);
        return false;
    }
}

// Function to fetch high scores
function fetchHighScores() {
    fetch('2048-hi-score')
        .then(response => response.json())
        .then(data => {
            const scoresBody = document.getElementById('scoresBody');
            scoresBody.innerHTML = ''; // Clear existing scores

            data.forEach((scoreEntry, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${scoreEntry.player}</td>
                    <td>${scoreEntry.score}</td>
                `;
                scoresBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching high scores:', error));
}



