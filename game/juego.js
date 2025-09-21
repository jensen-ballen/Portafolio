// Game System - Colección completa de juegos
class GameSystem {
    constructor() {
        this.currentGame = null;
        this.games = {
            snake: new SnakeGame(),
            tetris: new TetrisGame(),
            pong: new PongGame(),
            memory: new MemoryGame(),
            tictactoe: new TicTacToeGame(),
            breakout: new BreakoutGame(),
            platformer: new PlatformerGame(),
            quiz: new QuizGame()
        };
    }

    openGame(gameType) {
        if (this.games[gameType]) {
            this.currentGame = gameType;
            document.getElementById('gameModal').classList.add('active');
            this.games[gameType].init();
        }
    }

    closeGame() {
        if (this.currentGame && this.games[this.currentGame]) {
            this.games[this.currentGame].cleanup();
        }
        document.getElementById('gameModal').classList.remove('active');
        this.currentGame = null;
    }
}

const gameSystem = new GameSystem();

// ===== SNAKE GAME =====
class SnakeGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.food = {};
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameLoop = null;
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="score-display">Puntuación: 0</div>
            <canvas id="snakeCanvas" width="400" height="400" class="snake-canvas"></canvas>
            <div class="game-controls">
                <button class="btn btn-primary" onclick="gameSystem.games.snake.start()">Iniciar Juego</button>
                <button class="btn btn-secondary" onclick="gameSystem.games.snake.pause()">Pausar</button>
                <button class="btn btn-secondary" onclick="gameSystem.games.snake.reset()">Reiniciar</button>
            </div>
            <div class="game-instructions">
                <p><strong>Controles:</strong> Usa las flechas del teclado para mover la serpiente</p>
                <p>¡Come las manzanas rojas para crecer y aumentar tu puntuación!</p>
            </div>
        `;

        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.reset();
        this.generateFood();
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    cleanup() {
        this.gameRunning = false;
        this.gamePaused = false;
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
        }
        document.removeEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    reset() {
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.draw();
    }

    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.gameLoop = requestAnimationFrame(() => this.gameLoop());
        }
    }

    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused && this.gameRunning) {
            this.gameLoop = requestAnimationFrame(() => this.gameLoop());
        }
    }

    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;

        const key = e.key;
        if (key === 'ArrowUp' && this.direction.y === 0) {
            this.direction = {x: 0, y: -20};
        } else if (key === 'ArrowDown' && this.direction.y === 0) {
            this.direction = {x: 0, y: 20};
        } else if (key === 'ArrowLeft' && this.direction.x === 0) {
            this.direction = {x: -20, y: 0};
        } else if (key === 'ArrowRight' && this.direction.x === 0) {
            this.direction = {x: 20, y: 0};
        }
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    }

    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;

        const head = {x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y};

        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            this.gameOver();
            return;
        }

        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.generateFood();
        } else {
            this.snake.pop();
        }

        this.draw();
        setTimeout(() => {
            this.gameLoop = requestAnimationFrame(() => this.gameLoop());
        }, 150);
    }

    draw() {
        this.ctx.fillStyle = '#2d3748';
        this.ctx.fillRect(0, 0, 400, 400);

        this.ctx.fillStyle = '#48bb78';
        for (let segment of this.snake) {
            this.ctx.fillRect(segment.x, segment.y, 18, 18);
        }

        this.ctx.fillStyle = '#f56565';
        this.ctx.fillRect(this.food.x, this.food.y, 18, 18);

        const scoreDisplay = document.querySelector('.score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Puntuación: ${this.score}`;
        }
    }

    gameOver() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 400, 400);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Game Over!', 200, 180);
        this.ctx.fillText(`Puntuación: ${this.score}`, 200, 220);
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 200, 250);
    }
}

// ===== MEMORY GAME =====
class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameRunning = false;
        this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐔', '🐧', '🐦'];
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="score-display">Movimientos: 0 | Parejas: 0/8</div>
            <div class="memory-grid" id="memoryGrid"></div>
            <div class="game-controls">
                <button class="btn btn-primary" onclick="gameSystem.games.memory.start()">Nuevo Juego</button>
            </div>
            <div class="game-instructions">
                <p>¡Encuentra todas las parejas de emojis!</p>
                <p>Haz clic en las cartas para voltearlas.</p>
            </div>
        `;

        this.createBoard();
        this.reset();
    }

    cleanup() {
        this.gameRunning = false;
    }

    createBoard() {
        const grid = document.getElementById('memoryGrid');
        grid.innerHTML = '';

        // Create 16 cards (8 pairs)
        const gameSymbols = this.symbols.slice(0, 8).concat(this.symbols.slice(0, 8));
        this.shuffleArray(gameSymbols);

        for (let i = 0; i < 16; i++) {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.index = i;
            card.dataset.symbol = gameSymbols[i];
            card.addEventListener('click', () => this.flipCard(i));
            grid.appendChild(card);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    reset() {
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameRunning = false;

        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.classList.remove('flipped', 'matched');
            card.textContent = '';
        });

        this.updateDisplay();
    }

    start() {
        this.reset();
        this.gameRunning = true;
    }

    flipCard(index) {
        if (!this.gameRunning) return;

        const card = document.querySelector(`[data-index="${index}"]`);
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (this.flippedCards.length >= 2) return;

        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.checkMatch();
        }

        this.updateDisplay();
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                this.flippedCards = [];

                if (this.matchedPairs === 8) {
                    this.gameOver(true);
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                this.flippedCards = [];
            }, 1000);
        }
    }

    updateDisplay() {
        const scoreDisplay = document.querySelector('.score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Movimientos: ${this.moves} | Parejas: ${this.matchedPairs}/8`;
        }
    }

    gameOver(won) {
        this.gameRunning = false;

        setTimeout(() => {
            const message = won ?
                `¡Felicitaciones! Completaste el juego en ${this.moves} movimientos.` :
                '¡Inténtalo de nuevo!';

            alert(message);
        }, 500);
    }
}

// ===== TIC TAC TOE GAME =====
class TicTacToeGame {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameRunning = false;
        this.gameOver = false;
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="ttt-container">
                <div class="ttt-status">Turno del jugador X</div>
                <div class="ttt-board" id="tttBoard"></div>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="gameSystem.games.tictactoe.start()">Nuevo Juego</button>
                </div>
                <div class="game-instructions">
                    <p>¡Juega al clásico Tres en Raya!</p>
                    <p>X siempre comienza primero.</p>
                </div>
            </div>
        `;

        this.createBoard();
        this.reset();
    }

    cleanup() {
        this.gameRunning = false;
    }

    createBoard() {
        const board = document.getElementById('tttBoard');
        board.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'ttt-cell';
            cell.dataset.index = i;
            cell.addEventListener('click', () => this.makeMove(i));
            board.appendChild(cell);
        }
    }

    reset() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameRunning = false;
        this.gameOver = false;

        const cells = document.querySelectorAll('.ttt-cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });

        this.updateStatus();
    }

    start() {
        this.reset();
        this.gameRunning = true;
    }

    makeMove(index) {
        if (!this.gameRunning || this.gameOver || this.board[index] !== '') return;

        this.board[index] = this.currentPlayer;
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = this.currentPlayer;

        if (this.checkWinner()) {
            this.gameOver = true;
            this.updateStatus(`${this.currentPlayer} gana!`);
            this.highlightWinner();
            return;
        }

        if (this.board.every(cell => cell !== '')) {
            this.gameOver = true;
            this.updateStatus('¡Empate!');
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningPattern = pattern;
                return true;
            }
        }
        return false;
    }

    highlightWinner() {
        if (this.winningPattern) {
            this.winningPattern.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.classList.add('winner');
            });
        }
    }

    updateStatus(message) {
        const status = document.querySelector('.ttt-status');
        if (status) {
            status.textContent = message || `Turno del jugador ${this.currentPlayer}`;
        }
    }
}

// ===== QUIZ GAME =====
class QuizGame {
    constructor() {
        this.questions = [
            {
                question: "¿Cuál es la capital de Colombia?",
                options: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
                correct: 0
            },
            {
                question: "¿Qué lenguaje se usa para el desarrollo web?",
                options: ["Python", "JavaScript", "Java", "C++"],
                correct: 1
            },
            {
                question: "¿Qué significa HTML?",
                options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
                correct: 0
            },
            {
                question: "¿Qué es CSS?",
                options: ["Coffee Script Style", "Cascading Style Sheets", "Computer Style System", "Creative Style Script"],
                correct: 1
            },
            {
                question: "¿Qué hace el comando 'git commit'?",
                options: ["Sube cambios al repositorio", "Guarda cambios localmente", "Crea una nueva rama", "Elimina archivos"],
                correct: 1
            }
        ];
        this.currentQuestion = 0;
        this.score = 0;
        this.gameRunning = false;
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">Puntuación: 0/5</div>
                <div class="quiz-question" id="quizQuestion"></div>
                <div class="quiz-options" id="quizOptions"></div>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="gameSystem.games.quiz.start()">Iniciar Quiz</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.quiz.reset()">Reiniciar</button>
                </div>
                <div class="game-instructions">
                    <p>¡Responde correctamente todas las preguntas!</p>
                    <p>Cada respuesta correcta vale 1 punto.</p>
                </div>
            </div>
        `;

        this.reset();
    }

    cleanup() {
        this.gameRunning = false;
    }

    reset() {
        this.currentQuestion = 0;
        this.score = 0;
        this.gameRunning = false;
        this.showQuestion();
        this.updateScore();
    }

    start() {
        this.reset();
        this.gameRunning = true;
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.gameOver();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const questionEl = document.getElementById('quizQuestion');
        const optionsEl = document.getElementById('quizOptions');

        questionEl.textContent = question.question;
        optionsEl.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option';
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => this.selectAnswer(index));
            optionsEl.appendChild(optionEl);
        });
    }

    selectAnswer(selectedIndex) {
        if (!this.gameRunning) return;

        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');

        // Show correct/incorrect answers
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correct) {
            this.score++;
        }

        this.updateScore();

        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 1500);
    }

    updateScore() {
        const scoreEl = document.querySelector('.quiz-score');
        if (scoreEl) {
            scoreEl.textContent = `Puntuación: ${this.score}/${this.questions.length}`;
        }
    }

    gameOver() {
        this.gameRunning = false;
        const questionEl = document.getElementById('quizQuestion');
        const optionsEl = document.getElementById('quizOptions');

        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = '';

        if (percentage >= 80) {
            message = `¡Excelente! ${percentage}% de aciertos.`;
        } else if (percentage >= 60) {
            message = `¡Bien hecho! ${percentage}% de aciertos.`;
        } else {
            message = `Sigue practicando. ${percentage}% de aciertos.`;
        }

        questionEl.innerHTML = `
            <h2>¡Quiz Completado!</h2>
            <p>${message}</p>
            <p>Respuestas correctas: ${this.score}/${this.questions.length}</p>
        `;

        optionsEl.innerHTML = '<div class="btn btn-primary" onclick="gameSystem.games.quiz.reset()">Jugar de Nuevo</div>';
    }
}

// Placeholder classes for other games (simplified versions)
class TetrisGame {
    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="score-display">Tetris - Próximamente</div>
            <div style="text-align: center; padding: 50px;">
                <h2>🎮 Tetris</h2>
                <p>¡Completa líneas horizontales para ganar puntos!</p>
                <p style="color: #666; font-style: italic;">Esta versión completa estará disponible próximamente.</p>
            </div>
        `;
    }
    cleanup() {}
}

class PongGame {
    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="score-display">Pong - Próximamente</div>
            <div style="text-align: center; padding: 50px;">
                <h2>🏓 Pong</h2>
                <p>¡Juego clásico de palas y pelota!</p>
                <p style="color: #666; font-style: italic;">Esta versión completa estará disponible próximamente.</p>
            </div>
        `;
    }
    cleanup() {}
}

class BreakoutGame {
    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="score-display">Breakout - Próximamente</div>
            <div style="text-align: center; padding: 50px;">
                <h2>🎯 Breakout</h2>
                <p>¡Destruye todos los ladrillos con la pelota!</p>
                <p style="color: #666; font-style: italic;">Esta versión completa estará disponible próximamente.</p>
            </div>
        `;
    }
    cleanup() {}
}

class PlatformerGame {
    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="score-display">Platformer - Próximamente</div>
            <div style="text-align: center; padding: 50px;">
                <h2>🎮 Platformer</h2>
                <p>¡Recoge monedas y supera obstáculos!</p>
                <p style="color: #666; font-style: italic;">Esta versión completa estará disponible próximamente.</p>
            </div>
        `;
    }
    cleanup() {}
}

// Initialize game system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Sistema de juegos cargado');
});