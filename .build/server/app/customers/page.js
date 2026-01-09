(()=>{var e={};e.id=374,e.ids=[374],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},73431:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),s(32122),s(32694),s(71363);var r=s(36576),a=s(72007),o=s(21818),i=s.n(o),n=s(88897),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d=["",{children:["customers",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,32122)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/customers/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,32694)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,71363,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/supermarket_pos_system/nextjs_space/app/customers/page.tsx"],u="/customers/page",m={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/customers/page",pathname:"/customers",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},82993:(e,t,s)=>{Promise.resolve().then(s.bind(s,14134))},14134:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>m});var r=s(62901),a=s(73735),o=s(12458),i=s(92861),n=s(23415),l=s(24383),d=s(97718),c=s(77185),u=s(39350);function m(){let[e,t]=(0,l.useState)([]),[s,m]=(0,l.useState)(!0),[p,f]=(0,l.useState)(!1),[x,h]=(0,l.useState)({name:"",phone:"",email:""}),[g,y]=(0,l.useState)(!1),b=async()=>{try{m(!0);let e=await fetch("/api/customers"),s=await e.json();t(s)}catch(e){console.error("Error fetching customers:",e),u.Am.error("Failed to fetch customers")}finally{m(!1)}},v=async e=>{e.preventDefault(),y(!0);try{let e=await fetch("/api/customers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x)});if(e.ok)u.Am.success("Customer added successfully"),f(!1),h({name:"",phone:"",email:""}),b();else{let t=await e.json();u.Am.error(t?.error||"Failed to add customer")}}catch(e){console.error("Error adding customer:",e),u.Am.error("Error adding customer")}finally{y(!1)}};return r.jsx(a.I,{children:(0,r.jsxs)(o.p,{allowedRoles:["ADMIN"],children:[r.jsx(u.x7,{position:"top-right"}),(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[r.jsx(i.W,{}),r.jsx(n.FE,{children:(0,r.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,r.jsxs)("div",{className:"mb-8 flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Customers"}),r.jsx("p",{className:"mt-2 text-gray-600",children:"Manage customer information"})]}),(0,r.jsxs)("button",{onClick:()=>f(!0),className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700",children:[r.jsx(d.Z,{className:"h-5 w-5"}),r.jsx("span",{children:"Add Customer"})]})]}),s?r.jsx("div",{className:"flex items-center justify-center py-12",children:r.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):e?.length>0?r.jsx("div",{className:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:e?.map?.(e=>r.jsxs("div",{className:"rounded-xl bg-white p-6 shadow-sm",children:[r.jsxs("div",{className:"mb-4 flex items-center space-x-3",children:[r.jsx("div",{className:"rounded-full bg-emerald-100 p-3",children:r.jsx(c.Z,{className:"h-6 w-6 text-emerald-600"})}),r.jsxs("div",{children:[r.jsx("h3",{className:"font-semibold text-gray-900",children:e?.name}),r.jsxs("p",{className:"text-sm text-gray-500",children:[e?._count?.sales??0," purchases"]})]})]}),e?.phone&&r.jsxs("p",{className:"text-sm text-gray-600",children:["Phone: ",e.phone]}),e?.email&&r.jsxs("p",{className:"text-sm text-gray-600",children:["Email: ",e.email]})]},e?.id))??null}):(0,r.jsxs)("div",{className:"rounded-xl bg-white p-12 text-center shadow-sm",children:[r.jsx(c.Z,{className:"mx-auto h-16 w-16 text-gray-400"}),r.jsx("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No customers yet"}),r.jsx("p",{className:"mt-2 text-gray-500",children:"Get started by adding your first customer"})]})]})})]}),p&&r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4",children:(0,r.jsxs)("div",{className:"w-full max-w-md rounded-xl bg-white p-6 shadow-xl",children:[r.jsx("h2",{className:"mb-4 text-xl font-bold text-gray-900",children:"Add New Customer"}),(0,r.jsxs)("form",{onSubmit:v,className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Name *"}),r.jsx("input",{type:"text",required:!0,value:x.name,onChange:e=>h({...x,name:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Phone"}),r.jsx("input",{type:"tel",value:x.phone,onChange:e=>h({...x,phone:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Email"}),r.jsx("input",{type:"email",value:x.email,onChange:e=>h({...x,email:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,r.jsxs)("div",{className:"flex space-x-3 pt-4",children:[r.jsx("button",{type:"button",onClick:()=>f(!1),className:"flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300",children:"Cancel"}),r.jsx("button",{type:"submit",disabled:g,className:"flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50",children:g?"Adding...":"Add Customer"})]})]})]})})]})})}},12458:(e,t,s)=>{"use strict";s.d(t,{p:()=>i});var r=s(62901),a=s(84700),o=s(84374);function i({children:e,allowedRoles:t,fallbackUrl:s="/dashboard"}){let{data:i,status:n}=(0,a.useSession)()||{};if((0,o.useRouter)(),"loading"===n)return r.jsx("div",{className:"flex min-h-screen items-center justify-center",children:r.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===n){let s=i?.user?.role;if(t?.includes?.(s))return r.jsx(r.Fragment,{children:e})}return null}s(24383)},97718:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(71945).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},77185:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(71945).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},32122:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(88895).createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/customers/page.tsx#default`)},39350:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,Am:()=>F});var r,a=s(24383);let o={data:""},i=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",r="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?s=o+" "+i+";":r+="f"==o[1]?c(i,o):o+"{"+c(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=c(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(o,i):o+":"+i+";")}return s+(t&&a?t+"{"+a+"}":a)+r},u={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},p=(e,t,s,r,a)=>{let o=m(e),i=u[o]||(u[o]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(o));if(!u[i]){let t=o!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(d," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);u[i]=c(a?{["@keyframes "+i]:t}:t,s?"":"."+i)}let p=s&&u.g?u.g:null;return s&&(u.g=u[i]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(u[i],t,r,p),i},f=(e,t,s)=>e.reduce((e,r,a)=>{let o=t[a];if(o&&o.call){let e=o(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"");function x(e){let t=this||{},s=e.call?e(t.p):e;return p(s.unshift?s.raw?f(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,i(t.target),t.g,t.o,t.k)}x.bind({g:1});let h,g,y,b=x.bind({k:1});function v(e,t){let s=this||{};return function(){let r=arguments;function a(o,i){let n=Object.assign({},o),l=n.className||a.className;s.p=Object.assign({theme:g&&g()},n),s.o=/ *go\d+/.test(l),n.className=x.apply(s,r)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),h(d,n)}return t?t(a):a}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),E="default",_=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return _(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},C=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},$=(e,t=E)=>{A[t]=_(A[t]||P,e),C.forEach(([e,s])=>{e===t&&s(A[t])})},O=e=>Object.keys(A).forEach(t=>$(e,t)),D=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),S=(e=E)=>t=>{$(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=(e={},t=E)=>{let[s,r]=(0,a.useState)(A[t]||P),o=(0,a.useRef)(A[t]);(0,a.useEffect)(()=>(o.current!==A[t]&&r(A[t]),C.push([t,r]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:i}},z=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||N()}),q=e=>(t,s)=>{let r=z(t,e,s);return S(r.toasterId||D(r.id))({type:2,toast:r}),r.id},F=(e,t)=>q("blank")(e,t);F.error=q("error"),F.success=q("success"),F.loading=q("loading"),F.custom=q("custom"),F.dismiss=(e,t)=>{let s={type:3,toastId:e};t?S(t)(s):O(s)},F.dismissAll=e=>F.dismiss(void 0,e),F.remove=(e,t)=>{let s={type:4,toastId:e};t?S(t)(s):O(s)},F.removeAll=e=>F.remove(void 0,e),F.promise=(e,t,s)=>{let r=F.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?F.success(a,{id:r,...s,...null==s?void 0:s.success}):F.dismiss(r),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?F.error(a,{id:r,...s,...null==s?void 0:s.error}):F.dismiss(r)}),e};var T=1e3,Z=(e,t="default")=>{let{toasts:s,pausedAt:r}=M(e,t),o=(0,a.useRef)(new Map).current,i=(0,a.useCallback)((e,t=T)=>{if(o.has(e))return;let s=setTimeout(()=>{o.delete(e),n({type:4,toastId:e})},t);o.set(e,s)},[]);(0,a.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&F.dismiss(s.id);return}return setTimeout(()=>F.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,a.useCallback)(S(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:o}=t||{},i=s.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,a.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},H=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=b`
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

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
    animation: ${R} 0.15s ease-out forwards;
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
`,J=b`
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

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?a.createElement(V,null,t):t:"blank"===s?null:a.createElement(K,null,a.createElement(B,{...r}),"loading"!==s&&a.createElement(Y,null,"error"===s?a.createElement(G,{...r}):a.createElement(X,{...r})))},et=e=>`
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
`,eo=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=a.memo(({toast:e,position:t,style:s,children:r})=>{let o=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=a.createElement(ee,{toast:e}),n=a.createElement(ea,{...e.ariaProps},w(e.message,e));return a.createElement(er,{className:e.className,style:{...o,...s,...e.style}},"function"==typeof r?r({icon:i,message:n}):a.createElement(a.Fragment,null,i,n))});r=a.createElement,c.p=void 0,h=r,g=void 0,y=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:r,children:o})=>{let i=a.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return a.createElement("div",{ref:i,className:t,style:s},o)},el=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},ed=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:o,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=Z(s,i);return a.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let i=s.position||t,n=el(i,c.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return a.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?w(s.message,s):o?o(s):a.createElement(ei,{toast:s,position:i}))}))}}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[4372,879,9121,4542,4566],()=>s(73431));module.exports=r})();