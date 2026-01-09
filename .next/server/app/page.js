(() => {
var exports = {};
exports.id = "app/page";
exports.ids = ["app/page"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fpage&page=%2Fpage&appPaths=%2Fpage&pagePath=private-next-app-dir%2Fpage.tsx&appDir=%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fpage&page=%2Fpage&appPaths=%2Fpage&pagePath=private-next-app-dir%2Fpage.tsx&appDir=%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-page/module.compiled */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/module.compiled.js?0264");
/* harmony import */ var next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-kind.js");
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/client/components/error-boundary */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/error-boundary.js");
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/app-render/entry-base */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/app-render/entry-base.js");
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
"TURBOPACK { transition: next-ssr }";


// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/page.tsx */ "(rsc)/./app/page.tsx")), "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx"],
          
        }]
      },
        {
        'layout': [() => Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/layout.tsx */ "(rsc)/./app/layout.tsx")), "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx"],
'not-found': [() => Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! next/dist/client/components/not-found-error */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/not-found-error.js", 23)), "next/dist/client/components/not-found-error"],
        
      }
      ]
      }.children;
const pages = ["/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx"];


const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/page",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=true!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=true! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/page.tsx */ "(ssr)/./app/page.tsx"));


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp%2Fproviders.tsx%22%2C%22ids%22%3A%5B%22Providers%22%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22app%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Inter%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22inter%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&server=true!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp%2Fproviders.tsx%22%2C%22ids%22%3A%5B%22Providers%22%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22app%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Inter%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22inter%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&server=true! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/providers.tsx */ "(ssr)/./app/providers.tsx"));


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fapp-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fclient-page.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Ferror-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Flayout-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fnot-found-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Frender-from-template-context.js%22%2C%22ids%22%3A%5B%5D%7D&server=true!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fapp-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fclient-page.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Ferror-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Flayout-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fnot-found-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Frender-from-template-context.js%22%2C%22ids%22%3A%5B%5D%7D&server=true! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/app-router.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/app-router.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/client-page.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/client-page.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/error-boundary.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/error-boundary.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/layout-router.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/layout-router.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/not-found-boundary.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/not-found-boundary.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/render-from-template-context.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/render-from-template-context.js", 23));


/***/ }),

/***/ "(ssr)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/navigation.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Loader2,LogIn,ShoppingCart!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var _barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Loader2,LogIn,ShoppingCart!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/shopping-cart.js");
/* harmony import */ var _barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=Loader2,LogIn,ShoppingCart!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/log-in.js");
/* __next_internal_client_entry_do_not_use__ default auto */ 




function Home() {
    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)() || {};
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (status === "authenticated") {
            router.replace("/pos");
        }
    }, [
        status,
        router
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const result = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signIn)("credentials", {
                email,
                password,
                redirect: false
            });
            if (result?.error) {
                setError("Invalid email or password");
            } else if (result?.ok) {
                router.replace("/pos");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally{
            setIsLoading(false);
        }
    };
    if (status === "loading") {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                className: "h-8 w-8 animate-spin text-emerald-600"
            }, void 0, false, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this);
    }
    if (status === "authenticated") {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-12",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "w-full max-w-md",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "rounded-2xl bg-white p-8 shadow-xl",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "mb-8 text-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "mb-4 flex justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "rounded-full bg-emerald-100 p-4",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                                        className: "h-12 w-12 text-emerald-600"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
                                className: "text-3xl font-bold text-gray-900",
                                children: "SuperPOS"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: "mt-2 text-gray-600",
                                children: "Supermarket Point of Sale System"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                        htmlFor: "email",
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                        id: "email",
                                        type: "email",
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        required: true,
                                        className: "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",
                                        placeholder: "Enter your email"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                        htmlFor: "password",
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                        id: "password",
                                        type: "password",
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        required: true,
                                        className: "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",
                                        placeholder: "Enter your password"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "rounded-lg bg-red-50 p-3 text-sm text-red-700",
                                children: error
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                type: "submit",
                                disabled: isLoading,
                                className: "flex w-full items-center justify-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                children: isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                            className: "h-5 w-5 animate-spin"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            children: "Signing in..."
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Loader2_LogIn_ShoppingCart_lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            children: "Sign In"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "mt-6 border-t border-gray-200 pt-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: "text-center text-sm text-gray-600",
                                children: "Demo Credentials:"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "mt-2 space-y-1 text-center text-xs text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        children: "Admin: admin@pos.com / admin123"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        children: "Cashier: cashier@pos.com / cashier123"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./app/providers.tsx":
/*!***************************!*\
  !*** ./app/providers.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Providers: () => (/* binding */ Providers)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_theme_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/theme-provider */ "(ssr)/./components/theme-provider.tsx");
/* harmony import */ var _components_pwa_registration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/pwa-registration */ "(ssr)/./components/pwa-registration.tsx");
/* harmony import */ var _components_install_prompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/install-prompt */ "(ssr)/./components/install-prompt.tsx");
/* harmony import */ var _components_ui_toaster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/toaster */ "(ssr)/./components/ui/toaster.tsx");
/* harmony import */ var _lib_contexts_store_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/contexts/store-context */ "(ssr)/./lib/contexts/store-context.tsx");
/* harmony import */ var _lib_contexts_currency_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/lib/contexts/currency-context */ "(ssr)/./lib/contexts/currency-context.tsx");
/* harmony import */ var _components_page_wrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/page-wrapper */ "(ssr)/./components/page-wrapper.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* __next_internal_client_entry_do_not_use__ Providers auto */ 









function Providers({ children }) {
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(()=>{
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_1__.SessionProvider, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_contexts_store_context__WEBPACK_IMPORTED_MODULE_6__.StoreProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_contexts_currency_context__WEBPACK_IMPORTED_MODULE_7__.CurrencyProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_page_wrapper__WEBPACK_IMPORTED_MODULE_8__.SidebarProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_theme_provider__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {
                        attribute: "class",
                        defaultTheme: "light",
                        enableSystem: true,
                        disableTransitionOnChange: true,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_pwa_registration__WEBPACK_IMPORTED_MODULE_3__.PWARegistration, {}, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_install_prompt__WEBPACK_IMPORTED_MODULE_4__.InstallPrompt, {}, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toaster__WEBPACK_IMPORTED_MODULE_5__.Toaster, {}, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this),
                            children
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/install-prompt.tsx":
/*!***************************************!*\
  !*** ./components/install-prompt.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InstallPrompt: () => (/* binding */ InstallPrompt)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Download_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Download,X!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var _barrel_optimize_names_Download_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Download,X!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ "(ssr)/./components/ui/button.tsx");
/* __next_internal_client_entry_do_not_use__ InstallPrompt auto */ 



function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showPrompt, setShowPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handler = (e)=>{
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Save the event so it can be triggered later
            setDeferredPrompt(e);
            setShowPrompt(true);
        };
        window.addEventListener("beforeinstallprompt", handler);
        return ()=>{
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);
    const handleInstall = async ()=>{
        if (!deferredPrompt) return;
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            console.log("[InstallPrompt] User accepted the install prompt");
        } else {
            console.log("[InstallPrompt] User dismissed the install prompt");
        }
        // Clear the deferredPrompt for next time
        setDeferredPrompt(null);
        setShowPrompt(false);
    };
    const handleDismiss = ()=>{
        setShowPrompt(false);
    };
    if (!showPrompt) return null;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "rounded-lg bg-white p-4 shadow-lg border border-gray-200",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "flex items-start space-x-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "flex-shrink-0",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Download_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                            className: "h-6 w-6 text-emerald-600"
                        }, void 0, false, {
                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
                                className: "text-sm font-semibold text-gray-900",
                                children: "Install POS System"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: "mt-1 text-sm text-gray-600",
                                children: "Install this app on your desktop for quick access and offline support!"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "mt-3 flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        onClick: handleInstall,
                                        size: "sm",
                                        className: "bg-emerald-600 hover:bg-emerald-700",
                                        children: "Install"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        onClick: handleDismiss,
                                        size: "sm",
                                        variant: "outline",
                                        children: "Not now"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                        onClick: handleDismiss,
                        className: "flex-shrink-0 text-gray-400 hover:text-gray-600",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Download_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/install-prompt.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/page-wrapper.tsx":
/*!*************************************!*\
  !*** ./components/page-wrapper.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageWrapper: () => (/* binding */ PageWrapper),
/* harmony export */   SidebarProvider: () => (/* binding */ SidebarProvider),
/* harmony export */   useSidebar: () => (/* binding */ useSidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ useSidebar,SidebarProvider,PageWrapper auto */ 


// Context for sidebar state sharing
const SidebarContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({
    isPinned: true,
    setIsPinned: (v)=>{}
});
const useSidebar = ()=>(0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(SidebarContext);
function SidebarProvider({ children }) {
    const [isPinned, setIsPinned] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const saved = localStorage.getItem("sidebar-pinned");
        if (saved !== null) {
            setIsPinned(saved === "true");
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        localStorage.setItem("sidebar-pinned", String(isPinned));
    }, [
        isPinned
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SidebarContext.Provider, {
        value: {
            isPinned,
            setIsPinned
        },
        children: children
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/page-wrapper.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function PageWrapper({ children }) {
    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)() || {};
    const userRole = session?.user?.role;
    const isCashier = userRole === "CASHIER";
    const { isPinned } = useSidebar();
    if (isCashier) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("main", {
            children: children
        }, void 0, false, {
            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/page-wrapper.tsx",
            lineNumber: 39,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("main", {
        className: `min-h-screen pt-16 transition-all duration-300 ${isPinned ? "lg:ml-64" : "lg:ml-16"}`,
        children: children
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/page-wrapper.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/pwa-registration.tsx":
/*!*****************************************!*\
  !*** ./components/pwa-registration.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PWARegistration: () => (/* binding */ PWARegistration)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_sync_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/sync-manager */ "(ssr)/./lib/sync-manager.ts");
/* harmony import */ var _lib_indexeddb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/indexeddb */ "(ssr)/./lib/indexeddb.ts");
/* __next_internal_client_entry_do_not_use__ PWARegistration auto */ 


function PWARegistration() {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Initialize IndexedDB
        _lib_indexeddb__WEBPACK_IMPORTED_MODULE_2__.offlineDB.init().then(()=>{
            console.log("[PWA] IndexedDB initialized");
        });
        // Register service worker
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then((registration)=>{
                console.log("[PWA] Service Worker registered:", registration);
                // Listen for messages from service worker
                navigator.serviceWorker.addEventListener("message", (event)=>{
                    if (event.data && event.data.type === "SYNC_TRANSACTIONS") {
                        window.dispatchEvent(new Event("sync-transactions"));
                    }
                });
            }).catch((error)=>{
                console.error("[PWA] Service Worker registration failed:", error);
            });
        }
        // Listen for sync-transactions event
        const handleSync = ()=>{
            console.log("[PWA] Sync event triggered");
            _lib_sync_manager__WEBPACK_IMPORTED_MODULE_1__.syncManager.syncAllTransactions();
        };
        window.addEventListener("sync-transactions", handleSync);
        // Cache data for offline use when online
        if (navigator.onLine) {
            _lib_sync_manager__WEBPACK_IMPORTED_MODULE_1__.syncManager.cacheDataForOffline();
        }
        // Recache data periodically (every 5 minutes)
        const cacheInterval = setInterval(()=>{
            if (navigator.onLine) {
                _lib_sync_manager__WEBPACK_IMPORTED_MODULE_1__.syncManager.cacheDataForOffline();
            }
        }, 5 * 60 * 1000);
        return ()=>{
            window.removeEventListener("sync-transactions", handleSync);
            clearInterval(cacheInterval);
        };
    }, []);
    return null;
}


/***/ }),

/***/ "(ssr)/./components/theme-provider.tsx":
/*!***************************************!*\
  !*** ./components/theme-provider.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-themes */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-themes/dist/index.mjs");
/* __next_internal_client_entry_do_not_use__ ThemeProvider auto */ 


function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_themes__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/theme-provider.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/ui/button.tsx":
/*!**********************************!*\
  !*** ./components/ui/button.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   buttonVariants: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-slot */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "(ssr)/./lib/utils.ts");





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__.Slot : "button";
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Comp, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, undefined);
});
Button.displayName = "Button";



/***/ }),

/***/ "(ssr)/./components/ui/toast.tsx":
/*!*********************************!*\
  !*** ./components/ui/toast.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toast: () => (/* binding */ Toast),
/* harmony export */   ToastAction: () => (/* binding */ ToastAction),
/* harmony export */   ToastClose: () => (/* binding */ ToastClose),
/* harmony export */   ToastDescription: () => (/* binding */ ToastDescription),
/* harmony export */   ToastProvider: () => (/* binding */ ToastProvider),
/* harmony export */   ToastTitle: () => (/* binding */ ToastTitle),
/* harmony export */   ToastViewport: () => (/* binding */ ToastViewport)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-toast */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-toast/dist/index.mjs");
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _barrel_optimize_names_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=X!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "(ssr)/./lib/utils.ts");
/* __next_internal_client_entry_do_not_use__ ToastProvider,ToastViewport,Toast,ToastTitle,ToastDescription,ToastClose,ToastAction auto */ 





const ToastProvider = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Provider;
const ToastViewport = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Viewport, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, undefined));
ToastViewport.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Viewport.displayName;
const toastVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Root, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, undefined);
});
Toast.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Root.displayName;
const ToastAction = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Action, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, undefined));
ToastAction.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Action.displayName;
const ToastClose = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Close, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, undefined)
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, undefined));
ToastClose.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Close.displayName;
const ToastTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Title, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, undefined));
ToastTitle.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Title.displayName;
const ToastDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Description, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, undefined));
ToastDescription.displayName = _radix_ui_react_toast__WEBPACK_IMPORTED_MODULE_4__.Description.displayName;



/***/ }),

/***/ "(ssr)/./components/ui/toaster.tsx":
/*!***********************************!*\
  !*** ./components/ui/toaster.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toaster: () => (/* binding */ Toaster)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/hooks/use-toast */ "(ssr)/./hooks/use-toast.ts");
/* harmony import */ var _components_ui_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/toast */ "(ssr)/./components/ui/toast.tsx");
/* __next_internal_client_entry_do_not_use__ Toaster auto */ 


function Toaster() {
    const { toasts } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__.useToast)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastProvider, {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.Toast, {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastTitle, {
                                    children: title
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastDescription, {
                                    children: description
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastClose, {}, void 0, false, {
                            fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastViewport, {}, void 0, false, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./hooks/use-toast.ts":
/*!****************************!*\
  !*** ./hooks/use-toast.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer),
/* harmony export */   toast: () => (/* binding */ toast),
/* harmony export */   useToast: () => (/* binding */ useToast)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* __next_internal_client_entry_do_not_use__ reducer,useToast,toast auto */ // Inspired by react-hot-toast library

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(memoryState);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}



/***/ }),

/***/ "(ssr)/./lib/contexts/currency-context.tsx":
/*!*******************************************!*\
  !*** ./lib/contexts/currency-context.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CURRENCIES: () => (/* binding */ CURRENCIES),
/* harmony export */   CurrencyProvider: () => (/* binding */ CurrencyProvider),
/* harmony export */   useCurrency: () => (/* binding */ useCurrency)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ CURRENCIES,CurrencyProvider,useCurrency auto */ 

const CURRENCIES = [
    {
        code: "KES",
        symbol: "KSh",
        name: "Kenyan Shilling",
        rate: 1
    },
    {
        code: "USD",
        symbol: "$",
        name: "US Dollar",
        rate: 0.0065
    },
    {
        code: "EUR",
        symbol: "€",
        name: "Euro",
        rate: 0.0060
    },
    {
        code: "GBP",
        symbol: "\xa3",
        name: "British Pound",
        rate: 0.0051
    },
    {
        code: "TZS",
        symbol: "TSh",
        name: "Tanzanian Shilling",
        rate: 16.5
    },
    {
        code: "UGX",
        symbol: "USh",
        name: "Ugandan Shilling",
        rate: 24.0
    },
    {
        code: "ZAR",
        symbol: "R",
        name: "South African Rand",
        rate: 0.12
    },
    {
        code: "NGN",
        symbol: "₦",
        name: "Nigerian Naira",
        rate: 10.0
    }
];
const CurrencyContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function CurrencyProvider({ children }) {
    const [currency, setCurrencyState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(CURRENCIES[0]); // KES default
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMounted(true);
        const saved = localStorage.getItem("pos-currency");
        if (saved) {
            const found = CURRENCIES.find((c)=>c.code === saved);
            if (found) setCurrencyState(found);
        }
    }, []);
    const setCurrency = (newCurrency)=>{
        setCurrencyState(newCurrency);
        localStorage.setItem("pos-currency", newCurrency.code);
    };
    const convertPrice = (amount)=>{
        return amount * currency.rate;
    };
    const formatPrice = (amount)=>{
        const converted = convertPrice(amount);
        return `${currency.symbol} ${converted.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };
    // Prevent hydration mismatch by using KES until mounted
    const value = {
        currency: mounted ? currency : CURRENCIES[0],
        setCurrency,
        formatPrice: mounted ? formatPrice : (amount)=>`KSh ${amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`,
        convertPrice: mounted ? convertPrice : (amount)=>amount
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CurrencyContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/lib/contexts/currency-context.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
function useCurrency() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}


/***/ }),

/***/ "(ssr)/./lib/contexts/store-context.tsx":
/*!****************************************!*\
  !*** ./lib/contexts/store-context.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoreProvider: () => (/* binding */ StoreProvider),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ StoreProvider,useStore auto */ 


const StoreContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function StoreProvider({ children }) {
    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)() || {};
    const [selectedStore, setSelectedStoreState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [stores, setStores] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const fetchStores = async ()=>{
        try {
            setLoading(true);
            const response = await fetch("/api/stores");
            if (response.ok) {
                const data = await response.json();
                setStores(data);
                // Auto-select store based on user's assigned store or first active store
                if (session?.user) {
                    const userStoreId = session.user?.storeId;
                    if (userStoreId) {
                        // User is assigned to a specific store
                        const userStore = data.find((s)=>s.id === userStoreId);
                        if (userStore) {
                            setSelectedStoreState(userStore);
                            localStorage.setItem("selectedStoreId", userStore.id);
                        }
                    } else {
                        // Admin user - check localStorage or select first store
                        const savedStoreId = localStorage.getItem("selectedStoreId");
                        if (savedStoreId) {
                            const savedStore = data.find((s)=>s.id === savedStoreId);
                            if (savedStore) {
                                setSelectedStoreState(savedStore);
                            } else {
                                // Saved store not found, select first active store
                                const firstActive = data.find((s)=>s.isActive);
                                if (firstActive) {
                                    setSelectedStoreState(firstActive);
                                    localStorage.setItem("selectedStoreId", firstActive.id);
                                }
                            }
                        } else {
                            // No saved store, select first active store
                            const firstActive = data.find((s)=>s.isActive);
                            if (firstActive) {
                                setSelectedStoreState(firstActive);
                                localStorage.setItem("selectedStoreId", firstActive.id);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching stores:", error);
        } finally{
            setLoading(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (status === "authenticated") {
            fetchStores();
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [
        status,
        session?.user
    ]);
    const setSelectedStore = (store)=>{
        setSelectedStoreState(store);
        if (store) {
            localStorage.setItem("selectedStoreId", store.id);
        } else {
            localStorage.removeItem("selectedStoreId");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StoreContext.Provider, {
        value: {
            selectedStore,
            setSelectedStore,
            stores,
            loading,
            refreshStores: fetchStores
        },
        children: children
    }, void 0, false, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/lib/contexts/store-context.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
function useStore() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}


/***/ }),

/***/ "(ssr)/./lib/indexeddb.ts":
/*!**************************!*\
  !*** ./lib/indexeddb.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OfflineDB: () => (/* binding */ OfflineDB),
/* harmony export */   offlineDB: () => (/* binding */ offlineDB)
/* harmony export */ });
// IndexedDB wrapper for offline storage
const DB_NAME = "pos_offline_db";
const DB_VERSION = 1;
class OfflineDB {
    async init() {
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>{
                this.db = request.result;
                resolve();
            };
            request.onupgradeneeded = (event)=>{
                const db = event.target.result;
                // Create object stores
                if (!db.objectStoreNames.contains("transactions")) {
                    const transactionStore = db.createObjectStore("transactions", {
                        keyPath: "id"
                    });
                    transactionStore.createIndex("synced", "synced", {
                        unique: false
                    });
                    transactionStore.createIndex("type", "type", {
                        unique: false
                    });
                    transactionStore.createIndex("timestamp", "timestamp", {
                        unique: false
                    });
                }
                if (!db.objectStoreNames.contains("products")) {
                    db.createObjectStore("products", {
                        keyPath: "id"
                    });
                }
                if (!db.objectStoreNames.contains("customers")) {
                    db.createObjectStore("customers", {
                        keyPath: "id"
                    });
                }
                if (!db.objectStoreNames.contains("categories")) {
                    db.createObjectStore("categories", {
                        keyPath: "id"
                    });
                }
            };
        });
    }
    async addTransaction(transaction) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("transactions", "readwrite");
            const store = tx.objectStore("transactions");
            const request = store.add(transaction);
            request.onsuccess = ()=>resolve();
            request.onerror = ()=>reject(request.error);
        });
    }
    async getUnsyncedTransactions() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("transactions", "readonly");
            const store = tx.objectStore("transactions");
            const index = store.index("synced");
            const request = index.getAll(IDBKeyRange.only(false));
            request.onsuccess = ()=>resolve(request.result);
            request.onerror = ()=>reject(request.error);
        });
    }
    async markTransactionSynced(id) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("transactions", "readwrite");
            const store = tx.objectStore("transactions");
            const request = store.get(id);
            request.onsuccess = ()=>{
                const transaction = request.result;
                if (transaction) {
                    transaction.synced = true;
                    const updateRequest = store.put(transaction);
                    updateRequest.onsuccess = ()=>resolve();
                    updateRequest.onerror = ()=>reject(updateRequest.error);
                } else {
                    resolve();
                }
            };
            request.onerror = ()=>reject(request.error);
        });
    }
    async cacheProducts(products) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("products", "readwrite");
            const store = tx.objectStore("products");
            // Clear existing products
            const clearRequest = store.clear();
            clearRequest.onsuccess = ()=>{
                // Add all products
                products.forEach((product)=>{
                    store.add(product);
                });
            };
            tx.oncomplete = ()=>resolve();
            tx.onerror = ()=>reject(tx.error);
        });
    }
    async getCachedProducts() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("products", "readonly");
            const store = tx.objectStore("products");
            const request = store.getAll();
            request.onsuccess = ()=>resolve(request.result);
            request.onerror = ()=>reject(request.error);
        });
    }
    async cacheCustomers(customers) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("customers", "readwrite");
            const store = tx.objectStore("customers");
            const clearRequest = store.clear();
            clearRequest.onsuccess = ()=>{
                customers.forEach((customer)=>{
                    store.add(customer);
                });
            };
            tx.oncomplete = ()=>resolve();
            tx.onerror = ()=>reject(tx.error);
        });
    }
    async getCachedCustomers() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("customers", "readonly");
            const store = tx.objectStore("customers");
            const request = store.getAll();
            request.onsuccess = ()=>resolve(request.result);
            request.onerror = ()=>reject(request.error);
        });
    }
    async cacheCategories(categories) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("categories", "readwrite");
            const store = tx.objectStore("categories");
            const clearRequest = store.clear();
            clearRequest.onsuccess = ()=>{
                categories.forEach((category)=>{
                    store.add(category);
                });
            };
            tx.oncomplete = ()=>resolve();
            tx.onerror = ()=>reject(tx.error);
        });
    }
    async getCachedCategories() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject)=>{
            const tx = this.db.transaction("categories", "readonly");
            const store = tx.objectStore("categories");
            const request = store.getAll();
            request.onsuccess = ()=>resolve(request.result);
            request.onerror = ()=>reject(request.error);
        });
    }
    constructor(){
        this.db = null;
    }
}
const offlineDB = new OfflineDB();


/***/ }),

/***/ "(ssr)/./lib/sync-manager.ts":
/*!*****************************!*\
  !*** ./lib/sync-manager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SyncManager: () => (/* binding */ SyncManager),
/* harmony export */   syncManager: () => (/* binding */ syncManager)
/* harmony export */ });
/* harmony import */ var _indexeddb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexeddb */ "(ssr)/./lib/indexeddb.ts");
/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/hooks/use-toast */ "(ssr)/./hooks/use-toast.ts");
/* __next_internal_client_entry_do_not_use__ SyncManager,syncManager auto */ 

class SyncManager {
    constructor(){
        this.isSyncing = false;
    }
    static getInstance() {
        if (!SyncManager.instance) {
            SyncManager.instance = new SyncManager();
        }
        return SyncManager.instance;
    }
    async syncAllTransactions() {
        if (this.isSyncing) {
            console.log("[SyncManager] Sync already in progress");
            return;
        }
        if (!navigator.onLine) {
            console.log("[SyncManager] Device is offline, skipping sync");
            return;
        }
        this.isSyncing = true;
        console.log("[SyncManager] Starting sync...");
        try {
            const unsyncedTransactions = await _indexeddb__WEBPACK_IMPORTED_MODULE_0__.offlineDB.getUnsyncedTransactions();
            console.log(`[SyncManager] Found ${unsyncedTransactions.length} unsynced transactions`);
            if (unsyncedTransactions.length === 0) {
                this.isSyncing = false;
                return;
            }
            const results = {
                success: 0,
                failed: 0
            };
            for (const transaction of unsyncedTransactions){
                try {
                    await this.syncTransaction(transaction);
                    await _indexeddb__WEBPACK_IMPORTED_MODULE_0__.offlineDB.markTransactionSynced(transaction.id);
                    results.success++;
                } catch (error) {
                    console.error("[SyncManager] Failed to sync transaction:", transaction.id, error);
                    results.failed++;
                }
            }
            console.log("[SyncManager] Sync completed:", results);
            if (results.success > 0) {
                (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__.toast)({
                    title: "Sync Complete",
                    description: `Successfully synced ${results.success} transaction(s)${results.failed > 0 ? `. ${results.failed} failed.` : ""}`
                });
            }
            if (results.failed > 0) {
                (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__.toast)({
                    title: "Sync Warning",
                    description: `${results.failed} transaction(s) failed to sync. Will retry on next sync.`,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("[SyncManager] Sync error:", error);
            (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__.toast)({
                title: "Sync Error",
                description: "Failed to sync offline transactions. Will retry later.",
                variant: "destructive"
            });
        } finally{
            this.isSyncing = false;
        }
    }
    async syncTransaction(transaction) {
        switch(transaction.type){
            case "sale":
                return this.syncSale(transaction.data);
            case "product":
                return this.syncProduct(transaction.data);
            case "customer":
                return this.syncCustomer(transaction.data);
            case "return":
                return this.syncReturn(transaction.data);
            default:
                throw new Error(`Unknown transaction type: ${transaction.type}`);
        }
    }
    async syncSale(saleData) {
        const response = await fetch("/api/sales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saleData)
        });
        if (!response.ok) {
            throw new Error(`Failed to sync sale: ${response.statusText}`);
        }
    }
    async syncProduct(productData) {
        const method = productData.id ? "PUT" : "POST";
        const url = productData.id ? `/api/products/${productData.id}` : "/api/products";
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error(`Failed to sync product: ${response.statusText}`);
        }
    }
    async syncCustomer(customerData) {
        const method = customerData.id ? "PUT" : "POST";
        const url = customerData.id ? `/api/customers/${customerData.id}` : "/api/customers";
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerData)
        });
        if (!response.ok) {
            throw new Error(`Failed to sync customer: ${response.statusText}`);
        }
    }
    async syncReturn(returnData) {
        const response = await fetch("/api/returns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(returnData)
        });
        if (!response.ok) {
            throw new Error(`Failed to sync return: ${response.statusText}`);
        }
    }
    async cacheDataForOffline() {
        try {
            // Cache products
            const productsResponse = await fetch("/api/products");
            if (productsResponse.ok) {
                const products = await productsResponse.json();
                await _indexeddb__WEBPACK_IMPORTED_MODULE_0__.offlineDB.cacheProducts(products);
            }
            // Cache customers
            const customersResponse = await fetch("/api/customers");
            if (customersResponse.ok) {
                const customers = await customersResponse.json();
                await _indexeddb__WEBPACK_IMPORTED_MODULE_0__.offlineDB.cacheCustomers(customers);
            }
            // Cache categories
            const categoriesResponse = await fetch("/api/categories");
            if (categoriesResponse.ok) {
                const categories = await categoriesResponse.json();
                await _indexeddb__WEBPACK_IMPORTED_MODULE_0__.offlineDB.cacheCategories(categories);
            }
            console.log("[SyncManager] Data cached successfully");
        } catch (error) {
            console.error("[SyncManager] Failed to cache data:", error);
        }
    }
}
const syncManager = SyncManager.getInstance();


/***/ }),

/***/ "(ssr)/./lib/utils.ts":
/*!**********************!*\
  !*** ./lib/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn),
/* harmony export */   formatDuration: () => (/* binding */ formatDuration)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tailwind-merge */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/tailwind-merge/dist/bundle-mjs.mjs");


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_1__.twMerge)((0,clsx__WEBPACK_IMPORTED_MODULE_0__.clsx)(inputs));
}
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}


/***/ }),

/***/ "(rsc)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("42bb61ef2a3f");
if (false) {}


/***/ }),

/***/ "(rsc)/./app/layout.tsx":
/*!************************!*\
  !*** ./app/layout.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLayout),
/* harmony export */   dynamic: () => (/* binding */ dynamic),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   viewport: () => (/* binding */ viewport)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/font/google/target.css?{"path":"app/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"} */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/font/google/target.css?{\"path\":\"app/layout.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"}");
/* harmony import */ var next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals.css */ "(rsc)/./app/globals.css");
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./providers */ "(rsc)/./app/providers.tsx");




const dynamic = "force-dynamic";
const metadata = {
    metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
    title: "Supermarket POS System",
    description: "Comprehensive point of sale system for supermarkets with offline support",
    manifest: "/manifest.json",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg"
    },
    openGraph: {
        images: [
            "/og-image.png"
        ]
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "POS System"
    }
};
const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("head", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "application-name",
                        content: "POS System"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "default"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "apple-mobile-web-app-title",
                        content: "POS System"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "format-detection",
                        content: "telephone=no"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "mobile-web-app-capable",
                        content: "yes"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
                        name: "theme-color",
                        content: "#10b981"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
                        rel: "apple-touch-icon",
                        href: "/favicon.svg"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("script", {
                        src: "https://apps.abacus.ai/chatllm/appllm-lib.js"
                    }, void 0, false, {
                        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("body", {
                className: (next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default().className),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_providers__WEBPACK_IMPORTED_MODULE_2__.Providers, {
                    children: children
                }, void 0, false, {
                    fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/supermarket_pos_system/nextjs_space/app/layout.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(rsc)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-flight-loader/module-proxy */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/page.tsx#default`));


/***/ }),

/***/ "(rsc)/./app/providers.tsx":
/*!***************************!*\
  !*** ./app/providers.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Providers: () => (/* binding */ e0)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-flight-loader/module-proxy */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js");


const e0 = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/ubuntu/supermarket_pos_system/nextjs_space/app/providers.tsx#Providers`);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/tailwind-merge","vendor-chunks/@radix-ui","vendor-chunks/lucide-react","vendor-chunks/next-themes","vendor-chunks/class-variance-authority","vendor-chunks/clsx"], () => (__webpack_exec__("(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fpage&page=%2Fpage&appPaths=%2Fpage&pagePath=private-next-app-dir%2Fpage.tsx&appDir=%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fsupermarket_pos_system%2Fnextjs_space&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();