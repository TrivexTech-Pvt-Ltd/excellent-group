import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the environment variables');
}

export interface User {
    id: string;
    username: string;
    password: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    image: string;
    url: string | null;
    createdAt: Date;
}

export interface Client {
    id: string;
    name: string;
    logo: string;
    createdAt: Date;
}

// We use the postgres package to connect to Neon.
// This works well with Next.js Server Components and Server Actions.
export const sql = postgres(DATABASE_URL, {
    ssl: 'require',
    max: 10, // Adjust connection pool size as needed
});
