// Sistema de Seguridad - Encriptación de datos sensibles
class SecuritySystem {
    constructor() {
        this.encryptionKey = 'JensenPortfolio2024';
        this.sensitiveData = {};
        this.init();
    }

    init() {
        this.encryptSensitiveData();
        this.obfuscateContactInfo();
        this.addConsoleProtection();
    }

    // Encriptación básica usando Caesar cipher + base64
    encrypt(text) {
        if (!text) return '';
        const shift = 13;
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let char = text.charCodeAt(i);
            if (char >= 65 && char <= 90) {
                result += String.fromCharCode((char - 65 + shift) % 26 + 65);
            } else if (char >= 97 && char <= 122) {
                result += String.fromCharCode((char - 97 + shift) % 26 + 97);
            } else {
                result += text.charAt(i);
            }
        }
        return btoa(result);
    }

    decrypt(encryptedText) {
        if (!encryptedText) return '';
        try {
            const decoded = atob(encryptedText);
            const shift = 13;
            let result = '';
            for (let i = 0; i < decoded.length; i++) {
                let char = decoded.charCodeAt(i);
                if (char >= 65 && char <= 90) {
                    result += String.fromCharCode((char - 65 - shift + 26) % 26 + 65);
                } else if (char >= 97 && char <= 122) {
                    result += String.fromCharCode((char - 97 - shift + 26) % 26 + 97);
                } else {
                    result += decoded.charAt(i);
                }
            }
            return result;
        } catch (e) {
            return '';
        }
    }

    // Encriptar datos sensibles
    encryptSensitiveData() {
        this.sensitiveData = {
            phone: this.encrypt('+57 311 500 9832'),
            location: this.encrypt('Colombia, Valle del Cauca'),
            email: this.encrypt('jensenbanguera@gmail.com'),
            linkedin: this.encrypt('https://www.linkedin.com/in/jensen-ballen-banguera-323bb3349'),
            github: this.encrypt('https://github.com/jensen-ballen'),
            twitter: this.encrypt('https://x.com/Jensenbanguera'),
            instagram: this.encrypt('https://www.instagram.com/jensenballen/')
        };
    }

    // Obtener datos desencriptados cuando sea necesario
    getDecryptedData(key) {
        return this.decrypt(this.sensitiveData[key]);
    }

    // Ofuscar información de contacto en el DOM
    obfuscateContactInfo() {
        // Reemplazar texto directo con placeholders
        const contactElements = document.querySelectorAll('[data-contact]');
        contactElements.forEach(el => {
            const type = el.dataset.contact;
            if (this.sensitiveData[type]) {
                el.textContent = this.getPlaceholder(type);
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.revealContact(type, el);
                });
            }
        });
    }

    getPlaceholder(type) {
        const placeholders = {
            phone: '📱 Hacer clic para ver teléfono',
            location: '📍 Hacer clic para ver ubicación',
            email: '✉️ Hacer clic para ver email',
            linkedin: '💼 Hacer clic para ver LinkedIn',
            github: '💻 Hacer clic para ver GitHub',
            twitter: '🐦 Hacer clic para ver Twitter',
            instagram: '📷 Hacer clic para ver Instagram'
        };
        return placeholders[type] || 'Información protegida';
    }

    revealContact(type, element) {
        const decrypted = this.getDecryptedData(type);
        if (decrypted) {
            if (type === 'phone' || type === 'email') {
                element.textContent = decrypted;
                element.style.color = 'var(--primary)';
            } else {
                // Para enlaces sociales, crear un enlace
                const link = document.createElement('a');
                link.href = decrypted;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = decrypted;
                link.style.color = 'var(--primary)';
                element.parentNode.replaceChild(link, element);
            }
        }
    }

    // Protección básica contra manipulación de consola
    addConsoleProtection() {
        // Ofuscar algunas propiedades globales
        const protectedProps = ['phone', 'location', 'email', 'contact'];

        protectedProps.forEach(prop => {
            Object.defineProperty(window, prop, {
                get: () => {
                    console.warn('Acceso a información sensible detectado. Esta información está protegida.');
                    return 'Información protegida por seguridad';
                },
                configurable: false
            });
        });

        // Detectar intentos de manipulación
        let devtoolsOpen = false;
        const threshold = 160;

        const detectDevTools = () => {
            if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    console.clear();
                    console.log('%c⚠️ Modo desarrollador detectado', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
                    console.log('%cEsta aplicación tiene medidas de seguridad activas.', 'color: #4ecdc4;');
                    console.log('%cNo intentes acceder a información sensible.', 'color: #45b7d1;');
                }
            } else {
                devtoolsOpen = false;
            }
        };

        setInterval(detectDevTools, 500);
    }

    // Generar rutas ofuscadas para navegación
    obfuscateRoutes() {
        const routes = {
            'contact': 'cntct',
            'phone': 'phn',
            'email': 'eml',
            'location': 'loc'
        };

        // Reemplazar rutas en enlaces
        document.querySelectorAll('a[href*="contact"], a[href*="phone"], a[href*="email"]').forEach(link => {
            const href = link.getAttribute('href');
            Object.keys(routes).forEach(key => {
                if (href.includes(key)) {
                    link.setAttribute('href', href.replace(key, routes[key]));
                }
            });
        });
    }
}

// Inicializar sistema de seguridad
const securitySystem = new SecuritySystem();

// Función global para acceder a datos desencriptados (solo cuando sea necesario)
window.getSecureData = (key) => securitySystem.getDecryptedData(key);