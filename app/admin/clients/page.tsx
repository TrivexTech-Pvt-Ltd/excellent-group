import { sql } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import AddClientForm from "@/components/admin/AddClientForm";
import { ClientThumb } from "@/components/admin/Thumbnails";
import Link from "next/link";
import { deleteClientAction } from "@/app/admin/actions";
import { Pencil, Trash2 } from "lucide-react";

export default async function AdminClientsPage() {
    const clients = await sql`
        SELECT * FROM "Client" ORDER BY "createdAt" DESC
    `;

    return (
        <AdminShell title="Manage Clients">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="xl:col-span-1">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-5">
                            New Client
                        </h3>
                        <AddClientForm />
                    </div>
                </div>

                {/* Clients list */}
                <div className="xl:col-span-2 space-y-4">
                    {clients.length === 0 ? (
                        <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                            <p className="text-zinc-500 text-sm">No clients yet. Add one on the left →</p>
                        </div>
                    ) : (
                        clients.map((client) => (
                            <div
                                key={client.id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 hover:border-zinc-700 transition-colors"
                            >
                                {/* Logo */}
                                <div className="w-14 h-14 rounded-xl bg-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                    <ClientThumb src={client.logo} name={client.name} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-semibold text-sm">{client.name}</h4>
                                    <p className="text-zinc-500 text-xs truncate mt-0.5">{client.logo}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end border-t border-zinc-800 sm:border-0 pt-3 sm:pt-0">
                                    <Link
                                        href={`/admin/clients/${client.id}`}
                                        className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-zinc-400 hover:text-white"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </Link>
                                    <form
                                        action={async () => {
                                            "use server";
                                            await deleteClientAction(client.id);
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="p-2 bg-zinc-800 hover:bg-red-900/50 rounded-xl transition-colors text-zinc-400 hover:text-red-400"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminShell>
    );
}
