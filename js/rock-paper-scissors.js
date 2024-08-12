let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}

function showResult(result, playerChoice, computerChoice) {
    let resultText = `You chose ${playerChoice}. Computer chose ${computerChoice}. `;
    if (result === 'draw') {
        resultText += "It's a draw!";
    } else if (result === 'player') {
        resultText += "You win!";
    } else {
        resultText += "Computer wins!";
    }
    document.getElementById('result-text').textContent = resultText;
}

function handleChoice(event) {
    const playerChoice = event.target.getAttribute('data-choice');
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateScores(result);
    showResult(result, playerChoice, computerChoice);
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('result-text').textContent = 'Choose your move!';
}

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', handleChoice);
});

function goBack() {
    window.location.href = 'games.html';
}

