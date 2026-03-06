import { sql } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import AddProjectForm from "@/components/admin/AddProjectForm";
import { ProjectThumb } from "@/components/admin/Thumbnails";
import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

export default async function AdminProjectsPage() {
    const projects = await sql`
        SELECT * FROM "Project" ORDER BY "createdAt" DESC
    `;

    return (
        <AdminShell title="Manage Projects">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="xl:col-span-1">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-5">
                            New Project
                        </h3>
                        <AddProjectForm />
                    </div>
                </div>

                {/* Projects List */}
                <div className="xl:col-span-2 space-y-4">
                    {projects.length === 0 ? (
                        <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                            <p className="text-zinc-500 text-sm">No projects yet. Add one on the left →</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 hover:border-zinc-700 transition-colors"
                            >
                                {/* Thumbnail */}
                                <div className="w-16 h-16 rounded-xl bg-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                    <ProjectThumb src={project.image} name={project.name} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-semibold text-sm truncate">
                                        {project.name}
                                    </h4>
                                    <p className="text-zinc-400 text-xs mt-0.5 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                    {project.url && (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-blue-400 text-xs mt-1.5 hover:text-blue-300 truncate max-w-xs"
                                        >
                                            <ExternalLink size={11} />
                                            {project.url}
                                        </a>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end border-t border-zinc-800 sm:border-0 pt-3 sm:pt-0">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-zinc-400 hover:text-white"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </Link>
                                    <form
                                        action={async () => {
                                            "use server";
                                            await deleteProjectAction(project.id);
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="p-2 bg-zinc-800 hover:bg-red-900/50 rounded-xl transition-colors text-zinc-400 hover:text-red-400"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminShell>
    );
}
