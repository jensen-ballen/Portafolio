// Sistema de Logros y Conquistas - GameHub
class AchievementSystem {
    constructor() {
        this.achievements = {
            // Snake Achievements
            snake_first_apple: {
                id: 'snake_first_apple',
                name: 'Primer Bocado',
                description: 'Come tu primera manzana',
                icon: '🍎',
                game: 'snake',
                rarity: 'common',
                unlocked: false
            },
            snake_score_100: {
                id: 'snake_score_100',
                name: 'Centurión',
                description: 'Alcanza 100 puntos en Snake',
                icon: '💯',
                game: 'snake',
                rarity: 'rare',
                unlocked: false
            },
            snake_length_20: {
                id: 'snake_length_20',
                name: 'Serpiente Gigante',
                description: 'Alcanza longitud 20 en Snake',
                icon: '🐉',
                game: 'snake',
                rarity: 'epic',
                unlocked: false
            },

            // Memory Achievements
            memory_perfect: {
                id: 'memory_perfect',
                name: 'Memoria Perfecta',
                description: 'Completa Memory en menos de 30 movimientos',
                icon: '🧠',
                game: 'memory',
                rarity: 'epic',
                unlocked: false
            },

            // Pong Achievements
            pong_first_win: {
                id: 'pong_first_win',
                name: 'Victoria Inicial',
                description: 'Gana tu primera partida de Pong',
                icon: '🏆',
                game: 'pong',
                rarity: 'common',
                unlocked: false
            },

            // Platformer Achievements
            platformer_all_coins: {
                id: 'platformer_all_coins',
                name: 'Cazador de Monedas',
                description: 'Recoge todas las monedas en Platformer',
                icon: '🪙',
                game: 'platformer',
                rarity: 'rare',
                unlocked: false
            },

            // General Achievements
            games_master: {
                id: 'games_master',
                name: 'Maestro de Juegos',
                description: 'Juega todos los juegos al menos una vez',
                icon: '🎮',
                game: 'general',
                rarity: 'legendary',
                unlocked: false
            },
            high_scorer: {
                id: 'high_scorer',
                name: 'Puntuador Alto',
                description: 'Alcanza el top 10 en cualquier juego',
                icon: '⭐',
                game: 'general',
                rarity: 'rare',
                unlocked: false
            }
        };

        this.stats = {
            gamesPlayed: {},
            totalScore: 0,
            achievementsUnlocked: 0,
            playTime: 0
        };

        this.loadProgress();
        this.createAchievementUI();
    }

    loadProgress() {
        const saved = localStorage.getItem('gameHub_achievements');
        if (saved) {
            const data = JSON.parse(saved);
            this.achievements = { ...this.achievements, ...data.achievements };
            this.stats = { ...this.stats, ...data.stats };
        }
    }

    saveProgress() {
        localStorage.setItem('gameHub_achievements', JSON.stringify({
            achievements: this.achievements,
            stats: this.stats
        }));
    }

    unlockAchievement(achievementId) {
        if (this.achievements[achievementId] && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.stats.achievementsUnlocked++;

            this.showAchievementNotification(this.achievements[achievementId]);
            this.saveProgress();

            // Efectos especiales para logros raros
            if (this.achievements[achievementId].rarity === 'legendary') {
                this.playLegendaryEffect();
            }
        }
    }

    checkAchievement(gameType, event, data) {
        switch (gameType) {
            case 'snake':
                this.checkSnakeAchievements(event, data);
                break;
            case 'memory':
                this.checkMemoryAchievements(event, data);
                break;
            case 'pong':
                this.checkPongAchievements(event, data);
                break;
            case 'platformer':
                this.checkPlatformerAchievements(event, data);
                break;
        }

        // Check general achievements
        this.checkGeneralAchievements(gameType);
    }

    checkSnakeAchievements(event, data) {
        if (event === 'first_apple' && !this.achievements.snake_first_apple.unlocked) {
            this.unlockAchievement('snake_first_apple');
        }
        if (event === 'score_update' && data.score >= 100) {
            this.unlockAchievement('snake_score_100');
        }
        if (event === 'length_update' && data.length >= 20) {
            this.unlockAchievement('snake_length_20');
        }
    }

    checkMemoryAchievements(event, data) {
        if (event === 'game_complete' && data.moves <= 30) {
            this.unlockAchievement('memory_perfect');
        }
    }

    checkPongAchievements(event, data) {
        if (event === 'game_win') {
            this.unlockAchievement('pong_first_win');
        }
    }

    checkPlatformerAchievements(event, data) {
        if (event === 'all_coins_collected') {
            this.unlockAchievement('platformer_all_coins');
        }
    }

    checkGeneralAchievements(gameType) {
        // Track games played
        if (!this.stats.gamesPlayed[gameType]) {
            this.stats.gamesPlayed[gameType] = 0;
        }
        this.stats.gamesPlayed[gameType]++;

        // Check if all games have been played
        const allGames = ['snake', 'memory', 'tictactoe', 'quiz', 'tetris', 'pong', 'breakout', 'platformer'];
        const gamesPlayed = Object.keys(this.stats.gamesPlayed).length;

        if (gamesPlayed >= allGames.length && !this.achievements.games_master.unlocked) {
            this.unlockAchievement('games_master');
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = `achievement-notification ${achievement.rarity}`;
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }

    playLegendaryEffect() {
        // Efecto especial para logros legendarios
        const overlay = document.createElement('div');
        overlay.className = 'legendary-overlay';
        overlay.innerHTML = `
            <div class="legendary-effect">
                <div class="legendary-sparkles"></div>
                <div class="legendary-text">¡LOGRO LEGENDARIO!</div>
            </div>
        `;

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);

        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 1000);
        }, 3000);
    }

    createAchievementUI() {
        // Crear modal de logros
        const achievementModal = document.createElement('div');
        achievementModal.id = 'achievementModal';
        achievementModal.className = 'achievement-modal';
        achievementModal.innerHTML = `
            <div class="achievement-modal-content">
                <div class="achievement-modal-header">
                    <h2>🏆 Logros y Estadísticas</h2>
                    <button class="achievement-modal-close">&times;</button>
                </div>
                <div class="achievement-stats">
                    <div class="stat-item">
                        <span class="stat-value">${this.stats.achievementsUnlocked}</span>
                        <span class="stat-label">Logros Desbloqueados</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${Object.keys(this.stats.gamesPlayed).length}</span>
                        <span class="stat-label">Juegos Jugados</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.stats.totalScore}</span>
                        <span class="stat-label">Puntuación Total</span>
                    </div>
                </div>
                <div class="achievement-grid" id="achievementGrid"></div>
            </div>
        `;

        document.body.appendChild(achievementModal);

        // Event listeners
        achievementModal.querySelector('.achievement-modal-close').addEventListener('click', () => {
            achievementModal.classList.remove('active');
        });

        // Populate achievements
        this.updateAchievementGrid();
    }

    updateAchievementGrid() {
        const grid = document.getElementById('achievementGrid');
        if (!grid) return;

        grid.innerHTML = '';

        Object.values(this.achievements).forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`;

            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.unlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    <div class="achievement-game">${achievement.game}</div>
                </div>
            `;

            grid.appendChild(achievementEl);
        });
    }

    showAchievements() {
        const modal = document.getElementById('achievementModal');
        if (modal) {
            modal.classList.add('active');
            this.updateAchievementGrid();
        }
    }
}

// Initialize achievement system
const achievementSystem = new AchievementSystem();

// Add achievement button to game page
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        const achievementBtn = document.createElement('button');
        achievementBtn.className = 'achievement-btn';
        achievementBtn.innerHTML = '🏆';
        achievementBtn.title = 'Ver Logros';
        achievementBtn.addEventListener('click', () => achievementSystem.showAchievements());

        nav.querySelector('.nav-container').appendChild(achievementBtn);
    }

    // Notify system loaded
    if (typeof window.systemLoaded === 'function') {
        window.systemLoaded('AchievementSystem');
    }
});