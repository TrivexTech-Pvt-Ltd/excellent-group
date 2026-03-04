"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { businesses } from "@/data/businesses";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBusinesses, setShowBusinesses] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    EXCELLENT<span className="text-primary italic">GROUP</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <div className="relative">
                        <button
                            onClick={() => setShowBusinesses(!showBusinesses)}
                            className="flex items-center space-x-1 hover:text-primary transition-colors outline-none"
                        >
                            <span>Businesses</span>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${showBusinesses ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showBusinesses && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-4 w-56 glass rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                                >
                                    {businesses.map((biz) => (
                                        <Link
                                            key={biz.slug}
                                            href={`/${biz.slug}`}
                                            className="block px-6 py-4 hover:bg-primary/10 hover:text-primary transition-all duration-200 border-b border-white/5 last:border-0"
                                            onClick={() => setShowBusinesses(false)}
                                        >
                                            <span className="font-bold text-sm tracking-wide">{biz.name}</span>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link>
                    <Link href="/#clients" className="hover:text-primary transition-colors">Clients</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link
                        href="/contact"
                        className="px-6 py-2 bg-foreground text-background rounded-full hover:scale-105 transition-transform"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-black">HOME</Link>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setShowBusinesses(!showBusinesses)}
                                    className="flex items-center justify-between w-full text-xl font-black uppercase outline-none"
                                >
                                    <span>OUR BUSINESSES</span>
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${showBusinesses ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showBusinesses && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex flex-col space-y-4 pl-4 border-l-2 border-primary"
                                        >
                                            {businesses.map((biz) => (
                                                <Link
                                                    key={biz.slug}
                                                    href={`/${biz.slug}`}
                                                    className="text-lg font-bold py-1"
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        setShowBusinesses(false);
                                                    }}
                                                >
                                                    {biz.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="/#projects" className="text-xl font-black uppercase" onClick={() => setIsOpen(false)}>Projects</Link>
                            <Link href="/#clients" className="text-xl font-black uppercase" onClick={() => setIsOpen(false)}>Clients</Link>
                            <Link href="/about" className="text-xl font-black uppercase" onClick={() => setIsOpen(false)}>About</Link>
                            <Link
                                href="/contact"
                                className="text-xl font-black uppercase"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
