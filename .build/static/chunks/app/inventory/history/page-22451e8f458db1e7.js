(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[352],{48463:function(){},26503:function(){},81753:function(e,t,r){Promise.resolve().then(r.bind(r,35385))},35385:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var a=r(15444),s=r(46271),i=r(11117),n=r(3763),o=r(89300),l=r(81410),d=r(26584),c=r(25076),u=r(98699),m=r(64611),p=r(82534),x=r(3857),f=r(89634);function h(){let{selectedStore:e}=(0,p.o)(),{formatPrice:t}=(0,x.U8)(),[r,h]=(0,o.useState)([]),[y,g]=(0,o.useState)(!0),[b,v]=(0,o.useState)(""),[w,j]=(0,o.useState)(""),[N,k]=(0,o.useState)(""),[E,A]=(0,o.useState)("");(0,o.useEffect)(()=>{e&&C()},[e,w,N,E]);let C=async()=>{try{g(!0);let t=`/api/inventory/history?storeId=${e?.id}`;w&&(t+=`&type=${w}`),N&&(t+=`&dateFrom=${N}`),E&&(t+=`&dateTo=${E}`),b&&(t+=`&search=${b}`);let r=await fetch(t),a=await r.json();h(a)}catch(e){console.error("Error fetching history:",e),m.Am.error("Failed to fetch inventory history")}finally{g(!1)}},D=()=>{C()},S=e=>{switch(e){case"RESTOCK":return"bg-green-100 text-green-700";case"SALE":return"bg-blue-100 text-blue-700";case"DAMAGE":return"bg-red-100 text-red-700";case"LOSS":return"bg-orange-100 text-orange-700";case"ADJUSTMENT":return"bg-purple-100 text-purple-700";case"RETURN":return"bg-cyan-100 text-cyan-700";default:return"bg-gray-100 text-gray-700"}};return(0,a.jsx)(s.I,{children:(0,a.jsxs)(i.p,{allowedRoles:["ADMIN","MANAGER","INVENTORY_CLERK"],children:[(0,a.jsx)(m.x7,{position:"top-right"}),(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,a.jsx)(n.W,{}),(0,a.jsx)("main",{className:"lg:ml-64 pt-16",children:(0,a.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("h1",{className:"text-3xl font-bold text-gray-900 flex items-center gap-3",children:[(0,a.jsx)(l.Z,{className:"h-8 w-8 text-emerald-600"}),"Inventory History"]}),(0,a.jsx)("p",{className:"mt-2 text-gray-600",children:"Track all inventory changes with date, time, and user"})]}),(0,a.jsxs)("button",{onClick:()=>{let e=r.map(e=>({Reference:e.referenceNumber,Date:new Date(e.createdAt).toLocaleDateString(),Time:new Date(e.createdAt).toLocaleTimeString(),Product:e.product.name,Barcode:e.product.barcode,Type:e.type,Before:e.quantityBefore,Change:e.quantityChange>0?`+${e.quantityChange}`:e.quantityChange,After:e.quantityAfter,User:e.user.name,Reason:e.reason||"-"})),t=f.P6.json_to_sheet(e),a=f.P6.book_new();f.P6.book_append_sheet(a,t,"Inventory History"),f.NC(a,`inventory_history_${new Date().toISOString().split("T")[0]}.xlsx`),m.Am.success("History exported")},disabled:0===r.length,className:"flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:bg-gray-300",children:[(0,a.jsx)(d.Z,{className:"h-5 w-5"}),"Export Excel"]})]}),(0,a.jsx)("div",{className:"mb-6 rounded-xl bg-white p-6 shadow-sm",children:(0,a.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-5",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Search"}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(c.Z,{className:"absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"}),(0,a.jsx)("input",{type:"text",value:b,onChange:e=>v(e.target.value),onKeyDown:e=>"Enter"===e.key&&D(),placeholder:"Product or barcode...",className:"w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Type"}),(0,a.jsxs)("select",{value:w,onChange:e=>j(e.target.value),className:"w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",children:[(0,a.jsx)("option",{value:"",children:"All Types"}),(0,a.jsx)("option",{value:"RESTOCK",children:"Restock"}),(0,a.jsx)("option",{value:"SALE",children:"Sale"}),(0,a.jsx)("option",{value:"DAMAGE",children:"Damage"}),(0,a.jsx)("option",{value:"LOSS",children:"Loss"}),(0,a.jsx)("option",{value:"ADJUSTMENT",children:"Adjustment"}),(0,a.jsx)("option",{value:"RETURN",children:"Return"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"From Date"}),(0,a.jsx)("input",{type:"date",value:N,onChange:e=>k(e.target.value),className:"w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"To Date"}),(0,a.jsx)("input",{type:"date",value:E,onChange:e=>A(e.target.value),className:"w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,a.jsx)("div",{className:"flex items-end",children:(0,a.jsxs)("button",{onClick:D,className:"w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700",children:[(0,a.jsx)(u.Z,{className:"inline h-4 w-4 mr-2"}),"Apply"]})})]})}),(0,a.jsx)("div",{className:"rounded-xl bg-white shadow-sm overflow-hidden",children:y?(0,a.jsx)("div",{className:"flex items-center justify-center py-12",children:(0,a.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):r.length>0?(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Date & Time"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Reference"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Product"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Type"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Change"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Stock"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"User"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Reason"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:r.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:[(0,a.jsx)("div",{className:"font-medium text-gray-900",children:new Date(e.createdAt).toLocaleDateString()}),(0,a.jsx)("div",{className:"text-gray-500",children:new Date(e.createdAt).toLocaleTimeString()})]}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:e.referenceNumber}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.product.name}),(0,a.jsx)("div",{className:"text-xs text-gray-500",children:e.product.barcode})]}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${S(e.type)}`,children:e.type})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,a.jsxs)("span",{className:e.quantityChange>=0?"text-green-600 font-medium":"text-red-600 font-medium",children:[e.quantityChange>=0?"+":"",e.quantityChange]})}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:[e.quantityBefore," → ",e.quantityAfter]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.user.name}),(0,a.jsx)("div",{className:"text-xs text-gray-500",children:e.user.email})]}),(0,a.jsx)("td",{className:"px-6 py-4 text-sm text-gray-500 max-w-xs truncate",children:e.reason||"-"})]},e.id))})]})}):(0,a.jsxs)("div",{className:"py-12 text-center",children:[(0,a.jsx)(l.Z,{className:"mx-auto h-12 w-12 text-gray-400"}),(0,a.jsx)("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No history found"}),(0,a.jsx)("p",{className:"mt-2 text-gray-500",children:"Inventory changes will appear here"})]})})]})})]})]})})}},11117:function(e,t,r){"use strict";r.d(t,{p:function(){return o}});var a=r(15444),s=r(75762),i=r(79047),n=r(89300);function o({children:e,allowedRoles:t,fallbackUrl:r="/dashboard"}){let{data:o,status:l}=(0,s.useSession)()||{},d=(0,i.useRouter)();if((0,n.useEffect)(()=>{if("authenticated"===l&&o?.user){let e=o.user?.role;t?.includes?.(e)||d.replace(r)}},[l,o,t,r,d]),"loading"===l)return(0,a.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,a.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===l){let r=o?.user?.role;if(t?.includes?.(r))return(0,a.jsx)(a.Fragment,{children:e})}return null}},26584:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(42154).Z)("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]])},98699:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(42154).Z)("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]])},25076:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(42154).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},64611:function(e,t,r){"use strict";let a,s;r.d(t,{x7:function(){return em},Am:function(){return Z}});var i,n=r(89300);let o={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e},f=(e,t,r,a,s)=>{var i;let n=x(e),o=p[n]||(p[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[o]=m(s?{["@keyframes "+o]:t}:t,r?"":"."+o)}let l=r&&p.g?p.g:null;return r&&(p.g=p[o]),i=p[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),o},h=(e,t,r)=>e.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return f(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let g,b,v,w=y.bind({k:1});function j(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:b&&b()},o),r.o=/ *go\d+/.test(l),o.className=y.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),v&&d[0]&&v(o),g(d,o)}return t?t(s):s}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(a=0,()=>(++a).toString()),A=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},C="default",D=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return D(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},O=(e,t=C)=>{$[t]=D($[t]||T,e),S.forEach(([e,r])=>{e===t&&r($[t])})},_=e=>Object.keys($).forEach(t=>O(e,t)),R=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),I=(e=C)=>t=>{O(t,e)},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=(e={},t=C)=>{let[r,a]=(0,n.useState)($[t]||T),s=(0,n.useRef)($[t]);(0,n.useEffect)(()=>(s.current!==$[t]&&a($[t]),S.push([t,a]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||L[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:i}},q=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),M=e=>(t,r)=>{let a=q(t,e,r);return I(a.toasterId||R(a.id))({type:2,toast:a}),a.id},Z=(e,t)=>M("blank")(e,t);Z.error=M("error"),Z.success=M("success"),Z.loading=M("loading"),Z.custom=M("custom"),Z.dismiss=(e,t)=>{let r={type:3,toastId:e};t?I(t)(r):_(r)},Z.dismissAll=e=>Z.dismiss(void 0,e),Z.remove=(e,t)=>{let r={type:4,toastId:e};t?I(t)(r):_(r)},Z.removeAll=e=>Z.remove(void 0,e),Z.promise=(e,t,r)=>{let a=Z.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?Z.success(s,{id:a,...r,...null==r?void 0:r.success}):Z.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?Z.error(s,{id:a,...r,...null==r?void 0:r.error}):Z.dismiss(a)}),e};var z=1e3,F=(e,t="default")=>{let{toasts:r,pausedAt:a}=P(e,t),s=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=z)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),o({type:4,toastId:e})},t);s.set(e,r)},[]);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&Z.dismiss(r.id);return}return setTimeout(()=>Z.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let o=(0,n.useCallback)(I(t),[t]),l=(0,n.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,n.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,n.useCallback)(()=>{a&&o({type:6,time:Date.now()})},[a,o]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},n=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},H=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=w`
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
}`,K=j("div")`
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
    animation: ${U} 0.15s ease-out forwards;
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
`,G=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,Y=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,V=w`
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
}`,W=j("div")`
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
    animation: ${V} 0.2s ease-out forwards;
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
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(et,null,t):t:"blank"===r?null:n.createElement(X,null,n.createElement(J,{...a}),"loading"!==r&&n.createElement(Q,null,"error"===r?n.createElement(K,{...a}):n.createElement(W,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
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
`,en=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=A()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),es(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=n.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(er,{toast:e}),o=n.createElement(en,{...e.ariaProps},k(e.message,e));return n.createElement(ei,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,m.p=void 0,g=i,b=void 0,v=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=F(r,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let i=r.position||t,o=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:o},"custom"===r.type?k(r.message,r):s?s(r):n.createElement(el,{toast:r,position:i}))}))}}},function(e){e.O(0,[710,676,258,535,608,386,156,744],function(){return e(e.s=81753)}),_N_E=e.O()}]);