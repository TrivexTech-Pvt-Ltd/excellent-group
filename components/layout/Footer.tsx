import Link from "next/link";
import { businesses } from "@/data/businesses";

const Footer = () => {
    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
                            EXCELLENT<span className="text-primary italic">GROUP</span>
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            A multi-industry powerhouse providing cutting-edge IT, sustainable energy, and innovative 3D manufacturing.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Our Businesses</h4>
                        <ul className="space-y-4 text-zinc-500 dark:text-zinc-400">
                            {businesses.map((biz) => (
                                <li key={biz.slug}>
                                    <Link href={`/${biz.slug}`} className="hover:text-primary transition-colors">
                                        {biz.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-zinc-500 dark:text-zinc-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="/#clients" className="hover:text-primary transition-colors">Clients</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Contact</h4>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-2">Sri Lanka</p>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-2">+94 123 456 789</p>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-2">info@excellentgroup.com</p>
                    </div>
                </div>

                <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:row justify-between items-center text-sm text-zinc-500">
                    <p>© {new Date().getFullYear()} Excellent Group. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary">Twitter</a>
                        <a href="#" className="hover:text-primary">LinkedIn</a>
                        <a href="#" className="hover:text-primary">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
