import { sql, Project } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { notFound } from "next/navigation";
import EditProjectForm from "@/components/admin/EditProjectForm";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const [project] = await sql<Project[]>`SELECT * FROM "Project" WHERE id = ${id}`;
    if (!project) notFound();

    return (
        <AdminShell title="Edit Project">
            <EditProjectForm project={project} />
        </AdminShell>
    );
}
