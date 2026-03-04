"use client";

import { useState } from "react";
import { businesses } from "@/data/businesses";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent to " + formData.business);
        // Real implementation would send to an API
    };

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">GET IN TOUCH</h1>
                        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                            Have a project in mind? Select the business you're interested in and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="glass p-10 rounded-[2rem]">
                                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Email Us</h4>
                                            <p className="text-zinc-500">info@excellent.com</p>
                                            <p className="text-zinc-500">support@excellent.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Call Us</h4>
                                            <p className="text-zinc-500">+94 123 456 789</p>
                                            <p className="text-zinc-500">+94 987 654 321 (WhatsApp)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                                            <p className="text-zinc-500">123 Business Avenue, Colombo 03, Sri Lanka</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 rounded-[2rem] bg-zinc-900 text-white">
                                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                                <div className="space-y-2 opacity-70">
                                    <div className="flex justify-between">
                                        <span>Monday-Friday</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span>10:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="glass p-10 rounded-[2rem]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-colors"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-colors"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Phone</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+94 77 123 4567"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-colors"
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Inquiry For</label>
                                        <select
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-colors appearance-none"
                                            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                                        >
                                            <option value="">Select Business</option>
                                            {businesses.map((biz) => (
                                                <option key={biz.slug} value={biz.name}>{biz.name}</option>
                                            ))}
                                            <option value="General Inquiry">General Inquiry</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="Tell us about your project..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-colors resize-none"
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-primary text-white rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2"
                                >
                                    <span>Send Message</span>
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
