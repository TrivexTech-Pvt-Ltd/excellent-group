"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    LogOut,
    ExternalLink,
    Menu,
    X,
} from "lucide-react";

const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/", label: "View Website", icon: ExternalLink, external: true },
];

export default function AdminShell({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-zinc-950 text-white overflow-hidden">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Brand */}
                <div className="px-6 pt-8 pb-6 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-black tracking-tight uppercase">
                            Excellent <span className="text-blue-500 font-black">Group</span>
                        </h1>
                        <p className="text-[10px] text-zinc-500 mt-0.5 font-bold uppercase tracking-widest">Admin Control</p>
                    </div>
                    <button
                        className="lg:hidden text-zinc-400 hover:text-white"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navLinks.map(({ href, label, icon: Icon, external }) => (
                        <Link
                            key={href}
                            href={href}
                            target={external ? "_blank" : undefined}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all text-sm font-medium group"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <Icon size={18} className="group-hover:text-blue-400 transition-colors" />
                            {label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 flex-shrink-0 px-4 md:px-8 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                        <h2 className="text-lg md:text-xl font-bold text-white truncate">{title}</h2>
                    </div>

                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-xs font-bold border border-zinc-800 hover:border-red-900/30"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </form>
                </header>

                {/* Main Viewport */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
