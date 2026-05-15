const CACHE_NAME='taozhe-v6';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>ks.forEach(k=>{if(k!==CACHE_NAME)caches.delete(k)})));e.waitUntil(clients.claim())});
self.addEventListener('fetch',e=>{
  // 静态资源缓存，HTML始终走网络
  if(e.request.destination==='document'||e.request.url.includes('index.html')){
    e.respondWith(fetch(e.request,{cache:'no-cache'}));
  }else if(e.request.url.includes('avatar.jpg')||e.request.url.includes('manifest.json')){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const rc=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,rc));return res})));
  }else{
    e.respondWith(fetch(e.request,{cache:'no-cache'}).catch(()=>caches.match(e.request)));
  }
});
