(()=>{var e={};e.id=7168,e.ids=[7168],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},22488:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d}),s(89500),s(32694),s(71363);var r=s(36576),a=s(72007),i=s(21818),o=s.n(i),n=s(88897),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d=["",{children:["returns",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,89500)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/returns/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,32694)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,71363,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/supermarket_pos_system/nextjs_space/app/returns/page.tsx"],u="/returns/page",p={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/returns/page",pathname:"/returns",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},36e3:(e,t,s)=>{Promise.resolve().then(s.bind(s,77044))},77044:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>x});var r=s(62901),a=s(73735),i=s(12458),o=s(92861),n=s(23415),l=s(24383),d=s(97718),c=s(15157),u=s(62392),p=s(39350),m=s(74190);function x(){let{formatPrice:e}=(0,m.U8)(),[t,s]=(0,l.useState)([]),[x,f]=(0,l.useState)(!0);return r.jsx(a.I,{children:(0,r.jsxs)(i.p,{allowedRoles:["ADMIN"],children:[r.jsx(p.x7,{position:"top-right"}),(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[r.jsx(o.W,{}),r.jsx(n.FE,{children:(0,r.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,r.jsxs)("div",{className:"mb-8 flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Returns & Refunds"}),r.jsx("p",{className:"mt-2 text-gray-600",children:"Process product returns"})]}),(0,r.jsxs)(u.default,{href:"/returns/new",className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700",children:[r.jsx(d.Z,{className:"h-5 w-5"}),r.jsx("span",{children:"New Return"})]})]}),x?r.jsx("div",{className:"flex items-center justify-center py-12",children:r.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):t?.length>0?r.jsx("div",{className:"space-y-4",children:t?.map?.(t=>r.jsxs("div",{className:"rounded-xl bg-white p-6 shadow-sm",children:[r.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[r.jsxs("div",{className:"flex items-center space-x-3",children:[r.jsx("div",{className:"rounded-full bg-orange-100 p-2",children:r.jsx(c.Z,{className:"h-5 w-5 text-orange-600"})}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-900",children:t?.returnNumber}),r.jsx("p",{className:"text-sm text-gray-500",children:new Date(t?.createdAt)?.toLocaleString?.()})]})]}),r.jsx("div",{className:"text-right",children:r.jsxs("p",{className:"text-2xl font-bold text-red-600",children:["-",e(t?.totalRefund??0)]})})]}),r.jsxs("div",{className:"mb-4 rounded-lg bg-gray-50 p-3",children:[r.jsxs("p",{className:"text-sm text-gray-600",children:[r.jsx("span",{className:"font-medium",children:"Original Sale:"})," ",t?.sale?.receiptNumber]}),t?.sale?.customer&&r.jsxs("p",{className:"text-sm text-gray-600",children:[r.jsx("span",{className:"font-medium",children:"Customer:"})," ",t.sale.customer.name]}),r.jsxs("p",{className:"mt-2 text-sm text-gray-600",children:[r.jsx("span",{className:"font-medium",children:"Reason:"})," ",t?.reason]})]}),r.jsxs("div",{className:"border-t border-gray-200 pt-4",children:[r.jsx("p",{className:"mb-2 text-sm font-medium text-gray-700",children:"Returned Items:"}),r.jsx("div",{className:"space-y-1",children:t?.items?.map?.(t=>r.jsxs("div",{className:"flex justify-between text-sm text-gray-600",children:[r.jsxs("span",{children:[t?.product?.name," x",t?.quantity]}),r.jsx("span",{children:e(t?.refundAmount??0)})]},t?.id))??null})]})]},t?.id))??null}):(0,r.jsxs)("div",{className:"rounded-xl bg-white p-12 text-center shadow-sm",children:[r.jsx(c.Z,{className:"mx-auto h-16 w-16 text-gray-400"}),r.jsx("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No returns yet"}),r.jsx("p",{className:"mt-2 text-gray-500",children:"Returns will appear here"})]})]})})]})]})})}},12458:(e,t,s)=>{"use strict";s.d(t,{p:()=>o});var r=s(62901),a=s(84700),i=s(84374);function o({children:e,allowedRoles:t,fallbackUrl:s="/dashboard"}){let{data:o,status:n}=(0,a.useSession)()||{};if((0,i.useRouter)(),"loading"===n)return r.jsx("div",{className:"flex min-h-screen items-center justify-center",children:r.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===n){let s=o?.user?.role;if(t?.includes?.(s))return r.jsx(r.Fragment,{children:e})}return null}s(24383)},97718:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(71945).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},89500:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(88895).createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/returns/page.tsx#default`)},39350:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,Am:()=>q});var r,a=s(24383);let i={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},u={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},m=(e,t,s,r,a)=>{let i=p(e),o=u[i]||(u[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!u[o]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);u[o]=c(a?{["@keyframes "+o]:t}:t,s?"":"."+o)}let m=s&&u.g?u.g:null;return s&&(u.g=u[o]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(u[o],t,r,m),o},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function f(e){let t=this||{},s=e.call?e(t.p):e;return m(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}f.bind({g:1});let h,g,y,b=f.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;s.p=Object.assign({theme:g&&g()},n),s.o=/ *go\d+/.test(l),n.className=f.apply(s,r)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),h(d,n)}return t?t(a):a}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),_=(()=>{let e;return()=>e})(),k="default",E=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return E(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},P=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},C=(e,t=k)=>{$[t]=E($[t]||A,e),P.forEach(([e,s])=>{e===t&&s($[t])})},D=e=>Object.keys($).forEach(t=>C(e,t)),O=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),I=(e=k)=>t=>{C(t,e)},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=(e={},t=k)=>{let[s,r]=(0,a.useState)($[t]||A),i=(0,a.useRef)($[t]);(0,a.useEffect)(()=>(i.current!==$[t]&&r($[t]),P.push([t,r]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:o}},S=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),z=e=>(t,s)=>{let r=S(t,e,s);return I(r.toasterId||O(r.id))({type:2,toast:r}),r.id},q=(e,t)=>z("blank")(e,t);q.error=z("error"),q.success=z("success"),q.loading=z("loading"),q.custom=z("custom"),q.dismiss=(e,t)=>{let s={type:3,toastId:e};t?I(t)(s):D(s)},q.dismissAll=e=>q.dismiss(void 0,e),q.remove=(e,t)=>{let s={type:4,toastId:e};t?I(t)(s):D(s)},q.removeAll=e=>q.remove(void 0,e),q.promise=(e,t,s)=>{let r=q.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?q.success(a,{id:r,...s,...null==s?void 0:s.success}):q.dismiss(r),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?q.error(a,{id:r,...s,...null==s?void 0:s.error}):q.dismiss(r)}),e};var F=1e3,L=(e,t="default")=>{let{toasts:s,pausedAt:r}=M(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=F)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&q.dismiss(s.id);return}return setTimeout(()=>q.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(I(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},T=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=b`
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
    animation: ${Z} 0.15s ease-out forwards;
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=b`
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
  animation: ${U} 1s linear infinite;
`,W=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=b`
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
}`,Y=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
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
`,J=v("div")`
  position: absolute;
`,K=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(V,null,t):t:"blank"===s?null:a.createElement(K,null,a.createElement(B,{...r}),"loading"!==s&&a.createElement(J,null,"error"===s?a.createElement(G,{...r}):a.createElement(Y,{...r})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=v("div")`
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
`,ea=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=a.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(ee,{toast:e}),n=a.createElement(ea,{...e.ariaProps},w(e.message,e));return a.createElement(er,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof r?r({icon:o,message:n}):a.createElement(a.Fragment,null,o,n))});r=a.createElement,c.p=void 0,h=r,g=void 0,y=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:r,children:i})=>{let o=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:o,className:t,style:s},i)},el=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},ed=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=L(s,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o=s.position||t,n=el(o,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return a.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?w(s.message,s):i?i(s):a.createElement(eo,{toast:s,position:o}))}))}}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[4372,879,9121,4542,4566],()=>s(22488));module.exports=r})();