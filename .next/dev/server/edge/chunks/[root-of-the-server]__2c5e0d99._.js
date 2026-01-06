(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__2c5e0d99._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/VSCode/wedd-inv/lib/supabase/server.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.86.0/node_modules/@supabase/ssr/dist/module/index.js [app-edge-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.86.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/api/headers.js [app-edge-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/server/request/cookies.js [app-edge-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Called from Server Component, ignore
                }
            }
        }
    });
}
}),
"[project]/VSCode/wedd-inv/app/api/og/route.tsx [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.react-server.js [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$og$2f$image$2d$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/esm/server/og/image-response.js [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/lib/supabase/server.ts [app-edge-route] (ecmascript)");
;
;
;
const runtime = 'edge';
async function GET(req) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data } = await supabase.from('wedding_settings').select('*').single();
        const settings = data || {};
        const title = settings.site_name || `${settings.groom_name || ''} & ${settings.bride_name || ''}` || 'Wedding Invitation';
        const dateText = settings.wedding_date ? new Date(settings.wedding_date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }) : '';
        const desc = settings.og_description || settings.quote || 'Suatu kehormatan apabila Bapak/Ibu/Saudara dapat hadir pada acara pernikahan kami';
        const baseUrlRaw = ("TURBOPACK compile-time value", "https://wedd-inv-ten.vercel.app") || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') || process.env.SITE_URL || '';
        const baseUrl = String(baseUrlRaw).replace(/\/$/, '');
        const imagePath = settings.og_image || settings.splash_image || settings.hero_image || null;
        const imageUrl = imagePath ? String(imagePath).startsWith('http') ? String(imagePath) : `${baseUrl}/${String(imagePath).replace(/^\/*/, '')}` : null;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$og$2f$image$2d$response$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["ImageResponse"](/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                width: '1200px',
                height: '630px',
                background: '#f7f7f7',
                fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                color: '#111827'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: 'flex'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            children: imageUrl ? // eslint-disable-next-line @next/next/no-img-element
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: imageUrl,
                                alt: "hero",
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }
                            }, void 0, false, {
                                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                lineNumber: 37,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    background: '#e5e7eb'
                                }
                            }, void 0, false, {
                                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                lineNumber: 39,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                            lineNumber: 34,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 36,
                            background: '#ffffff'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 44,
                                    fontWeight: 700,
                                    lineHeight: 1.05,
                                    marginBottom: 8
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            dateText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 22,
                                    color: '#6b7280',
                                    marginBottom: 16
                                },
                                children: dateText
                            }, void 0, false, {
                                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                lineNumber: 45,
                                columnNumber: 28
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    color: '#374151',
                                    maxWidth: 800
                                },
                                children: desc
                            }, void 0, false, {
                                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    color: '#6b7280'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M3 12a9 9 0 0114.85-6.364l1.414-1.414A11 11 0 002 12v.001L3 12z",
                                            fill: "#9CA3AF"
                                        }, void 0, false, {
                                            fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                            lineNumber: 48,
                                            columnNumber: 112
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$react$2d$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 18
                                        },
                                        children: baseUrl.replace(/^https?:\/\//, '')
                                    }, void 0, false, {
                                        fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
                lineNumber: 32,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/VSCode/wedd-inv/app/api/og/route.tsx",
            lineNumber: 24,
            columnNumber: 9
        }, this), {
            width: 1200,
            height: 630
        });
    } catch (err) {
        console.error('OG generation error', err);
        return new Response('Error generating image', {
            status: 500
        });
    }
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__2c5e0d99._.js.map