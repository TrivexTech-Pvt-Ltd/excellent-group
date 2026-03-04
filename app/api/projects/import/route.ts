import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * POST /api/projects/import
 * Body: { name, description, image, url? }
 *
 * This endpoint allows any external project/app to push a project
 * directly into the Excellent Group website.
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

        const project = await prisma.project.create({
            data: {
                name: String(name),
                description: String(description),
                image: String(image),
                url: url ? String(url) : null,
            },
        });

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
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ projects });
}
