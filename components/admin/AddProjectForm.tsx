"use client";

import { useActionState, useRef, useState } from "react";
import { createProjectAction } from "@/app/admin/actions";
import { PlusCircle, UploadCloud, X, ImageIcon } from "lucide-react";

export default function AddProjectForm() {
    const [state, formAction, isPending] = useActionState(createProjectAction, null);
    const [imageUrl, setImageUrl] = useState("");
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

        // Show local preview instantly
        const reader = new FileReader();
        reader.onload = (ev) => setPreviewSrc(ev.target?.result as string);
        reader.readAsDataURL(file);

        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Upload failed");
            setImageUrl(data.url);
        } catch (err: any) {
            setUploadError(err.message ?? "Upload failed");
            setPreviewSrc("");
            setImageUrl("");
            if (fileRef.current) fileRef.current.value = "";
        } finally {
            setUploading(false);
        }
    }

    function clearImage() {
        setPreviewSrc("");
        setImageUrl("");
        setUploadError("");
        if (fileRef.current) fileRef.current.value = "";
    }

    async function handleSubmit(formData: FormData) {
        // Inject the uploaded image URL before sending to the server action
        formData.set("image", imageUrl);
        await (formAction as (fd: FormData) => void)(formData);
        // Reset on success
        clearImage();
        formRef.current?.reset();
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-5">
            {/* Project Name */}
            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Project Name *
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-500 text-sm transition"
                    placeholder="e.g. E-commerce Platform"
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Project Image *
                </label>

                {/* Drop zone / preview */}
                {previewSrc ? (
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-800 group">
                        <img
                            src={previewSrc}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Uploading overlay */}
                        {uploading && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                <span className="text-white text-xs">Uploading…</span>
                            </div>
                        )}
                        {/* Remove button */}
                        {!uploading && (
                            <button
                                type="button"
                                onClick={clearImage}
                                className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-red-600 transition"
                            >
                                <X size={14} />
                            </button>
                        )}
                        {/* Uploaded indicator */}
                        {!uploading && imageUrl && (
                            <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs px-2 py-0.5 rounded-full">
                                ✓ Uploaded
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="w-full aspect-video bg-zinc-800 border-2 border-dashed border-zinc-700 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center gap-3 text-zinc-400 hover:text-blue-400 transition-colors group"
                    >
                        <UploadCloud size={28} className="group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                            <p className="text-sm font-medium">Click to upload image</p>
                            <p className="text-xs text-zinc-600 mt-0.5">PNG, JPG, WebP • Max 5 MB</p>
                        </div>
                    </button>
                )}

                {/* Hidden file input */}
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Click to change (when image is set) */}
                {previewSrc && !uploading && (
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                    >
                        <ImageIcon size={12} /> Change image
                    </button>
                )}

                {uploadError && (
                    <p className="mt-1.5 text-red-400 text-xs">{uploadError}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Description *
                </label>
                <textarea
                    name="description"
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-500 text-sm resize-none transition"
                    placeholder="Brief description of the project…"
                />
            </div>

            {/* URL (optional) */}
            <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Project URL{" "}
                    <span className="text-zinc-600 normal-case font-normal">(optional)</span>
                </label>
                <input
                    name="url"
                    type="url"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-500 text-sm transition"
                    placeholder="https://example.com"
                />
            </div>

            {/* Server feedback */}
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
                disabled={isPending || uploading || (!imageUrl && !previewSrc === false && !imageUrl)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
                <PlusCircle size={16} />
                {isPending ? "Adding…" : uploading ? "Uploading image…" : "Add Project"}
            </button>
        </form>
    );
}
