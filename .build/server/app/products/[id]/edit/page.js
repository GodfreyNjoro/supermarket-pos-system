(()=>{var e={};e.id=9282,e.ids=[9282],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},88908:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d}),r(47589),r(32694),r(71363);var s=r(36576),a=r(72007),o=r(21818),i=r.n(o),n=r(88897),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["products",{children:["[id]",{children:["edit",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,47589)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/products/[id]/edit/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,32694)),"/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,71363,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/supermarket_pos_system/nextjs_space/app/products/[id]/edit/page.tsx"],u="/products/[id]/edit/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/products/[id]/edit/page",pathname:"/products/[id]/edit",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},81723:(e,t,r)=>{Promise.resolve().then(r.bind(r,63655))},63655:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>g});var s=r(62901),a=r(73735),o=r(12458),i=r(92861),n=r(24383),l=r(84374),d=r(10333),c=r(75909),u=r(91464),p=r(62392),m=r(39350);function g(){let e=(0,l.useRouter)(),t=(0,l.useParams)(),r=t?.id,[g,f]=(0,n.useState)([]),[h,x]=(0,n.useState)(!1),[y,b]=(0,n.useState)(!1),[v,j]=(0,n.useState)(!0),[w,N]=(0,n.useState)({barcode:"",name:"",description:"",price:"",stock:"",reorderLevel:"10",categoryId:"",imageUrl:"",cloud_storage_path:"",isPublic:!0}),k=async e=>{let t=e.target.files?.[0];if(t)try{b(!0);let e=await fetch("/api/products/upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileName:t.name,contentType:t.type,isPublic:!0})});if(!e.ok)throw Error("Failed to get upload URL");let{uploadUrl:r,cloud_storage_path:s}=await e.json(),a=new URL(r).searchParams.get("X-Amz-SignedHeaders"),o=a?.includes?.("content-disposition"),i={"Content-Type":t.type};if(o&&(i["Content-Disposition"]="attachment"),!(await fetch(r,{method:"PUT",headers:i,body:t})).ok)throw Error("Failed to upload file");let n=process.env.NEXT_PUBLIC_AWS_BUCKET_NAME||"your-bucket",l=process.env.NEXT_PUBLIC_AWS_REGION||"us-east-1",d=`https://${n}.s3.${l}.amazonaws.com/${s}`;N(e=>({...e,imageUrl:d,cloud_storage_path:s})),m.Am.success("Image uploaded successfully")}catch(e){console.error("Error uploading image:",e),m.Am.error("Failed to upload image")}finally{b(!1)}},_=async t=>{t.preventDefault(),x(!0);try{let t=await fetch(`/api/products/${r}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(w)});if(t.ok)m.Am.success("Product updated successfully"),e.push("/products");else{let e=await t.json();m.Am.error(e?.error||"Failed to update product")}}catch(e){console.error("Error updating product:",e),m.Am.error("Error updating product")}finally{x(!1)}};return v?s.jsx(a.I,{children:s.jsx(o.p,{allowedRoles:["ADMIN"],children:s.jsx("div",{className:"flex min-h-screen items-center justify-center",children:s.jsx(d.Z,{className:"h-8 w-8 animate-spin text-emerald-600"})})})}):s.jsx(a.I,{children:(0,s.jsxs)(o.p,{allowedRoles:["ADMIN"],children:[s.jsx(m.x7,{position:"top-right"}),(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[s.jsx(i.W,{}),(0,s.jsxs)("main",{className:"mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8",children:[s.jsx("div",{className:"mb-6",children:(0,s.jsxs)(p.default,{href:"/products",className:"flex items-center space-x-2 text-gray-600 hover:text-gray-900",children:[s.jsx(c.Z,{className:"h-5 w-5"}),s.jsx("span",{children:"Back to Products"})]})}),(0,s.jsxs)("div",{className:"rounded-xl bg-white p-8 shadow-sm",children:[s.jsx("h1",{className:"mb-6 text-2xl font-bold text-gray-900",children:"Edit Product"}),(0,s.jsxs)("form",{onSubmit:_,className:"space-y-6",children:[(0,s.jsxs)("div",{className:"grid gap-6 sm:grid-cols-2",children:[(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"barcode",className:"block text-sm font-medium text-gray-700",children:"Barcode *"}),s.jsx("input",{id:"barcode",type:"text",required:!0,value:w.barcode,onChange:e=>N({...w,barcode:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700",children:"Product Name *"}),s.jsx("input",{id:"name",type:"text",required:!0,value:w.name,onChange:e=>N({...w,name:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700",children:"Description"}),s.jsx("textarea",{id:"description",rows:3,value:w.description,onChange:e=>N({...w,description:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,s.jsxs)("div",{className:"grid gap-6 sm:grid-cols-2",children:[(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700",children:"Category *"}),(0,s.jsxs)("select",{id:"category",required:!0,value:w.categoryId,onChange:e=>N({...w,categoryId:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",children:[s.jsx("option",{value:"",children:"Select Category"}),g?.map?.(e=>s.jsx("option",{value:e?.id,children:e?.name},e?.id))??null]})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"price",className:"block text-sm font-medium text-gray-700",children:"Price *"}),s.jsx("input",{id:"price",type:"number",step:"0.01",min:"0",required:!0,value:w.price,onChange:e=>N({...w,price:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,s.jsxs)("div",{className:"grid gap-6 sm:grid-cols-2",children:[(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"stock",className:"block text-sm font-medium text-gray-700",children:"Stock Quantity *"}),s.jsx("input",{id:"stock",type:"number",min:"0",required:!0,value:w.stock,onChange:e=>N({...w,stock:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"reorderLevel",className:"block text-sm font-medium text-gray-700",children:"Reorder Level"}),s.jsx("input",{id:"reorderLevel",type:"number",min:"0",value:w.reorderLevel,onChange:e=>N({...w,reorderLevel:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"image",className:"block text-sm font-medium text-gray-700",children:"Product Image"}),(0,s.jsxs)("div",{className:"mt-1 flex items-center space-x-4",children:[(0,s.jsxs)("label",{className:"flex cursor-pointer items-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 hover:border-emerald-500",children:[s.jsx(u.Z,{className:"h-5 w-5 text-gray-400"}),s.jsx("span",{className:"text-sm text-gray-600",children:y?"Uploading...":"Change Image"}),s.jsx("input",{id:"image",type:"file",accept:"image/*",onChange:k,disabled:y,className:"hidden"})]}),w.imageUrl&&s.jsx("span",{className:"text-sm text-green-600",children:"Image uploaded"})]})]}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3 border-t border-gray-200 pt-6",children:[s.jsx(p.default,{href:"/products",className:"rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300",children:"Cancel"}),s.jsx("button",{type:"submit",disabled:h||y,className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50",children:h?(0,s.jsxs)(s.Fragment,{children:[s.jsx(d.Z,{className:"h-5 w-5 animate-spin"}),s.jsx("span",{children:"Updating..."})]}):s.jsx("span",{children:"Update Product"})})]})]})]})]})]})]})})}},12458:(e,t,r)=>{"use strict";r.d(t,{p:()=>i});var s=r(62901),a=r(84700),o=r(84374);function i({children:e,allowedRoles:t,fallbackUrl:r="/dashboard"}){let{data:i,status:n}=(0,a.useSession)()||{};if((0,o.useRouter)(),"loading"===n)return s.jsx("div",{className:"flex min-h-screen items-center justify-center",children:s.jsx("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===n){let r=i?.user?.role;if(t?.includes?.(r))return s.jsx(s.Fragment,{children:e})}return null}r(24383)},75909:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(71945).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},10333:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(71945).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},91464:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(71945).Z)("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]])},47589:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(88895).createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/products/[id]/edit/page.tsx#default`)},39350:(e,t,r)=>{"use strict";r.d(t,{x7:()=>ec,Am:()=>U});var s,a=r(24383);let o={data:""},i=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let r="",s="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":s+="f"==o[1]?c(i,o):o+"{"+c(i,"k"==o[1]?"":t)+"}":"object"==typeof i?s+=c(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(o,i):o+":"+i+";")}return r+(t&&a?t+"{"+a+"}":a)+s},u={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},m=(e,t,r,s,a)=>{let o=p(e),i=u[o]||(u[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!u[i]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(d," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);u[i]=c(a?{["@keyframes "+i]:t}:t,r?"":"."+i)}let m=r&&u.g?u.g:null;return r&&(u.g=u[i]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(u[i],t,s,m),i},g=(e,t,r)=>e.reduce((e,s,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==o?"":o)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}f.bind({g:1});let h,x,y,b=f.bind({k:1});function v(e,t){let r=this||{};return function(){let s=arguments;function a(o,i){let n=Object.assign({},o),l=n.className||a.className;r.p=Object.assign({theme:x&&x()},n),r.o=/ *go\d+/.test(l),n.className=f.apply(r,s)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),y&&d[0]&&y(n),h(d,n)}return t?t(a):a}}var j=e=>"function"==typeof e,w=(e,t)=>j(e)?e(t):e,N=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),_="default",E=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return E(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},P=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},A={},I=(e,t=_)=>{A[t]=E(A[t]||C,e),P.forEach(([e,r])=>{e===t&&r(A[t])})},$=e=>Object.keys(A).forEach(t=>I(e,t)),S=e=>Object.keys(A).find(t=>A[t].toasts.some(t=>t.id===e)),D=(e=_)=>t=>{I(t,e)},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=_)=>{let[r,s]=(0,a.useState)(A[t]||C),o=(0,a.useRef)(A[t]);(0,a.useEffect)(()=>(o.current!==A[t]&&s(A[t]),P.push([t,s]),()=>{let e=P.findIndex(([e])=>e===t);e>-1&&P.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||F[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:i}},L=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||N()}),T=e=>(t,r)=>{let s=L(t,e,r);return D(s.toasterId||S(s.id))({type:2,toast:s}),s.id},U=(e,t)=>T("blank")(e,t);U.error=T("error"),U.success=T("success"),U.loading=T("loading"),U.custom=T("custom"),U.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):$(r)},U.dismissAll=e=>U.dismiss(void 0,e),U.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):$(r)},U.removeAll=e=>U.remove(void 0,e),U.promise=(e,t,r)=>{let s=U.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?U.success(a,{id:s,...r,...null==r?void 0:r.success}):U.dismiss(s),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?U.error(a,{id:s,...r,...null==r?void 0:r.error}):U.dismiss(s)}),e};var z=1e3,M=(e,t="default")=>{let{toasts:r,pausedAt:s}=O(e,t),o=(0,a.useRef)(new Map).current,i=(0,a.useCallback)((e,t=z)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),n({type:4,toastId:e})},t);o.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&U.dismiss(r.id);return}return setTimeout(()=>U.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let n=(0,a.useCallback)(D(t),[t]),l=(0,a.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,a.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,a.useCallback)(()=>{s&&n({type:6,time:Date.now()})},[s,n]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:o}=t||{},i=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},q=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
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
    animation: ${Z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,X=b`
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
}`,J=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=v("div")`
  position: absolute;
`,Q=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Y=b`
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
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(V,null,t):t:"blank"===r?null:a.createElement(Q,null,a.createElement(G,{...s}),"loading"!==r&&a.createElement(K,null,"error"===r?a.createElement(H,{...s}):a.createElement(J,{...s})))},et=e=>`
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
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(r),er(r)];return{animation:t?`${b(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=a.memo(({toast:e,position:t,style:r,children:s})=>{let o=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=a.createElement(ee,{toast:e}),n=a.createElement(ea,{...e.ariaProps},w(e.message,e));return a.createElement(es,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof s?s({icon:i,message:n}):a.createElement(a.Fragment,null,i,n))});s=a.createElement,c.p=void 0,h=s,x=void 0,y=void 0;var en=({id:e,className:t,style:r,onHeightUpdate:s,children:o})=>{let i=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:i,className:t,style:r},o)},el=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},ed=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:o,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=M(r,i);return a.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let i=r.position||t,n=el(i,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return a.createElement(en,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?w(r.message,r):o?o(r):a.createElement(ei,{toast:r,position:i}))}))}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4372,879,9121,4542,4566],()=>r(88908));module.exports=s})();