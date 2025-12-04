module.exports = [
"[project]/VSCode/wedd-inv/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002ff7a1c92c2f1f2efabbae1f34d592e04786c446":"getWeddingSettings","00659d7fa23e09197aa35c45470b309f1f2ddb9f5f":"getComments","00a4889b7d39381017795ca03ddf4054b50987dc12":"getGuests","00b4e4e76bfc6f71294af3e72f7059d4a7d4056f46":"getGalleryItems","00b9b342a773fbfd0a4fd83ca6a057fbbb9f044b6a":"getAllComments","00d5ff70421c2ac28a87cdd4f2786f1658e2a29363":"logoutAdmin","40816399b044ab0bfdc1ce58364b542bc40d09aa0c":"deleteGuest","4082f8f13b84a78ec08e96ca0d72f790ff252a775d":"getGuestBySlug","40a174fa9d29da1d096e047a12586ecfd5b9fd3397":"submitComment","40d69fb88c5ce7d0aba647b3a6c8c172df4b35398c":"changeAdminPassword","40da4668a1838c6a2ab759c65f53cc6b255480617f":"addGuest","40f27b2696e3faab2e4b78efd2dcec2407c3bb1092":"deleteComment","40f4f3448fdc59a07274493b411aa52a710f1757a8":"deleteGalleryItem","40f6c3c779e9376d16e08c56d29bc3469e2b9f86e0":"ensureGuestUniqueCode","40f9a5062a84a8b6287b41fca36d88c407375bf303":"sendWhatsAppViaTwilio","602c988938c9f9c38a2d90410b4325622888e7410a":"generateBlastMessageForGuest","6069623c0c37ce6a02e418cf83487a7fe23f14fba5":"updateGalleryItem","606bd2a29a0156c3c66ee0267b3fb5151f8a6e895e":"updateWeddingSettings","606f1055e72dea0b21187aefe9fe2e50a61dfafe56":"loginAdmin","607c67e95d4085b0cd6a9aa88e715f8c59cdf7e125":"addGalleryItem","6087a7b6198164b65edecede36ad30416c80bed8b6":"toggleCommentApproval","60a28c76be918098e664d8fb2c41c0c0ba085dd191":"updateGuest","707fcd43996819762dc75ddf0abac3a4ed7b031c51":"updateRSVP"},"",""] */ __turbopack_context__.s([
    "addGalleryItem",
    ()=>addGalleryItem,
    "addGuest",
    ()=>addGuest,
    "changeAdminPassword",
    ()=>changeAdminPassword,
    "deleteComment",
    ()=>deleteComment,
    "deleteGalleryItem",
    ()=>deleteGalleryItem,
    "deleteGuest",
    ()=>deleteGuest,
    "ensureGuestUniqueCode",
    ()=>ensureGuestUniqueCode,
    "generateBlastMessageForGuest",
    ()=>generateBlastMessageForGuest,
    "getAllComments",
    ()=>getAllComments,
    "getComments",
    ()=>getComments,
    "getGalleryItems",
    ()=>getGalleryItems,
    "getGuestBySlug",
    ()=>getGuestBySlug,
    "getGuests",
    ()=>getGuests,
    "getWeddingSettings",
    ()=>getWeddingSettings,
    "loginAdmin",
    ()=>loginAdmin,
    "logoutAdmin",
    ()=>logoutAdmin,
    "sendWhatsAppViaTwilio",
    ()=>sendWhatsAppViaTwilio,
    "submitComment",
    ()=>submitComment,
    "toggleCommentApproval",
    ()=>toggleCommentApproval,
    "updateGalleryItem",
    ()=>updateGalleryItem,
    "updateGuest",
    ()=>updateGuest,
    "updateRSVP",
    ()=>updateRSVP,
    "updateWeddingSettings",
    ()=>updateWeddingSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/@supabase+supabase-js@2.86.0/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function loginAdmin(email, password) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true
    };
}
async function logoutAdmin() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    await supabase.auth.signOut();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/login");
}
async function changeAdminPassword(newPassword) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true
    };
}
async function getComments() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("comments").select("*").eq("is_approved", true).order("created_at", {
        ascending: false
    });
    if (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
    return data || [];
}
async function submitComment(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("comments").insert({
        guest_name: formData.guest_name,
        message: formData.message,
        is_approved: true
    });
    if (error) {
        console.error("Error submitting comment:", error);
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    return {
        success: true
    };
}
async function updateRSVP(guestId, attendance, guestCount) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("guests").update({
        attendance_status: attendance,
        guest_count: guestCount,
        updated_at: new Date().toISOString()
    }).eq("id", guestId);
    if (error) {
        console.error("Error updating RSVP:", error);
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    return {
        success: true
    };
}
async function getGuestBySlug(slug) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("guests").select("*").eq("slug", slug).single();
    if (error) {
        console.error("Error fetching guest:", error);
        return null;
    }
    return data;
}
async function getWeddingSettings() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("wedding_settings").select("*").single();
    if (error) {
        console.error("Error fetching settings:", error);
        return null;
    }
    return data;
}
async function updateWeddingSettings(settingsId, settings) {
    // Prefer service-role client for writes when available to avoid RLS/anon issues
    let supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_URL) {
        supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$86$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
            auth: {
                persistSession: false
            }
        });
    }
    const { data, error } = await supabase.from("wedding_settings").update({
        ...settings,
        updated_at: new Date().toISOString()
    }).eq("id", settingsId).select().single();
    if (error) {
        return {
            success: false,
            error: error.message,
            data: null
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true,
        data
    };
}
async function getGalleryItems() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("gallery").select("*").order("sort_order", {
        ascending: true
    });
    if (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
    return data || [];
}
async function addGalleryItem(imageUrl, caption) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Get max sort order
    const { data: maxOrder } = await supabase.from("gallery").select("sort_order").order("sort_order", {
        ascending: false
    }).limit(1).single();
    const { data, error } = await supabase.from("gallery").insert({
        image_url: imageUrl,
        caption,
        sort_order: (maxOrder?.sort_order || 0) + 1
    }).select().single();
    if (error) {
        return {
            success: false,
            error: error.message,
            data: null
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true,
        data
    };
}
async function deleteGalleryItem(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true
    };
}
async function updateGalleryItem(id, updates) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const payload = {
        ...updates,
        updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from("gallery").update(payload).eq("id", id).select().single();
    if (error) {
        console.error("updateGalleryItem: supabase update error", {
            error,
            id,
            payload
        });
        return {
            success: false,
            error: error.message || JSON.stringify(error),
            data: null
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true,
        data
    };
}
async function getGuests() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("guests").select("*").order("created_at", {
        ascending: false
    });
    if (error) {
        console.error("Error fetching guests:", error);
        return [];
    }
    return data || [];
}
async function addGuest(guestData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const slug = guestData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).substr(2, 6);
    const payload = {
        name: guestData.name,
        slug,
        unique_slug: slug,
        phone: guestData.phone,
        address: guestData.address,
        attendance_status: "pending",
        guest_count: guestData.guest_count || 1
    };
    const { data, error } = await supabase.from("guests").insert(payload).select().single();
    if (error) {
        // Log full error and payload to help debug PostgREST 400 issues
        console.error("addGuest: supabase insert error", {
            error,
            payload
        });
        return {
            success: false,
            error: error.message || JSON.stringify(error),
            data: null
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true,
        data
    };
}
async function updateGuest(id, updates) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const payload = {
        ...updates,
        updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from("guests").update(payload).eq("id", id).select().single();
    if (error) {
        console.error("updateGuest: supabase update error", {
            error,
            id,
            payload
        });
        return {
            success: false,
            error: error.message || JSON.stringify(error),
            data: null
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true,
        data
    };
}
async function deleteGuest(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (error) {
        console.error("deleteGuest: supabase delete error", {
            error,
            id
        });
        return {
            success: false,
            error: error.message || JSON.stringify(error)
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true
    };
}
async function getAllComments() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("comments").select("*").order("created_at", {
        ascending: false
    });
    if (error) {
        console.error("Error fetching all comments:", error);
        return [];
    }
    return data || [];
}
async function toggleCommentApproval(id, currentStatus) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("comments").update({
        is_approved: !currentStatus
    }).eq("id", id);
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true,
        newStatus: !currentStatus
    };
}
async function deleteComment(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    return {
        success: true
    };
}
// ============ Guests blasting helpers ============
function normalizePhoneForWa(phone) {
    if (!phone) return null;
    const digits = phone.replace(/[^0-9]/g, "");
    if (digits.startsWith("0")) return "62" + digits.slice(1);
    if (digits.startsWith("62")) return digits;
    if (digits.startsWith("8")) return "62" + digits;
    return digits;
}
function interpolateTemplate(template, data) {
    // Support both {key} and {{key}} placeholders
    return template.replace(/\{\{?\s*(\w+)\s*\}?\}/g, (_, key)=>{
        const v = data[key];
        return v == null ? "" : String(v);
    });
}
function transformFormattingForWhatsApp(text) {
    if (!text) return text;
    // HTML-like tags -> WhatsApp formatting
    // Bold/strong -> *text*
    text = text.replace(/<\s*(?:b|strong)>([\s\S]*?)<\s*\/\s*(?:b|strong)>/gi, '*$1*');
    // Italic/em -> _text_
    text = text.replace(/<\s*(?:i|em)>([\s\S]*?)<\s*\/\s*(?:i|em)>/gi, '_$1_');
    // Strikethrough -> ~text~
    text = text.replace(/<\s*(?:s|strike|del)>([\s\S]*?)<\s*\/\s*(?:s|strike|del)>/gi, '~$1~');
    // Code/pre -> ```text``` (preserve newlines)
    text = text.replace(/<\s*(?:pre|code)>([\s\S]*?)<\s*\/\s*(?:pre|code)>/gi, '```$1```');
    // Underline is not supported by WhatsApp; map <u> to italic as closest alternative
    text = text.replace(/<\s*u>([\s\S]*?)<\s*\/\s*u>/gi, '_$1_');
    // Markdown-like shortcuts: **bold** -> *bold*, __underline__ -> _underline_ (note: WhatsApp doesn't support underline)
    text = text.replace(/\*\*(.*?)\*\*/g, '*$1*');
    text = text.replace(/__(.*?)__/g, '_$1_');
    return text;
}
async function ensureGuestUniqueCode(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: g, error: fetchErr } = await supabase.from("guests").select("id,unique_code").eq("id", id).single();
    if (fetchErr) {
        console.error("ensureGuestUniqueCode: fetch error", fetchErr);
        return null;
    }
    if (g.unique_code) return g.unique_code;
    const code = substringRandomCode();
    const { error: updErr } = await supabase.from("guests").update({
        unique_code: code
    }).eq("id", id);
    if (updErr) {
        console.error("ensureGuestUniqueCode: update error", updErr);
        return null;
    }
    return code;
}
function substringRandomCode() {
    return Math.random().toString(36).substr(2, 9);
}
async function generateBlastMessageForGuest(guestId, origin) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: guest, error: gErr } = await supabase.from("guests").select("*").eq("id", guestId).single();
    if (gErr || !guest) {
        console.error("generateBlastMessageForGuest: guest fetch error", gErr);
        return {
            success: false,
            error: gErr?.message || "Guest not found"
        };
    }
    const settings = await getWeddingSettings();
    // Ensure unique code exists
    if (!guest.unique_code) {
        const code = Math.random().toString(36).substr(2, 9);
        await supabase.from("guests").update({
            unique_code: code
        }).eq("id", guestId);
        guest.unique_code = code;
    }
    // Use origin parameter if provided (dynamic from request), otherwise fallback to env var
    const baseUrlRaw = origin || ("TURBOPACK compile-time value", "https://wedd-inv-ten.vercel.app") || process.env.SITE_URL || "";
    const baseUrl = String(baseUrlRaw).replace(/\/$/, "");
    // Make the link format match the client clipboard link: `${origin}?to=<slug>`
    const link = `${baseUrl}?to=${encodeURIComponent(guest.unique_slug || guest.slug || guest.id)}`;
    const template = settings?.whatsapp_template || "Halo {name}, Anda diundang. Silakan lihat: {link} (kode: {unique_code})";
    // Detect whether admin included a {link} placeholder; if not, we'll append the link after formatting
    const includesLinkPlaceholder = /\{\{?\s*link\s*\}?\}/i.test(template);
    let message = interpolateTemplate(template, {
        name: guest.name,
        unique_code: guest.unique_code,
        link
    });
    // Apply WhatsApp formatting conversions (HTML-like tags or markdown shortcuts)
    message = transformFormattingForWhatsApp(message);
    // If template didn't include link, append it at the end so the invite always contains the URL
    if (!includesLinkPlaceholder) {
        message = `${message}\n\n${link}`;
    }
    const phone = normalizePhoneForWa(guest.phone);
    if (!phone) return {
        success: false,
        error: "No phone number"
    };
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    return {
        success: true,
        waLink,
        message
    };
}
async function sendWhatsAppViaTwilio(guestId) {
    // Optional: if TWILIO env vars are present, attempt to send via Twilio's API
    const SID = process.env.TWILIO_ACCOUNT_SID;
    const TOKEN = process.env.TWILIO_AUTH_TOKEN;
    const FROM = process.env.TWILIO_WHATSAPP_FROM // e.g. 'whatsapp:+1415...'
    ;
    if (!SID || !TOKEN || !FROM) {
        return {
            success: false,
            error: "Twilio credentials not configured"
        };
    }
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: guest, error: gErr } = await supabase.from("guests").select("*").eq("id", guestId).single();
    if (gErr || !guest) return {
        success: false,
        error: gErr?.message || "Guest not found"
    };
    // ensure unique_code
    let code = guest.unique_code;
    if (!code) {
        code = Math.random().toString(36).substr(2, 9);
        await supabase.from("guests").update({
            unique_code: code
        }).eq("id", guestId);
    }
    const settings = await getWeddingSettings();
    const template = settings?.whatsapp_template || "Halo {name}, Anda diundang. Silakan lihat: {link} (kode: {unique_code})";
    const baseUrlRaw = ("TURBOPACK compile-time value", "https://wedd-inv-ten.vercel.app") || process.env.SITE_URL || "";
    const baseUrl = String(baseUrlRaw).replace(/\/$/, "");
    const link = `${baseUrl}?to=${encodeURIComponent(guest.unique_slug || guest.slug || guest.id)}`;
    const message = interpolateTemplate(template, {
        name: guest.name,
        unique_code: code,
        link
    });
    const phone = normalizePhoneForWa(guest.phone);
    if (!phone) return {
        success: false,
        error: "No phone number"
    };
    const url = `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`;
    const payload = new URLSearchParams();
    payload.append("To", `whatsapp:+${phone}`);
    payload.append("From", FROM);
    payload.append("Body", message);
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: payload.toString()
        });
        const json = await res.json();
        if (!res.ok) {
            console.error("sendWhatsAppViaTwilio: twilio error", json);
            return {
                success: false,
                error: json
            };
        }
        // update guest last_blasted_at / blast_status
        await supabase.from("guests").update({
            last_blasted_at: new Date().toISOString(),
            blast_status: "sent"
        }).eq("id", guestId);
        return {
            success: true,
            data: json
        };
    } catch (err) {
        console.error("sendWhatsAppViaTwilio: exception", err);
        return {
            success: false,
            error: err
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    getComments,
    submitComment,
    updateRSVP,
    getGuestBySlug,
    getWeddingSettings,
    updateWeddingSettings,
    getGalleryItems,
    addGalleryItem,
    deleteGalleryItem,
    updateGalleryItem,
    getGuests,
    addGuest,
    updateGuest,
    deleteGuest,
    getAllComments,
    toggleCommentApproval,
    deleteComment,
    ensureGuestUniqueCode,
    generateBlastMessageForGuest,
    sendWhatsAppViaTwilio
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAdmin, "606f1055e72dea0b21187aefe9fe2e50a61dfafe56", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAdmin, "00d5ff70421c2ac28a87cdd4f2786f1658e2a29363", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(changeAdminPassword, "40d69fb88c5ce7d0aba647b3a6c8c172df4b35398c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getComments, "00659d7fa23e09197aa35c45470b309f1f2ddb9f5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitComment, "40a174fa9d29da1d096e047a12586ecfd5b9fd3397", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateRSVP, "707fcd43996819762dc75ddf0abac3a4ed7b031c51", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGuestBySlug, "4082f8f13b84a78ec08e96ca0d72f790ff252a775d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getWeddingSettings, "002ff7a1c92c2f1f2efabbae1f34d592e04786c446", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateWeddingSettings, "606bd2a29a0156c3c66ee0267b3fb5151f8a6e895e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGalleryItems, "00b4e4e76bfc6f71294af3e72f7059d4a7d4056f46", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addGalleryItem, "607c67e95d4085b0cd6a9aa88e715f8c59cdf7e125", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteGalleryItem, "40f4f3448fdc59a07274493b411aa52a710f1757a8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateGalleryItem, "6069623c0c37ce6a02e418cf83487a7fe23f14fba5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGuests, "00a4889b7d39381017795ca03ddf4054b50987dc12", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addGuest, "40da4668a1838c6a2ab759c65f53cc6b255480617f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateGuest, "60a28c76be918098e664d8fb2c41c0c0ba085dd191", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteGuest, "40816399b044ab0bfdc1ce58364b542bc40d09aa0c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllComments, "00b9b342a773fbfd0a4fd83ca6a057fbbb9f044b6a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleCommentApproval, "6087a7b6198164b65edecede36ad30416c80bed8b6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteComment, "40f27b2696e3faab2e4b78efd2dcec2407c3bb1092", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ensureGuestUniqueCode, "40f6c3c779e9376d16e08c56d29bc3469e2b9f86e0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateBlastMessageForGuest, "602c988938c9f9c38a2d90410b4325622888e7410a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendWhatsAppViaTwilio, "40f9a5062a84a8b6287b41fca36d88c407375bf303", null);
}),
"[project]/VSCode/wedd-inv/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/VSCode/wedd-inv/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/lib/actions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/VSCode/wedd-inv/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/VSCode/wedd-inv/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00659d7fa23e09197aa35c45470b309f1f2ddb9f5f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getComments"],
    "40a174fa9d29da1d096e047a12586ecfd5b9fd3397",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitComment"],
    "707fcd43996819762dc75ddf0abac3a4ed7b031c51",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateRSVP"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/VSCode/wedd-inv/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/VSCode/wedd-inv/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$VSCode$2f$wedd$2d$inv$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/VSCode/wedd-inv/lib/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=VSCode_wedd-inv_7ba5447b._.js.map