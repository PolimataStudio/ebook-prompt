/**
 * ============================================================
 * SERVICE WORKER — PWA OFFLINE
 * ============================================================
 */

const CACHE_NAME = 'prompt-cache-v1';
const ASSETS = [
    './',
    '/404.html',
    '/index.html',
    '/css/reset.css',
    '/css/variables.css',
    '/css/style.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/animations.css',
    '/css/responsive.css',
    '/css/utilities.css',
    '/js/script.js',
    '/js/animations.js',
    '/js/interactions.js',
    '/js/navigation.js',
    '/js/effects.js',
    '/manifest.json',
    '/assets/images/capa-prompt.jpg',
    '/assets/images/autor-marcone.jpg',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;600;700&family=Space+Mono:wght@400;700&display=swap'
];

// Instalação
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aberto');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Ativação
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna do cache ou busca da rede
                return response || fetch(event.request)
                    .then((fetchResponse) => {
                        // Opcional: atualiza o cache com a nova resposta
                        return caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, fetchResponse.clone());
                                return fetchResponse;
                            });
                    });
            })
            .catch(() => {
                // Fallback para offline (página simples)
                return new Response(
                    '<html><body><h1>Offline</h1><p>Conecte-se à internet para acessar o conteúdo completo.</p></body></html>',
                    { headers: { 'Content-Type': 'text/html' } }
                );
            })
    );
});
