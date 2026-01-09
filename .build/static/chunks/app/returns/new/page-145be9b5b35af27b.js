(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[703],{77842:function(e,t,r){Promise.resolve().then(r.bind(r,39657))},39657:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return x}});var s=r(15444),a=r(46271),i=r(11117),n=r(3763),o=r(89300),l=r(79047),c=r(98155),d=r(25076),u=r(1946),m=r(41084),p=r(64611),f=r(3857);function x(){let e=(0,l.useRouter)(),{formatPrice:t}=(0,f.U8)(),[r,x]=(0,o.useState)(!1),[h,g]=(0,o.useState)(""),[y,b]=(0,o.useState)([]),[v,j]=(0,o.useState)(null),[N,w]=(0,o.useState)([]),[k,E]=(0,o.useState)("");(0,o.useEffect)(()=>{h&&C()},[h]);let C=async()=>{try{let e=await fetch("/api/sales?limit=10"),t=await e.json(),r=t?.filter?.(e=>e?.receiptNumber?.toLowerCase?.()?.includes?.(h?.toLowerCase?.()))??[];b(r)}catch(e){console.error("Error fetching sales:",e)}},A=async e=>{try{let t=await fetch(`/api/sales/${e?.id}`),r=await t.json();j(r),w(r?.items?.map?.(e=>({productId:e?.product?.id,productName:e?.product?.name,maxQuantity:e?.quantity,quantity:e?.quantity,unitPrice:e?.unitPrice,refundAmount:e?.subtotal}))??[])}catch(e){console.error("Error fetching sale details:",e),p.Am.error("Failed to load sale details")}},S=(e,t)=>{w(N?.map?.((r,s)=>{if(s===e){let e=Math.max(0,Math.min(t,r?.maxQuantity)),s=e*r?.unitPrice;return{...r,quantity:e,refundAmount:s}}return r})??[])},D=()=>N?.reduce?.((e,t)=>e+t?.refundAmount,0)??0,$=async t=>{if(t.preventDefault(),!v||!k||N?.length===0){p.Am.error("Please fill all required fields");return}let r=N?.filter?.(e=>e?.quantity>0)??[];if(r?.length===0){p.Am.error("Please select at least one item to return");return}x(!0);try{let t={saleId:v?.id,reason:k,items:r,totalRefund:D()},s=await fetch("/api/returns",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(s.ok)p.Am.success("Return processed successfully"),e.push("/returns");else{let e=await s.json();p.Am.error(e?.error||"Failed to process return")}}catch(e){console.error("Error processing return:",e),p.Am.error("Error processing return")}finally{x(!1)}};return(0,s.jsx)(a.I,{children:(0,s.jsxs)(i.p,{allowedRoles:["ADMIN"],children:[(0,s.jsx)(p.x7,{position:"top-right"}),(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,s.jsx)(n.W,{}),(0,s.jsxs)("main",{className:"mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)(m.default,{href:"/returns",className:"flex items-center space-x-2 text-gray-600 hover:text-gray-900",children:[(0,s.jsx)(c.Z,{className:"h-5 w-5"}),(0,s.jsx)("span",{children:"Back to Returns"})]})}),(0,s.jsxs)("div",{className:"rounded-xl bg-white p-8 shadow-sm",children:[(0,s.jsx)("h1",{className:"mb-6 text-2xl font-bold text-gray-900",children:"Process Return"}),(0,s.jsx)("form",{onSubmit:$,className:"space-y-6",children:v?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"rounded-lg bg-gray-50 p-4",children:[(0,s.jsx)("h3",{className:"font-semibold text-gray-900",children:"Selected Sale"}),(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Receipt: ",v?.receiptNumber]}),(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Date: ",new Date(v?.createdAt)?.toLocaleString?.()]}),v?.customer&&(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Customer: ",v.customer.name]}),(0,s.jsx)("button",{type:"button",onClick:()=>{j(null),w([])},className:"mt-2 text-sm text-emerald-600 hover:text-emerald-700",children:"Change Sale"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Items to Return"}),(0,s.jsx)("div",{className:"mt-2 space-y-3",children:N?.map?.((e,r)=>s.jsx("div",{className:"rounded-lg border border-gray-200 p-4",children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex-1",children:[s.jsx("p",{className:"font-medium text-gray-900",children:e?.productName}),s.jsxs("p",{className:"text-sm text-gray-500",children:["Max: ",e?.maxQuantity," @ ",t(e?.unitPrice??0)]})]}),s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsx("input",{type:"number",min:"0",max:e?.maxQuantity,value:e?.quantity,onChange:e=>S(r,parseInt(e.target.value)||0),className:"w-20 rounded-lg border border-gray-300 px-3 py-1 text-center focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"}),s.jsx("span",{className:"w-24 text-right font-semibold text-gray-900",children:t(e?.refundAmount??0)})]})]})},r))??null})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"reason",className:"block text-sm font-medium text-gray-700",children:"Reason for Return *"}),(0,s.jsx)("textarea",{id:"reason",rows:3,required:!0,value:k,onChange:e=>E(e.target.value),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",placeholder:"Enter reason for return..."})]}),(0,s.jsx)("div",{className:"rounded-lg bg-emerald-50 p-4",children:(0,s.jsxs)("div",{className:"flex justify-between text-lg font-bold",children:[(0,s.jsx)("span",{className:"text-emerald-700",children:"Total Refund:"}),(0,s.jsx)("span",{className:"text-emerald-700",children:t(D()??0)})]})}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3 border-t border-gray-200 pt-6",children:[(0,s.jsx)(m.default,{href:"/returns",className:"rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300",children:"Cancel"}),(0,s.jsx)("button",{type:"submit",disabled:r||0===D(),className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50",children:r?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(u.Z,{className:"h-5 w-5 animate-spin"}),(0,s.jsx)("span",{children:"Processing..."})]}):(0,s.jsx)("span",{children:"Process Return"})})]})]}):(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Search Receipt Number"}),(0,s.jsxs)("div",{className:"relative mt-1",children:[(0,s.jsx)(d.Z,{className:"absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"}),(0,s.jsx)("input",{type:"text",value:h,onChange:e=>g(e.target.value),placeholder:"Enter receipt number...",className:"block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),y?.length>0&&(0,s.jsx)("div",{className:"mt-3 space-y-2",children:y?.map?.(e=>s.jsx("button",{type:"button",onClick:()=>A(e),className:"w-full rounded-lg border border-gray-200 p-4 text-left hover:border-emerald-500 hover:bg-emerald-50",children:s.jsxs("div",{className:"flex justify-between",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-medium text-gray-900",children:e?.receiptNumber}),s.jsx("p",{className:"text-sm text-gray-500",children:new Date(e?.createdAt)?.toLocaleDateString?.()})]}),s.jsxs("div",{className:"text-right",children:[s.jsx("p",{className:"font-semibold text-gray-900",children:t(e?.total??0)}),e?.customer&&s.jsx("p",{className:"text-sm text-gray-500",children:e.customer.name})]})]})},e?.id))??null})]})})]})]})]})]})})}},11117:function(e,t,r){"use strict";r.d(t,{p:function(){return o}});var s=r(15444),a=r(75762),i=r(79047),n=r(89300);function o({children:e,allowedRoles:t,fallbackUrl:r="/dashboard"}){let{data:o,status:l}=(0,a.useSession)()||{},c=(0,i.useRouter)();if((0,n.useEffect)(()=>{if("authenticated"===l&&o?.user){let e=o.user?.role;t?.includes?.(e)||c.replace(r)}},[l,o,t,r,c]),"loading"===l)return(0,s.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,s.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===l){let r=o?.user?.role;if(t?.includes?.(r))return(0,s.jsx)(s.Fragment,{children:e})}return null}},98155:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});let s=(0,r(42154).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},1946:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});let s=(0,r(42154).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},25076:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});let s=(0,r(42154).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},64611:function(e,t,r){"use strict";let s,a;r.d(t,{x7:function(){return em},Am:function(){return q}});var i,n=r(89300);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",s="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":s+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=m.p?m.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+s},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},x=(e,t,r,s,a)=>{var i;let n=f(e),o=p[n]||(p[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,r,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(u," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[o]=m(a?{["@keyframes "+o]:t}:t,r?"":"."+o)}let l=r&&p.g?p.g:null;return r&&(p.g=p[o]),i=p[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),o},h=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,b,v,j=g.bind({k:1});function N(e,t){let r=this||{};return function(){let s=arguments;function a(i,n){let o=Object.assign({},i),l=o.className||a.className;r.p=Object.assign({theme:b&&b()},o),r.o=/ *go\d+/.test(l),o.className=g.apply(r,s)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),v&&c[0]&&v(o),y(c,o)}return t?t(a):a}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,E=(s=0,()=>(++s).toString()),C=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},A="default",S=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return S(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},D=[],$={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},O=(e,t=A)=>{P[t]=S(P[t]||$,e),D.forEach(([e,r])=>{e===t&&r(P[t])})},I=e=>Object.keys(P).forEach(t=>O(e,t)),R=e=>Object.keys(P).find(t=>P[t].toasts.some(t=>t.id===e)),_=(e=A)=>t=>{O(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={},t=A)=>{let[r,s]=(0,n.useState)(P[t]||$),a=(0,n.useRef)(P[t]);(0,n.useEffect)(()=>(a.current!==P[t]&&s(P[t]),D.push([t,s]),()=>{let e=D.findIndex(([e])=>e===t);e>-1&&D.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:i}},M=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),F=e=>(t,r)=>{let s=M(t,e,r);return _(s.toasterId||R(s.id))({type:2,toast:s}),s.id},q=(e,t)=>F("blank")(e,t);q.error=F("error"),q.success=F("success"),q.loading=F("loading"),q.custom=F("custom"),q.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):I(r)},q.dismissAll=e=>q.dismiss(void 0,e),q.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):I(r)},q.removeAll=e=>q.remove(void 0,e),q.promise=(e,t,r)=>{let s=q.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?k(t.success,e):void 0;return a?q.success(a,{id:s,...r,...null==r?void 0:r.success}):q.dismiss(s),e}).catch(e=>{let a=t.error?k(t.error,e):void 0;a?q.error(a,{id:s,...r,...null==r?void 0:r.error}):q.dismiss(s)}),e};var Z=1e3,T=(e,t="default")=>{let{toasts:r,pausedAt:s}=L(e,t),a=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=Z)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),o({type:4,toastId:e})},t);a.set(e,r)},[]);(0,n.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&q.dismiss(r.id);return}return setTimeout(()=>q.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let o=(0,n.useCallback)(_(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),d=(0,n.useCallback)(()=>{s&&o({type:6,time:Date.now()})},[s,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Q=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=N("div")`
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
    animation: ${Q} 0.15s ease-out forwards;
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
`,J=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,W=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,Y=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=j`
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
}`,K=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
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
`,V=N("div")`
  position: absolute;
`,X=N("div")`
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
}`,et=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===r?null:n.createElement(X,null,n.createElement(W,{...s}),"loading"!==r&&n.createElement(V,null,"error"===r?n.createElement(B,{...s}):n.createElement(K,{...s})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=N("div")`
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
`,en=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(r),ea(r)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:r,children:s})=>{let a=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(er,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var ec=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let i=n.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return n.createElement("div",{ref:i,className:t,style:r},a)},ed=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},eu=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:c,handlers:d}=T(r,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let i=r.position||t,o=ed(i,d.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(ec,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?eu:"",style:o},"custom"===r.type?k(r.message,r):a?a(r):n.createElement(el,{toast:r,position:i}))}))}}},function(e){e.O(0,[676,258,535,608,386,156,744],function(){return e(e.s=77842)}),_N_E=e.O()}]);