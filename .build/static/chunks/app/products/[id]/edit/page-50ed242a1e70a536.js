(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[282],{2426:function(e,t,r){Promise.resolve().then(r.bind(r,86266))},86266:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return g}});var a=r(15444),s=r(46271),o=r(11117),i=r(3763),n=r(89300),l=r(79047),d=r(1946),c=r(98155),u=r(4805),m=r(41084),p=r(64611),f=r(92170);function g(){let e=(0,l.useRouter)(),t=(0,l.useParams)(),r=t?.id,[g,h]=(0,n.useState)([]),[y,x]=(0,n.useState)(!1),[b,v]=(0,n.useState)(!1),[j,w]=(0,n.useState)(!0),[N,k]=(0,n.useState)({barcode:"",name:"",description:"",price:"",stock:"",reorderLevel:"10",categoryId:"",imageUrl:"",cloud_storage_path:"",isPublic:!0});(0,n.useEffect)(()=>{E(),C()},[r]);let E=async()=>{try{let e=await fetch("/api/categories"),t=await e.json();h(t)}catch(e){console.error("Error fetching categories:",e)}},C=async()=>{try{let t=await fetch(`/api/products/${r}`);if(t.ok){let e=await t.json();k({barcode:e?.barcode||"",name:e?.name||"",description:e?.description||"",price:e?.price?.toString?.()||"",stock:e?.stock?.toString?.()||"",reorderLevel:e?.reorderLevel?.toString?.()||"10",categoryId:e?.categoryId||"",imageUrl:e?.imageUrl||"",cloud_storage_path:e?.cloud_storage_path||"",isPublic:e?.isPublic??!0})}else p.Am.error("Product not found"),e.push("/products")}catch(e){console.error("Error fetching product:",e),p.Am.error("Error loading product")}finally{w(!1)}},P=async e=>{let t=e.target.files?.[0];if(t)try{v(!0);let e=await fetch("/api/products/upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileName:t.name,contentType:t.type,isPublic:!0})});if(!e.ok)throw Error("Failed to get upload URL");let{uploadUrl:r,cloud_storage_path:a}=await e.json(),s=new URL(r).searchParams.get("X-Amz-SignedHeaders"),o=s?.includes?.("content-disposition"),i={"Content-Type":t.type};if(o&&(i["Content-Disposition"]="attachment"),!(await fetch(r,{method:"PUT",headers:i,body:t})).ok)throw Error("Failed to upload file");let n=f.env.NEXT_PUBLIC_AWS_BUCKET_NAME||"your-bucket",l=f.env.NEXT_PUBLIC_AWS_REGION||"us-east-1",d=`https://${n}.s3.${l}.amazonaws.com/${a}`;k(e=>({...e,imageUrl:d,cloud_storage_path:a})),p.Am.success("Image uploaded successfully")}catch(e){console.error("Error uploading image:",e),p.Am.error("Failed to upload image")}finally{v(!1)}},I=async t=>{t.preventDefault(),x(!0);try{let t=await fetch(`/api/products/${r}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)});if(t.ok)p.Am.success("Product updated successfully"),e.push("/products");else{let e=await t.json();p.Am.error(e?.error||"Failed to update product")}}catch(e){console.error("Error updating product:",e),p.Am.error("Error updating product")}finally{x(!1)}};return j?(0,a.jsx)(s.I,{children:(0,a.jsx)(o.p,{allowedRoles:["ADMIN"],children:(0,a.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,a.jsx)(d.Z,{className:"h-8 w-8 animate-spin text-emerald-600"})})})}):(0,a.jsx)(s.I,{children:(0,a.jsxs)(o.p,{allowedRoles:["ADMIN"],children:[(0,a.jsx)(p.x7,{position:"top-right"}),(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,a.jsx)(i.W,{}),(0,a.jsxs)("main",{className:"mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)(m.default,{href:"/products",className:"flex items-center space-x-2 text-gray-600 hover:text-gray-900",children:[(0,a.jsx)(c.Z,{className:"h-5 w-5"}),(0,a.jsx)("span",{children:"Back to Products"})]})}),(0,a.jsxs)("div",{className:"rounded-xl bg-white p-8 shadow-sm",children:[(0,a.jsx)("h1",{className:"mb-6 text-2xl font-bold text-gray-900",children:"Edit Product"}),(0,a.jsxs)("form",{onSubmit:I,className:"space-y-6",children:[(0,a.jsxs)("div",{className:"grid gap-6 sm:grid-cols-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"barcode",className:"block text-sm font-medium text-gray-700",children:"Barcode *"}),(0,a.jsx)("input",{id:"barcode",type:"text",required:!0,value:N.barcode,onChange:e=>k({...N,barcode:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700",children:"Product Name *"}),(0,a.jsx)("input",{id:"name",type:"text",required:!0,value:N.name,onChange:e=>k({...N,name:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700",children:"Description"}),(0,a.jsx)("textarea",{id:"description",rows:3,value:N.description,onChange:e=>k({...N,description:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,a.jsxs)("div",{className:"grid gap-6 sm:grid-cols-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700",children:"Category *"}),(0,a.jsxs)("select",{id:"category",required:!0,value:N.categoryId,onChange:e=>k({...N,categoryId:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",children:[(0,a.jsx)("option",{value:"",children:"Select Category"}),g?.map?.(e=>a.jsx("option",{value:e?.id,children:e?.name},e?.id))??null]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"price",className:"block text-sm font-medium text-gray-700",children:"Price *"}),(0,a.jsx)("input",{id:"price",type:"number",step:"0.01",min:"0",required:!0,value:N.price,onChange:e=>k({...N,price:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,a.jsxs)("div",{className:"grid gap-6 sm:grid-cols-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"stock",className:"block text-sm font-medium text-gray-700",children:"Stock Quantity *"}),(0,a.jsx)("input",{id:"stock",type:"number",min:"0",required:!0,value:N.stock,onChange:e=>k({...N,stock:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"reorderLevel",className:"block text-sm font-medium text-gray-700",children:"Reorder Level"}),(0,a.jsx)("input",{id:"reorderLevel",type:"number",min:"0",value:N.reorderLevel,onChange:e=>k({...N,reorderLevel:e.target.value}),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"image",className:"block text-sm font-medium text-gray-700",children:"Product Image"}),(0,a.jsxs)("div",{className:"mt-1 flex items-center space-x-4",children:[(0,a.jsxs)("label",{className:"flex cursor-pointer items-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 hover:border-emerald-500",children:[(0,a.jsx)(u.Z,{className:"h-5 w-5 text-gray-400"}),(0,a.jsx)("span",{className:"text-sm text-gray-600",children:b?"Uploading...":"Change Image"}),(0,a.jsx)("input",{id:"image",type:"file",accept:"image/*",onChange:P,disabled:b,className:"hidden"})]}),N.imageUrl&&(0,a.jsx)("span",{className:"text-sm text-green-600",children:"Image uploaded"})]})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3 border-t border-gray-200 pt-6",children:[(0,a.jsx)(m.default,{href:"/products",className:"rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300",children:"Cancel"}),(0,a.jsx)("button",{type:"submit",disabled:y||b,className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50",children:y?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.Z,{className:"h-5 w-5 animate-spin"}),(0,a.jsx)("span",{children:"Updating..."})]}):(0,a.jsx)("span",{children:"Update Product"})})]})]})]})]})]})]})})}},11117:function(e,t,r){"use strict";r.d(t,{p:function(){return n}});var a=r(15444),s=r(75762),o=r(79047),i=r(89300);function n({children:e,allowedRoles:t,fallbackUrl:r="/dashboard"}){let{data:n,status:l}=(0,s.useSession)()||{},d=(0,o.useRouter)();if((0,i.useEffect)(()=>{if("authenticated"===l&&n?.user){let e=n.user?.role;t?.includes?.(e)||d.replace(r)}},[l,n,t,r,d]),"loading"===l)return(0,a.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,a.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===l){let r=n?.user?.role;if(t?.includes?.(r))return(0,a.jsx)(a.Fragment,{children:e})}return null}},98155:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(42154).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},1946:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(42154).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},4805:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(42154).Z)("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]])},64611:function(e,t,r){"use strict";let a,s;r.d(t,{x7:function(){return em},Am:function(){return M}});var o,i=r(89300);let n={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n},d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?m(i,o):o+"{"+m(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=m(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,a,s)=>{var o;let i=f(e),n=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(s?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},h=(e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let x,b,v,j=y.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=y.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),x(d,n)}return t?t(s):s}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},P="default",I=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return I(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},A=[],_={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},S=(e,t=P)=>{$[t]=I($[t]||_,e),A.forEach(([e,r])=>{e===t&&r($[t])})},L=e=>Object.keys($).forEach(t=>S(e,t)),O=e=>Object.keys($).find(t=>$[t].toasts.some(t=>t.id===e)),D=(e=P)=>t=>{S(t,e)},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},U=(e={},t=P)=>{let[r,a]=(0,i.useState)($[t]||_),s=(0,i.useRef)($[t]);(0,i.useEffect)(()=>(s.current!==$[t]&&a($[t]),A.push([t,a]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||F[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}},T=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),z=e=>(t,r)=>{let a=T(t,e,r);return D(a.toasterId||O(a.id))({type:2,toast:a}),a.id},M=(e,t)=>z("blank")(e,t);M.error=z("error"),M.success=z("success"),M.loading=z("loading"),M.custom=z("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?D(t)(r):L(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?D(t)(r):L(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let a=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?M.success(s,{id:a,...r,...null==r?void 0:r.success}):M.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?M.error(s,{id:a,...r,...null==r?void 0:r.error}):M.dismiss(a)}),e};var R=1e3,Z=(e,t="default")=>{let{toasts:r,pausedAt:a}=U(e,t),s=(0,i.useRef)(new Map).current,o=(0,i.useCallback)((e,t=R)=>{if(s.has(e))return;let r=setTimeout(()=>{s.delete(e),n({type:4,toastId:e})},t);s.set(e,r)},[]);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&M.dismiss(r.id);return}return setTimeout(()=>M.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,i.useCallback)(D(t),[t]),l=(0,i.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,i.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,i.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=t||{},i=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},H=j`
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

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,X=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${X} 1s linear infinite;
`,G=j`
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

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,Y=w("div")`
  position: absolute;
`,V=w("div")`
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
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(et,null,t):t:"blank"===r?null:i.createElement(V,null,i.createElement(J,{...a}),"loading"!==r&&i.createElement(Y,null,"error"===r?i.createElement(W,{...a}):i.createElement(Q,{...a})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,eo=w("div")`
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
`,ei=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(r),es(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(er,{toast:e}),n=i.createElement(ei,{...e.ariaProps},k(e.message,e));return i.createElement(eo,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,m.p=void 0,x=o,b=void 0,v=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=Z(r,o);return i.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o=r.position||t,n=ec(o,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?k(r.message,r):s?s(r):i.createElement(el,{toast:r,position:o}))}))}}},function(e){e.O(0,[676,258,535,608,386,156,744],function(){return e(e.s=2426)}),_N_E=e.O()}]);