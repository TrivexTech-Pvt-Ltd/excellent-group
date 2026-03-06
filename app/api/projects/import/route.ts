import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * POST /api/projects/import
 * Body: { name, description, image, url? }
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, image, url } = body;

        if (!name || !description || !image) {
            return NextResponse.json(
                { error: "Fields 'name', 'description', and 'image' are required." },
                { status: 400 }
            );
        }

        const id = crypto.randomUUID();
        const [project] = await sql`
            INSERT INTO "Project" (id, name, description, image, url)
            VALUES (${id}, ${String(name)}, ${String(description)}, ${String(image)}, ${url ? String(url) : null})
            RETURNING *
        `;

        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error) {
        console.error("[/api/projects/import]", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}

/**
 * GET /api/projects/import
 * Returns all projects (useful for other apps to sync).
 */
export async function GET() {
    const projects = await sql`
        SELECT * FROM "Project" ORDER BY "createdAt" DESC
    `;
    return NextResponse.json({ projects });
}
