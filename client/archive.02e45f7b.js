import{S as t,i as s,s as e,e as r,t as a,a as l,b as c,f as n,g as h,d as o,c as f,h as i,k as v,l as p,n as u,C as d,D as g,p as j,w as m,z as E,B as D}from"./client.4886ad4f.js";function I(t,s,e){const r=t.slice();return r[2]=s[e],r}function V(t){let s,e,d,g,j,m,E,D,I,V,A,x=t[2].title[t[1].current]+"",w=t[2].date+"",y=t[2].type[t[1].current]+"";return{c(){s=r("a"),e=r("div"),d=a(x),g=l(),j=r("div"),m=a(w),E=l(),D=r("div"),I=a(y),V=l(),this.h()},l(t){s=c(t,"A",{rel:!0,href:!0,class:!0});var r=n(s);e=c(r,"DIV",{class:!0});var a=n(e);d=h(a,x),a.forEach(o),g=f(r),j=c(r,"DIV",{class:!0});var l=n(j);m=h(l,w),l.forEach(o),E=f(r),D=c(r,"DIV",{class:!0});var i=n(D);I=h(i,y),i.forEach(o),V=f(r),r.forEach(o),this.h()},h(){i(e,"class","svelte-f9rtvp"),i(j,"class","svelte-f9rtvp"),i(D,"class","svelte-f9rtvp"),i(s,"rel","prefetch"),i(s,"href",A="project/"+t[2].slug),i(s,"class","item svelte-f9rtvp")},m(t,r){v(t,s,r),p(s,e),p(e,d),p(s,g),p(s,j),p(j,m),p(s,E),p(s,D),p(D,I),p(s,V)},p(t,e){3&e&&x!==(x=t[2].title[t[1].current]+"")&&u(d,x),1&e&&w!==(w=t[2].date+"")&&u(m,w),3&e&&y!==(y=t[2].type[t[1].current]+"")&&u(I,y),1&e&&A!==(A="project/"+t[2].slug)&&i(s,"href",A)},d(t){t&&o(s)}}}function A(t){let s,e,u,j,D,A,x,w,y=t[0],$=[];for(let s=0;s<y.length;s+=1)$[s]=V(I(t,y,s));return{c(){s=r("main"),e=r("div"),u=r("h1"),j=a("Archive"),D=l(),A=r("div");for(let t=0;t<$.length;t+=1)$[t].c();this.h()},l(t){s=c(t,"MAIN",{class:!0});var r=n(s);e=c(r,"DIV",{class:!0});var a=n(e);u=c(a,"H1",{class:!0});var l=n(u);j=h(l,"Archive"),l.forEach(o),D=f(a),A=c(a,"DIV",{class:!0});var i=n(A);for(let t=0;t<$.length;t+=1)$[t].l(i);i.forEach(o),a.forEach(o),r.forEach(o),this.h()},h(){i(u,"class","title svelte-f9rtvp"),i(A,"class","list svelte-f9rtvp"),i(e,"class","wrapper svelte-f9rtvp"),i(s,"class","svelte-f9rtvp")},m(t,r){v(t,s,r),p(s,e),p(e,u),p(u,j),p(e,D),p(e,A);for(let t=0;t<$.length;t+=1)$[t].m(A,null);w=!0},p(t,[s]){if(3&s){let e;for(y=t[0],e=0;e<y.length;e+=1){const r=I(t,y,e);$[e]?$[e].p(r,s):($[e]=V(r),$[e].c(),$[e].m(A,null))}for(;e<$.length;e+=1)$[e].d(1);$.length=y.length}},i(t){w||(m((()=>{x||(x=d(s,E,{},!0)),x.run(1)})),w=!0)},o(t){x||(x=d(s,E,{},!1)),x.run(0),w=!1},d(t){t&&o(s),g($,t),t&&x&&x.end()}}}function x(){return this.fetch("project.json").then((t=>t.json())).then((t=>({projects:t})))}function w(t,s,e){let r;j(t,D,(t=>e(1,r=t)));let{projects:a}=s;return t.$$set=t=>{"projects"in t&&e(0,a=t.projects)},[a,r]}export default class extends t{constructor(t){super(),s(this,t,w,A,e,{projects:0})}}export{x as preload};
