import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Layout for all public-facing pages: /, /about, /contact, /[slug], etc.
 * This is a route group layout — it does NOT re-declare <html> or <body>,
 * just wraps children with Navbar and Footer.
 */
export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
