const CACHE_NAME = 'my-pwa-cachet4545ddd4ed4545454545';

// Archivos a almacenar en caché
const CACHE_ASSETS = [
    'player.php', 
     'appicon.png',
    'image1.png',
    'radiototal.png',
    'radioicono.png',
    'tvicono.png',
    'radioa1.png',
'radioa2.png',
'image1.mp4'
];

// Instalar el Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Archivos en caché durante la instalación:', CACHE_ASSETS);
            return cache.addAll(CACHE_ASSETS).catch((error) => {
                console.error('Error al almacenar en caché durante la instalación:', error);
            });
        })
    );
});

// Activar el Service Worker y limpiar cachés viejos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Limpiando caché antiguo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Recuperar archivos desde la caché
self.addEventListener('fetch', (event) => {
    console.log('Interceptando la solicitud:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch((error) => {
                console.error('Error al recuperar el recurso:', error);
            });
        })
    );
});
