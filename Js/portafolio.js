// Portafolio JavaScript - Jensen
// ================================

// Traducciones
const translations = {
    es: {
        'nav.home': 'Inicio',
        'nav.about': 'Sobre Mí',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',
        'hero.greeting': 'Hola, soy',
        'hero.subtitle': 'Desarrollador Full Stack & Diseñador Web',
        'hero.description': 'Apasionado por crear experiencias digitales excepcionales y soluciones tecnológicas innovadoras.',
        'hero.downloadCV': 'Descargar Hoja de Vida',
        'hero.contact': 'Contactar',
        'about.title': 'Sobre Mí',
        'about.subtitle': 'Conoce más sobre mi trayectoria profesional',
        'about.story': 'Mi Historia',
        'about.description': 'Soy un profesional apasionado por la tecnología y el desarrollo de software. Con experiencia en múltiples tecnologías y un enfoque constante en la innovación, me dedico a crear soluciones que marquen la diferencia.',
        'about.experience': 'Años de Experiencia',
        'about.projects': 'Proyectos Completados',
        'about.satisfaction': 'Satisfacción del Cliente',
        'skills.title': 'Habilidades',
        'skills.subtitle': 'Tecnologías y herramientas que domino',
        'projects.title': 'Proyectos Destacados',
        'projects.subtitle': 'Algunos de mis trabajos más recientes',
        'contact.title': 'Contacto',
        'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
        'contact.email': 'Email',
        'contact.phone': 'Teléfono',
        'contact.location': 'Ubicación',
        'contact.name': 'Tu Nombre',
        'contact.subject': 'Asunto',
        'contact.message': 'Tu Mensaje',
        'contact.send': 'Enviar Mensaje',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.made': 'Hecho con',
        'footer.coffee': 'y mucho café',
        'notifications.cvDownloaded': '¡CV descargado correctamente!',
        'notifications.cvError': 'Error al descargar el CV. Inténtalo de nuevo.',
        'notifications.messageSent': '¡Mensaje enviado correctamente!',
        'notifications.messageError': 'Error al enviar el mensaje. Inténtalo de nuevo.',
        'notifications.imageUpdated': '¡Imagen actualizada correctamente!',
        'loading.downloading': 'Descargando...',
        'loading.sending': 'Enviando...'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About Me',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'hero.greeting': 'Hello, I\'m',
        'hero.subtitle': 'Full Stack Developer & Web Designer',
        'hero.description': 'Passionate about creating exceptional digital experiences and innovative technological solutions.',
        'hero.downloadCV': 'Download Resume',
        'hero.contact': 'Contact',
        'about.title': 'About Me',
        'about.subtitle': 'Learn more about my professional journey',
        'about.story': 'My Story',
        'about.description': 'I am a professional passionate about technology and software development. With experience in multiple technologies and a constant focus on innovation, I dedicate myself to creating solutions that make a difference.',
        'about.experience': 'Years of Experience',
        'about.projects': 'Completed Projects',
        'about.satisfaction': 'Client Satisfaction',
        'skills.title': 'Skills',
        'skills.subtitle': 'Technologies and tools I master',
        'projects.title': 'Featured Projects',
        'projects.subtitle': 'Some of my most recent work',
        'contact.title': 'Contact',
        'contact.subtitle': 'Have a project in mind? Let\'s talk!',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.name': 'Your Name',
        'contact.subject': 'Subject',
        'contact.message': 'Your Message',
        'contact.send': 'Send Message',
        'footer.rights': 'All rights reserved.',
        'footer.made': 'Made with',
        'footer.coffee': 'and lots of coffee',
        'notifications.cvDownloaded': 'CV downloaded successfully!',
        'notifications.cvError': 'Error downloading CV. Please try again.',
        'notifications.messageSent': 'Message sent successfully!',
        'notifications.messageError': 'Error sending message. Please try again.',
        'notifications.imageUpdated': 'Image updated successfully!',
        'loading.downloading': 'Downloading...',
        'loading.sending': 'Sending...'
    },
    pt: {
        'nav.home': 'Início',
        'nav.about': 'Sobre Mim',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Projetos',
        'nav.contact': 'Contato',
        'hero.greeting': 'Olá, eu sou',
        'hero.subtitle': 'Desenvolvedor Full Stack & Designer Web',
        'hero.description': 'Apaixonado por criar experiências digitais excepcionais e soluções tecnológicas inovadoras.',
        'hero.downloadCV': 'Baixar Currículo',
        'hero.contact': 'Contatar',
        'about.title': 'Sobre Mim',
        'about.subtitle': 'Conheça mais sobre minha trajetória profissional',
        'about.story': 'Minha História',
        'about.description': 'Sou um profissional apaixonado por tecnologia e desenvolvimento de software. Com experiência em múltiplas tecnologias e foco constante na inovação, me dedico a criar soluções que fazem a diferença.',
        'about.experience': 'Anos de Experiência',
        'about.projects': 'Projetos Concluídos',
        'about.satisfaction': 'Satisfação do Cliente',
        'skills.title': 'Habilidades',
        'skills.subtitle': 'Tecnologias e ferramentas que domino',
        'projects.title': 'Projetos em Destaque',
        'projects.subtitle': 'Alguns dos meus trabalhos mais recentes',
        'contact.title': 'Contato',
        'contact.subtitle': 'Tem um projeto em mente? Vamos conversar!',
        'contact.email': 'Email',
        'contact.phone': 'Telefone',
        'contact.location': 'Localização',
        'contact.name': 'Seu Nome',
        'contact.subject': 'Assunto',
        'contact.message': 'Sua Mensagem',
        'contact.send': 'Enviar Mensagem',
        'footer.rights': 'Todos os direitos reservados.',
        'footer.made': 'Feito com',
        'footer.coffee': 'e muito café',
        'notifications.cvDownloaded': 'CV baixado com sucesso!',
        'notifications.cvError': 'Erro ao baixar o CV. Tente novamente.',
        'notifications.messageSent': 'Mensagem enviada com sucesso!',
        'notifications.messageError': 'Erro ao enviar mensagem. Tente novamente.',
        'notifications.imageUpdated': 'Imagem atualizada com sucesso!',
        'loading.downloading': 'Baixando...',
        'loading.sending': 'Enviando...'
    }
};

// Variables globales
let currentLanguage = localStorage.getItem('language') || 'es';
let currentTheme = localStorage.getItem('theme') || 'light';

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initTheme();
    initLanguage();
    initNavigation();
    initScrollEffects();
    initSkillsAnimation();
    initContactForm();
    initDownloadCV();
    initImageUpload();
    initTypingEffect();
    initParticles();
    initProjectFilters();
    initViewToggle();
    initAdvancedAnimations();
    initEmailJS();
    initSecurityFeatures();
});

// ================================
// SISTEMA DE TEMAS
// ================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Aplicar tema guardado
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    themeToggle?.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        
        // Animación suave
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ================================
// SISTEMA DE IDIOMAS
// ================================
function initLanguage() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Aplicar idioma guardado
    updateLanguage(currentLanguage);
    currentLangSpan.textContent = currentLanguage.toUpperCase();
    
    // Toggle dropdown
    langBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelector('.language-selector').classList.toggle('active');
    });
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', () => {
        document.querySelector('.language-selector')?.classList.remove('active');
    });
    
    // Cambiar idioma
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const newLang = option.getAttribute('data-lang');
            if (newLang !== currentLanguage) {
                currentLanguage = newLang;
                localStorage.setItem('language', currentLanguage);
                updateLanguage(currentLanguage);
                currentLangSpan.textContent = currentLanguage.toUpperCase();
                document.querySelector('.language-selector').classList.remove('active');
                
                showNotification(
                    currentLanguage === 'es' ? '¡Idioma cambiado!' : 
                    currentLanguage === 'en' ? 'Language changed!' : 
                    'Idioma alterado!', 
                    'success'
                );
            }
        });
    });
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Actualizar placeholders
    updatePlaceholders(lang);
    
    // Actualizar títulos dinámicos
    updateDynamicContent(lang);
}

function updatePlaceholders(lang) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    if (nameInput) nameInput.placeholder = translations[lang]['contact.name'];
    if (emailInput) emailInput.placeholder = translations[lang]['contact.email'];
    if (subjectInput) subjectInput.placeholder = translations[lang]['contact.subject'];
    if (messageTextarea) messageTextarea.placeholder = translations[lang]['contact.message'];
}

function updateDynamicContent(lang) {
    // Actualizar títulos de secciones que no tienen data-translate
    const aboutTitle = document.querySelector('#sobre-mi .section-title');
    const skillsTitle = document.querySelector('#habilidades .section-title');
    const projectsTitle = document.querySelector('#proyectos .section-title');
    const contactTitle = document.querySelector('#contacto .section-title');
    
    if (aboutTitle) aboutTitle.textContent = translations[lang]['about.title'];
    if (skillsTitle) skillsTitle.textContent = translations[lang]['skills.title'];
    if (projectsTitle) projectsTitle.textContent = translations[lang]['projects.title'];
    if (contactTitle) contactTitle.textContent = translations[lang]['contact.title'];
    
    // Actualizar subtítulos
    const aboutSubtitle = document.querySelector('#sobre-mi .section-subtitle');
    const skillsSubtitle = document.querySelector('#habilidades .section-subtitle');
    const projectsSubtitle = document.querySelector('#proyectos .section-subtitle');
    const contactSubtitle = document.querySelector('#contacto .section-subtitle');
    
    if (aboutSubtitle) aboutSubtitle.textContent = translations[lang]['about.subtitle'];
    if (skillsSubtitle) skillsSubtitle.textContent = translations[lang]['skills.subtitle'];
    if (projectsSubtitle) projectsSubtitle.textContent = translations[lang]['projects.subtitle'];
    if (contactSubtitle) contactSubtitle.textContent = translations[lang]['contact.subtitle'];
    
    // Actualizar contenido específico
    const aboutStory = document.querySelector('.about-text h3');
    const aboutDescription = document.querySelector('.about-text p');
    
    if (aboutStory) aboutStory.textContent = translations[lang]['about.story'];
    if (aboutDescription) aboutDescription.textContent = translations[lang]['about.description'];
    
    // Actualizar estadísticas
    const stats = document.querySelectorAll('.stat p');
    if (stats.length >= 3) {
        stats[0].textContent = translations[lang]['about.experience'];
        stats[1].textContent = translations[lang]['about.projects'];
        stats[2].textContent = translations[lang]['about.satisfaction'];
    }
    
    // Actualizar información de contacto
    const contactLabels = document.querySelectorAll('.contact-details h3');
    if (contactLabels.length >= 3) {
        contactLabels[0].textContent = translations[lang]['contact.email'];
        contactLabels[1].textContent = translations[lang]['contact.phone'];
        contactLabels[2].textContent = translations[lang]['contact.location'];
    }
    
    // Actualizar footer
    const footerText = document.querySelector('.footer-content p:first-child');
    const footerMade = document.querySelector('.footer-content p:last-child');
    
    if (footerText) {
        footerText.innerHTML = `&copy; 2024 Jensen. ${translations[lang]['footer.rights']}`;
    }
    if (footerMade) {
        footerMade.innerHTML = `${translations[lang]['footer.made']} <i class="fas fa-heart"></i> ${translations[lang]['footer.coffee']}`;
    }
}

// ================================
// NAVEGACIÓN
// ================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle menu móvil
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menu al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling para los links de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// EFECTOS DE SCROLL
// ================================
function initScrollEffects() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-text, .contact-item');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ================================
// ANIMACIÓN DE HABILIDADES
// ================================
function initSkillsAnimation() {
    const skillsSection = document.querySelector('#habilidades');
    const progressBars = document.querySelectorAll('.progress-bar');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkills();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    function animateSkills() {
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// ================================
// FORMULARIO DE CONTACTO
// ================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar loading
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLanguage]['loading.sending']}`;
        submitBtn.disabled = true;
        
        // Simular envío (aquí puedes integrar con tu backend)
        try {
            await simulateFormSubmission();
            
            // Éxito
            showNotification(translations[currentLanguage]['notifications.messageSent'], 'success');
            contactForm.reset();
            
        } catch (error) {
            // Error
            showNotification(translations[currentLanguage]['notifications.messageError'], 'error');
        } finally {
            // Restaurar botón
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
}

// Simular envío de formulario
function simulateFormSubmission() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

// ================================
// DESCARGA DE CV
// ================================
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    
    downloadBtn?.addEventListener('click', async () => {
        const originalText = downloadBtn.innerHTML;
        
        // Mostrar loading
        downloadBtn.classList.add('loading');
        downloadBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLanguage]['loading.downloading']}`;
        downloadBtn.disabled = true;
        
        try {
            // Simular descarga
            await simulateDownload();
            
            // Crear enlace de descarga
            const link = document.createElement('a');
            link.href = 'hoja de jensen.pdf';
            link.download = 'Jensen_CV.pdf';
            link.target = '_blank';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification(translations[currentLanguage]['notifications.cvDownloaded'], 'success');
            
        } catch (error) {
            showNotification(translations[currentLanguage]['notifications.cvError'], 'error');
        } finally {
            // Restaurar botón
            setTimeout(() => {
                downloadBtn.classList.remove('loading');
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }, 1000);
        }
    });
}

// Simular descarga
function simulateDownload() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

// ================================
// SUBIDA DE IMAGEN DE PERFIL
// ================================
function initImageUpload() {
    const profileImage = document.getElementById('profileImage');
    
    // Crear input file oculto
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Click en la imagen para cambiarla
    profileImage?.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Manejar cambio de archivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                showNotification(translations[currentLanguage]['notifications.imageUpdated'], 'success');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Agregar cursor pointer y tooltip
    if (profileImage) {
        profileImage.style.cursor = 'pointer';
        profileImage.title = 'Click para cambiar la imagen';
    }
}

// ================================
// EFECTO DE ESCRITURA
// ================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const texts = {
        es: [
            'Desarrollador Full Stack',
            'Diseñador Web',
            'Creador de Experiencias',
            'Solucionador de Problemas'
        ],
        en: [
            'Full Stack Developer',
            'Web Designer',
            'Experience Creator',
            'Problem Solver'
        ],
        pt: [
            'Desenvolvedor Full Stack',
            'Designer Web',
            'Criador de Experiências',
            'Solucionador de Problemas'
        ]
    };
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentTexts = texts[currentLanguage];
        const currentText = currentTexts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % currentTexts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Iniciar después de 2 segundos
    setTimeout(typeEffect, 2000);
}

// ================================
// PARTÍCULAS DE FONDO
// ================================
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Crear canvas para partículas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.appendChild(canvas);
    
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticlesArray() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Conectar partículas cercanas
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Inicializar
    resizeCanvas();
    initParticlesArray();
    animate();
    
    // Redimensionar en cambio de ventana
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticlesArray();
    });
}

// ================================
// SISTEMA DE NOTIFICACIONES
// ================================
function showNotification(message, type = 'info') {
    // Crear contenedor de notificaciones si no existe
    let container = document.querySelector('.notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#4f46e5'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        pointer-events: auto;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
    
    // Click para cerrar
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// ================================
// UTILIDADES ADICIONALES
// ================================

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3>Cargando Portafolio...</h3>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Remover preloader cuando todo esté cargado
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

// Inicializar preloader inmediatamente
if (document.readyState === 'loading') {
    initPreloader();
}

// ================================
// EASTER EGGS Y EFECTOS ESPECIALES
// ================================

// Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const message = currentLanguage === 'es' ? '¡Código Konami activado! 🎉' :
                   currentLanguage === 'en' ? 'Konami Code activated! 🎉' :
                   'Código Konami ativado! 🎉';
    
    showNotification(message, 'success');
    
    // Efecto de confetti
    createConfetti();
    
    // Cambiar temporalmente los colores
    document.documentElement.style.setProperty('--primary-color', '#ff6b6b');
    document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');
    
    setTimeout(() => {
        document.documentElement.style.setProperty('--primary-color', '#4f46e5');
        document.documentElement.style.setProperty('--secondary-color', '#06b6d4');
    }, 5000);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 10000;
                pointer-events: none;
                animation: confetti-fall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Agregar CSS para animación de confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Portafolio de Jensen cargado correctamente!');
console.log('💡 Tip: Prueba el código Konami (↑↑↓↓←→←→BA) para una sorpresa!');
console.log('🌙 Cambia entre modo claro y oscuro con el botón del sol/luna');
console.log('🌍 Cambia el idioma con el selector de idiomas (ES/EN/PT)');

// ================================
// MEDIDAS DE SEGURIDAD BÁSICAS
// ================================
function initSecurityFeatures() {
    // Deshabilitar clic derecho
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showNotification('Clic derecho deshabilitado por seguridad', 'info');
        return false;
    });

    // Deshabilitar F12 y Ctrl+U (limitado)
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            showNotification('Inspector deshabilitado por seguridad', 'warning');
            return false;
        }

        // Ctrl+U (ver código fuente)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showNotification('Ver código fuente deshabilitado por seguridad', 'warning');
            return false;
        }

        // Ctrl+Shift+I (inspector)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showNotification('Inspector deshabilitado por seguridad', 'warning');
            return false;
        }

        // Ctrl+Shift+C (inspector de elementos)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showNotification('Inspector deshabilitado por seguridad', 'warning');
            return false;
        }

        // Ctrl+Shift+J (consola)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showNotification('Consola deshabilitada por seguridad', 'warning');
            return false;
        }
    });

    // Proteger imágenes contra descarga directa
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            showNotification('Descarga de imágenes deshabilitada', 'warning');
            return false;
        });

        // Agregar watermark visual
        if (img.src.includes('jensen') || img.alt.includes('Jensen')) {
            img.style.position = 'relative';
            const watermark = document.createElement('div');
            watermark.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                font-weight: bold;
                pointer-events: none;
                z-index: 10;
            `;
            watermark.textContent = '© Jensen';
            img.parentElement.style.position = 'relative';
            img.parentElement.appendChild(watermark);
        }
    });

    // Detectar intentos de debugging
    let devtoolsOpen = false;
    const threshold = 160;

    const detectDevTools = () => {
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                showNotification('Herramientas de desarrollo detectadas', 'warning');
            }
        } else {
            devtoolsOpen = false;
        }
    };

    setInterval(detectDevTools, 500);

    // Proteger contra copy/paste de información sensible
    document.addEventListener('copy', function(e) {
        const selectedText = window.getSelection().toString();
        // Si el texto seleccionado contiene información sensible
        if (selectedText.includes('@') || selectedText.includes('gmail') || selectedText.includes('+57')) {
            e.preventDefault();
            showNotification('Información de contacto protegida', 'info');
            return false;
        }
    });

    // Agregar marca de agua invisible a la página
    const watermarkStyle = document.createElement('style');
    watermarkStyle.textContent = `
        * {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' fill='rgba(255,255,255,0.01)' text-anchor='middle' dy='.3em'%3E© Jensen Ballen 2024%3C/text%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 200px 200px;
        }
    `;
    document.head.appendChild(watermarkStyle);

    console.log('🔒 Medidas de seguridad activadas');
    console.log('🛡️ Protección básica implementada');
}

// ================================
// EMAILJS CONFIGURATION
// ================================
function initEmailJS() {
    // Configurar EmailJS con tu Service ID
    emailjs.init('YOUR_PUBLIC_KEY'); // Reemplaza con tu Public Key de EmailJS
}

// ================================
// FILTROS DE PROYECTOS
// ================================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'scaleIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ================================
// TOGGLE DE VISTA DE PROYECTOS
// ================================
function initViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const projectsGrid = document.getElementById('projectsGrid');

    gridViewBtn?.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        projectsGrid.classList.remove('project-list-view');
    });

    listViewBtn?.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        projectsGrid.classList.add('project-list-view');
    });
}

// ================================
// ANIMACIONES AVANZADAS
// ================================
function initAdvancedAnimations() {
    // Animación de entrada escalonada para elementos
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .timeline-content');

        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

            if (isVisible) {
                setTimeout(() => {
                    element.classList.add('scale-in');
                }, index * 100);
            }
        });
    };

    // Ejecutar animaciones al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Animación de counter para estadísticas
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat h4');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            let current = 0;
            const increment = target / 100;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    };

    // Activar counters cuando la sección de about esté visible
    const aboutSection = document.querySelector('#sobre-mi');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ================================
// FORMULARIO DE CONTACTO FUNCIONAL
// ================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Mostrar loading
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLanguage]['loading.sending']}`;
        submitBtn.disabled = true;

        // Recopilar datos del formulario
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_name: 'Jensen'
        };

        try {
            // Enviar email usando EmailJS
            await emailjs.send(
                'YOUR_SERVICE_ID', // Reemplaza con tu Service ID
                'YOUR_TEMPLATE_ID', // Reemplaza con tu Template ID
                formData
            );

            // Éxito
            showNotification(translations[currentLanguage]['notifications.messageSent'], 'success');
            contactForm.reset();

        } catch (error) {
            console.error('Error sending email:', error);
            // Error
            showNotification(translations[currentLanguage]['notifications.messageError'], 'error');
        } finally {
            // Restaurar botón
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
}