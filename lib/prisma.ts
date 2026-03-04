import { PrismaClient } from "@prisma/client";
import path from "path";
import { createRequire } from "module";

// In Netlify serverless functions, process.cwd() is NOT the project root.
// We use a known fallback path. On Netlify, deployed files live at /var/task.
// We also try resolving relative to the current file using import.meta or __dirname fallbacks.
const getDatabaseUrl = (): string => {
    if (process.env.DATABASE_URL) {
        // If it's already an absolute path (file:/path/...), use as-is
        if (!process.env.DATABASE_URL.startsWith("file:./")) {
            return process.env.DATABASE_URL;
        }
        // Convert relative to absolute from project root candidates
        const relativePath = process.env.DATABASE_URL.replace("file:./", "");
        const candidates = [
            path.resolve(process.cwd(), relativePath),
            path.resolve("/var/task", relativePath),           // Netlify functions root
            path.resolve("/opt/build/repo", relativePath),     // Netlify build root
        ];
        for (const candidate of candidates) {
            try {
                require("fs").accessSync(candidate);
                return `file:${candidate}`;
            } catch { /* try next */ }
        }
        // Fall back to first candidate even if not found
        return `file:${candidates[0]}`;
    }

    // No DATABASE_URL set — build fallback candidates
    const name = "prisma/dev.db";
    const candidates = [
        path.resolve(process.cwd(), name),
        path.resolve("/var/task", name),
        path.resolve("/opt/build/repo", name),
    ];
    for (const candidate of candidates) {
        try {
            require("fs").accessSync(candidate);
            return `file:${candidate}`;
        } catch { /* try next */ }
    }
    return `file:${candidates[0]}`;
};

const databaseUrl = getDatabaseUrl();
if (process.env.NODE_ENV !== 'production') {
    console.log("Prisma: Initializing with", databaseUrl);
}
process.env.DATABASE_URL = databaseUrl;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ?? new PrismaClient({
        log: ["error"],
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
