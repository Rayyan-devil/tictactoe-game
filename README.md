# Tic Tac Toe Game

A web-based Tic Tac Toe game where you play against an AI computer opponent.

## Features
- Single player mode against AI
- Strategic AI that attempts to win and blocks player moves
- Dark theme with custom purple tree background
- Score tracking
- Responsive design

## Files
- `main.py` - Flask server
- `templates/index.html` - Game HTML template
- `static/js/game.js` - Game logic and AI
- `static/css/style.css` - Styling
- `tictactoe_standalone.html` - Standalone HTML file (no server needed)

## Running Locally

### With Flask (requires Python)
```bash
pip install flask
python main.py
```

### Standalone
Just open `tictactoe_standalone.html` in any web browser - no server required!

## How to Play
- You are X, the computer is O
- Click on any empty cell to make your move
- The computer will respond automatically
- First to get 3 in a row wins!
