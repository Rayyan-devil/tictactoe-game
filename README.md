# Tic Tac Toe - Progressive Web App

A mobile-friendly Tic Tac Toe game with AI opponent that works on all devices.

## Features
- **Progressive Web App (PWA)** - Install on mobile devices like a native app
- **Works Offline** - Play anytime, anywhere
- **Single Player vs AI** - Smart computer opponent
- **Dark Theme** - Beautiful purple aesthetic with custom background
- **Responsive Design** - Works on all screen sizes
- **Score Tracking** - Keep track of wins

## Installation on Mobile

### Android
1. Open the game URL in Chrome
2. Tap "Add to Home Screen" or look for the install prompt
3. The app will appear on your home screen

### iOS (Safari)
1. Open the game URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

## Files

### Flask Server Version
- `main.py` - Flask server entry point
- `templates/index.html` - Main game template with PWA support
- `static/js/game.js` - Game logic and AI
- `static/css/style.css` - Mobile-optimized styling
- `static/manifest.json` - PWA manifest
- `static/sw.js` - Service worker for offline support
- `static/icons/` - App icons for all devices

### Standalone Version
- `tictactoe_standalone.html` - Single file version, works in any browser

## Running Locally

### With Flask (requires Python)
```bash
pip install flask
python main.py
```
Then open http://localhost:5000

### Standalone
Just open `tictactoe_standalone.html` in any browser!

## How to Play
- You are X (blue), the AI is O (red)
- Tap any empty cell to make your move
- The AI responds automatically
- First to get 3 in a row wins!
- Tap "New Game" to restart
