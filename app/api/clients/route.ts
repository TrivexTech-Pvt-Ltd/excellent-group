import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const clients = await sql`SELECT * FROM "Client" ORDER BY "createdAt" DESC`;
        return NextResponse.json(clients);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
    }
}
