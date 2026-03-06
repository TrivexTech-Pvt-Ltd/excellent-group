"use client";

import { useRef, useState } from "react";
import { updateClientAction } from "@/app/admin/actions";
import { UploadCloud, X, ImageIcon, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Props {
    client: {
        id: string;
        name: string;
        logo: string;
    };
}

export default function EditClientForm({ client }: Props) {
    const [logoUrl, setLogoUrl] = useState(client.logo);
    const [previewSrc, setPreviewSrc] = useState(client.logo);
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
            fd.append("folder", "clients");
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Upload failed");
            setLogoUrl(data.url);
        } catch (err: any) {
            setUploadError(err.message ?? "Upload failed");
            setPreviewSrc(client.logo);
            setLogoUrl(client.logo);
            if (fileRef.current) fileRef.current.value = "";
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        const fd = new FormData(e.currentTarget);
        fd.set("logo", logoUrl);
        await updateClientAction(client.id, fd);
        setSaving(false);
    }

    return (
        <div className="max-w-xl">
            <Link
                href="/admin/clients"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors"
            >
                <ArrowLeft size={15} /> Back to Clients
            </Link>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                            Client Name *
                        </label>
                        <input
                            name="name"
                            defaultValue={client.name}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                            Client Logo *
                        </label>

                        {/* Preview */}
                        <div className="relative rounded-xl overflow-hidden h-32 bg-zinc-800 group flex items-center justify-center border border-zinc-700">
                            {previewSrc ? (
                                <img
                                    src={previewSrc}
                                    alt="preview"
                                    className="max-h-full max-w-full object-contain p-4"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                    <UploadCloud size={32} />
                                </div>
                            )}

                            {/* Uploading overlay */}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                                    <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
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
                                        <span className="text-xs font-medium">Change Logo</span>
                                    </div>
                                </div>
                            )}

                            {/* Uploaded badge */}
                            {!uploading && logoUrl !== client.logo && (
                                <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs px-2 py-0.5 rounded-full">
                                    ✓ New logo uploaded
                                </div>
                            )}
                        </div>

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

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                        >
                            <Save size={16} />
                            {saving ? "Saving…" : uploading ? "Uploading…" : "Save Changes"}
                        </button>
                        <Link
                            href="/admin/clients"
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
