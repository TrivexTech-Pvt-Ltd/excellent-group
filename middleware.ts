import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow login page
    if (pathname === "/admin/login") {
        const session = request.cookies.get("admin_session")?.value;
        if (session) {
            try {
                await decrypt(session);
                return NextResponse.redirect(new URL("/admin", request.url));
            } catch {
                // invalid session, let through
            }
        }
        return NextResponse.next();
    }

    // Protect all /admin/* routes
    if (pathname.startsWith("/admin")) {
        const session = request.cookies.get("admin_session")?.value;
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        try {
            await decrypt(session);
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
