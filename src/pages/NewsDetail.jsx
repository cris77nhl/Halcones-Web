import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '../components/UI/Button';
import { newsData as mockNewsData } from '../data/mockData';

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setNews(data);
            } catch (error) {
                console.error('Error fetching news detail:', error.message);
                // Fallback to mock data
                const mockNews = mockNewsData.find(item => item.id === id);
                if (mockNews) setNews(mockNews);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-halcones-dark">
                <Loader2 className="h-12 w-12 text-halcones-blue animate-spin" />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-halcones-dark text-white">
                <h2 className="text-2xl font-bold mb-4">Noticia no encontrada</h2>
                <Link to="/noticias">
                    <Button variant="outline" className="border-white text-white">
                        Volver a Noticias
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-halcones-dark py-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/noticias" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Noticias
                </Link>

                <header className="mb-8">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="bg-halcones-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Noticia
                        </span>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(news.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {news.author}
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                        {news.title}
                    </h1>
                </header>

                <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-12 shadow-2xl border border-white/10">
                    <img
                        src={news.image_url || 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1920&auto=format&fit=crop'}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    {news.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index} className="text-gray-300 mb-4 leading-relaxed">{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default NewsDetail;
