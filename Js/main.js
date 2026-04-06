/**
 * Hoja de Vida - Script principal
 * - Año dinámico
 * - Scroll suave
 * - Toggle tema claro/oscuro con persistencia
 * - Menú móvil
 * - Carga de proyectos desde GitHub
 * - Textos bilingües (ES / EN)
 */

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  var body = document.body;

  /* Idioma */
  var langToggle = document.getElementById('langToggle');
  var currentLang = 'es';

  var translations = {
    es: {
      'lang.current': 'ES',
      'nav.profile': 'Perfil',
      'nav.services': 'Servicios',
      'nav.experience': 'Experiencia',
      'nav.process': 'Proceso',
      'nav.education': 'Formación',
      'nav.skills': 'Habilidades',
      'nav.achievements': 'Logros',
      'nav.projects': 'Proyectos',
      'nav.goals': 'Objetivos',
      'nav.contact': 'Contacto',
      'nav.logo': 'CV',
      'hero.subtitle': 'Portafolio profesional',
      'hero.cta': 'Descargar hoja de vida en PDF',
      'services.title': 'Servicios / Qué ofrezco',
      'services.lead': 'Formas en las que puedo aportar valor a tu equipo o proyecto.',
      'services.webapps.title': 'Aplicaciones y sitios web modernos',
      'services.webapps.body': 'Diseño e implementación de interfaces limpias, responsivas y enfocadas en la experiencia del usuario.',
      'services.landing.title': 'Landing pages para productos o marcas',
      'services.landing.body': 'Páginas de presentación claras, rápidas y optimizadas para conversión y campañas.',
      'services.maintenance.title': 'Mejora y mantenimiento de proyectos',
      'services.maintenance.body': 'Refactorización, corrección de errores y mejoras visuales sobre proyectos existentes.',
      'profile.title': 'Perfil profesional',
      'profile.lead': 'Desarrollador con interés en construir productos digitales claros, accesibles y mantenibles, combinando detalle visual con buenas prácticas de código.',
      'profile.about.title': 'Sobre mí',
      'profile.about.body': 'Soy Jensen Ballen, un profesional junior con background en electrónica y transición hacia el desarrollo de software. Mi viaje comenzó con la mecánica industrial, donde aprendí la importancia de la precisión y el trabajo en equipo. Actualmente, me especializo en tecnologías web y backend, con pasión por resolver problemas complejos y contribuir a equipos dinámicos. Fuera del trabajo, disfruto de la innovación tecnológica y el aprendizaje continuo.',
      'experience.title': 'Experiencia laboral',
      'experience.job1.title': 'Ayudante de Mecánica Industrial',
      'experience.job1.description': 'Apoyo en tareas de mecánica industrial, organización de herramientas y asistencia en talleres durante una semana de experiencia práctica.',
      'experience.job2.title': 'Aprendiz Sena',
      'experience.job2.description': 'Formación práctica en el SENA, soporte en mantenimiento de computo en instalaciones de la empresa, desarrollo de formularios web, SQL Oracle Developer y backend con c#.',
      'process.title': 'Cómo trabajo',
      'process.lead': 'Un proceso simple y claro para que el trabajo fluya sin sorpresas.',
      'process.step1.title': 'Escuchar y entender',
      'process.step1.body': 'Revisión de contexto, objetivos y referencias para alinear expectativas.',
      'process.step2.title': 'Propuesta clara',
      'process.step2.body': 'Definición de alcance, tiempos y entregables priorizando lo esencial.',
      'process.step3.title': 'Diseño y desarrollo',
      'process.step3.body': 'Iteraciones cortas, revisiones frecuentes y enfoque en la experiencia de uso.',
      'process.step4.title': 'Entrega y cuidado',
      'process.step4.body': 'Pruebas, ajustes finales y acompañamiento durante la puesta en producción.',
      'projects.manual.inventory.title': 'Sistema de Gestión de Inventarios',
      'projects.manual.inventory.body': 'Aplicación web para gestión de inventarios con backend en C# y base de datos SQL. Incluye formularios dinámicos y reportes.',
      'projects.manual.personal.title': 'Portafolio Personal',
      'projects.manual.personal.body': 'Sitio web responsivo desarrollado con HTML, CSS y JavaScript, optimizado para SEO y accesibilidad.',
      'projects.linkText': 'Ver en GitHub',
      'projects.profileLink': 'Ver perfil de GitHub',
      'projects.placeholder.title': 'Cargando proyectos…',
      'projects.placeholder.body': 'Un momento.',
      'projects.noRepos': 'Por ahora no hay repos públicos para mostrar.',
      'projects.loadError': 'No se pudieron cargar los proyectos desde GitHub en este momento.',
      'contact.emailLabel': 'Correo',
      'contact.linkedinLabel': 'LinkedIn',
      'contact.xLabel': 'X',
      'education.title': 'Formación académica',
      'education.degree1.title': 'Bachiller Técnico en Electrónica',
      'education.degree1.description': 'Graduado con conocimientos en electrónica y sistemas técnicos.',
      'education.degree2.title': 'Tecnología en Análisis y Desarrollo de Software',
      'education.degree2.description': 'Formación actual en análisis y desarrollo de software, incluyendo programación y diseño de sistemas.',
      'skills.title': 'Habilidades',
      'skills.teamwork': '👥 Trabajo en Equipo',
      'skills.responsibility': '✅ Responsabilidad',
      'skills.maintenance': '🔧 Mantenimiento de Computadoras',
      'skills.webdev': '💻 Desarrollo Web',
      'skills.backend': '🖥️ Programación Backend',
      'achievements.title': 'Logros y tecnologías',
      'achievements.lead': 'Una vista rápida de herramientas que uso y algunos hitos que quiero seguir ampliando.',
      'achievements.stack.title': 'Tecnologías principales',
      'achievements.milestones.title': 'Logros destacados',
      'achievements.milestone1': 'Portafolio personal publicado y optimizado para dispositivos móviles.',
      'achievements.milestone2': 'Integración con GitHub para mostrar proyectos actualizados.',
      'achievements.milestone3': 'Experimentación constante con nuevas herramientas y buenas prácticas.',
      'projects.title': 'Proyectos',
      'projects.lead': 'Algunos repositorios recientes de GitHub. Se actualiza automáticamente.',
      'contact.title': 'Contacto',
      'contact.lead': 'Conversemos. Puedes escribirme o visitar mis perfiles.',
      'footer.text': 'Hoja de vida profesional',
      'goals.title': 'Objetivos Profesionales',
      'goals.lead': 'Mis metas a corto y mediano plazo en el desarrollo de software.',
      'goals.body': 'Busco oportunidades en roles de desarrollo frontend/backend para aplicar y expandir mis conocimientos en tecnologías web. Mi objetivo es contribuir a proyectos innovadores, aprender de equipos experimentados y crecer profesionalmente en un entorno dinámico.'
    },
    en: {
      'lang.current': 'EN',
      'nav.profile': 'Profile',
      'nav.services': 'Services',
      'nav.experience': 'Experience',
      'nav.process': 'Process',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.achievements': 'Highlights',
      'nav.projects': 'Projects',
      'nav.goals': 'Goals',
      'nav.contact': 'Contact',
      'nav.logo': 'CV',
      'hero.subtitle': 'Professional portfolio',
      'hero.cta': 'Download résumé (PDF)',
      'services.title': 'Services / What I offer',
      'services.lead': 'Ways I can bring value to your team or project.',
      'services.webapps.title': 'Modern websites and web apps',
      'services.webapps.body': 'Design and implementation of clean, responsive interfaces focused on user experience.',
      'services.landing.title': 'Landing pages for products or brands',
      'services.landing.body': 'Fast, clear landing pages optimized for campaigns and conversion.',
      'services.maintenance.title': 'Project improvement and maintenance',
      'services.maintenance.body': 'Refactors, bug fixing and visual improvements on existing projects.',
      'profile.title': 'Professional profile',
      'profile.lead': 'Developer focused on building clear, accessible and maintainable digital products, balancing visuals with good code practices.',
      'profile.about.title': 'About me',
      'profile.about.body': 'I am Jensen Ballen, a junior professional with a background in electronics transitioning to software development. My journey began in industrial mechanics, where I learned the importance of precision and teamwork. Currently, I specialize in web and backend technologies, with a passion for solving complex problems and contributing to dynamic teams. Outside of work, I enjoy technological innovation and continuous learning.',
      'experience.title': 'Work experience',
      'experience.job1.title': 'Industrial Mechanics Assistant',
      'experience.job1.description': 'Support in industrial mechanics tasks, tool organization and assistance in workshops during a week of practical experience.',
      'experience.job2.title': 'Sena Apprentice',
      'experience.job2.description': 'Practical training at SENA, computer maintenance support in company facilities, web form development, SQL Oracle Developer and backend with C#.',
      'process.title': 'How I work',
      'process.lead': 'A simple, clear process so work flows without surprises.',
      'process.step1.title': 'Listen and understand',
      'process.step1.body': 'Review of context, goals and references to align expectations.',
      'process.step2.title': 'Clear proposal',
      'process.step2.body': 'Scope, timelines and deliverables defined with focus on what matters most.',
      'process.step3.title': 'Design and development',
      'process.step3.body': 'Short iterations, frequent reviews and focus on the user experience.',
      'process.step4.title': 'Delivery and care',
      'process.step4.body': 'Testing, final polishing and support during launch.',
      'projects.manual.inventory.title': 'Inventory Management System',
      'projects.manual.inventory.body': 'Web application for inventory management with a C# backend and SQL database. Includes dynamic forms and reports.',
      'projects.manual.personal.title': 'Personal Portfolio',
      'projects.manual.personal.body': 'Responsive website developed with HTML, CSS and JavaScript, optimized for SEO and accessibility.',
      'projects.linkText': 'View on GitHub',
      'projects.profileLink': 'View GitHub profile',
      'projects.placeholder.title': 'Loading projects…',
      'projects.placeholder.body': 'One moment.',
      'projects.noRepos': 'There are no public repositories to show yet.',
      'projects.loadError': 'Could not load projects from GitHub right now.',
      'contact.emailLabel': 'Email',
      'contact.linkedinLabel': 'LinkedIn',
      'contact.xLabel': 'X',
      'education.title': 'Education',
      'education.degree1.title': 'Technical High School Diploma in Electronics',
      'education.degree1.description': 'Graduated with knowledge in electronics and technical systems.',
      'education.degree2.title': 'Technology in Software Analysis and Development',
      'education.degree2.description': 'Current training in software analysis and development, including programming and system design.',
      'skills.title': 'Skills',
      'skills.teamwork': '👥 Teamwork',
      'skills.responsibility': '✅ Responsibility',
      'skills.maintenance': '🔧 Computer Maintenance',
      'skills.webdev': '💻 Web Development',
      'skills.backend': '🖥️ Backend Programming',
      'achievements.title': 'Highlights & technologies',
      'achievements.lead': 'A quick view of tools I use and milestones I want to keep growing.',
      'achievements.stack.title': 'Core technologies',
      'achievements.milestones.title': 'Selected highlights',
      'achievements.milestone1': 'Personal portfolio published and optimized for mobile devices.',
      'achievements.milestone2': 'GitHub integration to display up-to-date projects.',
      'achievements.milestone3': 'Constant experimentation with new tools and best practices.',
      'projects.title': 'Projects',
      'projects.lead': 'Some recent GitHub repositories. Automatically kept up to date.',
      'contact.title': 'Contact',
      'contact.lead': "Let's talk. You can email me or visit my profiles.",
      'footer.text': 'Professional résumé',
      'goals.title': 'Professional Goals',
      'goals.lead': 'My short and medium-term goals in software development.',
      'goals.body': 'I seek opportunities in frontend/backend development roles to apply and expand my knowledge in web technologies. My goal is to contribute to innovative projects, learn from experienced teams, and grow professionally in a dynamic environment.'
    }
  };
  function applyLanguage(lang) {
    currentLang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {}
    var dict = translations[lang] || translations.es;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = dict[key];
      if (typeof value === 'string') {
        el.textContent = value;
      }
    });
  }

  (function initLanguage() {
    var savedLang = null;
    try {
      savedLang = localStorage.getItem('lang');
    } catch (e) {}
    var initial = savedLang === 'en' ? 'en' : 'es';
    applyLanguage(initial);
  })();

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = currentLang === 'es' ? 'en' : 'es';
      applyLanguage(next);
      langToggle.setAttribute(
        'aria-label',
        next === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'
      );
      langToggle.setAttribute(
        'title',
        next === 'es' ? 'Cambiar idioma' : 'Change language'
      );
    });
  }

  /* Año actual en el footer */
  var yearEl = document.getElementById('year');
  if (yearEl) {
     yearEl.textContent = new Date().getFullYear();
  }

  /* Scroll suave (por si algún navegador no respeta scroll-behavior) */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Cerrar menú móvil al navegar
        if (body.classList.contains('nav-open')) {
          body.classList.remove('nav-open');
        }
      }
    });
  });

  /* Tema claro / oscuro */
  var themeToggle = document.getElementById('themeToggle');

  function getCurrentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyThemeToToggle(theme) {
    if (!themeToggle) return;
    var iconSpan = themeToggle.querySelector('.icon-btn__icon');
    if (!iconSpan) return;
    if (theme === 'light') {
      iconSpan.textContent = '☾';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
    } else {
      iconSpan.textContent = '☀';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
      themeToggle.setAttribute('title', 'Cambiar a modo claro');
    }
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignorar problemas con localStorage (modo incógnito/extensiones)
    }
    applyThemeToToggle(theme);
  }

  // Inicializar estado del botón según el tema actual del documento
  applyThemeToToggle(getCurrentTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = getCurrentTheme();
      var next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
  }

  /* Menú móvil */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.querySelector('.nav__menu');

  function setNavOpen(open) {
    if (!navMenu || !navToggle) return;

    const icon = navToggle.querySelector('.icon-btn__icon');

    body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    navToggle.setAttribute('title',       open ? 'Cerrar menú' : 'Abrir menú');
    if (icon) icon.textContent = open ? '✕' : '☰';
  }

  if (navToggle && navMenu) {
    // Click en el botón
    navToggle.addEventListener('click', () => {
      setNavOpen(!body.classList.contains('nav-open'));
    });

    // Cierra al hacer click en un link del menú
    navMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setNavOpen(false);
    });

    // Cierra al hacer click fuera del nav
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && body.classList.contains('nav-open')) {
        setNavOpen(false);
      }
    });

    // Cierra con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        setNavOpen(false);
        navToggle.focus(); // devuelve el foco al botón (accesibilidad)
      }
    });
  }

  /* Proyectos desde GitHub */
  var projectsWrapper = document.querySelector('.projects');
  var projectsGrid = document.getElementById('projectsGrid');
  var projectsNote = document.getElementById('projectsNote');
  var githubProfileLink = document.getElementById('githubProfileLink');

  if (projectsWrapper && projectsGrid) {
    var user = projectsWrapper.getAttribute('data-github-user') || 'Jensenbanguera';
    var profileUrl = 'https://github.com/' + encodeURIComponent(user);

    if (githubProfileLink) {
      githubProfileLink.href = profileUrl;
      githubProfileLink.textContent = 'Ver perfil en GitHub (' + user + ')';
    }

    fetch('https://api.github.com/users/' + encodeURIComponent(user) + '/repos?sort=updated&per_page=6')
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API ' + res.status);
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos) || repos.length === 0) {
          if (projectsNote) {
            var currentDict = translations[currentLang] || translations.es;
            projectsNote.hidden = false;
            projectsNote.textContent = currentDict['projects.noRepos'] || 'Por ahora no hay repos públicos para mostrar.';
          }
          projectsGrid.innerHTML = '';
          return;
        }

        projectsGrid.innerHTML = '';

        repos.forEach(function (repo) {
          var card = document.createElement('article');
          card.className = 'project';

          var title = document.createElement('h3');
          var link = document.createElement('a');
          link.href = repo.html_url;
          link.target = '_blank';
          link.rel = 'noreferrer noopener';
          link.textContent = repo.name;
          title.appendChild(link);

          var desc = document.createElement('p');
          desc.textContent = repo.description || 'Repositorio sin descripción aún.';

          var meta = document.createElement('div');
          meta.className = 'project__meta';

          if (repo.language) {
            var langChip = document.createElement('span');
            langChip.className = 'chip';
            langChip.textContent = repo.language;
            meta.appendChild(langChip);
          }

          if (typeof repo.stargazers_count === 'number' && repo.stargazers_count > 0) {
            var starChip = document.createElement('span');
            starChip.className = 'chip';
            starChip.textContent = '★ ' + repo.stargazers_count;
            meta.appendChild(starChip);
          }

          card.appendChild(title);
          card.appendChild(desc);
          if (meta.children.length > 0) {
            card.appendChild(meta);
          }

          projectsGrid.appendChild(card);
        });
      })
      .catch(function () {
        if (projectsNote) {
          var currentDict = translations[currentLang] || translations.es;
          projectsNote.hidden = false;
          projectsNote.textContent = currentDict['projects.loadError'] || 'No se pudieron cargar los proyectos desde GitHub en este momento.';
        }
      });
  }
});
