import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Inicio', path: '/' },
        { name: 'Equipos', path: '/equipos' },
        { name: 'Calendario', path: '/calendario' },
        { name: 'Tienda', path: '/merchandising' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-halcones-dark/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src="/logo-new.png" alt="Halcones Torrevieja" className="h-16 w-auto object-contain transition-transform group-hover:scale-105" />
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-2xl leading-none tracking-wider text-white">HALCONES</span>
                            <span className="text-xs font-medium tracking-widest opacity-80 text-halcones-blue">TORREVIEJA</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive(link.path)
                                        ? 'bg-halcones-blue text-white shadow-lg shadow-blue-500/20 transform -translate-y-0.5'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-halcones-card border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                        ? 'bg-halcones-blue text-white'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
