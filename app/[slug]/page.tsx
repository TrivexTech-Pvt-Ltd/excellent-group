import { notFound } from "next/navigation";
import { businesses } from "@/data/businesses";
import { Printer, Cpu, Sun, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const icons = {
    "excellent-3d": Printer,
    "excellent-it": Cpu,
    "excellent-solar": Sun,
};

export async function generateStaticParams() {
    return businesses.map((biz) => ({
        slug: biz.slug,
    }));
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const biz = businesses.find((b) => b.slug === slug);

    if (!biz) {
        notFound();
    }

    const Icon = icons[biz.slug as keyof typeof icons];

    return (
        <div className="flex flex-col w-full pb-24">
            {/* Business Hero */}
            <section className={`relative py-24 md:py-32 overflow-hidden bg-gradient-to-br ${biz.color} text-white`}>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 md:mb-8 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-white/20 backdrop-blur-md shadow-2xl">
                            <Icon size={32} className="md:w-10 md:h-10" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 uppercase tracking-tighter leading-tight">
                            {biz.name}
                        </h1>
                        <p className="text-lg md:text-2xl font-bold opacity-90 max-w-2xl mb-8 md:mb-12 px-2">
                            {biz.tagline}
                        </p>
                        <Link
                            href="/contact"
                            className="px-8 md:px-10 py-3 md:py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-grid-white/[0.2]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-[150px]" />
            </section>

            {/* About Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Excellence in every detail.</h2>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            {biz.description}
                        </p>
                        <div className="space-y-4">
                            {biz.services.map((service, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <CheckCircle2 className="text-green-500" size={20} />
                                    <span className="font-medium text-lg">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden relative shadow-2xl">
                        <img
                            src={`/images/${biz.slug}.png`}
                            alt={biz.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                    </div>
                </div>
            </section>

            {/* Services Grid (More Detail) */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-16">Our Core Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {biz.services.map((service, i) => (
                            <div key={i} className="glass p-8 rounded-3xl text-left hover:border-primary/50 transition-all">
                                <div className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${biz.color} flex items-center justify-center text-white`}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service}</h3>
                                <p className="text-zinc-500 text-sm">
                                    Comprehensive solutions tailored to your unique requirements and goals.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 container mx-auto px-6">
                <div className={`rounded-[3rem] p-12 md:p-24 bg-gradient-to-br ${biz.color} text-white text-center`}>
                    <h2 className="text-4xl md:text-6xl font-black mb-8">Let's build the future together</h2>
                    <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
                        Contact us today for a consultation on your {biz.name} project.
                    </p>
                    <Link
                        href="/contact"
                        className="px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center space-x-2"
                    >
                        <span>Start Your Project</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
