import { sql } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { FolderKanban, Users, Plus, Globe, ExternalLink } from "lucide-react";

export default async function AdminDashboard() {
    const [{ count: projectCount }] = await sql`SELECT count(*) FROM "Project"`;
    const [{ count: clientCount }] = await sql`SELECT count(*) FROM "Client"`;

    return (
        <AdminShell title="Dashboard">
            <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        icon={<FolderKanban size={22} className="text-blue-400" />}
                        label="Total Projects"
                        value={projectCount}
                        href="/admin/projects"
                        color="blue"
                    />
                    <StatCard
                        icon={<Users size={22} className="text-purple-400" />}
                        label="Total Clients"
                        value={clientCount}
                        href="/admin/clients"
                        color="purple"
                    />
                    <StatCard
                        icon={<Globe size={22} className="text-emerald-400" />}
                        label="Main Website"
                        value="View"
                        href="/"
                        color="emerald"
                        external
                    />
                </div>

                {/* Quick actions */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                        Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/admin/projects"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                            <Plus size={16} /> Add Project
                        </Link>
                        <Link
                            href="/admin/clients"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                            <Plus size={16} /> Add Client
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                            <Globe size={16} /> View Website
                        </Link>
                    </div>
                </div>

                {/* Info */}
                <div className="bg-blue-950/30 border border-blue-800/40 rounded-2xl p-6">
                    <p className="text-blue-300 text-sm leading-relaxed">
                        <strong className="text-blue-200">Tip:</strong> Projects and clients
                        you add here will automatically appear on the main website. Use the
                        sidebar to navigate between sections.
                    </p>
                </div>
            </div>
        </AdminShell>
    );
}

function StatCard({
    icon,
    label,
    value,
    href,
    color,
    external,
}: {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    href: string;
    color: "blue" | "purple" | "emerald";
    external?: boolean;
}) {
    const ringColor =
        color === "blue" ? "ring-blue-800/40" :
            color === "purple" ? "ring-purple-800/40" :
                "ring-emerald-800/40";

    const bgColor =
        color === "blue" ? "bg-blue-950/30" :
            color === "purple" ? "bg-purple-950/30" :
                "bg-emerald-950/30";

    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            className={`block ${bgColor} border ${ringColor} ring-1 rounded-2xl p-6 hover:scale-[1.02] transition-transform group`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                    {icon}
                </div>
                {external && <ExternalLink size={14} className="text-zinc-600 group-hover:text-zinc-400" />}
            </div>
            <p className="text-zinc-400 text-sm font-medium">{label}</p>
            <p className="text-4xl font-black text-white mt-1 uppercase tracking-tighter">{value}</p>
        </Link>
    );
}
