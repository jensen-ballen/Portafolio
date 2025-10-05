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
        this.animationId = null;
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

        // Controles táctiles para móvil
        this.addTouchControls();
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
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused && this.gameRunning) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
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
            this.animationId = requestAnimationFrame(() => this.gameLoop());
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

    addTouchControls() {
        const gameContent = document.getElementById('gameContent');

        // Crear controles táctiles
        const touchControls = document.createElement('div');
        touchControls.className = 'touch-controls';
        touchControls.innerHTML = `
            <div class="touch-buttons">
                <button class="touch-btn" id="upBtn">↑</button>
                <div class="touch-row">
                    <button class="touch-btn" id="leftBtn">←</button>
                    <button class="touch-btn" id="downBtn">↓</button>
                    <button class="touch-btn" id="rightBtn">→</button>
                </div>
            </div>
        `;

        gameContent.appendChild(touchControls);

        // Event listeners para botones táctiles
        document.getElementById('upBtn').addEventListener('click', () => {
            if (this.gameRunning && !this.gamePaused && this.direction.y === 0) {
                this.direction = {x: 0, y: -20};
            }
        });

        document.getElementById('downBtn').addEventListener('click', () => {
            if (this.gameRunning && !this.gamePaused && this.direction.y === 0) {
                this.direction = {x: 0, y: 20};
            }
        });

        document.getElementById('leftBtn').addEventListener('click', () => {
            if (this.gameRunning && !this.gamePaused && this.direction.x === 0) {
                this.direction = {x: -20, y: 0};
            }
        });

        document.getElementById('rightBtn').addEventListener('click', () => {
            if (this.gameRunning && !this.gamePaused && this.direction.x === 0) {
                this.direction = {x: 20, y: 0};
            }
        });
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

// ===== TETRIS GAME =====
class TetrisGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.dropTimer = 0;
        this.dropInterval = 1000;
        this.animationId = null;

        // Tetromino shapes
        this.tetrominoes = {
            I: { shape: [[1,1,1,1]], color: '#00f5ff' },
            O: { shape: [[1,1],[1,1]], color: '#ffff00' },
            T: { shape: [[0,1,0],[1,1,1]], color: '#800080' },
            S: { shape: [[0,1,1],[1,1,0]], color: '#00ff00' },
            Z: { shape: [[1,1,0],[0,1,1]], color: '#ff0000' },
            J: { shape: [[1,0,0],[1,1,1]], color: '#0000ff' },
            L: { shape: [[0,0,1],[1,1,1]], color: '#ffa500' }
        };
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="tetris-container">
                <div class="tetris-game-area">
                    <div class="score-display">Puntuación: 0 | Líneas: 0 | Nivel: 1</div>
                    <canvas id="tetrisCanvas" width="300" height="600" class="tetris-canvas"></canvas>
                </div>
                <div class="tetris-sidebar">
                    <div class="next-piece">
                        <h3>Siguiente</h3>
                        <canvas id="nextCanvas" width="100" height="100" class="next-canvas"></canvas>
                    </div>
                    <div class="game-controls">
                        <button class="btn btn-primary" onclick="gameSystem.games.tetris.start()">Iniciar Juego</button>
                        <button class="btn btn-secondary" onclick="gameSystem.games.tetris.pause()">Pausar</button>
                        <button class="btn btn-secondary" onclick="gameSystem.games.tetris.reset()">Reiniciar</button>
                    </div>
                    <div class="game-instructions">
                        <p><strong>Controles:</strong></p>
                        <p>← → : Mover</p>
                        <p>↓ : Bajar rápido</p>
                        <p>↑ : Rotar</p>
                        <p>Espacio : Caer instantáneo</p>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('tetrisCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');

        this.reset();
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
        // Initialize board (20 rows x 10 columns)
        this.board = Array(20).fill().map(() => Array(10).fill(0));
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.dropInterval = 1000;
        this.gameRunning = false;
        this.gamePaused = false;

        this.currentPiece = this.generatePiece();
        this.nextPiece = this.generatePiece();

        this.draw();
        this.drawNext();
        this.updateDisplay();
    }

    generatePiece() {
        const types = Object.keys(this.tetrominoes);
        const type = types[Math.floor(Math.random() * types.length)];
        return {
            type: type,
            shape: this.tetrominoes[type].shape.map(row => [...row]),
            color: this.tetrominoes[type].color,
            x: 3,
            y: 0
        };
    }

    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused && this.gameRunning) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;

        this.dropTimer += 16; // ~60fps

        if (this.dropTimer >= this.dropInterval) {
            this.dropTimer = 0;
            this.moveDown();
        }

        this.draw();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    moveDown() {
        if (this.isValidMove(this.currentPiece.x, this.currentPiece.y + 1, this.currentPiece.shape)) {
            this.currentPiece.y++;
        } else {
            this.placePiece();
            this.clearLines();
            this.currentPiece = this.nextPiece;
            this.nextPiece = this.generatePiece();

            if (!this.isValidMove(this.currentPiece.x, this.currentPiece.y, this.currentPiece.shape)) {
                this.gameOver();
                return;
            }
        }
    }

    moveLeft() {
        if (this.isValidMove(this.currentPiece.x - 1, this.currentPiece.y, this.currentPiece.shape)) {
            this.currentPiece.x--;
        }
    }

    moveRight() {
        if (this.isValidMove(this.currentPiece.x + 1, this.currentPiece.y, this.currentPiece.shape)) {
            this.currentPiece.x++;
        }
    }

    rotate() {
        const rotated = this.currentPiece.shape[0].map((_, index) =>
            this.currentPiece.shape.map(row => row[index]).reverse()
        );

        if (this.isValidMove(this.currentPiece.x, this.currentPiece.y, rotated)) {
            this.currentPiece.shape = rotated;
        }
    }

    drop() {
        while (this.isValidMove(this.currentPiece.x, this.currentPiece.y + 1, this.currentPiece.shape)) {
            this.currentPiece.y++;
            this.score += 1;
        }
        this.moveDown();
    }

    isValidMove(x, y, shape) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const newX = x + col;
                    const newY = y + row;

                    if (newX < 0 || newX >= 10 || newY >= 20 || (newY >= 0 && this.board[newY][newX])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placePiece() {
        for (let row = 0; row < this.currentPiece.shape.length; row++) {
            for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                if (this.currentPiece.shape[row][col]) {
                    const boardY = this.currentPiece.y + row;
                    const boardX = this.currentPiece.x + col;
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.color;
                    }
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;

        for (let row = this.board.length - 1; row >= 0; row--) {
            if (this.board[row].every(cell => cell !== 0)) {
                this.board.splice(row, 1);
                this.board.unshift(Array(10).fill(0));
                linesCleared++;
                row++; // Check the same row again
            }
        }

        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += linesCleared * 100 * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(50, 1000 - (this.level - 1) * 50);
            this.updateDisplay();
        }
    }

    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.moveLeft();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.moveRight();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveDown();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.rotate();
                break;
            case ' ':
                e.preventDefault();
                this.drop();
                break;
        }

        this.draw();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 300, 600);

        // Draw board
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col]) {
                    this.ctx.fillStyle = this.board[row][col];
                    this.ctx.fillRect(col * 30, row * 30, 30, 30);
                    this.ctx.strokeStyle = '#fff';
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(col * 30, row * 30, 30, 30);
                }
            }
        }

        // Draw current piece
        this.ctx.fillStyle = this.currentPiece.color;
        for (let row = 0; row < this.currentPiece.shape.length; row++) {
            for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                if (this.currentPiece.shape[row][col]) {
                    const x = (this.currentPiece.x + col) * 30;
                    const y = (this.currentPiece.y + row) * 30;
                    this.ctx.fillRect(x, y, 30, 30);
                    this.ctx.strokeStyle = '#fff';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x, y, 30, 30);
                }
            }
        }

        // Draw grid
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * 30, 0);
            this.ctx.lineTo(i * 30, 600);
            this.ctx.stroke();
        }
        for (let i = 0; i <= 20; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * 30);
            this.ctx.lineTo(300, i * 30);
            this.ctx.stroke();
        }
    }

    drawNext() {
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, 100, 100);

        this.nextCtx.fillStyle = this.nextPiece.color;
        const offsetX = (100 - this.nextPiece.shape[0].length * 20) / 2;
        const offsetY = (100 - this.nextPiece.shape.length * 20) / 2;

        for (let row = 0; row < this.nextPiece.shape.length; row++) {
            for (let col = 0; col < this.nextPiece.shape[row].length; col++) {
                if (this.nextPiece.shape[row][col]) {
                    this.nextCtx.fillRect(offsetX + col * 20, offsetY + row * 20, 20, 20);
                    this.nextCtx.strokeStyle = '#fff';
                    this.nextCtx.lineWidth = 1;
                    this.nextCtx.strokeRect(offsetX + col * 20, offsetY + row * 20, 20, 20);
                }
            }
        }
    }

    updateDisplay() {
        const scoreDisplay = document.querySelector('.score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Puntuación: ${this.score} | Líneas: ${this.lines} | Nivel: ${this.level}`;
        }
        this.drawNext();
    }

    gameOver() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 300, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Game Over!', 150, 280);
        this.ctx.fillText(`Puntuación: ${this.score}`, 150, 320);
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 150, 360);
    }
}

// ===== PONG GAME =====
class PongGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.ball = { x: 400, y: 300, dx: 5, dy: 5, radius: 10 };
        this.paddle1 = { x: 10, y: 250, width: 10, height: 100 };
        this.paddle2 = { x: 780, y: 250, width: 10, height: 100 };
        this.score1 = 0;
        this.score2 = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.animationId = null;
        this.keys = {};
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="pong-container">
                <div class="pong-score">
                    <div>Jugador 1: ${this.score1}</div>
                    <div>Jugador 2: ${this.score2}</div>
                </div>
                <canvas id="pongCanvas" width="800" height="600" class="pong-canvas"></canvas>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="gameSystem.games.pong.start()">Iniciar Juego</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.pong.pause()">Pausar</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.pong.reset()">Reiniciar</button>
                </div>
                <div class="game-instructions">
                    <p><strong>Jugador 1:</strong> W (arriba) / S (abajo)</p>
                    <p><strong>Jugador 2:</strong> ↑ (arriba) / ↓ (abajo)</p>
                    <p>¡Sé el primero en llegar a 5 puntos!</p>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('pongCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.reset();
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Controles táctiles para móvil
        this.addTouchControls();
    }

    cleanup() {
        this.gameRunning = false;
        this.gamePaused = false;
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
        }
        document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
        document.removeEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    reset() {
        this.ball = { x: 400, y: 300, dx: 5, dy: 5, radius: 10 };
        this.paddle1 = { x: 10, y: 250, width: 10, height: 100 };
        this.paddle2 = { x: 780, y: 250, width: 10, height: 100 };
        this.score1 = 0;
        this.score2 = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.keys = {};
        this.draw();
        this.updateScore();
    }

    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused && this.gameRunning) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;

        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Move paddles
        if (this.keys['w'] && this.paddle1.y > 0) {
            this.paddle1.y -= 7;
        }
        if (this.keys['s'] && this.paddle1.y < 500) {
            this.paddle1.y += 7;
        }
        if (this.keys['ArrowUp'] && this.paddle2.y > 0) {
            this.paddle2.y -= 7;
        }
        if (this.keys['ArrowDown'] && this.paddle2.y < 500) {
            this.paddle2.y += 7;
        }

        // Move ball
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Ball collision with top/bottom
        if (this.ball.y - this.ball.radius <= 0 || this.ball.y + this.ball.radius >= 600) {
            this.ball.dy = -this.ball.dy;
        }

        // Ball collision with paddles
        if (this.ball.x - this.ball.radius <= this.paddle1.x + this.paddle1.width &&
            this.ball.y >= this.paddle1.y && this.ball.y <= this.paddle1.y + this.paddle1.height &&
            this.ball.dx < 0) {
            this.ball.dx = -this.ball.dx;
            this.ball.dx *= 1.1; // Increase speed
            this.ball.dy += (this.ball.y - (this.paddle1.y + this.paddle1.height / 2)) * 0.1;
        }

        if (this.ball.x + this.ball.radius >= this.paddle2.x &&
            this.ball.y >= this.paddle2.y && this.ball.y <= this.paddle2.y + this.paddle2.height &&
            this.ball.dx > 0) {
            this.ball.dx = -this.ball.dx;
            this.ball.dx *= 1.1; // Increase speed
            this.ball.dy += (this.ball.y - (this.paddle2.y + this.paddle2.height / 2)) * 0.1;
        }

        // Score points
        if (this.ball.x < 0) {
            this.score2++;
            this.resetBall();
        }
        if (this.ball.x > 800) {
            this.score1++;
            this.resetBall();
        }

        // Check for winner
        if (this.score1 >= 5 || this.score2 >= 5) {
            this.gameOver();
        }

        this.updateScore();
    }

    resetBall() {
        this.ball.x = 400;
        this.ball.y = 300;
        this.ball.dx = this.ball.dx > 0 ? 5 : -5;
        this.ball.dy = (Math.random() - 0.5) * 10;
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 800, 600);

        // Draw center line
        this.ctx.strokeStyle = '#fff';
        this.ctx.setLineDash([5, 15]);
        this.ctx.beginPath();
        this.ctx.moveTo(400, 0);
        this.ctx.lineTo(400, 600);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw paddles
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
        this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);

        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    handleKeyDown(e) {
        if (!this.gameRunning || this.gamePaused) return;
        this.keys[e.key] = true;
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }

    updateScore() {
        const scoreElements = document.querySelectorAll('.pong-score div');
        if (scoreElements.length >= 2) {
            scoreElements[0].textContent = `Jugador 1: ${this.score1}`;
            scoreElements[1].textContent = `Jugador 2: ${this.score2}`;
        }
    }

    gameOver() {
        this.gameRunning = false;
        const winner = this.score1 >= 5 ? 'Jugador 1' : 'Jugador 2';

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`¡${winner} gana!`, 400, 280);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Puntuación final: ${this.score1} - ${this.score2}`, 400, 320);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 400, 360);
    }

    addTouchControls() {
        const gameContent = document.getElementById('gameContent');

        // Crear controles táctiles para Pong
        const touchControls = document.createElement('div');
        touchControls.className = 'touch-controls pong-touch';
        touchControls.innerHTML = `
            <div class="pong-touch-controls">
                <div class="player-controls">
                    <h4>Jugador 1</h4>
                    <button class="touch-btn" id="p1UpBtn">↑</button>
                    <button class="touch-btn" id="p1DownBtn">↓</button>
                </div>
                <div class="player-controls">
                    <h4>Jugador 2</h4>
                    <button class="touch-btn" id="p2UpBtn">↑</button>
                    <button class="touch-btn" id="p2DownBtn">↓</button>
                </div>
            </div>
        `;

        gameContent.appendChild(touchControls);

        // Event listeners para botones táctiles
        const p1UpBtn = document.getElementById('p1UpBtn');
        const p1DownBtn = document.getElementById('p1DownBtn');
        const p2UpBtn = document.getElementById('p2UpBtn');
        const p2DownBtn = document.getElementById('p2DownBtn');

        // Controles continuos para paddle 1
        p1UpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['w'] = true;
        });
        p1UpBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['w'] = false;
        });
        p1UpBtn.addEventListener('mousedown', () => this.keys['w'] = true);
        p1UpBtn.addEventListener('mouseup', () => this.keys['w'] = false);

        p1DownBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['s'] = true;
        });
        p1DownBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['s'] = false;
        });
        p1DownBtn.addEventListener('mousedown', () => this.keys['s'] = true);
        p1DownBtn.addEventListener('mouseup', () => this.keys['s'] = false);

        // Controles continuos para paddle 2
        p2UpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowUp'] = true;
        });
        p2UpBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowUp'] = false;
        });
        p2UpBtn.addEventListener('mousedown', () => this.keys['ArrowUp'] = true);
        p2UpBtn.addEventListener('mouseup', () => this.keys['ArrowUp'] = false);

        p2DownBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowDown'] = true;
        });
        p2DownBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowDown'] = false;
        });
        p2DownBtn.addEventListener('mousedown', () => this.keys['ArrowDown'] = true);
        p2DownBtn.addEventListener('mouseup', () => this.keys['ArrowDown'] = false);
    }
}

// ===== BREAKOUT GAME =====
class BreakoutGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.ball = { x: 400, y: 500, dx: 4, dy: -4, radius: 8 };
        this.paddle = { x: 350, y: 550, width: 100, height: 10 };
        this.bricks = [];
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        this.animationId = null;
        this.brickRowCount = 5;
        this.brickColumnCount = 8;
        this.brickWidth = 80;
        this.brickHeight = 20;
        this.brickPadding = 5;
        this.brickOffsetTop = 60;
        this.brickOffsetLeft = 35;
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="breakout-container">
                <div class="score-display">Puntuación: 0 | Vidas: 3</div>
                <canvas id="breakoutCanvas" width="800" height="600" class="breakout-canvas"></canvas>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="gameSystem.games.breakout.start()">Iniciar Juego</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.breakout.pause()">Pausar</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.breakout.reset()">Reiniciar</button>
                </div>
                <div class="game-instructions">
                    <p><strong>Controles:</strong> ← → Mover paleta</p>
                    <p>¡Destruye todos los ladrillos con la pelota!</p>
                    <p>Cada ladrillo roto vale 10 puntos.</p>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('breakoutCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.reset();
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    cleanup() {
        this.gameRunning = false;
        this.gamePaused = false;
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
        }
        document.removeEventListener('keydown', (e) => this.handleKeyPress(e));
        document.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    reset() {
        this.ball = { x: 400, y: 500, dx: 4, dy: -4, radius: 8 };
        this.paddle = { x: 350, y: 550, width: 100, height: 10 };
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        this.createBricks();
        this.draw();
        this.updateDisplay();
    }

    createBricks() {
        this.bricks = [];
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                this.bricks[c][r] = { x: brickX, y: brickY, status: 1 };
            }
        }
    }

    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused && this.gameRunning) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;

        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Move ball
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Ball collision with walls
        if (this.ball.x + this.ball.radius > this.canvas.width || this.ball.x - this.ball.radius < 0) {
            this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y - this.ball.radius < 0) {
            this.ball.dy = -this.ball.dy;
        }

        // Ball collision with paddle
        if (this.ball.y + this.ball.radius > this.paddle.y &&
            this.ball.x > this.paddle.x &&
            this.ball.x < this.paddle.x + this.paddle.width) {
            this.ball.dy = -this.ball.dy;
        }

        // Ball falls off bottom
        if (this.ball.y + this.ball.radius > this.canvas.height) {
            this.lives--;
            if (this.lives <= 0) {
                this.gameOver();
                return;
            } else {
                this.resetBall();
            }
        }

        // Ball collision with bricks
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    if (this.ball.x > brick.x &&
                        this.ball.x < brick.x + this.brickWidth &&
                        this.ball.y > brick.y &&
                        this.ball.y < brick.y + this.brickHeight) {
                        this.ball.dy = -this.ball.dy;
                        brick.status = 0;
                        this.score += 10;
                        this.updateDisplay();

                        // Check if all bricks are destroyed
                        if (this.checkWin()) {
                            this.gameWin();
                            return;
                        }
                    }
                }
            }
        }
    }

    resetBall() {
        this.ball.x = 400;
        this.ball.y = 500;
        this.ball.dx = 4;
        this.ball.dy = -4;
        this.paddle.x = 350;
    }

    checkWin() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status === 1) {
                    return false;
                }
            }
        }
        return true;
    }

    handleKeyPress(e) {
        if (!this.gameRunning || this.gamePaused) return;

        const paddleSpeed = 15;
        if (e.key === 'ArrowLeft' && this.paddle.x > 0) {
            this.paddle.x -= paddleSpeed;
        } else if (e.key === 'ArrowRight' && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.x += paddleSpeed;
        }
    }

    handleMouseMove(e) {
        if (!this.gameRunning || this.gamePaused) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        this.paddle.x = mouseX - this.paddle.width / 2;

        // Keep paddle within bounds
        if (this.paddle.x < 0) this.paddle.x = 0;
        if (this.paddle.x > this.canvas.width - this.paddle.width) {
            this.paddle.x = this.canvas.width - this.paddle.width;
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 800, 600);

        // Draw bricks
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status === 1) {
                    const brickX = this.bricks[c][r].x;
                    const brickY = this.bricks[c][r].y;
                    this.ctx.fillStyle = '#ff6b6b';
                    this.ctx.fillRect(brickX, brickY, this.brickWidth, this.brickHeight);
                    this.ctx.strokeStyle = '#fff';
                    this.ctx.strokeRect(brickX, brickY, this.brickWidth, this.brickHeight);
                }
            }
        }

        // Draw paddle
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);

        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.closePath();
    }

    updateDisplay() {
        const scoreDisplay = document.querySelector('.score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Puntuación: ${this.score} | Vidas: ${this.lives}`;
        }
    }

    gameOver() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Game Over!', 400, 280);
        this.ctx.fillText(`Puntuación: ${this.score}`, 400, 320);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 400, 360);
    }

    gameWin() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Felicitaciones!', 400, 280);
        this.ctx.fillText(`¡Has ganado con ${this.score} puntos!`, 400, 320);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 400, 360);
    }
}

// ===== PLATFORMER GAME =====
class PlatformerGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.player = { x: 50, y: 500, width: 30, height: 30, dx: 0, dy: 0, onGround: false };
        this.platforms = [
            { x: 0, y: 550, width: 800, height: 50 }, // Ground
            { x: 200, y: 450, width: 100, height: 20 },
            { x: 350, y: 350, width: 100, height: 20 },
            { x: 500, y: 250, width: 100, height: 20 },
            { x: 650, y: 150, width: 100, height: 20 }
        ];
        this.coins = [
            { x: 230, y: 420, width: 15, height: 15, collected: false },
            { x: 380, y: 320, width: 15, height: 15, collected: false },
            { x: 530, y: 220, width: 15, height: 15, collected: false },
            { x: 680, y: 120, width: 15, height: 15, collected: false }
        ];
        this.obstacles = [
            { x: 300, y: 520, width: 20, height: 30 },
            { x: 450, y: 420, width: 20, height: 30 },
            { x: 600, y: 320, width: 20, height: 30 }
        ];
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        this.animationId = null;
        this.keys = {};
        this.gravity = 0.5;
        this.jumpPower = -12;
        this.speed = 5;
    }

    init() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="platformer-container">
                <div class="score-display">Puntuación: 0 | Vidas: 3</div>
                <canvas id="platformerCanvas" width="800" height="600" class="platformer-canvas"></canvas>
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="gameSystem.games.platformer.start()">Iniciar Juego</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.platformer.pause()">Pausar</button>
                    <button class="btn btn-secondary" onclick="gameSystem.games.platformer.reset()">Reiniciar</button>
                </div>
                <div class="game-instructions">
                    <p><strong>Controles:</strong> ← → Mover | ↑ Saltar</p>
                    <p>¡Recoge todas las monedas y evita los obstáculos!</p>
                    <p>Cada moneda vale 100 puntos.</p>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('platformerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.reset();
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    cleanup() {
        this.gameRunning = false;
        this.gamePaused = false;
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
        }
        document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
        document.removeEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    reset() {
        this.player = { x: 50, y: 500, width: 30, height: 30, dx: 0, dy: 0, onGround: false };
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        this.keys = {};

        // Reset coins
        this.coins.forEach(coin => coin.collected = false);

        this.draw();
        this.updateDisplay();
    }

    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gamePaused = false;
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    pause() {
        this.gamePaused = !this.gamePaused;
        if (!this.gamePaused && this.gameRunning) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;

        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Handle input
        this.player.dx = 0;
        if (this.keys['ArrowLeft'] && this.player.x > 0) {
            this.player.dx = -this.speed;
        }
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.width) {
            this.player.dx = this.speed;
        }
        if (this.keys['ArrowUp'] && this.player.onGround) {
            this.player.dy = this.jumpPower;
            this.player.onGround = false;
        }

        // Apply gravity
        this.player.dy += this.gravity;

        // Move player
        this.player.x += this.player.dx;
        this.player.y += this.player.dy;

        // Platform collision
        this.player.onGround = false;
        for (let platform of this.platforms) {
            if (this.player.x < platform.x + platform.width &&
                this.player.x + this.player.width > platform.x &&
                this.player.y < platform.y + platform.height &&
                this.player.y + this.player.height > platform.y) {

                // Landing on top of platform
                if (this.player.dy > 0 && this.player.y < platform.y) {
                    this.player.y = platform.y - this.player.height;
                    this.player.dy = 0;
                    this.player.onGround = true;
                }
                // Hitting platform from below
                else if (this.player.dy < 0 && this.player.y > platform.y) {
                    this.player.y = platform.y + platform.height;
                    this.player.dy = 0;
                }
                // Hitting platform from sides
                else if (this.player.dx > 0 && this.player.x < platform.x) {
                    this.player.x = platform.x - this.player.width;
                }
                else if (this.player.dx < 0 && this.player.x > platform.x) {
                    this.player.x = platform.x + platform.width;
                }
            }
        }

        // Coin collection
        for (let coin of this.coins) {
            if (!coin.collected &&
                this.player.x < coin.x + coin.width &&
                this.player.x + this.player.width > coin.x &&
                this.player.y < coin.y + coin.height &&
                this.player.y + this.player.height > coin.y) {
                coin.collected = true;
                this.score += 100;
                this.updateDisplay();
            }
        }

        // Obstacle collision
        for (let obstacle of this.obstacles) {
            if (this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y) {
                this.lives--;
                if (this.lives <= 0) {
                    this.gameOver();
                    return;
                } else {
                    this.resetPlayer();
                }
            }
        }

        // Fall off screen
        if (this.player.y > this.canvas.height) {
            this.lives--;
            if (this.lives <= 0) {
                this.gameOver();
                return;
            } else {
                this.resetPlayer();
            }
        }

        // Check win condition
        const allCoinsCollected = this.coins.every(coin => coin.collected);
        if (allCoinsCollected) {
            this.gameWin();
        }
    }

    resetPlayer() {
        this.player.x = 50;
        this.player.y = 500;
        this.player.dx = 0;
        this.player.dy = 0;
        this.player.onGround = false;
    }

    handleKeyDown(e) {
        if (!this.gameRunning || this.gamePaused) return;
        this.keys[e.key] = true;
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }

    draw() {
        // Clear canvas with sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 800, 600);

        // Draw platforms
        this.ctx.fillStyle = '#8B4513';
        for (let platform of this.platforms) {
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        }

        // Draw obstacles
        this.ctx.fillStyle = '#FF0000';
        for (let obstacle of this.obstacles) {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }

        // Draw coins
        for (let coin of this.coins) {
            if (!coin.collected) {
                this.ctx.fillStyle = '#FFD700';
                this.ctx.beginPath();
                this.ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        // Draw player
        this.ctx.fillStyle = '#4169E1';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        // Draw player eyes
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(this.player.x + 5, this.player.y + 5, 5, 5);
        this.ctx.fillRect(this.player.x + 20, this.player.y + 5, 5, 5);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(this.player.x + 7, this.player.y + 7, 2, 2);
        this.ctx.fillRect(this.player.x + 22, this.player.y + 7, 2, 2);
    }

    updateDisplay() {
        const scoreDisplay = document.querySelector('.score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Puntuación: ${this.score} | Vidas: ${this.lives}`;
        }
    }

    gameOver() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Game Over!', 400, 280);
        this.ctx.fillText(`Puntuación: ${this.score}`, 400, 320);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 400, 360);
    }

    gameWin() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Felicitaciones!', 400, 280);
        this.ctx.fillText(`¡Has ganado con ${this.score} puntos!`, 400, 320);
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Haz clic en Reiniciar para jugar de nuevo', 400, 360);
    }
}

// Initialize gameSystem after all classes are defined
let gameSystem;

// Game System - Colección completa de juegos
class GameSystem {
    constructor() {
        this.currentGame = null;
        this.games = {};
        this.initializeGames();
    }

    initializeGames() {
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
// Initialize game system immediately when script loads
console.log('🎮 Inicializando sistema de juegos...');

// Create gameSystem instance after all classes are defined
gameSystem = new GameSystem();

// Make gameSystem globally available
window.gameSystem = gameSystem;

console.log('🎮 Sistema de juegos cargado');

// Notify system loaded
if (typeof window.systemLoaded === 'function') {
    window.systemLoaded('GameSystem');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to game buttons (fallback)
    document.querySelectorAll('.game-play-btn').forEach(btn => {
        if (!btn.onclick && !btn.hasAttribute('onclick')) {
            const gameType = btn.getAttribute('onclick')?.match(/openGame\('(\w+)'\)/)?.[1];
            if (gameType) {
                btn.addEventListener('click', () => {
                    if (window.gameSystem) {
                        window.gameSystem.openGame(gameType);
                    }
                });
            }
        }
    });
});