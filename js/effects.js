/**
 * ============================================================
 * EFEITOS — Partículas no Hero, Parallax sutil
 * ============================================================
 */

function initEffects() {
    'use strict';

    // --- Partículas dinâmicas (sobrepor ao fundo estático) ---
    const container = document.getElementById('particles');
    if (container) {
        // Remove o background-image estático para usar canvas puro (mais bonito)
        // Vamos manter o CSS estático e adicionar estrelas piscantes via JS.
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 4 + 3;

            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: starPulse ${duration}s ease-in-out ${delay}s infinite alternate;
                box-shadow: 0 0 ${size * 2}px rgba(0, 212, 255, 0.3);
                pointer-events: none;
            `;
            container.appendChild(star);
        }

        // Adiciona keyframe via JS para o pulso das estrelas
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes starPulse {
                0% { opacity: 0.2; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // --- Parallax sutil no mockup (movimento com mouse) ---
    const mockup = document.querySelector('.mockup-book');
    if (mockup) {
        const hero = document.querySelector('.hero');
        hero?.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mockup.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-12px) scale(1.02)`;
        });

        hero?.addEventListener('mouseleave', () => {
            mockup.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)';
            mockup.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        // Reseta transição para o hover CSS
        mockup.addEventListener('mouseenter', () => {
            mockup.style.transition = 'transform 0.15s ease';
        });
        mockup.addEventListener('mouseleave', () => {
            mockup.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
}

// Inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEffects);
} else {
    initEffects();
}