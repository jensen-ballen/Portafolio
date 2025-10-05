// Sistema de Efectos de Sonido Procedural - GameHub
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.isEnabled = true;
        this.volume = 0.3;
        this.initAudio();
    }

    async initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    // Efectos de sonido procedurales
    playSound(type, options = {}) {
        if (!this.audioContext || !this.isEnabled) return;

        const { frequency = 440, duration = 200, volume = this.volume, waveType = 'sine' } = options;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = waveType;

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration / 1000);
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }

    // Efectos específicos de juegos
    playCoinCollect() {
        this.playSound('coin', { frequency: 800, duration: 150, waveType: 'sine' });
        setTimeout(() => this.playSound('coin', { frequency: 1000, duration: 100, waveType: 'sine' }), 50);
    }

    playJump() {
        this.playSound('jump', { frequency: 300, duration: 200, waveType: 'square' });
    }

    playGameOver() {
        // Secuencia descendente
        const notes = [400, 350, 300, 250, 200];
        notes.forEach((freq, index) => {
            setTimeout(() => this.playSound('gameover', { frequency: freq, duration: 300, waveType: 'sawtooth' }), index * 100);
        });
    }

    playVictory() {
        // Secuencia ascendente victoriosa
        const notes = [300, 400, 500, 600, 700, 800];
        notes.forEach((freq, index) => {
            setTimeout(() => this.playSound('victory', { frequency: freq, duration: 200, waveType: 'triangle' }), index * 150);
        });
    }

    playClick() {
        this.playSound('click', { frequency: 600, duration: 100, waveType: 'square' });
    }

    playAchievement() {
        // Fanfarria de logro
        const notes = [523, 659, 784, 1047]; // Do, Mi, Sol, Do (octava arriba)
        notes.forEach((freq, index) => {
            setTimeout(() => this.playSound('achievement', { frequency: freq, duration: 400, waveType: 'sine' }), index * 200);
        });
    }

    playSnakeEat() {
        this.playSound('eat', { frequency: 600, duration: 150, waveType: 'triangle' });
        setTimeout(() => this.playSound('eat', { frequency: 800, duration: 100, waveType: 'triangle' }), 75);
    }

    playBounce() {
        this.playSound('bounce', { frequency: 200, duration: 100, waveType: 'sawtooth' });
    }

    playBrickBreak() {
        this.playSound('break', { frequency: 150, duration: 200, waveType: 'sawtooth' });
        setTimeout(() => this.playSound('break', { frequency: 100, duration: 150, waveType: 'sawtooth' }), 50);
    }

    toggleSound() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

// Initialize sound system
const soundSystem = new SoundSystem();

// Add sound toggle button
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        const soundBtn = document.createElement('button');
        soundBtn.className = 'sound-btn';
        soundBtn.innerHTML = '🔊';
        soundBtn.title = 'Activar/Desactivar Sonido';
        soundBtn.addEventListener('click', () => {
            const enabled = soundSystem.toggleSound();
            soundBtn.innerHTML = enabled ? '🔊' : '🔇';
            soundBtn.title = enabled ? 'Desactivar Sonido' : 'Activar Sonido';
        });

        nav.querySelector('.nav-container').appendChild(soundBtn);
    }

    // Notify system loaded
    if (typeof window.systemLoaded === 'function') {
        window.systemLoaded('SoundSystem');
    }
});