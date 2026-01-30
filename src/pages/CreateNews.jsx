import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/UI/Button';

const CreateNews = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        image_url: '',
        content: ''
    });

    useEffect(() => {
        // Check if user came from the password modal
        if (location.state?.authenticated) {
            setIsAuthenticated(true);
        }
    }, [location]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === '123456789') {
            setIsAuthenticated(true);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('news')
                .insert([formData]);

            if (error) throw error;

            navigate('/noticias');
        } catch (error) {
            console.error('Error creating news:', error.message);
            alert('Error al crear la noticia: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-halcones-dark p-4">
                <div className="bg-slate-900 rounded-xl border border-white/10 p-8 max-w-md w-full shadow-2xl">
                    <h3 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                        <Lock className="w-6 h-6 mr-2 text-halcones-blue" />
                        Acceso Restringido
                    </h3>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-halcones-blue transition-colors"
                                placeholder="Ingrese la contraseña"
                                autoFocus
                            />
                        </div>
                        <Button type="submit" className="w-full bg-halcones-blue text-white hover:bg-blue-600">
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-halcones-dark py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/noticias')}
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Cancelar
                    </button>
                    <h1 className="text-3xl font-heading font-bold text-white">Nueva Noticia</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl border border-white/10 p-6 md:p-8 shadow-xl space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-halcones-blue transition-colors"
                            placeholder="Título de la noticia"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Autor</label>
                            <input
                                type="text"
                                name="author"
                                required
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-halcones-blue transition-colors"
                                placeholder="Nombre del autor"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">URL de Imagen</label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-halcones-blue transition-colors"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Contenido</label>
                        <textarea
                            name="content"
                            required
                            value={formData.content}
                            onChange={handleChange}
                            rows={10}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-halcones-blue transition-colors resize-none"
                            placeholder="Escribe el contenido de la noticia aquí..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-halcones-blue text-white hover:bg-blue-600 min-w-[150px]"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Publicar Noticia
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNews;
