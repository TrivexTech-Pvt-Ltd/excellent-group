"use client";

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
import { sql } from "@/lib/db";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ projects: any[], clients: any[] }>({ projects: [], clients: [] });

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);

    async function fetchData() {
      const resProjects = await fetch('/api/projects');
      const resClients = await fetch('/api/clients');
      const projects = await resProjects.json();
      const clients = await resClients.json();
      setData({ projects, clients });
    }
    fetchData();
  }, []);

  const { projects, clients } = data;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-[1.1]"
          >
            ONE GROUP.<br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              THREE INDUSTRIES.
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl lg:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 md:mb-12 px-4"
          >
            Pioneering the future through innovative technology, sustainable energy, and creative manufacturing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
          >
            <Link
              href="/#businesses"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-foreground text-background rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform inline-flex items-center justify-center space-x-2 shadow-2xl shadow-blue-500/20"
            >
              <span>Explore Businesses</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section id="businesses" className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left"
          >
            <div>
              <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-primary mb-4">Our Ecosystem</h2>
              <h3 className="text-4xl md:text-6xl font-bold">Solutions for every frontier</h3>
            </div>
            <p className="text-zinc-500 max-w-md">
              From the digital realm to physical hardware and sustainable power - we've got you covered.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {businesses.map((biz) => (
              <motion.div key={biz.slug} variants={fadeInUp}>
                <BusinessCard {...biz} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 italic">Why Excellent Group?</h3>
              <div className="space-y-8">
                {[
                  { icon: Shield, title: "Reliability", desc: "Decades of combined expertise across diverse engineering and digital sectors." },
                  { icon: Zap, title: "Innovation", desc: "Using the latest 3D printing, AI software, and high-efficiency solar tech." },
                  { icon: Globe, title: "Globe Reach", desc: "Commitment to eco-friendly practices in manufacturing and energy." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex space-x-4 group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <item.icon className="group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase text-xs font-bold tracking-widest">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
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
          </motion.div>

          {projects.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl py-20 text-center">
              <p className="text-zinc-400">No projects yet — check back soon.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

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
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-primary mb-4">
              Trusted By
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">Our Clients</h3>
          </motion.div>

          {clients.length === 0 ? (
            <p className="text-center text-zinc-400 py-10 italic">
              Our client portfolio is growing…
            </p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center"
            >
              {clients.map((client) => (
                <motion.div
                  key={client.id}
                  variants={fadeInUp}
                  className="group flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="h-16 w-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    {client.logo.startsWith("http") ||
                      client.logo.startsWith("/") ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors duration-300 uppercase">
                        {client.name[0]}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -50, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Ready to start a project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-12 opacity-80 max-w-2xl mx-auto"
          >
            Whether it's a 3D model, a complex software suite, or a solar installation, our experts are here to help.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center space-x-2 group"
            >
              <span>Talk to Our Team</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
