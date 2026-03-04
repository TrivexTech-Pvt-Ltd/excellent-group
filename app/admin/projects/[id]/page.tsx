import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import { notFound } from "next/navigation";
import EditProjectForm from "@/components/admin/EditProjectForm";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) notFound();

    return (
        <AdminShell title="Edit Project">
            <EditProjectForm project={project} />
        </AdminShell>
    );
}
