const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function createGameBoard() {
    gameBoard.innerHTML = ''; // Clear existing board
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList = 'bg-gray-200 w-full h-24 sm:h-28 md:h-32 flex items-center justify-center text-3xl sm:text-4xl font-bold cursor-pointer border-2 border-gray-300 rounded-lg transition-transform transform hover:scale-105 duration-200';
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            triggerCelebration();
        }, 100);
        return;
    }

    if (board.every(cell => cell !== '')) {
        setTimeout(() => alert("It's a tie!"), 100);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function triggerCelebration() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -100}vh`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
        document.body.appendChild(confetti);

        // Remove the confetti piece after the animation ends
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFF233', '#FF5733'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    createGameBoard();
}

restartButton.addEventListener('click', restartGame);
createGameBoard();
