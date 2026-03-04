"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// ─── Auth Actions ───────────────────────────────────────────────────────────

export async function loginAction(_prevState: unknown, formData: FormData) {
    const username = (formData.get("username") as string)?.trim();
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { error: "Username and password are required." };
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return { error: "Invalid username or password." };
    }

    const token = await encrypt({ userId: user.id, username: user.username });
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
    });

    redirect("/admin");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "", { maxAge: 0, path: "/" });
    redirect("/admin/login");
}

// ─── Project Actions ─────────────────────────────────────────────────────────

export async function createProjectAction(_prevState: unknown, formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const image = (formData.get("image") as string)?.trim();
    const url = (formData.get("url") as string)?.trim() || null;

    if (!name || !description || !image) {
        return { error: "Name, description, and image are required." };
    }

    await prisma.project.create({ data: { name, description, image, url } });
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: "Project added successfully." };
}

export async function updateProjectAction(id: string, formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const image = (formData.get("image") as string)?.trim();
    const url = (formData.get("url") as string)?.trim() || null;

    await prisma.project.update({
        where: { id },
        data: { name, description, image, url },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    redirect("/admin/projects");
}

// ─── Client Actions ───────────────────────────────────────────────────────────

export async function createClientAction(_prevState: unknown, formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const logo = (formData.get("logo") as string)?.trim();

    if (!name || !logo) {
        return { error: "Name and logo are required." };
    }

    await prisma.client.create({ data: { name, logo } });
    revalidatePath("/admin");
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: "Client added successfully." };
}

export async function updateClientAction(id: string, formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const logo = (formData.get("logo") as string)?.trim();

    await prisma.client.update({
        where: { id },
        data: { name, logo },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/clients");
    revalidatePath("/");
    redirect("/admin/clients");
}

export async function deleteClientAction(id: string) {
    await prisma.client.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/admin/clients");
    revalidatePath("/");
    redirect("/admin/clients");
}
