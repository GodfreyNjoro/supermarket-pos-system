(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[168],{20234:function(e,t,s){Promise.resolve().then(s.bind(s,34909))},34909:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return f}});var r=s(15444),a=s(46271),i=s(11117),n=s(3763),o=s(95777),l=s(89300),d=s(39429),c=s(6175),u=s(41084),m=s(64611),p=s(3857);function f(){let{formatPrice:e}=(0,p.U8)(),[t,s]=(0,l.useState)([]),[f,h]=(0,l.useState)(!0);(0,l.useEffect)(()=>{x()},[]);let x=async()=>{try{h(!0);let e=await fetch("/api/returns"),t=await e.json();s(t)}catch(e){console.error("Error fetching returns:",e)}finally{h(!1)}};return(0,r.jsx)(a.I,{children:(0,r.jsxs)(i.p,{allowedRoles:["ADMIN"],children:[(0,r.jsx)(m.x7,{position:"top-right"}),(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,r.jsx)(n.W,{}),(0,r.jsx)(o.FE,{children:(0,r.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,r.jsxs)("div",{className:"mb-8 flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Returns & Refunds"}),(0,r.jsx)("p",{className:"mt-2 text-gray-600",children:"Process product returns"})]}),(0,r.jsxs)(u.default,{href:"/returns/new",className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700",children:[(0,r.jsx)(d.Z,{className:"h-5 w-5"}),(0,r.jsx)("span",{children:"New Return"})]})]}),f?(0,r.jsx)("div",{className:"flex items-center justify-center py-12",children:(0,r.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):t?.length>0?(0,r.jsx)("div",{className:"space-y-4",children:t?.map?.(t=>r.jsxs("div",{className:"rounded-xl bg-white p-6 shadow-sm",children:[r.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[r.jsxs("div",{className:"flex items-center space-x-3",children:[r.jsx("div",{className:"rounded-full bg-orange-100 p-2",children:r.jsx(c.Z,{className:"h-5 w-5 text-orange-600"})}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-900",children:t?.returnNumber}),r.jsx("p",{className:"text-sm text-gray-500",children:new Date(t?.createdAt)?.toLocaleString?.()})]})]}),r.jsx("div",{className:"text-right",children:r.jsxs("p",{className:"text-2xl font-bold text-red-600",children:["-",e(t?.totalRefund??0)]})})]}),r.jsxs("div",{className:"mb-4 rounded-lg bg-gray-50 p-3",children:[r.jsxs("p",{className:"text-sm text-gray-600",children:[r.jsx("span",{className:"font-medium",children:"Original Sale:"})," ",t?.sale?.receiptNumber]}),t?.sale?.customer&&r.jsxs("p",{className:"text-sm text-gray-600",children:[r.jsx("span",{className:"font-medium",children:"Customer:"})," ",t.sale.customer.name]}),r.jsxs("p",{className:"mt-2 text-sm text-gray-600",children:[r.jsx("span",{className:"font-medium",children:"Reason:"})," ",t?.reason]})]}),r.jsxs("div",{className:"border-t border-gray-200 pt-4",children:[r.jsx("p",{className:"mb-2 text-sm font-medium text-gray-700",children:"Returned Items:"}),r.jsx("div",{className:"space-y-1",children:t?.items?.map?.(t=>r.jsxs("div",{className:"flex justify-between text-sm text-gray-600",children:[r.jsxs("span",{children:[t?.product?.name," x",t?.quantity]}),r.jsx("span",{children:e(t?.refundAmount??0)})]},t?.id))??null})]})]},t?.id))??null}):(0,r.jsxs)("div",{className:"rounded-xl bg-white p-12 text-center shadow-sm",children:[(0,r.jsx)(c.Z,{className:"mx-auto h-16 w-16 text-gray-400"}),(0,r.jsx)("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No returns yet"}),(0,r.jsx)("p",{className:"mt-2 text-gray-500",children:"Returns will appear here"})]})]})})]})]})})}},11117:function(e,t,s){"use strict";s.d(t,{p:function(){return o}});var r=s(15444),a=s(75762),i=s(79047),n=s(89300);function o({children:e,allowedRoles:t,fallbackUrl:s="/dashboard"}){let{data:o,status:l}=(0,a.useSession)()||{},d=(0,i.useRouter)();if((0,n.useEffect)(()=>{if("authenticated"===l&&o?.user){let e=o.user?.role;t?.includes?.(e)||d.replace(s)}},[l,o,t,s,d]),"loading"===l)return(0,r.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,r.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===l){let s=o?.user?.role;if(t?.includes?.(s))return(0,r.jsx)(r.Fragment,{children:e})}return null}},39429:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});let r=(0,s(42154).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},64611:function(e,t,s){"use strict";let r,a;s.d(t,{x7:function(){return em},Am:function(){return T}});var i,n=s(89300);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",r="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":r+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=m.p?m.p(i,n):i+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},p={},f=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+f(e[s]);return t}return e},h=(e,t,s,r,a)=>{var i;let n=f(e),o=p[n]||(p[n]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,s,r=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?r.shift():t[3]?(s=t[3].replace(u," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);p[o]=m(a?{["@keyframes "+o]:t}:t,s?"":"."+o)}let l=s&&p.g?p.g:null;return s&&(p.g=p[o]),i=p[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),o},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,b,v,j=g.bind({k:1});function w(e,t){let s=this||{};return function(){let r=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;s.p=Object.assign({theme:b&&b()},o),s.o=/ *go\d+/.test(l),o.className=g.apply(s,r)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),y(d,o)}return t?t(a):a}}var N=e=>"function"==typeof e,E=(e,t)=>N(e)?e(t):e,k=(r=0,()=>(++r).toString()),$=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},C="default",O=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return O(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},_=(e,t=C)=>{I[t]=O(I[t]||A,e),D.forEach(([e,s])=>{e===t&&s(I[t])})},R=e=>Object.keys(I).forEach(t=>_(e,t)),P=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),z=(e=C)=>t=>{_(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=(e={},t=C)=>{let[s,r]=(0,n.useState)(I[t]||A),a=(0,n.useRef)(I[t]);(0,n.useEffect)(()=>(a.current!==I[t]&&r(I[t]),D.push([t,r]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:i}},F=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||k()}),L=e=>(t,s)=>{let r=F(t,e,s);return z(r.toasterId||P(r.id))({type:2,toast:r}),r.id},T=(e,t)=>L("blank")(e,t);T.error=L("error"),T.success=L("success"),T.loading=L("loading"),T.custom=L("custom"),T.dismiss=(e,t)=>{let s={type:3,toastId:e};t?z(t)(s):R(s)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let s={type:4,toastId:e};t?z(t)(s):R(s)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,s)=>{let r=T.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?E(t.success,e):void 0;return a?T.success(a,{id:r,...s,...null==s?void 0:s.success}):T.dismiss(r),e}).catch(e=>{let a=t.error?E(t.error,e):void 0;a?T.error(a,{id:r,...s,...null==s?void 0:s.error}):T.dismiss(r)}),e};var Z=1e3,H=(e,t="default")=>{let{toasts:s,pausedAt:r}=M(e,t),a=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=Z)=>{if(a.has(e))return;let s=setTimeout(()=>{a.delete(e),o({type:4,toastId:e})},t);a.set(e,s)},[]);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&T.dismiss(s.id);return}return setTimeout(()=>T.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let o=(0,n.useCallback)(z(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},n=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,n.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},U=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,W=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,J=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Q=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${K} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,V=w("div")`
  position: absolute;
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===s?null:n.createElement(X,null,n.createElement(G,{...r}),"loading"!==s&&n.createElement(V,null,"error"===s?n.createElement(W,{...r}):n.createElement(Q,{...r})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,en=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=$()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(s),ea(s)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:s,children:r})=>{let a=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(es,{toast:e}),o=n.createElement(en,{...e.ariaProps},E(e.message,e));return n.createElement(ei,{className:e.className,style:{...a,...s,...e.style}},"function"==typeof r?r({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:s,onHeightUpdate:r,children:a})=>{let i=n.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return n.createElement("div",{ref:i,className:t,style:s},a)},ec=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:$()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},eu=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:a,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=H(s,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let i=s.position||t,o=ec(i,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return n.createElement(ed,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?eu:"",style:o},"custom"===s.type?E(s.message,s):a?a(s):n.createElement(el,{toast:s,position:i}))}))}}},function(e){e.O(0,[676,258,535,608,386,156,744],function(){return e(e.s=20234)}),_N_E=e.O()}]);