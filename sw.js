const CACHE_NAME='taozhe-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.delete(CACHE_NAME))});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim());caches.keys().then(ks=>ks.forEach(k=>caches.delete(k)))});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('avatar.jpg')||e.request.url.includes('manifest.json')){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const rc=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,rc));return res})));
  }else{
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  }
});
