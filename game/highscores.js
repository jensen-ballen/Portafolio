// Sistema de Highscores Local - GameHub
class HighscoreSystem {
    constructor() {
        this.scores = {
            snake: [],
            tetris: [],
            pong: [],
            memory: [],
            breakout: [],
            platformer: [],
            tictactoe: [],
            quiz: []
        };

        this.maxScores = 10; // Top 10 por juego
        this.loadScores();
        this.createHighscoreUI();
    }

    loadScores() {
        const saved = localStorage.getItem('gameHub_highscores');
        if (saved) {
            this.scores = { ...this.scores, ...JSON.parse(saved) };
        }
    }

    saveScores() {
        localStorage.setItem('gameHub_highscores', JSON.stringify(this.scores));
    }

    addScore(gameType, score, playerName = 'Jugador') {
        if (!this.scores[gameType]) return;

        const newScore = {
            score: score,
            player: playerName,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        this.scores[gameType].push(newScore);

        // Ordenar por puntuación (descendente)
        this.scores[gameType].sort((a, b) => b.score - a.score);

        // Mantener solo top 10
        this.scores[gameType] = this.scores[gameType].slice(0, this.maxScores);

        this.saveScores();

        // Verificar logro de high scorer
        if (achievementSystem) {
            achievementSystem.unlockAchievement('high_scorer');
        }

        return this.getRank(gameType, score);
    }

    getRank(gameType, score) {
        const gameScores = this.scores[gameType];
        for (let i = 0; i < gameScores.length; i++) {
            if (gameScores[i].score <= score) {
                return i + 1;
            }
        }
        return gameScores.length + 1;
    }

    getTopScores(gameType, limit = 10) {
        return this.scores[gameType].slice(0, limit);
    }

    getPlayerBest(gameType, playerName = 'Jugador') {
        const gameScores = this.scores[gameType];
        return gameScores.find(score => score.player === playerName);
    }

    createHighscoreUI() {
        // Crear modal de highscores
        const highscoreModal = document.createElement('div');
        highscoreModal.id = 'highscoreModal';
        highscoreModal.className = 'highscore-modal';
        highscoreModal.innerHTML = `
            <div class="highscore-modal-content">
                <div class="highscore-modal-header">
                    <h2>🏅 Tabla de Highscores</h2>
                    <button class="highscore-modal-close">&times;</button>
                </div>
                <div class="highscore-tabs">
                    <button class="highscore-tab active" data-game="snake">Snake</button>
                    <button class="highscore-tab" data-game="tetris">Tetris</button>
                    <button class="highscore-tab" data-game="pong">Pong</button>
                    <button class="highscore-tab" data-game="memory">Memory</button>
                    <button class="highscore-tab" data-game="breakout">Breakout</button>
                    <button class="highscore-tab" data-game="platformer">Platformer</button>
                    <button class="highscore-tab" data-game="quiz">Quiz</button>
                </div>
                <div class="highscore-content" id="highscoreContent"></div>
            </div>
        `;

        document.body.appendChild(highscoreModal);

        // Event listeners
        highscoreModal.querySelector('.highscore-modal-close').addEventListener('click', () => {
            highscoreModal.classList.remove('active');
        });

        // Tab switching
        highscoreModal.querySelectorAll('.highscore-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                highscoreModal.querySelectorAll('.highscore-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.showHighscores(tab.dataset.game);
            });
        });
    }

    showHighscores(gameType) {
        const content = document.getElementById('highscoreContent');
        if (!content) return;

        const scores = this.getTopScores(gameType);

        if (scores.length === 0) {
            content.innerHTML = `
                <div class="no-scores">
                    <p>🎮 No hay puntuaciones registradas aún</p>
                    <p>¡Sé el primero en jugar!</p>
                </div>
            `;
            return;
        }

        content.innerHTML = `
            <div class="highscore-list">
                ${scores.map((score, index) => `
                    <div class="highscore-item ${index < 3 ? 'top-' + (index + 1) : ''}">
                        <div class="rank">#${index + 1}</div>
                        <div class="player">${score.player}</div>
                        <div class="score">${score.score.toLocaleString()}</div>
                        <div class="date">${new Date(score.date).toLocaleDateString()}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showHighscoreModal(gameType = 'snake') {
        const modal = document.getElementById('highscoreModal');
        if (modal) {
            modal.classList.add('active');
            this.showHighscores(gameType);
        }
    }

    showGameOverHighscore(gameType, finalScore) {
        const rank = this.getRank(gameType, finalScore);

        if (rank <= this.maxScores) {
            // Nuevo highscore!
            setTimeout(() => {
                const playerName = prompt('¡Nuevo Highscore! Ingresa tu nombre:', 'Jugador') || 'Jugador';
                this.addScore(gameType, finalScore, playerName);

                // Mostrar celebración
                this.showHighscoreCelebration(gameType, finalScore, rank, playerName);
            }, 1000);
        } else {
            // No es highscore, pero mostrar ranking
            setTimeout(() => {
                alert(`Puntuación: ${finalScore}\nRanking: #${rank} de ${this.scores[gameType].length + 1} jugadores`);
            }, 1000);
        }
    }

    showHighscoreCelebration(gameType, score, rank, playerName) {
        const celebration = document.createElement('div');
        celebration.className = 'highscore-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-sparkles">✨🎉⭐</div>
                <h2>¡NUEVO HIGHSCORE!</h2>
                <div class="celebration-details">
                    <p><strong>${playerName}</strong></p>
                    <p>Juego: ${gameType.toUpperCase()}</p>
                    <p>Puntuación: ${score.toLocaleString()}</p>
                    <p>Ranking: #${rank}</p>
                </div>
                <button class="celebration-btn" onclick="highscoreSystem.showHighscoreModal('${gameType}')">Ver Tabla Completa</button>
            </div>
        `;

        document.body.appendChild(celebration);

        setTimeout(() => celebration.classList.add('active'), 100);

        setTimeout(() => {
            celebration.classList.remove('active');
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.parentNode.removeChild(celebration);
                }
            }, 500);
        }, 4000);
    }
}

// Initialize highscore system
const highscoreSystem = new HighscoreSystem();

// Add highscore button to game page
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        const highscoreBtn = document.createElement('button');
        highscoreBtn.className = 'highscore-btn';
        highscoreBtn.innerHTML = '🏅';
        highscoreBtn.title = 'Ver Highscores';
        highscoreBtn.addEventListener('click', () => highscoreSystem.showHighscoreModal());

        nav.querySelector('.nav-container').appendChild(highscoreBtn);
    }

    // Notify system loaded
    if (typeof window.systemLoaded === 'function') {
        window.systemLoaded('HighscoreSystem');
    }
});