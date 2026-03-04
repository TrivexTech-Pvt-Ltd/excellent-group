import { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
    title: "Admin Login | Excellent Group",
};

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        Excellent <span className="text-blue-400">Group</span>
                    </h1>
                    <p className="text-zinc-400 mt-2 text-sm">Admin Dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-6">Sign in to continue</h2>
                    <LoginForm />
                </div>


            </div>
        </div>
    );
}
