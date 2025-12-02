module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/VSCode/wedd-inv/app/api/upload/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/@supabase+supabase-js@2.86.0/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
async function POST(req) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'wedding-assets';
    if (!SUPABASE_URL || !SERVICE_KEY) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server.'
        }), {
            status: 500
        });
    }
    try {
        const form = await req.formData();
        const file = form.get('file');
        const filenameRaw = form.get('filename') || file && file.name || `upload-${Date.now()}`;
        // sanitize filename: remove unsafe characters (spaces, brackets, unicode, etc.)
        const filename = String(filenameRaw).trim().replace(/\s+/g, '-') // spaces -> hyphen
        .replace(/[^a-zA-Z0-9.\-_]/g, '-') // remove other unsafe chars
        .replace(/-+/g, '-');
        const folder = form.get('folder') || 'wedding';
        if (!file || typeof file === 'string') {
            return new Response(JSON.stringify({
                success: false,
                error: 'No file provided'
            }), {
                status: 400
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        let uploadBuffer = buffer;
        let contentType = file.type || 'application/octet-stream';
        // If the uploaded file is an image, try to re-encode it server-side to avoid
        // progressive JPEGs or other formats that cause rendering quirks in some browsers.
        if (file.type && file.type.startsWith('image/')) {
            try {
                const sharp = await __turbopack_context__.A("[externals]/sharp [external] (sharp, cjs, async loader)");
                // For PNG keep PNG output; for other images, convert to baseline JPEG
                if (file.type === 'image/png') {
                    uploadBuffer = await sharp.default(buffer).png({
                        compressionLevel: 9
                    }).toBuffer();
                    contentType = 'image/png';
                } else {
                    // Convert to non-progressive JPEG to avoid progressive rendering seams
                    uploadBuffer = await sharp.default(buffer).jpeg({
                        quality: 90,
                        progressive: false
                    }).toBuffer();
                    contentType = 'image/jpeg';
                }
            } catch (e) {
                // If sharp is not available or conversion fails, fall back to original buffer
                // but continue — upload will proceed with original content-type.
                console.warn('Image re-encoding failed, uploading original file:', String(e));
                uploadBuffer = buffer;
                contentType = file.type || 'application/octet-stream';
            }
        }
        const path = `${folder}/${Date.now()}-${filename}`;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(SUPABASE_URL, SERVICE_KEY, {
            auth: {
                persistSession: false
            }
        });
        const { error } = await supabase.storage.from(BUCKET).upload(path, uploadBuffer, {
            contentType,
            upsert: false
        });
        if (error) {
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 400
            });
        }
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return new Response(JSON.stringify({
            success: true,
            publicUrl: data.publicUrl
        }), {
            status: 200
        });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: String(err)
        }), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e11934ca._.js.map