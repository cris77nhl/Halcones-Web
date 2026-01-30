import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-halcones-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
                >
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h2 className="text-2xl font-heading font-bold text-white">{title}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>
                    <div className="p-6 text-gray-300">
                        {children}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
