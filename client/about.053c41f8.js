import{S as t,i as a,s as e,e as s,t as n,r,c as l,a as c,b as o,d as i,u as h,f as u,h as v,j as f,n as d,B as m,k as p,D as j,m as E,o as b,E as g,M as x,G as y,I as A,R as I,N as D,p as H,J as V}from"./client.4099eb23.js";import{m as $}from"./_meta.94c709fb.js";function M(t,a,e){const s=t.slice();return s[12]=a[e],s}function N(t){let a,e,m,p,j,E=t[12].title+"";return{c(){a=s("span"),e=s("a"),m=n(E),j=r(),this.h()},l(t){a=l(t,"SPAN",{class:!0});var s=c(a);e=l(s,"A",{href:!0});var n=c(e);m=o(n,E),n.forEach(i),j=h(s),s.forEach(i),this.h()},h(){u(e,"href",p=t[12].src),u(a,"class","svelte-53vnaj")},m(t,s){v(t,a,s),f(a,e),f(e,m),f(a,j)},p:d,d(t){t&&i(a)}}}function S(t){let a,e,d,b,g,x,D,H,V,S,L,P,T,k,w,B,C,G,J,R,X,Y,_,q,z,F,K,O,Q=t[0][t[2].current].meta.title+"",U=t[0][t[2].current].content+"",W=t[3].email[t[2].current]+"",Z=$.email+"",tt=t[3].external[t[2].current]+"",at=$.external,et=[];for(let a=0;a<at.length;a+=1)et[a]=N(M(t,at,a));return{c(){a=r(),e=s("main"),d=s("div"),b=s("div"),g=s("h1"),x=n(Q),V=r(),S=s("div"),T=r(),k=s("h3"),w=n(W),B=r(),C=s("p"),G=n(Z),J=r(),R=s("h3"),X=n(tt),Y=r(),_=s("div");for(let t=0;t<et.length;t+=1)et[t].c();q=r(),z=s("canvas"),this.h()},l(t){m('[data-svelte="svelte-1ine71f"]',document.head).forEach(i),a=h(t),e=l(t,"MAIN",{class:!0});var s=c(e);d=l(s,"DIV",{class:!0});var n=c(d);b=l(n,"DIV",{class:!0});var r=c(b);g=l(r,"H1",{class:!0});var u=c(g);x=o(u,Q),u.forEach(i),r.forEach(i),V=h(n),S=l(n,"DIV",{}),c(S).forEach(i),T=h(n),k=l(n,"H3",{class:!0});var v=c(k);w=o(v,W),v.forEach(i),B=h(n),C=l(n,"P",{});var f=c(C);G=o(f,Z),f.forEach(i),J=h(n),R=l(n,"H3",{class:!0});var p=c(R);X=o(p,tt),p.forEach(i),Y=h(n),_=l(n,"DIV",{class:!0});var j=c(_);for(let t=0;t<et.length;t+=1)et[t].l(j);j.forEach(i),n.forEach(i),q=h(s),z=l(s,"CANVAS",{id:!0,class:!0}),c(z).forEach(i),s.forEach(i),this.h()},h(){document.title="About",u(g,"class","svelte-53vnaj"),u(b,"class","txt-wrap svelte-53vnaj"),u(k,"class","svelte-53vnaj"),u(R,"class","svelte-53vnaj"),u(_,"class","sep svelte-53vnaj"),u(d,"class","content svelte-53vnaj"),u(z,"id","interactive"),u(z,"class","svelte-53vnaj"),u(e,"class","svelte-53vnaj")},m(s,n){v(s,a,n),v(s,e,n),f(e,d),f(d,b),f(b,g),f(g,x),f(d,V),f(d,S),S.innerHTML=U,f(d,T),f(d,k),f(k,w),f(d,B),f(d,C),f(C,G),f(d,J),f(d,R),f(R,X),f(d,Y),f(d,_);for(let t=0;t<et.length;t+=1)et[t].m(_,null);f(e,q),f(e,z),t[5](z),O=!0},p(t,[a]){if((!O||5&a)&&Q!==(Q=t[0][t[2].current].meta.title+"")&&p(x,Q),(!O||5&a)&&U!==(U=t[0][t[2].current].content+"")&&(S.innerHTML=U),(!O||4&a)&&W!==(W=t[3].email[t[2].current]+"")&&p(w,W),(!O||4&a)&&tt!==(tt=t[3].external[t[2].current]+"")&&p(X,tt),0&a){let e;for(at=$.external,e=0;e<at.length;e+=1){const s=M(t,at,e);et[e]?et[e].p(s,a):(et[e]=N(s),et[e].c(),et[e].m(_,null))}for(;e<et.length;e+=1)et[e].d(1);et.length=at.length}},i(a){O||(y((()=>{H&&H.end(1),D||(D=A(g,t[4],{duration:400,delay:400})),D.start()})),y((()=>{P&&P.end(1),L||(L=A(S,I,{delay:800})),L.start()})),y((()=>{K&&K.end(1),F||(F=A(z,I,{delay:800})),F.start()})),O=!0)},o(a){D&&D.invalidate(),H=j(g,t[4],{duration:400}),L&&L.invalidate(),P=j(S,I,{delay:100}),F&&F.invalidate(),K=j(z,I,{}),O=!1},d(s){s&&i(a),s&&i(e),s&&H&&H.end(),s&&P&&P.end(),E(et,s),t[5](null),s&&K&&K.end()}}}function L(){return this.fetch("about.json").then((t=>t.json())).then((t=>({about:t})))}function P(t,a,e){let s;b(t,H,(t=>e(2,s=t)));let n,{about:r}=a,l=g("vocabulary");return x((()=>{})),t.$$set=t=>{"about"in t&&e(0,r=t.about)},[r,n,s,l,function(t,{delay:a=0,duration:e=400}){return{delay:a,duration:e,css:t=>{const a=V(t);return`\n\t\t\t\t\topacity:${a};\n\t\t\t\t\ttransform: translateY(${-100*(a-1)}%) rotateX(${90*(a-1)}deg);\n\t\t\t\t\t`}}},function(t){D[t?"unshift":"push"]((()=>{n=t,e(1,n)}))}]}export default class extends t{constructor(t){super(),a(this,t,P,S,e,{about:0})}}export{L as preload};