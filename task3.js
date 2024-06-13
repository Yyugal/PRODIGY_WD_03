
document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill(null);

    function handleClick(e) {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (boardState[cellIndex] || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            gameActive = false;
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        } else if (boardState.every(cell => cell)) {
            gameActive = false;
            setTimeout(() => alert(`It's a draw!`), 10);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === player;
            });
        });
    }

    function restartGame() {
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
});
