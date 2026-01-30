import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Plus, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/UI/Button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { newsData as mockNewsData } from '../data/mockData';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            // Use mock data if no data from Supabase
            setNews(data && data.length > 0 ? data : mockNewsData);
        } catch (error) {
            console.error('Error fetching news:', error.message);
            // Use mock data on error
            setNews(mockNewsData);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === '123456789') {
            // Save auth state briefly or pass via state
            navigate('/crear-noticia', { state: { authenticated: true } });
        } else {
            setError('Contraseña incorrecta');
        }
    };

    return (
        <div className="min-h-screen bg-halcones-dark py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">NOTICIAS</h1>
                        <p className="text-xl text-gray-400">Toda la actualidad del club</p>
                    </div>
                    <Button
                        onClick={() => setShowPasswordModal(true)}
                        className="bg-halcones-blue text-white hover:bg-blue-600"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Crear Noticia
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-halcones-blue mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <Link key={item.id} to={`/noticias/${item.id}`} className="group">
                                <article className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-halcones-blue/50 h-full flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image_url || 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop'}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-halcones-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                            Noticia
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-gray-400 text-sm mb-3">
                                            <Calendar className="h-4 w-4 mr-2 text-halcones-blue" />
                                            {format(new Date(item.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-halcones-blue transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                                            {item.content}
                                        </p>
                                        <div className="flex items-center text-halcones-blue font-medium mt-auto">
                                            Leer más <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 border-white/10 text-gray-400 hover:text-white"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPassword('');
                                        setError('');
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" className="flex-1 bg-halcones-blue text-white hover:bg-blue-600">
                                    Entrar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default News;
