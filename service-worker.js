!function(){"use strict";const e=1611618487745,t=`cache${e}`,s=["/client/client.7301b5af.js","/client/inject_styles.5607aec6.js","/client/index.b3f00b75.js","/client/archive.0a5142eb.js","/client/index.2cd965ec.js","/client/[slug].38bfed4c.js","/client/about.83c5e122.js"].concat(["/service-worker-index.html","/assets/arrow.svg","/assets/house.jpg","/assets/logo.svg","/experiments-media/moon_print/moon_day_balance.jpg","/experiments-media/moon_print/moon_night_balance.jpg","/experiments-media/moon_print/moonmoonmoon_balance.jpg","/favicon.png","/fonts/Heebo-VariableFont_wght.ttf","/global.css","/logo-192.png","/logo-512.png","/manifest.json","/projects-media/intimacy/screen_shot_1.jpg","/projects-media/intimacy/screen_shot_2.jpg","/projects-media/intimacy/screen_shot_3.jpg","/projects-media/intimacy/screen_shot_4.jpg","/projects-media/intimacy/screen_shot_5.jpg","/projects-media/intimacy/vignette.jpg","/projects-media/memory/screen_shot_1.jpg","/projects-media/memory/screen_shot_2.jpg","/projects-media/memory/screen_shot_3.jpg","/projects-media/multiple/preview_multiple_1.jpg","/projects-media/multiple/preview_multiple_2.jpg","/projects-media/multiple/preview_multiple_3.jpg","/projects-media/trail/characters.jpg","/projects-media/trail/fullscreen_1.jpg","/projects-media/trail/fullscreen_2.jpg","/projects-media/trail/fullscreen_3.jpg","/projects-media/trail/vignette.jpg","/projects-media/witness/animation.jpg","/projects-media/witness/interface.jpg","/projects-media/witness/modeling.jpg","/projects-media/witness/screen_shot_1.jpg","/projects-media/witness/vignette.jpg"]),i=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const s=new URL(t.request.url),n=s.protocol.startsWith("http"),a=s.hostname===self.location.hostname&&s.port!==self.location.port,c=s.host===self.location.host&&i.has(s.pathname),o="only-if-cached"===t.request.cache&&!c;!n||a||o||t.respondWith((async()=>c&&await caches.match(t.request)||async function(t){const s=await caches.open(`offline${e}`);try{const e=await fetch(t);return s.put(t,e.clone()),e}catch(e){const i=await s.match(t);if(i)return i;throw e}}(t.request))())}))}();
