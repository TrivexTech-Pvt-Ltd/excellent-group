import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Excellent Group",
};

/**
 * Admin section layout.
 * Does NOT re-declare <html> or <body> — those come from app/layout.tsx.
 * Simply passes children through; the AdminShell component inside each
 * admin page provides the full-screen dark sidebar layout.
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
