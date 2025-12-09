class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        this.scores = { X: 0, O: 0 };
        this.gameActive = true;
        this.isProcessing = false;
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        this.initializeGame();
    }

    initializeGame() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                e.preventDefault();
                this.makeMove(cell);
            });
            cell.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.makeMove(cell);
            });
        });

        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetBoard());
        }

        this.updateScores();
        this.showMessage('Your turn! Tap to play', '');
    }

    makeMove(cell) {
        if (this.isProcessing) return;
        
        const index = parseInt(cell.dataset.cell);

        if (this.board[index] === '' && this.gameActive) {
            this.isProcessing = true;
            
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.classList.add('marked', this.currentPlayer.toLowerCase());

            if (this.checkWin()) {
                this.handleWin();
                return;
            } else if (this.checkDraw()) {
                this.handleDraw();
                return;
            }

            this.currentPlayer = 'O';
            this.showMessage('AI is thinking...', '');

            setTimeout(() => this.makeComputerMove(), 400);
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
                this.isProcessing = false;
                this.showMessage('Your turn!', '');
            }
        }
    }

    getBestMove() {
        const winningMove = this.findWinningMove('O');
        if (winningMove !== -1) return winningMove;

        const blockingMove = this.findWinningMove('X');
        if (blockingMove !== -1) return blockingMove;

        if (this.board[4] === '') return 4;

        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => this.board[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        const availableMoves = this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    findWinningMove(player) {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '') {
                this.board[i] = player;
                if (this.checkWinForPlayer(player)) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        return -1;
    }

    checkWinForPlayer(player) {
        return this.winningCombos.some(combo => {
            return combo.every(index => this.board[index] === player);
        });
    }

    checkWin() {
        return this.winningCombos.some(combo => {
            if (
                this.board[combo[0]] &&
                this.board[combo[0]] === this.board[combo[1]] &&
                this.board[combo[0]] === this.board[combo[2]]
            ) {
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
        this.isProcessing = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        if (this.currentPlayer === 'X') {
            this.showMessage('You Win!', 'win');
        } else {
            this.showMessage('AI Wins!', 'lose');
        }
    }

    handleDraw() {
        this.gameActive = false;
        this.isProcessing = false;
        this.showMessage("It's a Draw!", 'draw');
    }

    showMessage(text, type) {
        const messageEl = document.getElementById('gameMessage');
        if (messageEl) {
            messageEl.textContent = text;
            messageEl.className = 'game-message mt-3 text-center show';
            if (type) {
                messageEl.classList.add(type);
            }
        }
    }

    resetBoard() {
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.isProcessing = false;

        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.showMessage('Your turn! Tap to play', '');
    }

    updateScores() {
        const scoreX = document.getElementById('scoreX');
        const scoreO = document.getElementById('scoreO');
        if (scoreX) scoreX.textContent = this.scores.X;
        if (scoreO) scoreO.textContent = this.scores.O;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
