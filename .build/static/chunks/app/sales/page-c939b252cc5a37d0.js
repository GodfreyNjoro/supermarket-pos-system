(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[371],{51958:function(e,t,s){Promise.resolve().then(s.bind(s,53890))},53890:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return x}});var a=s(15444),r=s(46271),i=s(3763),o=s(95777),n=s(89300),l=s(41509),c=s(4693),d=s(5903),u=s(32235),m=s(64611),p=s(82534),f=s(3857);function x(){let{selectedStore:e}=(0,p.o)(),{formatPrice:t}=(0,f.U8)(),[s,x]=(0,n.useState)([]),[h,y]=(0,n.useState)(!0);(0,n.useEffect)(()=>{e&&g()},[e]);let g=async()=>{try{if(!e)return;y(!0);let t=await fetch(`/api/sales?storeId=${e.id}&limit=50`),s=await t.json();x(s)}catch(e){console.error("Error fetching sales:",e)}finally{y(!1)}};return(0,a.jsxs)(r.I,{children:[(0,a.jsx)(m.x7,{position:"top-right"}),(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,a.jsx)(i.W,{}),(0,a.jsx)(o.FE,{children:(0,a.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"mb-8",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Sales History"}),(0,a.jsx)("p",{className:"mt-2 text-gray-600",children:"View all transactions"})]}),h?(0,a.jsx)("div",{className:"flex items-center justify-center py-12",children:(0,a.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):s?.length>0?(0,a.jsx)("div",{className:"space-y-4",children:s?.map?.(e=>a.jsxs("div",{className:"rounded-xl bg-white p-6 shadow-sm",children:[a.jsxs("div",{className:"mb-4 flex flex-wrap items-center justify-between gap-4",children:[a.jsxs("div",{className:"flex items-center space-x-3",children:[a.jsx("div",{className:"rounded-full bg-emerald-100 p-2",children:a.jsx(l.Z,{className:"h-5 w-5 text-emerald-600"})}),a.jsxs("div",{children:[a.jsx("h3",{className:"font-semibold text-gray-900",children:e?.receiptNumber}),a.jsx("p",{className:"text-sm text-gray-500",children:new Date(e?.createdAt)?.toLocaleString?.()})]})]}),a.jsx("div",{className:"text-right",children:a.jsx("p",{className:"text-2xl font-bold text-emerald-600",children:t(e?.total??0)})})]}),a.jsxs("div",{className:"grid gap-4 sm:grid-cols-3",children:[a.jsxs("div",{className:"flex items-center space-x-2",children:[a.jsx(c.Z,{className:"h-4 w-4 text-gray-400"}),a.jsxs("span",{className:"text-sm text-gray-600",children:["Cashier: ",e?.user?.name??"Unknown"]})]}),a.jsxs("div",{className:"flex items-center space-x-2",children:[e?.paymentMethod==="CASH"?a.jsx(d.Z,{className:"h-4 w-4 text-gray-400"}):a.jsx(u.Z,{className:"h-4 w-4 text-gray-400"}),a.jsx("span",{className:"text-sm text-gray-600",children:e?.paymentMethod})]}),e?.customer&&a.jsxs("div",{className:"flex items-center space-x-2",children:[a.jsx(c.Z,{className:"h-4 w-4 text-gray-400"}),a.jsxs("span",{className:"text-sm text-gray-600",children:["Customer: ",e.customer.name]})]})]}),a.jsxs("div",{className:"mt-4 border-t border-gray-200 pt-4",children:[a.jsx("p",{className:"mb-2 text-sm font-medium text-gray-700",children:"Items:"}),a.jsx("div",{className:"space-y-1",children:e?.items?.map?.(e=>a.jsxs("div",{className:"flex justify-between text-sm text-gray-600",children:[a.jsxs("span",{children:[e?.product?.name," x",e?.quantity]}),a.jsx("span",{children:t(e?.subtotal??0)})]},e?.id))??null})]})]},e?.id))??null}):(0,a.jsxs)("div",{className:"rounded-xl bg-white p-12 text-center shadow-sm",children:[(0,a.jsx)(l.Z,{className:"mx-auto h-16 w-16 text-gray-400"}),(0,a.jsx)("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No sales yet"}),(0,a.jsx)("p",{className:"mt-2 text-gray-500",children:"Sales will appear here"})]})]})})]})]})}},5903:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(42154).Z)("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]])},32235:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(42154).Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]])},4693:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(42154).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},64611:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return em},Am:function(){return F}});var i,o=s(89300);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",a="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":a+="f"==i[1]?m(o,i):i+"{"+m(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=m(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,o):i+":"+o+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+f(e[s]);return t}return e},x=(e,t,s,a,r)=>{var i;let o=f(e),n=p[o]||(p[o]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,s,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let l=s&&p.g?p.g:null;return s&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},h=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function y(e){let t=this||{},s=e.call?e(t.p):e;return x(s.unshift?s.raw?h(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let g,b,v,w=y.bind({k:1});function j(e,t){let s=this||{};return function(){let a=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;s.p=Object.assign({theme:b&&b()},n),s.o=/ *go\d+/.test(l),n.className=y.apply(s,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),g(c,n)}return t?t(r):r}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},$="default",O=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return O(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},Z=(e,t=$)=>{I[t]=O(I[t]||A,e),D.forEach(([e,s])=>{e===t&&s(I[t])})},_=e=>Object.keys(I).forEach(t=>Z(e,t)),z=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),M=(e=$)=>t=>{Z(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=$)=>{let[s,a]=(0,o.useState)(I[t]||A),r=(0,o.useRef)(I[t]);(0,o.useEffect)(()=>(r.current!==I[t]&&a(I[t]),D.push([t,a]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:i}},H=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||E()}),L=e=>(t,s)=>{let a=H(t,e,s);return M(a.toasterId||z(a.id))({type:2,toast:a}),a.id},F=(e,t)=>L("blank")(e,t);F.error=L("error"),F.success=L("success"),F.loading=L("loading"),F.custom=L("custom"),F.dismiss=(e,t)=>{let s={type:3,toastId:e};t?M(t)(s):_(s)},F.dismissAll=e=>F.dismiss(void 0,e),F.remove=(e,t)=>{let s={type:4,toastId:e};t?M(t)(s):_(s)},F.removeAll=e=>F.remove(void 0,e),F.promise=(e,t,s)=>{let a=F.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?F.success(r,{id:a,...s,...null==s?void 0:s.success}):F.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?F.error(r,{id:a,...s,...null==s?void 0:s.error}):F.dismiss(a)}),e};var T=1e3,U=(e,t="default")=>{let{toasts:s,pausedAt:a}=P(e,t),r=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=T)=>{if(r.has(e))return;let s=setTimeout(()=>{r.delete(e),n({type:4,toastId:e})},t);r.set(e,s)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&F.dismiss(s.id);return}return setTimeout(()=>F.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,o.useCallback)(M(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,o.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=r.get(e.id);t&&(clearTimeout(t),r.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},R=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,W=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,G=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=w`
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
}`,K=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${J} 0.2s ease-out forwards;
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
`,Q=j("div")`
  position: absolute;
`,X=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===s?null:o.createElement(X,null,o.createElement(Y,{...a}),"loading"!==s&&o.createElement(Q,null,"error"===s?o.createElement(V,{...a}):o.createElement(K,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=j("div")`
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
`,eo=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(s),er(s)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(es,{toast:e}),n=o.createElement(eo,{...e.ariaProps},k(e.message,e));return o.createElement(ei,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,m.p=void 0,g=i,b=void 0,v=void 0;var ec=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=o.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:i,className:t,style:s},r)},ed=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=U(s,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let i=s.position||t,n=ed(i,d.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(ec,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?eu:"",style:n},"custom"===s.type?k(s.message,s):r?r(s):o.createElement(el,{toast:s,position:i}))}))}}},function(e){e.O(0,[676,258,535,608,386,156,744],function(){return e(e.s=51958)}),_N_E=e.O()}]);