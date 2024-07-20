const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const xWinsSpan = document.getElementById('x-wins');
const oWinsSpan = document.getElementById('o-wins');
const drawsSpan = document.getElementById('draws');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let xWins = 0;
let oWins = 0;
let draws = 0;
let gameEnded = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameState[index] && !gameEnded) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        if (checkWinner()) {
            updateScore(currentPlayer);
            gameEnded = true;
            message.textContent = `Player ${currentPlayer} wins!`;
            setTimeout(resetGame, 2000); // Restart after 2 seconds
        } else if (gameState.every(cell => cell)) {
            updateScore('draw');
            gameEnded = true;
            message.textContent = "It's a draw!";
            setTimeout(resetGame, 2000); // Restart after 2 seconds
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function updateScore(winner) {
    if (winner === 'X') {
        xWins++;
        xWinsSpan.textContent = xWins;
    } else if (winner === 'O') {
        oWins++;
        oWinsSpan.textContent = oWins;
    } else if (winner === 'draw') {
        draws++;
        drawsSpan.textContent = draws;
    }
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    gameEnded = false;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
