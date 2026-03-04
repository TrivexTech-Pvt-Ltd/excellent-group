import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import { notFound } from "next/navigation";
import { updateClientAction } from "@/app/admin/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditClientPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) notFound();

    const update = updateClientAction.bind(null, id);

    return (
        <AdminShell title="Edit Client">
            <div className="max-w-xl">
                <Link
                    href="/admin/clients"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-6 transition-colors"
                >
                    <ArrowLeft size={15} /> Back to Clients
                </Link>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                    <form action={update} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                                Client Name *
                            </label>
                            <input
                                name="name"
                                defaultValue={client.name}
                                required
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
                                Logo URL / Filename *
                            </label>
                            <input
                                name="logo"
                                defaultValue={client.logo}
                                required
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                            >
                                Save Changes
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
        </AdminShell>
    );
}
