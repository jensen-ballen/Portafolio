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
      'nav.contact': 'Contacto',
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
      'experience.title': 'Experiencia laboral',
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
      'education.title': 'Formación académica',
      'skills.title': 'Habilidades',
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
      'footer.text': 'Hoja de vida profesional'
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
      'nav.contact': 'Contact',
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
      'experience.title': 'Work experience',
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
      'education.title': 'Education',
      'skills.title': 'Skills',
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
      'footer.text': 'Professional résumé'
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
    if (open) {
      body.classList.add('nav-open');
      navToggle.setAttribute('aria-label', 'Cerrar menú');
      navToggle.setAttribute('title', 'Cerrar menú');
      var iconSpan = navToggle.querySelector('.icon-btn__icon');
      if (iconSpan) iconSpan.textContent = '✕';
    } else {
      body.classList.remove('nav-open');
      navToggle.setAttribute('aria-label', 'Abrir menú');
      navToggle.setAttribute('title', 'Abrir menú');
      var iconSpan2 = navToggle.querySelector('.icon-btn__icon');
      if (iconSpan2) iconSpan2.textContent = '☰';
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = body.classList.contains('nav-open');
      setNavOpen(!open);
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
            projectsNote.hidden = false;
            projectsNote.textContent = 'Por ahora no hay repos públicos para mostrar.';
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
          projectsNote.hidden = false;
          projectsNote.textContent = 'No se pudieron cargar los proyectos desde GitHub en este momento.';
        }
      });
  }
});
