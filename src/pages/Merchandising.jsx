import React from 'react';
import { ShoppingBag, Info, Instagram } from 'lucide-react';
import { productsData } from '../data/mockData';
import Button from '../components/UI/Button';

const Merchandising = () => {
    return (
        <div className="py-12 bg-halcones-dark min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-wider">TIENDA OFICIAL</h1>
                    <p className="text-xl text-halcones-gray max-w-2xl mx-auto">
                        Viste los colores de tu equipo. Ropa oficial y accesorios de los Halcones Torrevieja.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productsData.map((product) => (
                        <div key={product.id} className="bg-halcones-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-halcones-border">
                            <div className="relative h-64 overflow-hidden bg-gray-900">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm border border-white/10">
                                    {product.price}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                                <p className="text-sm text-halcones-gray">Lleva el orgullo de Halcones siempre contigo</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-halcones-card to-gray-900 rounded-2xl p-8 md:p-10 text-center border border-gray-800 shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-halcones-blue to-purple-600"></div>
                    <ShoppingBag className="w-16 h-16 text-halcones-blue mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">¿Cómo comprar?</h2>
                    <p className="text-halcones-gray max-w-2xl mx-auto mb-8 text-lg">
                        Actualmente no disponemos de venta online directa. Puedes adquirir nuestros productos en la oficina del club o reservarlos contactando con nosotros a través de nuestras redes sociales.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://instagram.com/halcones_torrevieja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-pink-500/25 transform hover:-translate-y-1"
                        >
                            <Instagram className="w-6 h-6 mr-3" />
                            @halcones_torrevieja
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Merchandising;
