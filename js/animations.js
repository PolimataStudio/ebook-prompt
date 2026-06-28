/**
 * ============================================================
 * ANIMAÇÕES — Scroll Reveal, Contadores, etc.
 * ============================================================
 */

function initScrollReveal() {
    'use strict';

    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        // Fallback: mostra tudo
        revealElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: desobserva após aparecer para performance
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Inicializa quando o DOM estiver pronto (chamado pelo script.js)
// Mas também pode ser chamado diretamente se necessário.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}