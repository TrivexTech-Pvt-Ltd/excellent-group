import { businesses } from "@/data/businesses";
import Link from "next/link";
import { ArrowRight, Trophy, Users, Lightbulb, Target } from "lucide-react";

export default function About() {
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Story */}
                <section className="max-w-4xl mx-auto mb-20 md:mb-32">
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-12 tracking-tighter leading-none">OUR STORY.</h1>
                    <div className="space-y-6 md:space-y-8 text-lg sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
                        <p>
                            Excellent Group began with a simple vision: to bridge the gap between imagination and reality. What started as a small IT consultancy has grown into a multi-disciplinary conglomerate.
                        </p>
                        <p>
                            Today, we operate at the intersection of bits, bytes, and atoms. Whether we're coding complex software with <span className="text-foreground font-bold italic underline decoration-blue-500">Excellent IT</span>, harnessing the sun's power with <span className="text-foreground font-bold italic underline decoration-orange-500">Excellent Solar</span>, or printing the future with <span className="text-foreground font-bold italic underline decoration-purple-500">Excellent 3D</span>.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24 md:mb-32">
                    {[
                        { icon: Trophy, title: "Excellence", desc: "We don't settle for 'good enough'. We aim for perfection in every delivery." },
                        { icon: Users, title: "Customer Centric", desc: "Your goals are our goals. We build lasting partnerships." },
                        { icon: Lightbulb, title: "Innovation", desc: "Constantly exploring new horizons in tech and manufacturing." },
                        { icon: Target, title: "Precision", desc: "Accuracy is the foundation of everything we build." },
                    ].map((v, i) => (
                        <div key={i} className="glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-primary/5 transition-colors">
                            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 md:mb-8 text-primary">
                                <v.icon size={28} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{v.title}</h3>
                            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Brand Highlights */}
                <section className="space-y-32">
                    {businesses.map((biz, i) => (
                        <div key={biz.slug} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className={`text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight`}>{biz.name}</h2>
                                <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl">
                                    {biz.description}
                                </p>
                                <Link
                                    href={`/${biz.slug}`}
                                    className={`px-8 py-4 bg-gradient-to-r ${biz.color} text-white rounded-full font-bold inline-flex items-center space-x-2 hover:scale-105 transition-transform`}
                                >
                                    <span>See {biz.name} Solutions</span>
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                            <div className="flex-1 w-full aspect-video glass rounded-[3rem] overflow-hidden flex items-center justify-center border-2 border-white/5 shadow-2xl relative">
                                <img
                                    src={`/images/${biz.slug}.png`}
                                    alt={biz.name}
                                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
