(()=>{var e={};e.id=371,e.ids=[371],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},92863:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d}),s(5224),s(32694),s(71363);var a=s(36576),r=s(72007),i=s(21818),o=s.n(i),n=s(88897),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d=["",{children:["sales",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,5224)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/sales/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,32694)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,71363,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/supermarket_pos_system/nextjs_space/app/sales/page.tsx"],p="/sales/page",u={require:s,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/sales/page",pathname:"/sales",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},14302:(e,t,s)=>{Promise.resolve().then(s.bind(s,27544))},27544:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h});var a=s(62901),r=s(73735),i=s(92861),o=s(23415),n=s(24383),l=s(25715),d=s(77185),c=s(43309),p=s(76244),u=s(39350),m=s(59617),x=s(74190);function h(){let{selectedStore:e}=(0,m.o)(),{formatPrice:t}=(0,x.U8)(),[s,h]=(0,n.useState)([]),[f,y]=(0,n.useState)(!0);return(0,a.jsxs)(r.I,{children:[a.jsx(u.x7,{position:"top-right"}),(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[a.jsx(i.W,{}),a.jsx(o.FE,{children:(0,a.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"mb-8",children:[a.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Sales History"}),a.jsx("p",{className:"mt-2 text-gray-600",children:"View all transactions"})]}),f?a.jsx("div",{className:"flex items-center justify-center py-12",children:a.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):s?.length>0?a.jsx("div",{className:"space-y-4",children:s?.map?.(e=>a.jsxs("div",{className:"rounded-xl bg-white p-6 shadow-sm",children:[a.jsxs("div",{className:"mb-4 flex flex-wrap items-center justify-between gap-4",children:[a.jsxs("div",{className:"flex items-center space-x-3",children:[a.jsx("div",{className:"rounded-full bg-emerald-100 p-2",children:a.jsx(l.Z,{className:"h-5 w-5 text-emerald-600"})}),a.jsxs("div",{children:[a.jsx("h3",{className:"font-semibold text-gray-900",children:e?.receiptNumber}),a.jsx("p",{className:"text-sm text-gray-500",children:new Date(e?.createdAt)?.toLocaleString?.()})]})]}),a.jsx("div",{className:"text-right",children:a.jsx("p",{className:"text-2xl font-bold text-emerald-600",children:t(e?.total??0)})})]}),a.jsxs("div",{className:"grid gap-4 sm:grid-cols-3",children:[a.jsxs("div",{className:"flex items-center space-x-2",children:[a.jsx(d.Z,{className:"h-4 w-4 text-gray-400"}),a.jsxs("span",{className:"text-sm text-gray-600",children:["Cashier: ",e?.user?.name??"Unknown"]})]}),a.jsxs("div",{className:"flex items-center space-x-2",children:[e?.paymentMethod==="CASH"?a.jsx(c.Z,{className:"h-4 w-4 text-gray-400"}):a.jsx(p.Z,{className:"h-4 w-4 text-gray-400"}),a.jsx("span",{className:"text-sm text-gray-600",children:e?.paymentMethod})]}),e?.customer&&a.jsxs("div",{className:"flex items-center space-x-2",children:[a.jsx(d.Z,{className:"h-4 w-4 text-gray-400"}),a.jsxs("span",{className:"text-sm text-gray-600",children:["Customer: ",e.customer.name]})]})]}),a.jsxs("div",{className:"mt-4 border-t border-gray-200 pt-4",children:[a.jsx("p",{className:"mb-2 text-sm font-medium text-gray-700",children:"Items:"}),a.jsx("div",{className:"space-y-1",children:e?.items?.map?.(e=>a.jsxs("div",{className:"flex justify-between text-sm text-gray-600",children:[a.jsxs("span",{children:[e?.product?.name," x",e?.quantity]}),a.jsx("span",{children:t(e?.subtotal??0)})]},e?.id))??null})]})]},e?.id))??null}):(0,a.jsxs)("div",{className:"rounded-xl bg-white p-12 text-center shadow-sm",children:[a.jsx(l.Z,{className:"mx-auto h-16 w-16 text-gray-400"}),a.jsx("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No sales yet"}),a.jsx("p",{className:"mt-2 text-gray-500",children:"Sales will appear here"})]})]})})]})]})}},43309:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});let a=(0,s(71945).Z)("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]])},76244:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});let a=(0,s(71945).Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]])},77185:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});let a=(0,s(71945).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},5224:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});let a=(0,s(88895).createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/sales/page.tsx#default`)},39350:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,Am:()=>q});var a,r=s(24383);let i={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",a="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":a+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,o):i+":"+o+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e},m=(e,t,s,a,r)=>{let i=u(e),o=p[i]||(p[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!p[o]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(s=t[3].replace(d," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);p[o]=c(r?{["@keyframes "+o]:t}:t,s?"":"."+o)}let m=s&&p.g?p.g:null;return s&&(p.g=p[o]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(p[o],t,a,m),o},x=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return m(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}h.bind({g:1});let f,y,g,b=h.bind({k:1});function v(e,t){let s=this||{};return function(){let a=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;s.p=Object.assign({theme:y&&y()},n),s.o=/ *go\d+/.test(l),n.className=h.apply(s,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),g&&d[0]&&g(n),f(d,n)}return t?t(r):r}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),_="default",E=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return E(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},P=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},A=(e,t=_)=>{$[t]=E($[t]||C,e),P.forEach(([e,s])=>{e===t&&s($[t])})},D=e=>Object.keys($).forEach(t=>A(e,t)),O=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),I=(e=_)=>t=>{A(t,e)},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Z=(e={},t=_)=>{let[s,a]=(0,r.useState)($[t]||C),i=(0,r.useRef)($[t]);(0,r.useEffect)(()=>(i.current!==$[t]&&a($[t]),P.push([t,a]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||M[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:o}},z=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),S=e=>(t,s)=>{let a=z(t,e,s);return I(a.toasterId||O(a.id))({type:2,toast:a}),a.id},q=(e,t)=>S("blank")(e,t);q.error=S("error"),q.success=S("success"),q.loading=S("loading"),q.custom=S("custom"),q.dismiss=(e,t)=>{let s={type:3,toastId:e};t?I(t)(s):D(s)},q.dismissAll=e=>q.dismiss(void 0,e),q.remove=(e,t)=>{let s={type:4,toastId:e};t?I(t)(s):D(s)},q.removeAll=e=>q.remove(void 0,e),q.promise=(e,t,s)=>{let a=q.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?w(t.success,e):void 0;return r?q.success(r,{id:a,...s,...null==s?void 0:s.success}):q.dismiss(a),e}).catch(e=>{let r=t.error?w(t.error,e):void 0;r?q.error(r,{id:a,...s,...null==s?void 0:s.error}):q.dismiss(a)}),e};var H=1e3,L=(e,t="default")=>{let{toasts:s,pausedAt:a}=Z(e,t),i=(0,r.useRef)(new Map).current,o=(0,r.useCallback)((e,t=H)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&q.dismiss(s.id);return}return setTimeout(()=>q.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,r.useCallback)(I(t),[t]),l=(0,r.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,r.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,r.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),p=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:p}}},T=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
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
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,V=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=b`
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
}`,X=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
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
`,Y=v("div")`
  position: absolute;
`,J=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(Q,null,t):t:"blank"===s?null:r.createElement(J,null,r.createElement(B,{...a}),"loading"!==s&&r.createElement(Y,null,"error"===s?r.createElement(G,{...a}):r.createElement(X,{...a})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
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
`,er=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=r.createElement(ee,{toast:e}),n=r.createElement(er,{...e.ariaProps},w(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:o,message:n}):r.createElement(r.Fragment,null,o,n))});a=r.createElement,c.p=void 0,f=a,y=void 0,g=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let o=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:o,className:t,style:s},i)},el=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=L(s,o);return r.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o=s.position||t,n=el(o,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?w(s.message,s):i?i(s):r.createElement(eo,{toast:s,position:o}))}))}}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[4372,879,9121,4542,4566],()=>s(92863));module.exports=a})();