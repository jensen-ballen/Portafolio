/**
 * Hoja de Vida - Script principal
 * - Año dinámico
 * - Scroll suave
 * - Toggle tema claro/oscuro con persistencia
 * - Menú móvil
 * - Carga de proyectos desde GitHub
 */

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  var body = document.body;

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
