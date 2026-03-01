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
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                    <Icon size={28} />
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">{name}</h3>
                <p className="text-zinc-400 mb-6 font-medium">{tagline}</p>

                <div className="flex items-center space-x-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    <span>Explore Services</span>
                    <ArrowRight size={18} />
                </div>
            </Link>

            {/* Background decoration */}
            <div className={`absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gradient-to-br ${color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Dynamic image */}
            <div className="absolute inset-0 -z-0 opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700">
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
