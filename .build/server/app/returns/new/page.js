(()=>{var e={};e.id=3703,e.ids=[3703],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25586:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),r(43468),r(32694),r(71363);var s=r(36576),a=r(72007),i=r(21818),n=r.n(i),o=r(88897),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["returns",{children:["new",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,43468)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/returns/new/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,32694)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,71363,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/supermarket_pos_system/nextjs_space/app/returns/new/page.tsx"],u="/returns/new/page",m={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/returns/new/page",pathname:"/returns/new",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},13830:(e,t,r)=>{Promise.resolve().then(r.bind(r,82664))},82664:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f});var s=r(62901),a=r(73735),i=r(12458),n=r(92861),o=r(24383),l=r(84374),d=r(75909),c=r(91046),u=r(10333),m=r(62392),p=r(39350),x=r(74190);function f(){let e=(0,l.useRouter)(),{formatPrice:t}=(0,x.U8)(),[r,f]=(0,o.useState)(!1),[h,g]=(0,o.useState)(""),[y,b]=(0,o.useState)([]),[v,j]=(0,o.useState)(null),[w,N]=(0,o.useState)([]),[k,E]=(0,o.useState)(""),_=async e=>{try{let t=await fetch(`/api/sales/${e?.id}`),r=await t.json();j(r),N(r?.items?.map?.(e=>({productId:e?.product?.id,productName:e?.product?.name,maxQuantity:e?.quantity,quantity:e?.quantity,unitPrice:e?.unitPrice,refundAmount:e?.subtotal}))??[])}catch(e){console.error("Error fetching sale details:",e),p.Am.error("Failed to load sale details")}},P=(e,t)=>{N(w?.map?.((r,s)=>{if(s===e){let e=Math.max(0,Math.min(t,r?.maxQuantity)),s=e*r?.unitPrice;return{...r,quantity:e,refundAmount:s}}return r})??[])},A=()=>w?.reduce?.((e,t)=>e+t?.refundAmount,0)??0,C=async t=>{if(t.preventDefault(),!v||!k||w?.length===0){p.Am.error("Please fill all required fields");return}let r=w?.filter?.(e=>e?.quantity>0)??[];if(r?.length===0){p.Am.error("Please select at least one item to return");return}f(!0);try{let t={saleId:v?.id,reason:k,items:r,totalRefund:A()},s=await fetch("/api/returns",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(s.ok)p.Am.success("Return processed successfully"),e.push("/returns");else{let e=await s.json();p.Am.error(e?.error||"Failed to process return")}}catch(e){console.error("Error processing return:",e),p.Am.error("Error processing return")}finally{f(!1)}};return s.jsx(a.I,{children:(0,s.jsxs)(i.p,{allowedRoles:["ADMIN"],children:[s.jsx(p.x7,{position:"top-right"}),(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[s.jsx(n.W,{}),(0,s.jsxs)("main",{className:"mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8",children:[s.jsx("div",{className:"mb-6",children:(0,s.jsxs)(m.default,{href:"/returns",className:"flex items-center space-x-2 text-gray-600 hover:text-gray-900",children:[s.jsx(d.Z,{className:"h-5 w-5"}),s.jsx("span",{children:"Back to Returns"})]})}),(0,s.jsxs)("div",{className:"rounded-xl bg-white p-8 shadow-sm",children:[s.jsx("h1",{className:"mb-6 text-2xl font-bold text-gray-900",children:"Process Return"}),s.jsx("form",{onSubmit:C,className:"space-y-6",children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"rounded-lg bg-gray-50 p-4",children:[s.jsx("h3",{className:"font-semibold text-gray-900",children:"Selected Sale"}),(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Receipt: ",v?.receiptNumber]}),(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Date: ",new Date(v?.createdAt)?.toLocaleString?.()]}),v?.customer&&(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Customer: ",v.customer.name]}),s.jsx("button",{type:"button",onClick:()=>{j(null),N([])},className:"mt-2 text-sm text-emerald-600 hover:text-emerald-700",children:"Change Sale"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Items to Return"}),s.jsx("div",{className:"mt-2 space-y-3",children:w?.map?.((e,r)=>s.jsx("div",{className:"rounded-lg border border-gray-200 p-4",children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex-1",children:[s.jsx("p",{className:"font-medium text-gray-900",children:e?.productName}),s.jsxs("p",{className:"text-sm text-gray-500",children:["Max: ",e?.maxQuantity," @ ",t(e?.unitPrice??0)]})]}),s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsx("input",{type:"number",min:"0",max:e?.maxQuantity,value:e?.quantity,onChange:e=>P(r,parseInt(e.target.value)||0),className:"w-20 rounded-lg border border-gray-300 px-3 py-1 text-center focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"}),s.jsx("span",{className:"w-24 text-right font-semibold text-gray-900",children:t(e?.refundAmount??0)})]})]})},r))??null})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"reason",className:"block text-sm font-medium text-gray-700",children:"Reason for Return *"}),s.jsx("textarea",{id:"reason",rows:3,required:!0,value:k,onChange:e=>E(e.target.value),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",placeholder:"Enter reason for return..."})]}),s.jsx("div",{className:"rounded-lg bg-emerald-50 p-4",children:(0,s.jsxs)("div",{className:"flex justify-between text-lg font-bold",children:[s.jsx("span",{className:"text-emerald-700",children:"Total Refund:"}),s.jsx("span",{className:"text-emerald-700",children:t(A()??0)})]})}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3 border-t border-gray-200 pt-6",children:[s.jsx(m.default,{href:"/returns",className:"rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300",children:"Cancel"}),s.jsx("button",{type:"submit",disabled:r||0===A(),className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50",children:r?(0,s.jsxs)(s.Fragment,{children:[s.jsx(u.Z,{className:"h-5 w-5 animate-spin"}),s.jsx("span",{children:"Processing..."})]}):s.jsx("span",{children:"Process Return"})})]})]}):(0,s.jsxs)("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Search Receipt Number"}),(0,s.jsxs)("div",{className:"relative mt-1",children:[s.jsx(c.Z,{className:"absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"}),s.jsx("input",{type:"text",value:h,onChange:e=>g(e.target.value),placeholder:"Enter receipt number...",className:"block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),y?.length>0&&s.jsx("div",{className:"mt-3 space-y-2",children:y?.map?.(e=>s.jsx("button",{type:"button",onClick:()=>_(e),className:"w-full rounded-lg border border-gray-200 p-4 text-left hover:border-emerald-500 hover:bg-emerald-50",children:s.jsxs("div",{className:"flex justify-between",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-medium text-gray-900",children:e?.receiptNumber}),s.jsx("p",{className:"text-sm text-gray-500",children:new Date(e?.createdAt)?.toLocaleDateString?.()})]}),s.jsxs("div",{className:"text-right",children:[s.jsx("p",{className:"font-semibold text-gray-900",children:t(e?.total??0)}),e?.customer&&s.jsx("p",{className:"text-sm text-gray-500",children:e.customer.name})]})]})},e?.id))??null})]})})]})]})]})]})})}},12458:(e,t,r)=>{"use strict";r.d(t,{p:()=>n});var s=r(62901),a=r(84700),i=r(84374);function n({children:e,allowedRoles:t,fallbackUrl:r="/dashboard"}){let{data:n,status:o}=(0,a.useSession)()||{};if((0,i.useRouter)(),"loading"===o)return s.jsx("div",{className:"flex min-h-screen items-center justify-center",children:s.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===o){let r=n?.user?.role;if(t?.includes?.(r))return s.jsx(s.Fragment,{children:e})}return null}r(24383)},75909:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(71945).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},10333:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(71945).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},91046:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(71945).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},43468:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(88895).createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/returns/new/page.tsx#default`)},39350:(e,t,r)=>{"use strict";r.d(t,{x7:()=>ec,Am:()=>z});var s,a=r(24383);let i={data:""},n=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},u={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},p=(e,t,r,s,a)=>{let i=m(e),n=u[i]||(u[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!u[n]){let t=i!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(d," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);u[n]=c(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let p=r&&u.g?u.g:null;return r&&(u.g=u[n]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(u[n],t,s,p),n},x=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return p(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,n(t.target),t.g,t.o,t.k)}f.bind({g:1});let h,g,y,b=f.bind({k:1});function v(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;r.p=Object.assign({theme:g&&g()},o),r.o=/ *go\d+/.test(l),o.className=f.apply(r,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),y&&d[0]&&y(o),h(d,o)}return t?t(a):a}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),E="default",_=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return _(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},P=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},S=(e,t=E)=>{C[t]=_(C[t]||A,e),P.forEach(([e,r])=>{e===t&&r(C[t])})},D=e=>Object.keys(C).forEach(t=>S(e,t)),$=e=>Object.keys(C).find(t=>C[t].toasts.some(t=>t.id===e)),R=(e=E)=>t=>{S(t,e)},q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=E)=>{let[r,s]=(0,a.useState)(C[t]||A),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),P.push([t,s]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||q[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:n}},O=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),M=e=>(t,r)=>{let s=O(t,e,r);return R(s.toasterId||$(s.id))({type:2,toast:s}),s.id},z=(e,t)=>M("blank")(e,t);z.error=M("error"),z.success=M("success"),z.loading=M("loading"),z.custom=M("custom"),z.dismiss=(e,t)=>{let r={type:3,toastId:e};t?R(t)(r):D(r)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let r={type:4,toastId:e};t?R(t)(r):D(r)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,r)=>{let s=z.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?z.success(a,{id:s,...r,...null==r?void 0:r.success}):z.dismiss(s),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?z.error(a,{id:s,...r,...null==r?void 0:r.error}):z.dismiss(s)}),e};var F=1e3,L=(e,t="default")=>{let{toasts:r,pausedAt:s}=I(e,t),i=(0,a.useRef)(new Map).current,n=(0,a.useCallback)((e,t=F)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&z.dismiss(r.id);return}return setTimeout(()=>z.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,a.useCallback)(R(t),[t]),l=(0,a.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,a.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,a.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},T=b`
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
`,Q=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,B=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=b`
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
}`,W=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,X=v("div")`
  position: absolute;
`,Y=v("div")`
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
}`,V=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(V,null,t):t:"blank"===r?null:a.createElement(Y,null,a.createElement(U,{...s}),"loading"!==r&&a.createElement(X,null,"error"===r?a.createElement(G,{...s}):a.createElement(W,{...s})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=v("div")`
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
`,ei=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(r),er(r)];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=a.createElement(ee,{toast:e}),o=a.createElement(ea,{...e.ariaProps},w(e.message,e));return a.createElement(es,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:n,message:o}):a.createElement(a.Fragment,null,n,o))});s=a.createElement,c.p=void 0,h=s,g=void 0,y=void 0;var eo=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let n=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:n,className:t,style:r},i)},el=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},ed=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:n,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=L(r,n);return a.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let n=r.position||t,o=el(n,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return a.createElement(eo,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:o},"custom"===r.type?w(r.message,r):i?i(r):a.createElement(en,{toast:r,position:n}))}))}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4372,879,9121,4542,4566],()=>r(25586));module.exports=s})();