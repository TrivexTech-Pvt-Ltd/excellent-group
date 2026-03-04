"use client";

import { useRef, useState } from "react";
import { updateProjectAction } from "@/app/admin/actions";
import { UploadCloud, X, ImageIcon, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Props {
    project: {
        id: string;
        name: string;
        description: string;
        image: string;
        url: string | null;
    };
}

export default function EditProjectForm({ project }: Props) {
    const [imageUrl, setImageUrl] = useState(project.image);
    const [previewSrc, setPreviewSrc] = useState(project.image);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

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
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Upload failed");
            setImageUrl(data.url);
        } catch (err: any) {
            setUploadError(err.message ?? "Upload failed");
            setPreviewSrc(project.image);
            setImageUrl(project.image);
            if (fileRef.current) fileRef.current.value = "";
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        const fd = new FormData(e.currentTarget);
        fd.set("image", imageUrl);
        await updateProjectAction(project.id, fd);
        setSaving(false);
    }

    return (
        <div className="max-w-xl">
            <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors"
            >
                <ArrowLeft size={15} /> Back to Projects
            </Link>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                            Project Name *
                        </label>
                        <input
                            name="name"
                            defaultValue={project.name}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                            Project Image *
                        </label>

                        {/* Preview */}
                        <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-800 group">
                            {previewSrc ? (
                                <img
                                    src={previewSrc}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                    <UploadCloud size={32} />
                                </div>
                            )}

                            {/* Uploading overlay */}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                                    <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-white text-xs">Uploading…</span>
                                </div>
                            )}

                            {/* Hover overlay to change */}
                            {!uploading && (
                                <div
                                    className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all cursor-pointer"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <div className="flex flex-col items-center gap-2 text-white">
                                        <UploadCloud size={24} />
                                        <span className="text-xs font-medium">Change Image</span>
                                    </div>
                                </div>
                            )}

                            {/* Uploaded badge */}
                            {!uploading && imageUrl !== project.image && (
                                <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs px-2 py-0.5 rounded-full">
                                    ✓ New image uploaded
                                </div>
                            )}
                        </div>

                        {/* Change image button */}
                        {!uploading && (
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                            >
                                <ImageIcon size={12} /> Click to change image
                            </button>
                        )}

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

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
                            defaultValue={project.description}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none transition"
                        />
                    </div>

                    {/* URL */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                            Project URL{" "}
                            <span className="text-zinc-600 normal-case font-normal">(optional)</span>
                        </label>
                        <input
                            name="url"
                            type="url"
                            defaultValue={project.url ?? ""}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                        >
                            <Save size={16} />
                            {saving ? "Saving…" : uploading ? "Uploading…" : "Save Changes"}
                        </button>
                        <Link
                            href="/admin/projects"
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 rounded-xl transition-colors text-sm text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
