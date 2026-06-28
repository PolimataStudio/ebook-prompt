/**
 * ============================================================
 * SCRIPT PRINCIPAL
 * ============================================================
 * Inicialização de módulos, menu mobile, header scroll,
 * typing effect e formulário.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- Imports / Módulos internos (cada arquivo JS registra suas funções globais) ---
    // Navegação
    if (typeof initNavigation === 'function') initNavigation();
    // Animações (Scroll Reveal)
    if (typeof initScrollReveal === 'function') initScrollReveal();
    // Efeitos (partículas, etc)
    if (typeof initEffects === 'function') initEffects();
    // Interações (magnetic, ripple)
    if (typeof initInteractions === 'function') initInteractions();

    // --- Header Scroll ---
    const header = document.getElementById('header');
    let lastScrollY = 0;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Menu Mobile ---
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.header__nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Fecha menu ao clicar em um link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Typing Effect ---
    const typingElement = document.getElementById('typingEffect');
    if (typingElement) {
        const phrases = [
            'A porta está entreaberta.',
            'Você tem coragem de atravessar?',
            'O futuro espera por você.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pausa antes de deletar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pausa antes de digitar a próxima
            }

            setTimeout(type, typingSpeed);
        };

        type();
    }

    // --- Formulário (Static Forms) ---
    const form = document.getElementById('captureForm');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn?.querySelector('span');
        const spinner = submitBtn?.querySelector('.spinner');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validação básica
            const email = document.getElementById('formEmail');
            const name = document.getElementById('formName');
            let isValid = true;

            [email, name].forEach(field => {
                const group = field?.closest('.form-group');
                if (!field?.value.trim()) {
                    group?.classList.add('is-error');
                    isValid = false;
                } else {
                    group?.classList.remove('is-error');
                }
            });

            if (email && !email.value.trim().includes('@')) {
                email.closest('.form-group')?.classList.add('is-error');
                isValid = false;
            }

            if (!isValid) return;

            // Estado de loading
            if (submitBtn) {
                submitBtn.classList.add('loading');
                if (btnText) btnText.textContent = 'Enviando...';
                submitBtn.disabled = true;
            }

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Sucesso: mostra mensagem de agradecimento
                    const wrapper = form.closest('.download__form');
                    const successDiv = document.createElement('div');
                    successDiv.className = 'form-success visible';
                    successDiv.innerHTML = `
                        <span class="success-icon">✅</span>
                        <h3>Capítulo enviado!</h3>
                        <p>Verifique seu e‑mail para começar a leitura.</p>
                    `;
                    form.style.display = 'none';
                    wrapper?.appendChild(successDiv);
                } else {
                    alert('Ocorreu um erro. Tente novamente mais tarde.');
                }
            } catch (error) {
                alert('Erro de conexão. Verifique sua internet e tente novamente.');
            } finally {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    if (btnText) btnText.textContent = 'Quero ler agora!';
                    submitBtn.disabled = false;
                }
            }
        });

        // Remove erro ao digitar
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.closest('.form-group')?.classList.remove('is-error');
            });
        });
    }
});