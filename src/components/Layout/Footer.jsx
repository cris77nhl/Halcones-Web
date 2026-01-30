import React from 'react';
import { Instagram, Mail, MapPin, Youtube, Phone } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-halcones-dark text-white pt-12 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-heading text-xl font-bold mb-4 text-halcones-blue">HALCONES TORREVIEJA</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Pasión por el hockey línea desde 1995. Formando jugadores y personas en la Costa Blanca.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com/halcones_torrevieja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-halcones-blue transition-colors"><Instagram size={20} /></a>
                            <a href="https://www.youtube.com/@halconestorrevieja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-halcones-blue transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-heading text-xl font-bold mb-4 text-white">Contacto</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center"><MapPin size={16} className="mr-2 text-halcones-blue" /> Pabellón Cecilio Gallego</li>
                            <li className="flex items-center"><Phone size={16} className="mr-2 text-halcones-blue" /> 633 22 65 67</li>
                            <li className="flex items-center"><Mail size={16} className="mr-2 text-halcones-blue" /> info@halconestorrevieja.com</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-xl font-bold mb-4 text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/equipos" className="hover:text-halcones-blue transition-colors">Equipos</Link></li>
                            <li><Link to="/calendario" className="hover:text-halcones-blue transition-colors">Calendario</Link></li>
                            <li><Link to="/merchandising" className="hover:text-halcones-blue transition-colors">Tienda</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Club Hockey Línea Halcones Torrevieja. Todos los derechos reservados.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
