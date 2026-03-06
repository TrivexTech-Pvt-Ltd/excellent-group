"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Printer, Cpu, Sun } from "lucide-react";

interface BusinessCardProps {
    name: string;
    tagline: string;
    slug: string;
    color: string;
    accent: string;
}

const icons = {
    "excellent-3d": Printer,
    "excellent-it": Cpu,
    "excellent-solar": Sun,
};

const BusinessCard = ({ name, tagline, slug, color, accent }: BusinessCardProps) => {
    const Icon = icons[slug as keyof typeof icons] || ArrowRight;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800"
        >
            <Link href={`/${slug}`} className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-500`}
                >
                    <Icon size={28} />
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-2">{name}</h3>
                <p className="text-zinc-400 mb-6 font-medium text-sm lg:text-base leading-relaxed">{tagline}</p>

                <div className="flex items-center space-x-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    <span>Explore Services</span>
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ArrowRight size={18} />
                    </motion.div>
                </div>
            </Link>

            {/* Background decoration */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className={`absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gradient-to-br ${color} blur-3xl group-hover:opacity-30 transition-opacity duration-500`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />

            {/* Dynamic image */}
            <div className="absolute inset-0 -z-0 opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700">
                <img
                    src={`/images/${slug}.png`}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </motion.div>
    );
};

export default BusinessCard;
