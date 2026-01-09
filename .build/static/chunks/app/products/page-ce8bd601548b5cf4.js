(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[286],{48882:function(e,t,s){Promise.resolve().then(s.bind(s,76281))},76281:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return N}});var r=s(15444),a=s(46271),l=s(11117),n=s(3763),i=s(95777),c=s(89300),d=s(7433),o=s(39429),m=s(16629),u=s(70362),x=s(85011),h=s(20357),f=s(40563),p=s(41084),g=s(48001),j=s(64611),b=s(82534),y=s(3857),w=s(14757);function N(){let{selectedStore:e}=(0,b.o)(),{formatPrice:t,currency:s}=(0,y.U8)(),N=(e,t,r)=>{(0,w.Ol)(e,t,r,s.symbol)},[v,k]=(0,c.useState)([]),[E,S]=(0,c.useState)([]),[$,A]=(0,c.useState)(!0),[C,P]=(0,c.useState)(""),[Z,L]=(0,c.useState)(""),[_,I]=(0,c.useState)(!1);(0,c.useEffect)(()=>{e&&(z(),D())},[e]),(0,c.useEffect)(()=>{e&&z()},[Z,_]);let z=async()=>{try{if(!e)return;A(!0);let t=`/api/products?storeId=${e.id}&`;C&&(t+=`search=${C}&`),Z&&(t+=`categoryId=${Z}&`),_&&(t+="lowStock=true&");let s=await fetch(t),r=await s.json();k(r)}catch(e){console.error("Error fetching products:",e),j.Am.error("Failed to fetch products")}finally{A(!1)}},D=async()=>{try{let e=await fetch("/api/categories"),t=await e.json();S(t)}catch(e){console.error("Error fetching categories:",e)}},F=async(e,t)=>{if(confirm(`Are you sure you want to delete "${t}"?`))try{(await fetch(`/api/products/${e}`,{method:"DELETE"})).ok?(j.Am.success("Product deleted successfully"),z()):j.Am.error("Failed to delete product")}catch(e){console.error("Error deleting product:",e),j.Am.error("Error deleting product")}};return(0,r.jsx)(a.I,{children:(0,r.jsxs)(l.p,{allowedRoles:["ADMIN"],children:[(0,r.jsx)(j.x7,{position:"top-right"}),(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,r.jsx)(n.W,{}),(0,r.jsx)(i.FE,{children:(0,r.jsxs)("div",{className:"mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",children:[(0,r.jsxs)("div",{className:"mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Products"}),(0,r.jsx)("p",{className:"mt-2 text-gray-600",children:"Manage your inventory"})]}),(0,r.jsxs)("div",{className:"flex gap-3",children:[(0,r.jsxs)(p.default,{href:"/products/import",className:"flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700",children:[(0,r.jsx)(d.Z,{className:"h-5 w-5"}),(0,r.jsx)("span",{children:"Import Excel"})]}),(0,r.jsxs)(p.default,{href:"/products/new",className:"flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700",children:[(0,r.jsx)(o.Z,{className:"h-5 w-5"}),(0,r.jsx)("span",{children:"Add Product"})]})]})]}),(0,r.jsxs)("div",{className:"mb-6 rounded-xl bg-white p-6 shadow-sm",children:[(0,r.jsxs)("div",{className:"grid gap-4 sm:grid-cols-3",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Search"}),(0,r.jsx)("input",{type:"text",value:C,onChange:e=>P(e.target.value),onKeyDown:e=>"Enter"===e.key&&z(),placeholder:"Search by name or barcode...",className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Category"}),(0,r.jsxs)("select",{value:Z,onChange:e=>L(e.target.value),className:"mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",children:[(0,r.jsx)("option",{value:"",children:"All Categories"}),E?.map?.(e=>r.jsx("option",{value:e?.id,children:e?.name},e?.id))??null]})]}),(0,r.jsx)("div",{className:"flex items-end",children:(0,r.jsxs)("label",{className:"flex items-center space-x-2",children:[(0,r.jsx)("input",{type:"checkbox",checked:_,onChange:e=>I(e.target.checked),className:"h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"}),(0,r.jsx)("span",{className:"text-sm font-medium text-gray-700",children:"Low Stock Only"})]})})]}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsx)("button",{onClick:z,className:"rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700",children:"Apply Filters"})})]}),$?(0,r.jsx)("div",{className:"flex items-center justify-center py-12",children:(0,r.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})}):v?.length>0?(0,r.jsx)("div",{className:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:v?.map?.(e=>r.jsxs("div",{className:"rounded-xl bg-white p-6 shadow-sm",children:[r.jsx("div",{className:"relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100",children:e?.imageUrl?r.jsx(g.default,{src:e.imageUrl,alt:e?.name??"Product",fill:!0,className:"object-cover"}):r.jsx("div",{className:"flex h-full items-center justify-center",children:r.jsx(m.Z,{className:"h-16 w-16 text-gray-400"})})}),r.jsxs("div",{className:"mb-3",children:[r.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:e?.name}),r.jsx("p",{className:"text-sm text-gray-500",children:e?.category?.name}),r.jsxs("p",{className:"mt-1 text-xs text-gray-400",children:["Barcode: ",e?.barcode]})]}),r.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[r.jsx("div",{children:r.jsx("p",{className:"text-2xl font-bold text-emerald-600",children:t(e?.price??0)})}),r.jsxs("div",{className:"text-right",children:[r.jsxs("p",{className:`text-sm font-medium ${(e?.stock??0)<=(e?.reorderLevel??0)?"text-red-600":"text-gray-600"}`,children:["Stock: ",e?.stock??0]}),r.jsxs("p",{className:"text-xs text-gray-400",children:["Min: ",e?.reorderLevel??0]})]})]}),(e?.stock??0)<=(e?.reorderLevel??0)&&r.jsxs("div",{className:"mb-4 flex items-center space-x-2 rounded-lg bg-red-50 p-2 text-xs text-red-700",children:[r.jsx(u.Z,{className:"h-4 w-4"}),r.jsx("span",{children:"Low Stock"})]}),r.jsxs("div",{className:"flex space-x-2",children:[r.jsx("button",{onClick:()=>N(e?.barcode,e?.name,e?.price),className:"flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700",title:"Print Barcode",children:r.jsx(x.Z,{className:"h-4 w-4"})}),r.jsxs(p.default,{href:`/products/${e?.id}/edit`,className:"flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700",children:[r.jsx(h.Z,{className:"h-4 w-4"}),r.jsx("span",{children:"Edit"})]}),r.jsx("button",{onClick:()=>F(e?.id,e?.name),className:"flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700",children:r.jsx(f.Z,{className:"h-4 w-4"})})]})]},e?.id))??null}):(0,r.jsxs)("div",{className:"rounded-xl bg-white p-12 text-center shadow-sm",children:[(0,r.jsx)(m.Z,{className:"mx-auto h-16 w-16 text-gray-400"}),(0,r.jsx)("h3",{className:"mt-4 text-lg font-medium text-gray-900",children:"No products found"}),(0,r.jsx)("p",{className:"mt-2 text-gray-500",children:"Get started by adding your first product"}),(0,r.jsxs)(p.default,{href:"/products/new",className:"mt-4 inline-flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700",children:[(0,r.jsx)(o.Z,{className:"h-5 w-5"}),(0,r.jsx)("span",{children:"Add Product"})]})]})]})})]})]})})}},11117:function(e,t,s){"use strict";s.d(t,{p:function(){return i}});var r=s(15444),a=s(75762),l=s(79047),n=s(89300);function i({children:e,allowedRoles:t,fallbackUrl:s="/dashboard"}){let{data:i,status:c}=(0,a.useSession)()||{},d=(0,l.useRouter)();if((0,n.useEffect)(()=>{if("authenticated"===c&&i?.user){let e=i.user?.role;t?.includes?.(e)||d.replace(s)}},[c,i,t,s,d]),"loading"===c)return(0,r.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,r.jsx)("div",{className:"h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"})});if("authenticated"===c){let s=i?.user?.role;if(t?.includes?.(s))return(0,r.jsx)(r.Fragment,{children:e})}return null}},14757:function(e,t,s){"use strict";s.d(t,{AI:function(){return n},E_:function(){return c},Ol:function(){return i},S1:function(){return l}});var r=s(85608),a=s.n(r);function l(){let e=Date.now().toString().slice(-10)+Math.floor(100*Math.random()).toString().padStart(2,"0"),t=function(e){let t=0;for(let s=0;s<12;s++){let r=parseInt(e[s],10);t+=s%2==0?r:3*r}return((10-t%10)%10).toString()}(e);return e+t}function n(e,t){try{a()(`#${t}`,e,{format:"EAN13",width:2,height:80,displayValue:!0,fontSize:14,margin:10})}catch(e){console.error("Error generating barcode:",e)}}function i(e,t,s,r){let a=window.open("","_blank","width=400,height=300");if(!a){alert("Please allow pop-ups to print barcode");return}let l=s?`${r||"KSh"} ${s.toFixed(2)}`:"";a.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Barcode - ${t}</title>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
        <style>
          @page {
            size: 60mm 40mm;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 5mm;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .label {
            text-align: center;
            width: 50mm;
          }
          .product-name {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 2mm;
            max-width: 50mm;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 12px;
            font-weight: bold;
            margin-top: 2mm;
          }
          svg {
            max-width: 50mm;
          }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="product-name">${t}</div>
          <svg id="barcode"></svg>
          ${l?`<div class="price">${l}</div>`:""}
        </div>
        <script>
          JsBarcode("#barcode", "${e}", {
            format: "EAN13",
            width: 1.5,
            height: 50,
            displayValue: true,
            fontSize: 12,
            margin: 5
          });
          window.onload = () => {
            setTimeout(() => {
              window.print();
              window.close();
            }, 300);
          };
        </script>
      </body>
    </html>
  `),a.document.close()}function c(e,t){let s=document.createElement("canvas");a()(s,e,{format:"EAN13",width:2,height:80,displayValue:!0,fontSize:14,margin:10});let r=document.createElement("a");r.download=`barcode-${t.replace(/\s+/g,"-").toLowerCase()}.png`,r.href=s.toDataURL("image/png"),r.click()}}},function(e){e.O(0,[676,258,535,628,294,608,386,156,744],function(){return e(e.s=48882)}),_N_E=e.O()}]);