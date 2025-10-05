// Sistema de Animaciones Avanzadas - GameHub
class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.createGlobalAnimations();
    }

    createGlobalAnimations() {
        // Animación de entrada escalonada para elementos
        this.createStaggerAnimation();

        // Efectos de hover avanzados
        this.createHoverEffects();

        // Animaciones de celebración
        this.createCelebrationEffects();
    }

    createStaggerAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        // Observar elementos que deben animarse
        document.querySelectorAll('.game-card, .achievement-item, .highscore-item').forEach(el => {
            observer.observe(el);
        });
    }

    createHoverEffects() {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.game-card:hover');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    createCelebrationEffects() {
        // Confetti effect
        this.createConfetti = () => {
            const colors = ['#ff0080', '#00ffff', '#ffea00', '#39ff14', '#ff6b00'];

            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}vw;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    z-index: 9999;
                    pointer-events: none;
                    animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                `;

                document.body.appendChild(confetti);

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }
        };

        // CSS para confetti
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }

            .animate-in {
                animation: slideInUp 0.6s ease-out forwards;
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .game-card::before {
                transition: all 0.3s ease;
            }

            .game-card:hover::before {
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);
    }

    // Efectos específicos de juegos
    playGameStartEffect() {
        // Efecto de zoom y glow
        const modal = document.getElementById('gameModal');
        if (modal) {
            modal.style.animation = 'gameStart 0.5s ease-out';
        }
    }

    playScoreEffect(element, score) {
        // Animación de puntuación
        const scoreEl = document.createElement('div');
        scoreEl.className = 'score-popup';
        scoreEl.textContent = `+${score}`;
        scoreEl.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--success);
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 0 10px var(--success);
            pointer-events: none;
            animation: score-popup 1s ease-out forwards;
            z-index: 1000;
        `;

        element.appendChild(scoreEl);

        setTimeout(() => {
            if (scoreEl.parentNode) {
                scoreEl.parentNode.removeChild(scoreEl);
            }
        }, 1000);
    }

    playComboEffect(combo) {
        if (combo < 3) return;

        const comboEl = document.createElement('div');
        comboEl.className = 'combo-effect';
        comboEl.innerHTML = `
            <div class="combo-text">COMBO x${combo}!</div>
            <div class="combo-sparkles">✨💥⭐</div>
        `;
        comboEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--warning);
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            text-shadow: 0 0 20px var(--warning);
            pointer-events: none;
            animation: combo-bounce 1s ease-out forwards;
            z-index: 9999;
        `;

        document.body.appendChild(comboEl);

        setTimeout(() => {
            if (comboEl.parentNode) {
                comboEl.parentNode.removeChild(comboEl);
            }
        }, 1000);
    }

    // Efectos de pantalla completa
    shakeScreen(intensity = 5) {
        document.body.style.animation = `shake ${intensity * 0.1}s ease-in-out`;
        setTimeout(() => {
            document.body.style.animation = '';
        }, intensity * 100);
    }

    flashScreen(color = '#ffffff', duration = 200) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${color};
            opacity: 0.3;
            pointer-events: none;
            z-index: 9998;
            animation: flash ${duration}ms ease-out forwards;
        `;

        document.body.appendChild(flash);

        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, duration);
    }

    // Sistema de partículas personalizado
    createParticleEffect(x, y, color, count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'custom-particle';
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${Math.random() * 8 + 2}px;
                height: ${Math.random() * 8 + 2}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                animation: particle-explode ${Math.random() * 1 + 0.5}s ease-out forwards;
                z-index: 9999;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }
}

// Initialize animation system
const animationSystem = new AnimationSystem();

// Add CSS for animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gameStart {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes score-popup {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
                transform: translate(-50%, -100%) scale(1);
            }
        }

        @keyframes combo-bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translate(-50%, -50%) scale(1);
            }
            40% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            60% {
                transform: translate(-50%, -50%) scale(1.05);
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes flash {
            0% { opacity: 0.3; }
            50% { opacity: 0.6; }
            100% { opacity: 0; }
        }

        @keyframes particle-explode {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Notify system loaded
    if (typeof window.systemLoaded === 'function') {
        window.systemLoaded('AnimationSystem');
    }
});