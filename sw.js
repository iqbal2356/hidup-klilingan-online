const CACHE_NAME = "hidup-klilingan-v64";
const APP_SHELL = ["./","./index.html","./config.js","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => { const req=e.request, url=new URL(req.url); if(url.hostname.includes("supabase.co")) return; if(req.mode === "navigate"){ e.respondWith(fetch(req).then(res=>{const cp=res.clone(); caches.open(CACHE_NAME).then(c=>c.put("./index.html",cp)); return res;}).catch(()=>caches.match("./index.html"))); return;} if(url.origin===self.location.origin){ e.respondWith(caches.match(req).then(cached=>cached||fetch(req))); }});
