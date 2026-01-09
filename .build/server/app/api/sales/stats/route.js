"use strict";(()=>{var e={};e.id=3458,e.ids=[3458],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79591:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>w,patchFetch:()=>_,requestAsyncStorage:()=>p,routeModule:()=>c,serverHooks:()=>y,staticGenerationAsyncStorage:()=>m});var s={};a.r(s),a.d(s,{GET:()=>l,dynamic:()=>i});var r=a(79182),o=a(72007),u=a(56719),n=a(93442),d=a(35970);let i="force-dynamic";async function l(e){try{let t;let{searchParams:a}=new URL(e.url),s=a.get("period")||"today",r=a.get("storeId"),o=new Date;switch(s){case"today":default:(t=new Date).setHours(0,0,0,0);break;case"week":(t=new Date).setDate(t.getDate()-7);break;case"month":(t=new Date).setDate(t.getDate()-30)}let u={createdAt:{gte:t,lte:o}};r&&(u.storeId=r);let i=await d._.sale.aggregate({where:u,_sum:{total:!0},_count:!0}),l=r?await d._.$queryRaw`
          SELECT 
            DATE("createdAt") as date,
            SUM(total) as total,
            COUNT(*) as count
          FROM "Sale"
          WHERE "createdAt" >= ${t} AND "createdAt" <= ${o} AND "storeId" = ${r}
          GROUP BY DATE("createdAt")
          ORDER BY date ASC
        `:await d._.$queryRaw`
          SELECT 
            DATE("createdAt") as date,
            SUM(total) as total,
            COUNT(*) as count
          FROM "Sale"
          WHERE "createdAt" >= ${t} AND "createdAt" <= ${o}
          GROUP BY DATE("createdAt")
          ORDER BY date ASC
        `,c=l?.map?.(e=>({date:e?.date,total:e?.total,count:Number(e?.count)}))??[],p=await d._.saleItem.groupBy({by:["productId"],where:{sale:u},_sum:{quantity:!0,subtotal:!0},orderBy:{_sum:{quantity:"desc"}},take:10}),m=await Promise.all(p?.map?.(async e=>({product:await d._.product.findUnique({where:{id:e?.productId},include:{category:!0}}),quantity:e?._sum?.quantity,revenue:e?._sum?.subtotal}))??[]),y={stock:{lte:d._.product.fields.reorderLevel}};r&&(y.storeId=r);let w=await d._.product.findMany({where:y,include:{category:!0,store:!0},orderBy:{stock:"asc"},take:10}),_=await d._.sale.groupBy({by:["paymentMethod"],where:u,_sum:{total:!0},_count:!0});return n.NextResponse.json({totalSales:i?._sum?.total??0,totalTransactions:i?._count??0,salesByDay:c,topProducts:m,lowStockProducts:w,salesByPaymentMethod:_})}catch(e){return console.error("Error fetching sales stats:",e),n.NextResponse.json({error:"Failed to fetch sales stats"},{status:500})}}let c=new r.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/sales/stats/route",pathname:"/api/sales/stats",filename:"route",bundlePath:"app/api/sales/stats/route"},resolvedPagePath:"/home/ubuntu/supermarket_pos_system/nextjs_space/app/api/sales/stats/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:p,staticGenerationAsyncStorage:m,serverHooks:y}=c,w="/api/sales/stats/route";function _(){return(0,u.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:m})}},35970:(e,t,a)=>{a.d(t,{_:()=>r});let s=require("@prisma/client"),r=globalThis.prisma??new s.PrismaClient}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[4372,7609],()=>a(79591));module.exports=s})();