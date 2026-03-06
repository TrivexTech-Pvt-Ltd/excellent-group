import { sql } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { notFound } from "next/navigation";
import EditClientForm from "@/components/admin/EditClientForm";

export default async function EditClientPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const [client] = await sql<any[]>`SELECT * FROM "Client" WHERE id = ${id}`;
    if (!client) notFound();

    return (
        <AdminShell title="Edit Client">
            <EditClientForm client={client} />
        </AdminShell>
    );
}
