import{o as _,_ as ne}from"./index.5a47eaab.js";import{ag as oe,s as A,a7 as I,h as g,d as se,p as re,w as O,b as h,r as ce,X as M,a4 as ae}from"./framework.896e1521.js";function ue(e){return e==null}let F;const Pe=e=>{var n;if(!_)return 0;if(F!==void 0)return F;const t=document.createElement("div");t.className=`${e}-scrollbar__wrap`,t.style.visibility="hidden",t.style.width="100px",t.style.position="absolute",t.style.top="-9999px",document.body.appendChild(t);const s=t.offsetWidth;t.style.overflow="scroll";const r=document.createElement("div");r.style.width="100%",t.appendChild(r);const a=r.offsetWidth;return(n=t.parentNode)==null||n.removeChild(t),F=s-a,F};function Se(e,n){if(!_)return;if(!n){e.scrollTop=0;return}const t=[];let s=n.offsetParent;for(;s!==null&&e!==s&&e.contains(s);)t.push(s),s=s.offsetParent;const r=n.offsetTop+t.reduce((m,S)=>m+S.offsetTop,0),a=r+n.offsetHeight,d=e.scrollTop,v=d+e.clientHeight;r<d?e.scrollTop=r:a>v&&(e.scrollTop=a-e.clientHeight)}const Ce=(...e)=>n=>{e.forEach(t=>{oe(t)?t(n):t.value=n})},Z={tab:"Tab",enter:"Enter",space:"Space",left:"ArrowLeft",up:"ArrowUp",right:"ArrowRight",down:"ArrowDown",esc:"Escape",delete:"Delete",backspace:"Backspace",numpadEnter:"NumpadEnter",pageUp:"PageUp",pageDown:"PageDown",home:"Home",end:"End"};let E=[];const j=e=>{const n=e;n.key===Z.esc&&E.forEach(t=>t(n))},ie=e=>{A(()=>{E.length===0&&document.addEventListener("keydown",j),_&&E.push(e)}),I(()=>{E=E.filter(n=>n!==e),E.length===0&&_&&document.removeEventListener("keydown",j)})},N="focus-trap.focus-after-trapped",k="focus-trap.focus-after-released",le="focus-trap.focusout-prevented",q={cancelable:!0,bubbles:!1},de={cancelable:!0,bubbles:!1},J="focusAfterTrapped",X="focusAfterReleased",fe=Symbol("elFocusTrap"),U=g(),P=g(0),D=g(0);let w=0;const ee=e=>{const n=[],t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:s=>{const r=s.tagName==="INPUT"&&s.type==="hidden";return s.disabled||s.hidden||r?NodeFilter.FILTER_SKIP:s.tabIndex>=0||s===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;t.nextNode();)n.push(t.currentNode);return n},Y=(e,n)=>{for(const t of e)if(!pe(t,n))return t},pe=(e,n)=>{if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(n&&e===n)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1},ve=e=>{const n=ee(e),t=Y(n,e),s=Y(n.reverse(),e);return[t,s]},Ee=e=>e instanceof HTMLInputElement&&"select"in e,p=(e,n)=>{if(e&&e.focus){const t=document.activeElement;e.focus({preventScroll:!0}),D.value=window.performance.now(),e!==t&&Ee(e)&&n&&e.select()}};function z(e,n){const t=[...e],s=e.indexOf(n);return s!==-1&&t.splice(s,1),t}const me=()=>{let e=[];return{push:s=>{const r=e[0];r&&s!==r&&r.pause(),e=z(e,s),e.unshift(s)},remove:s=>{var r,a;e=z(e,s),(a=(r=e[0])==null?void 0:r.resume)==null||a.call(r)}}},Te=(e,n=!1)=>{const t=document.activeElement;for(const s of e)if(p(s,n),document.activeElement!==t)return},G=me(),he=()=>P.value>D.value,b=()=>{U.value="pointer",P.value=window.performance.now()},Q=()=>{U.value="keyboard",P.value=window.performance.now()},Fe=()=>(A(()=>{w===0&&(document.addEventListener("mousedown",b),document.addEventListener("touchstart",b),document.addEventListener("keydown",Q)),w++}),I(()=>{w--,w<=0&&(document.removeEventListener("mousedown",b),document.removeEventListener("touchstart",b),document.removeEventListener("keydown",Q))}),{focusReason:U,lastUserFocusTimestamp:P,lastAutomatedFocusTimestamp:D}),y=e=>new CustomEvent(le,{...de,detail:e}),we=se({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:[J,X,"focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:n}){const t=g();let s,r;const{focusReason:a}=Fe();ie(o=>{e.trapped&&!d.paused&&n("release-requested",o)});const d={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},v=o=>{if(!e.loop&&!e.trapped||d.paused)return;const{key:c,altKey:u,ctrlKey:i,metaKey:l,currentTarget:V,shiftKey:W}=o,{loop:$}=e,te=c===Z.tab&&!u&&!i&&!l,T=document.activeElement;if(te&&T){const C=V,[L,R]=ve(C);if(L&&R){if(!W&&T===R){const f=y({focusReason:a.value});n("focusout-prevented",f),f.defaultPrevented||(o.preventDefault(),$&&p(L,!0))}else if(W&&[L,C].includes(T)){const f=y({focusReason:a.value});n("focusout-prevented",f),f.defaultPrevented||(o.preventDefault(),$&&p(R,!0))}}else if(T===C){const f=y({focusReason:a.value});n("focusout-prevented",f),f.defaultPrevented||o.preventDefault()}}};re(fe,{focusTrapRef:t,onKeydown:v}),O(()=>e.focusTrapEl,o=>{o&&(t.value=o)},{immediate:!0}),O([t],([o],[c])=>{o&&(o.addEventListener("keydown",v),o.addEventListener("focusin",K),o.addEventListener("focusout",H)),c&&(c.removeEventListener("keydown",v),c.removeEventListener("focusin",K),c.removeEventListener("focusout",H))});const m=o=>{n(J,o)},S=o=>n(X,o),K=o=>{const c=h(t);if(!c)return;const u=o.target,i=o.relatedTarget,l=u&&c.contains(u);e.trapped||i&&c.contains(i)||(s=i),l&&n("focusin",o),!d.paused&&e.trapped&&(l?r=u:p(r,!0))},H=o=>{const c=h(t);if(!(d.paused||!c))if(e.trapped){const u=o.relatedTarget;!ue(u)&&!c.contains(u)&&setTimeout(()=>{if(!d.paused&&e.trapped){const i=y({focusReason:a.value});n("focusout-prevented",i),i.defaultPrevented||p(r,!0)}},0)}else{const u=o.target;u&&c.contains(u)||n("focusout",o)}};async function B(){await M();const o=h(t);if(o){G.push(d);const c=o.contains(document.activeElement)?s:document.activeElement;if(s=c,!o.contains(c)){const i=new Event(N,q);o.addEventListener(N,m),o.dispatchEvent(i),i.defaultPrevented||M(()=>{let l=e.focusStartEl;ae(l)||(p(l),document.activeElement!==l&&(l="first")),l==="first"&&Te(ee(o),!0),(document.activeElement===c||l==="container")&&p(o)})}}}function x(){const o=h(t);if(o){o.removeEventListener(N,m);const c=new CustomEvent(k,{...q,detail:{focusReason:a.value}});o.addEventListener(k,S),o.dispatchEvent(c),!c.defaultPrevented&&(a.value=="keyboard"||!he()||o.contains(document.activeElement))&&p(s??document.body),o.removeEventListener(k,m),G.remove(d)}}return A(()=>{e.trapped&&B(),O(()=>e.trapped,o=>{o?B():x()})}),I(()=>{e.trapped&&x()}),{onKeydown:v}}});function be(e,n,t,s,r,a){return ce(e.$slots,"default",{handleKeydown:e.onKeydown})}var Le=ne(we,[["render",be],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);export{Le as E,fe as F,Z as a,Ce as c,Pe as g,ue as i,Se as s};
