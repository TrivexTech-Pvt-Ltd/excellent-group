import { PrismaClient } from "@prisma/client";
import path from "path";

// Prisma SQLite paths are tricky between build and runtime.
// We force an absolute path to ensure accuracy.
const getDatabaseUrl = () => {
    if (process.env.DATABASE_URL) {
        if (process.env.DATABASE_URL.startsWith("file:./")) {
            const relativePath = process.env.DATABASE_URL.replace("file:./", "");
            // If the path doesn't already include 'prisma/', we check if the file is in 'prisma/'
            // Standard Prisma setup keeps SQLite in the 'prisma' directory.
            if (!relativePath.startsWith("prisma/")) {
                return `file:${path.resolve(process.cwd(), "prisma", relativePath)}`;
            }
            return `file:${path.resolve(process.cwd(), relativePath)}`;
        }
        return process.env.DATABASE_URL;
    }

    // Fallback for Netlify build where DATABASE_URL is missing
    return `file:${path.resolve(process.cwd(), "prisma/dev.db")}`;
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
