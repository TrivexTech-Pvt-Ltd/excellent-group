"use client";

import { useActionState, useRef, useState } from "react";
import { createClientAction } from "@/app/admin/actions";
import { PlusCircle, UploadCloud, ImageIcon, X } from "lucide-react";

export default function AddClientForm() {
    const [state, formAction, isPending] = useActionState(createClientAction, null);
    const [logoUrl, setLogoUrl] = useState("");
    const [previewSrc, setPreviewSrc] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadError("");
        setUploading(true);

        const reader = new FileReader();
        reader.onload = (ev) => setPreviewSrc(ev.target?.result as string);
        reader.readAsDataURL(file);

        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("folder", "clients");
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Upload failed");
            setLogoUrl(data.url);
        } catch (err: any) {
            setUploadError(err.message ?? "Upload failed");
            setPreviewSrc("");
            setLogoUrl("");
            if (fileRef.current) fileRef.current.value = "";
        } finally {
            setUploading(false);
        }
    }

    function clearLogo() {
        setPreviewSrc("");
        setLogoUrl("");
        setUploadError("");
        if (fileRef.current) fileRef.current.value = "";
    }

    async function handleSubmit(formData: FormData) {
        formData.set("logo", logoUrl);
        await (formAction as (fd: FormData) => void)(formData);
        clearLogo();
        formRef.current?.reset();
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-5">
            {/* Client Name */}
            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Client Name *
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500 text-sm transition"
                    placeholder="e.g. Acme Corporation"
                />
            </div>

            {/* Logo Upload */}
            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Client Logo *
                </label>

                {previewSrc ? (
                    <div className="relative rounded-xl overflow-hidden bg-zinc-800 h-28 flex items-center justify-center group">
                        <img
                            src={previewSrc}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain p-3"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                                <div className="w-7 h-7 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                                <span className="text-white text-xs">Uploading…</span>
                            </div>
                        )}
                        {!uploading && (
                            <button
                                type="button"
                                onClick={clearLogo}
                                className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-red-600 transition"
                            >
                                <X size={14} />
                            </button>
                        )}
                        {!uploading && logoUrl && (
                            <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs px-2 py-0.5 rounded-full">
                                ✓ Uploaded
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="w-full h-28 bg-zinc-800 border-2 border-dashed border-zinc-700 hover:border-purple-500 rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group"
                    >
                        <UploadCloud size={24} className="group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                            <p className="text-xs font-medium">Click to upload logo</p>
                            <p className="text-xs text-zinc-600 mt-0.5">PNG, SVG, WebP • Max 5 MB</p>
                        </div>
                    </button>
                )}

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {previewSrc && !uploading && (
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                    >
                        <ImageIcon size={12} /> Change logo
                    </button>
                )}

                {uploadError && (
                    <p className="mt-1.5 text-red-400 text-xs">{uploadError}</p>
                )}
            </div>

            {state?.error && (
                <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-xl px-4 py-2">
                    {state.error}
                </p>
            )}
            {state?.success && (
                <p className="text-green-400 text-sm bg-green-900/20 border border-green-800 rounded-xl px-4 py-2">
                    {state.success}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending || uploading}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
                <PlusCircle size={16} />
                {isPending ? "Adding…" : uploading ? "Uploading logo…" : "Add Client"}
            </button>
        </form>
    );
}
