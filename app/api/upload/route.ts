import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using the CLOUDINARY_URL from the environment
cloudinary.config({
    secure: true,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const folder = (formData.get("folder") as string) || "others";

        if (!file || file.size === 0) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }

        // Validate type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
        }

        // Max 5 MB
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File size must be under 5MB." }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a Promise to handle the stream
        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `excellent-group/${folder}`, // Organized folder structure in Cloudinary
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(buffer);
        });

        // Return the secure URL from Cloudinary
        return NextResponse.json({ url: result.secure_url });
    } catch (error) {
        console.error("[/api/upload]", error);
        return NextResponse.json({ error: "Upload to Cloudinary failed." }, { status: 500 });
    }
}
