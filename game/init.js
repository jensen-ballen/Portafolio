// GameHub Initialization Script
(function() {
    'use strict';

    let systemsLoaded = 0;
    const totalSystems = 6; // juego.js, achievements.js, highscores.js, soundfx.js, themes.js, animations.js

    // System loading tracker
    window.systemLoaded = function(systemName) {
        systemsLoaded++;
        console.log(`✅ ${systemName} loaded (${systemsLoaded}/${totalSystems})`);

        if (systemsLoaded >= totalSystems) {
            initializeGameHub();
        }
    };

    function initializeGameHub() {
        console.log('🚀 Initializing GameHub...');

        // Ensure gameSystem is globally available
        if (typeof gameSystem !== 'undefined') {
            window.gameSystem = gameSystem;
        } else {
            console.error('❌ GameSystem not found, trying fallback...');
            // Try to create gameSystem if not found
            if (typeof GameSystem !== 'undefined') {
                window.gameSystem = new GameSystem();
                console.log('✅ GameSystem created via fallback');
            } else {
                console.error('❌ Cannot create GameSystem');
                return;
            }
        }

        // Initialize UI
        setupGameButtons();
        setupNavigation();

        // Show welcome message
        setTimeout(() => {
            if (typeof showNotification !== 'undefined') {
                showNotification('🎮 ¡GameHub listo para jugar!', 'success');
            } else {
                console.log('🎮 ¡GameHub listo para jugar!');
            }
        }, 1000);

        console.log('✅ GameHub initialized successfully!');
        window.gameHubInitialized = true;
    }

    function setupGameButtons() {
        // Setup game buttons with proper event handlers
        document.querySelectorAll('.game-play-btn').forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('gameSystem.openGame')) {
                const gameType = onclickAttr.match(/openGame\('(\w+)'\)/)?.[1];
                if (gameType) {
                    // Remove old onclick
                    btn.removeAttribute('onclick');

                    // Add new event listener
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log(`🎮 Opening game: ${gameType}`);
                        if (window.gameSystem && window.gameSystem.openGame) {
                            try {
                                window.gameSystem.openGame(gameType);
                            } catch (error) {
                                console.error('Error opening game:', error);
                            }
                        } else {
                            console.error('GameSystem not available for game:', gameType);
                        }
                    });
                }
            }
        });

        console.log('✅ Game buttons initialized');
    }

    function setupNavigation() {
        // Setup navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });
    }

    // Auto-initialize after timeout as fallback
    setTimeout(() => {
        if (!window.gameHubInitialized) {
            console.warn('⚠️ Auto-initializing GameHub...');
            initializeGameHub();
        }
    }, 2000);

})();