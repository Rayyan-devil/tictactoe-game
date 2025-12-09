class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        this.scores = { X: 0, O: 0 };
        this.gameActive = true;
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        // Initialize cell click handlers
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => this.makeMove(cell));
        });

        // Initialize reset button
        document.getElementById('resetButton').addEventListener('click', () => this.resetBoard());

        // Update initial UI
        this.updateScores();
    }

    makeMove(cell) {
        const index = cell.dataset.cell;

        if (this.board[index] === '' && this.gameActive) {
            // Player's move
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.classList.add('marked', this.currentPlayer.toLowerCase());

            // Check for win or draw after player's move
            if (this.checkWin()) {
                this.handleWin();
                return;
            } else if (this.checkDraw()) {
                this.handleDraw();
                return;
            }

            // Switch to computer's turn
            this.currentPlayer = 'O';

            // Make computer move after a short delay
            setTimeout(() => this.makeComputerMove(), 500);
        }
    }

    makeComputerMove() {
        if (!this.gameActive) return;

        const move = this.getBestMove();
        const cell = document.querySelector(`[data-cell="${move}"]`);

        if (cell) {
            this.board[move] = 'O';
            cell.textContent = 'O';
            cell.classList.add('marked', 'o');

            if (this.checkWin()) {
                this.handleWin();
            } else if (this.checkDraw()) {
                this.handleDraw();
            } else {
                this.currentPlayer = 'X';
            }
        }
    }

    getBestMove() {
        // Try to win
        const winningMove = this.findWinningMove('O');
        if (winningMove !== -1) return winningMove;

        // Block player's winning move
        const blockingMove = this.findWinningMove('X');
        if (blockingMove !== -1) return blockingMove;

        // Take center if available
        if (this.board[4] === '') return 4;

        // Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => this.board[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Take any available spot
        const availableMoves = this.board.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    findWinningMove(player) {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '') {
                this.board[i] = player;
                if (this.checkWin()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        return -1;
    }

    checkWin() {
        return this.winningCombos.some(combo => {
            if (
                this.board[combo[0]] &&
                this.board[combo[0]] === this.board[combo[1]] &&
                this.board[combo[0]] === this.board[combo[2]]
            ) {
                // Highlight winning cells
                combo.forEach(index => {
                    document.querySelector(`[data-cell="${index}"]`).classList.add('winner');
                });
                return true;
            }
            return false;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        setTimeout(() => {
            alert(`${this.currentPlayer}${this.currentPlayer === 'O' ? ' (Computer)' : ''} wins!`);
            this.resetBoard();
        }, 500);
    }

    handleDraw() {
        this.gameActive = false;
        setTimeout(() => {
            alert("It's a draw!");
            this.resetBoard();
        }, 500);
    }

    resetBoard() {
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';

        // Reset UI
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
    }

    updateScores() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});