import React from 'react';
import { Construction } from 'lucide-react';

const Merchandising = () => {
    return (
        <div className="min-h-screen bg-halcones-dark flex flex-col items-center justify-center text-white px-4">
            <div className="text-center">
                <Construction className="w-24 h-24 text-halcones-blue mx-auto mb-6 animate-pulse" />
                <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-halcones-blue to-white">
                    PRÓXIMAMENTE
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                    Estamos trabajando en nuestra nueva tienda oficial. <br />
                    ¡Muy pronto podrás vestir los colores de los Halcones!
                </p>
            </div>
        </div>
    );
};

export default Merchandising;
