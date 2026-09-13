const PWA_CACHE_PREFIX='groovy-pwa-';

self.addEventListener('install',function(){
  self.skipWaiting();
});

self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(key){
        return key.indexOf(PWA_CACHE_PREFIX)===0;
      }).map(function(key){
        return caches.delete(key);
      }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});

// Groovy deliberately remains network-first. The service worker enables the
// installed app experience without keeping old HTML, CSS or JavaScript around.
self.addEventListener('fetch',function(event){
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request));
});
