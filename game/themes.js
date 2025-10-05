// Sistema de Temas Dinámicos - GameHub
class ThemeSystem {
    constructor() {
        this.themes = {
            cyberpunk: {
                name: 'Cyberpunk',
                primary: '#ff0080',
                secondary: '#00ffff',
                accent: '#ffea00',
                success: '#39ff14',
                warning: '#ff6b00',
                error: '#ff0040',
                bgPrimary: '#0a0a0a',
                bgSecondary: '#1a0033',
                bgTertiary: '#330066',
                bgCard: 'rgba(255, 0, 128, 0.08)',
                textPrimary: '#ffffff',
                textSecondary: '#ffea00',
                textMuted: '#00ffff',
                border: 'rgba(255, 0, 128, 0.3)',
                borderHover: 'rgba(0, 255, 255, 0.5)',
                shadow: '0 0 20px rgba(255, 0, 128, 0.3)',
                shadowHover: '0 0 40px rgba(0, 255, 255, 0.5)',
                particleColors: ['#ff0080', '#00ffff', '#ffea00', '#39ff14', '#ff6b00']
            },
            neon: {
                name: 'Neón Puro',
                primary: '#ff00ff',
                secondary: '#00ffff',
                accent: '#ffff00',
                success: '#00ff00',
                warning: '#ff8000',
                error: '#ff0000',
                bgPrimary: '#000000',
                bgSecondary: '#0a0a0a',
                bgTertiary: '#1a1a1a',
                bgCard: 'rgba(255, 0, 255, 0.1)',
                textPrimary: '#ffffff',
                textSecondary: '#00ffff',
                textMuted: '#ff00ff',
                border: 'rgba(255, 0, 255, 0.4)',
                borderHover: 'rgba(0, 255, 255, 0.6)',
                shadow: '0 0 25px rgba(255, 0, 255, 0.4)',
                shadowHover: '0 0 50px rgba(0, 255, 255, 0.6)',
                particleColors: ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff8000']
            },
            matrix: {
                name: 'Matrix',
                primary: '#00ff00',
                secondary: '#008000',
                accent: '#00ffff',
                success: '#32cd32',
                warning: '#ffff00',
                error: '#ff0000',
                bgPrimary: '#000000',
                bgSecondary: '#001100',
                bgTertiary: '#002200',
                bgCard: 'rgba(0, 255, 0, 0.08)',
                textPrimary: '#00ff00',
                textSecondary: '#32cd32',
                textMuted: '#008000',
                border: 'rgba(0, 255, 0, 0.3)',
                borderHover: 'rgba(50, 205, 50, 0.5)',
                shadow: '0 0 20px rgba(0, 255, 0, 0.3)',
                shadowHover: '0 0 40px rgba(50, 205, 50, 0.5)',
                particleColors: ['#00ff00', '#32cd32', '#008000', '#00ffff', '#ffff00']
            },
            sunset: {
                name: 'Atardecer',
                primary: '#ff4500',
                secondary: '#ff6347',
                accent: '#ffd700',
                success: '#32cd32',
                warning: '#ffa500',
                error: '#dc143c',
                bgPrimary: '#2f1b14',
                bgSecondary: '#4a2c1a',
                bgTertiary: '#8b4513',
                bgCard: 'rgba(255, 69, 0, 0.08)',
                textPrimary: '#ffffff',
                textSecondary: '#ffd700',
                textMuted: '#ff6347',
                border: 'rgba(255, 69, 0, 0.3)',
                borderHover: 'rgba(255, 215, 0, 0.5)',
                shadow: '0 0 20px rgba(255, 69, 0, 0.3)',
                shadowHover: '0 0 40px rgba(255, 215, 0, 0.5)',
                particleColors: ['#ff4500', '#ff6347', '#ffd700', '#32cd32', '#ffa500']
            },
            ocean: {
                name: 'Océano',
                primary: '#006994',
                secondary: '#00ced1',
                accent: '#87ceeb',
                success: '#32cd32',
                warning: '#ffd700',
                error: '#dc143c',
                bgPrimary: '#0a1a2e',
                bgSecondary: '#1e3a5f',
                bgTertiary: '#2e5984',
                bgCard: 'rgba(0, 105, 148, 0.08)',
                textPrimary: '#ffffff',
                textSecondary: '#87ceeb',
                textMuted: '#00ced1',
                border: 'rgba(0, 105, 148, 0.3)',
                borderHover: 'rgba(135, 206, 235, 0.5)',
                shadow: '0 0 20px rgba(0, 105, 148, 0.3)',
                shadowHover: '0 0 40px rgba(135, 206, 235, 0.5)',
                particleColors: ['#006994', '#00ced1', '#87ceeb', '#32cd32', '#ffd700']
            }
        };

        this.currentTheme = 'cyberpunk';
        this.loadTheme();
        this.createThemeUI();
    }

    loadTheme() {
        const saved = localStorage.getItem('gameHub_theme');
        if (saved && this.themes[saved]) {
            this.currentTheme = saved;
        }
        this.applyTheme(this.currentTheme);
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        Object.keys(theme).forEach(key => {
            if (key !== 'name' && key !== 'particleColors') {
                root.style.setProperty(`--${key}`, theme[key]);
            }
        });

        // Actualizar colores de partículas
        this.updateParticles(theme.particleColors);

        // Guardar tema seleccionado
        localStorage.setItem('gameHub_theme', themeName);
        this.currentTheme = themeName;
    }

    updateParticles(colors) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const colorIndex = index % colors.length;
            particle.style.background = colors[colorIndex];
            particle.style.boxShadow = `0 0 10px ${colors[colorIndex]}`;
        });
    }

    createThemeUI() {
        // Crear selector de temas
        const themeModal = document.createElement('div');
        themeModal.id = 'themeModal';
        themeModal.className = 'theme-modal';
        themeModal.innerHTML = `
            <div class="theme-modal-content">
                <div class="theme-modal-header">
                    <h2>🎨 Selector de Temas</h2>
                    <button class="theme-modal-close">&times;</button>
                </div>
                <div class="theme-grid" id="themeGrid"></div>
            </div>
        `;

        document.body.appendChild(themeModal);

        // Poblar temas
        const themeGrid = document.getElementById('themeGrid');
        Object.entries(this.themes).forEach(([key, theme]) => {
            const themeEl = document.createElement('div');
            themeEl.className = `theme-item ${key === this.currentTheme ? 'active' : ''}`;
            themeEl.dataset.theme = key;

            themeEl.innerHTML = `
                <div class="theme-preview">
                    <div class="theme-colors">
                        <div class="color-sample" style="background: ${theme.primary}"></div>
                        <div class="color-sample" style="background: ${theme.secondary}"></div>
                        <div class="color-sample" style="background: ${theme.accent}"></div>
                    </div>
                </div>
                <div class="theme-name">${theme.name}</div>
            `;

            themeEl.addEventListener('click', () => {
                this.applyTheme(key);
                document.querySelectorAll('.theme-item').forEach(t => t.classList.remove('active'));
                themeEl.classList.add('active');
            });

            themeGrid.appendChild(themeEl);
        });

        // Event listeners
        themeModal.querySelector('.theme-modal-close').addEventListener('click', () => {
            themeModal.classList.remove('active');
        });
    }

    showThemeModal() {
        const modal = document.getElementById('themeModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Tema aleatorio para efectos especiales
    randomTheme() {
        const themeKeys = Object.keys(this.themes);
        const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
        this.applyTheme(randomTheme);
        return randomTheme;
    }
}

// Initialize theme system
const themeSystem = new ThemeSystem();

// Add theme button to game page
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        const themeBtn = document.createElement('button');
        themeBtn.className = 'theme-btn';
        themeBtn.innerHTML = '🎨';
        themeBtn.title = 'Cambiar Tema';
        themeBtn.addEventListener('click', () => themeSystem.showThemeModal());

        nav.querySelector('.nav-container').appendChild(themeBtn);
    }

    // Notify system loaded
    if (typeof window.systemLoaded === 'function') {
        window.systemLoaded('ThemeSystem');
    }
});