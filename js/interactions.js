/**
 * ============================================================
 * INTERAÇÕES — Botão Magnético, Ripple, Glow seguindo cursor
 * ============================================================
 */

function initInteractions() {
    'use strict';

    // --- Ripple Effect ---
    const rippleButtons = document.querySelectorAll('.btn');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.25)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // Força reflow
            void ripple.offsetWidth;

            const size = Math.max(rect.width, rect.height) * 1.5;
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.opacity = '0';

            setTimeout(() => {
                ripple.remove();
            }, 700);
        });
    });

    // --- Magnetic Button (leve efeito de inclinação) ---
    const magneticBtns = document.querySelectorAll('.btn--primary, .btn--secondary, .btn--whatsapp, .btn--glow');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const intensity = 10;
            this.style.transform = `translate(${x / intensity}px, ${y / intensity}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });

        // Se já tiver transform no hover, adaptar
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.15s ease';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
}

// Inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
} else {
    initInteractions();
}