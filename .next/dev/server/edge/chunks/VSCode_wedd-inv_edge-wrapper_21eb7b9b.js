(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/VSCode_wedd-inv_edge-wrapper_21eb7b9b.js",
"[project]/VSCode/wedd-inv/edge-wrapper.js { MODULE => \"[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/build/templates/edge-app-route.js { INNER_ROUTE_ENTRY => \\\"[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \\\\\\\"[project]/VSCode/wedd-inv/app/api/og/route.tsx [app-edge-route] (ecmascript)\\\\\\\" } [app-edge-route] (ecmascript)\\\" } [app-edge-route] (ecmascript)\" } [app-edge-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i('[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/build/templates/edge-app-route.js { INNER_ROUTE_ENTRY => "[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \\"[project]/VSCode/wedd-inv/app/api/og/route.tsx [app-edge-route] (ecmascript)\\" } [app-edge-route] (ecmascript)" } [app-edge-route] (ecmascript)'));
modProm.catch(()=>{});
self._ENTRIES["middleware_app/api/og/route"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}),
]);

//# sourceMappingURL=VSCode_wedd-inv_edge-wrapper_21eb7b9b.js.map