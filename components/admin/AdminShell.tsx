import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    LogOut,
    ExternalLink,
} from "lucide-react";

const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/clients", label: "Clients", icon: Users },
];

export default function AdminShell({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className="min-h-screen flex bg-zinc-950 text-white">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col">
                {/* Brand */}
                <div className="px-6 pt-8 pb-6 border-b border-zinc-800">
                    <h1 className="text-lg font-black tracking-tight">
                        Excellent <span className="text-blue-400">Group</span>
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Admin Panel</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium group"
                        >
                            <Icon size={17} className="group-hover:text-blue-400 transition-colors" />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-3 py-4 border-t border-zinc-800 space-y-1">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm"
                    >
                        <ExternalLink size={17} />
                        View Website
                    </Link>
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-900/20 transition-colors text-sm"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="px-8 py-5 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
        </div>
    );
}
