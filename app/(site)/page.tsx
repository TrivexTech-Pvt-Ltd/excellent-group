import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  ExternalLink,
} from "lucide-react";
import BusinessCard from "@/components/BusinessCard";
import { businesses } from "@/data/businesses";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [projects, clients] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.client.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-[1.1]">
            ONE GROUP.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              THREE INDUSTRIES.
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 md:mb-12 px-4">
            Pioneering the future through innovative technology, sustainable energy, and creative manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
            <Link
              href="/#businesses"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-foreground text-background rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform inline-flex items-center justify-center space-x-2"
            >
              <span>Explore Businesses</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section id="businesses" className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-primary mb-4">Our Ecosystem</h2>
              <h3 className="text-4xl md:text-6xl font-bold">Solutions for every frontier</h3>
            </div>
            <p className="text-zinc-500 max-w-md">
              From the digital realm to physical hardware and sustainable power - we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businesses.map((biz) => (
              <BusinessCard
                key={biz.slug}
                {...biz}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 italic">Why Excellent Group?</h3>
              <div className="space-y-8">
                {[
                  { icon: Shield, title: "Reliability", desc: "Decades of combined expertise across diverse engineering and digital sectors." },
                  { icon: Zap, title: "Innovation", desc: "Using the latest 3D printing, AI software, and high-efficiency solar tech." },
                  { icon: Globe, title: "Sustainability", desc: "Commitment to eco-friendly practices in manufacturing and energy." },
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-full bg-gradient-to-tr from-blue-600/20 to-orange-500/20 absolute -z-10 blur-3xl animate-spin-slow" />
              <div className="bg-zinc-100 dark:bg-zinc-900 aspect-video rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl relative">
                <img
                  src="/images/future-industry.png"
                  alt="Future of Industry"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-black text-2xl md:text-3xl tracking-tighter italic text-glow uppercase">
                    Future of Industry. Now.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-primary mb-4">
                Our Work
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold">Featured Projects</h3>
            </div>
            <p className="text-zinc-500 max-w-md md:text-right">
              A selection of our latest builds — from digital platforms to
              engineered solutions.
            </p>
          </div>

          {/* Projects grid */}
          {projects.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl py-20 text-center">
              <p className="text-zinc-400">No projects yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    {(project.image.startsWith("http") ||
                      project.image.startsWith("/")) ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-zinc-300 dark:text-zinc-600 tracking-tighter">
                          {project.name[0]}
                        </span>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white">
                      {project.name}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Visit Project <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Our Clients ──────────────────────────────────────────────── */}
      <section id="clients" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-primary mb-4">
              Trusted By
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">Our Clients</h3>
            <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
              Leading companies across industries trust Excellent Group to
              deliver.
            </p>
          </div>

          {clients.length === 0 ? (
            <p className="text-center text-zinc-400 py-10 italic">
              Our client portfolio is growing…
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-start">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="group flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="h-24 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {client.logo.startsWith("http") ||
                      client.logo.startsWith("/") ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-4xl font-black tracking-tight text-zinc-300 dark:text-zinc-600 group-hover:text-primary transition-colors duration-300 uppercase">
                        {client.name[0]}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors duration-300">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to start a project?</h2>
          <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto">
            Whether it's a 3D model, a complex software suite, or a solar installation, our experts are here to help.
          </p>
          <Link
            href="/contact"
            className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center space-x-2"
          >
            <span>Talk to Our Team</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
