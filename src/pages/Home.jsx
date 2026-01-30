import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calendar, ArrowRight, Instagram, Youtube, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { newsData as mockNewsData } from '../data/mockData';
import { supabase } from '../lib/supabase';
import TopPlayers from '../components/Home/TopPlayers';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Generate random images for the slider
    const [slides, setSlides] = useState([
        {
            id: 1,
            image: '/img/senior.jfif', // Keep one default or random? User said "random from img2". Let's make all random.
            title: 'PASIÓN POR EL HOCKEY',
            subtitle: 'Únete a la familia de los Halcones Torrevieja',
        },
        {
            id: 2,
            image: '/img2/halcones10.jpeg',
            title: 'ESCUELA DE CAMPEONES',
            subtitle: 'Formando jugadores desde la base',
        },
        {
            id: 3,
            image: '/img2/halcones22.jpeg',
            title: 'COMPETICIÓN Y DIVERSIÓN',
            subtitle: 'Vive la emoción de cada partido',
        },
    ]);

    useEffect(() => {
        const TOTAL_IMAGES = 32;
        const getRandomImages = (count) => {
            const images = [];
            const usedIndices = new Set();
            while (images.length < count) {
                const randomIndex = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex);
                    images.push(`/img2/halcones${randomIndex}.jpeg`);
                }
            }
            return images;
        };

        const randomImages = getRandomImages(3);

        setSlides(prev => [
            { ...prev[0], image: randomImages[0] },
            { ...prev[1], image: randomImages[1] },
            { ...prev[2], image: randomImages[2] },
        ]);
    }, []);

    // ... (rest of the component)



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // Increased to 8 seconds
        return () => clearInterval(timer);
    }, [slides.length]);

    // ... (existing code)

    useEffect(() => {
        const TOTAL_IMAGES = 32;
        const getRandomImages = (count) => {
            const images = [];
            const usedIndices = new Set();
            while (images.length < count) {
                const randomIndex = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex);
                    images.push(`/img2/halcones${randomIndex}.jpeg`);
                }
            }
            return images;
        };

        const randomImages = getRandomImages(3);

        // Preload images
        randomImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        setSlides(prev => [
            { ...prev[0], image: randomImages[0] },
            { ...prev[1], image: randomImages[1] },
            { ...prev[2], image: randomImages[2] },
        ]);
    }, []);

    // ... (existing code)

    // In the JSX return:
    // transition={{ duration: 0.5 }}

    const [nextMatch, setNextMatch] = useState(null);
    const [recentMatches, setRecentMatches] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date().toISOString().split('T')[0];

            // Fetch Next Match
            const { data: nextMatchData } = await supabase
                .from('matches')
                .select('*')
                .gte('date', today)
                .order('date', { ascending: true })
                .order('time', { ascending: true })
                .limit(1)
                .single();

            if (nextMatchData) {
                setNextMatch(nextMatchData);
            }

            // Fetch Recent Matches
            const { data: recentMatchesData } = await supabase
                .from('matches')
                .select('*')
                .lt('date', today)
                .order('date', { ascending: false })
                .limit(4);

            if (recentMatchesData) {
                setRecentMatches(recentMatchesData);
            }

            // Fetch Latest News
            const { data: newsData } = await supabase
                .from('news')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);

            // Use mock data if no data from Supabase
            if (newsData && newsData.length > 0) {
                setNews(newsData);
            } else {
                setNews(mockNewsData.slice(0, 3));
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!nextMatch) return;

        const timer = setInterval(() => {
            const matchDate = new Date(`${nextMatch.date}T${nextMatch.time}`);
            const now = new Date();
            const difference = matchDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [nextMatch]);

    return (
        <div className="flex flex-col bg-halcones-dark min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden bg-halcones-dark">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight drop-shadow-lg"
                        >
                            {slides[currentSlide].title}
                        </motion.h1>
                        <motion.p
                            key={`subtitle-${currentSlide}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-200 mb-8 font-light drop-shadow-md"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Link to="/equipos">
                                <Button size="lg" className="bg-halcones-blue text-white hover:bg-blue-600 border-none shadow-lg shadow-blue-500/30">
                                    Conoce al Equipo <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-halcones-blue w-8' : 'bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Next Match Countdown */}
            <section className="bg-gradient-to-r from-halcones-blue to-blue-900 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">PRÓXIMO PARTIDO</h3>
                            {nextMatch ? (
                                <p className="text-blue-200 text-lg">
                                    {nextMatch.home_team} vs {nextMatch.away_team}
                                </p>
                            ) : (
                                <p className="text-blue-200 text-lg">Buscando próximo encuentro...</p>
                            )}
                        </div>

                        {nextMatch && (
                            <div className="flex gap-4 md:gap-8">
                                <div className="text-center">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px] border border-white/20">
                                        <span className="block text-3xl font-bold text-white">{timeLeft.days}</span>
                                        <span className="text-xs uppercase text-blue-200">Días</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px] border border-white/20">
                                        <span className="block text-3xl font-bold text-white">{timeLeft.hours}</span>
                                        <span className="text-xs uppercase text-blue-200">Horas</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px] border border-white/20">
                                        <span className="block text-3xl font-bold text-white">{timeLeft.minutes}</span>
                                        <span className="text-xs uppercase text-blue-200">Min</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px] border border-white/20">
                                        <span className="block text-3xl font-bold text-white">{timeLeft.seconds}</span>
                                        <span className="text-xs uppercase text-blue-200">Seg</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="hidden md:block">
                            <Link to="/calendario">
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-halcones-blue">
                                    Ver Calendario
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>



            {/* Recent Results Section */}
            {
                recentMatches.length > 0 && (
                    <section className="py-12 bg-gray-900 border-b border-white/5">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">ÚLTIMOS RESULTADOS</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {recentMatches.map((match) => {
                                    let homeScore = '-';
                                    let awayScore = '-';
                                    if (match.score && match.score.includes('-')) {
                                        [homeScore, awayScore] = match.score.split('-').map(s => s.trim());
                                    }

                                    return (
                                        <div key={match.id} className="bg-halcones-card rounded-lg p-4 border border-white/10 shadow-lg hover:border-halcones-blue/30 transition-all">
                                            <div className="text-xs text-gray-400 mb-3 text-center font-medium uppercase tracking-wider">{match.date} - {match.category}</div>

                                            {/* Home Team */}
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 flex-shrink-0 bg-white/5 rounded-full p-1 flex items-center justify-center">
                                                        {match.home_team_logo ? (
                                                            <img src={match.home_team_logo} alt={match.home_team} className="w-full h-full object-contain" />
                                                        ) : (
                                                            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <span className={`font-bold text-sm truncate ${match.winner_in_draw === 'home' ? 'text-green-400' : 'text-white'}`}>
                                                        {match.home_team}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`text-xl font-bold ${match.winner_in_draw === 'home' ? 'text-green-400' : 'text-white'}`}>
                                                        {homeScore}
                                                    </span>
                                                    {match.winner_in_draw === 'home' && (
                                                        <span className="ml-1 text-[10px] bg-green-500 text-black font-bold px-1 rounded">B</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Away Team */}
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 flex-shrink-0 bg-white/5 rounded-full p-1 flex items-center justify-center">
                                                        {match.away_team_logo ? (
                                                            <img src={match.away_team_logo} alt={match.away_team} className="w-full h-full object-contain" />
                                                        ) : (
                                                            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <span className={`font-bold text-sm truncate ${match.winner_in_draw === 'away' ? 'text-green-400' : 'text-white'}`}>
                                                        {match.away_team}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`text-xl font-bold ${match.winner_in_draw === 'away' ? 'text-green-400' : 'text-white'}`}>
                                                        {awayScore}
                                                    </span>
                                                    {match.winner_in_draw === 'away' && (
                                                        <span className="ml-1 text-[10px] bg-green-500 text-black font-bold px-1 rounded">B</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Top Players Section */}
            <TopPlayers />

            {/* News Section */}
            <section className="py-20 bg-halcones-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-heading font-bold text-white mb-2">ÚLTIMAS NOTICIAS</h2>
                            <div className="h-1 w-20 bg-halcones-blue rounded shadow-glow"></div>
                        </div>
                        <Link to="/noticias" className="hidden md:flex items-center text-halcones-blue font-medium hover:text-blue-400 transition-colors">
                            Ver todas las noticias <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <Link key={item.id} to={`/noticias/${item.id}`} className="group">
                                <article className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-halcones-blue/50 h-full flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image_url || 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop'}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute top-4 left-4 bg-halcones-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                            Noticia
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-gray-400 text-sm mb-3">
                                            <Calendar className="h-4 w-4 mr-2 text-halcones-blue" />
                                            {new Date(item.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-halcones-blue transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 line-clamp-2 flex-1">
                                            {item.content}
                                        </p>
                                        <div className="flex items-center text-halcones-blue font-medium">
                                            Leer más <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/noticias" className="inline-flex items-center text-halcones-blue font-medium hover:text-blue-400">
                            Ver todas las noticias <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Gallery Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">GALERÍA</h2>
                    <div className="relative group">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('gallery-container');
                                container.scrollBy({ left: -300, behavior: 'smooth' });
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-halcones-blue text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 -ml-4 md:-ml-8"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => {
                                const container = document.getElementById('gallery-container');
                                container.scrollBy({ left: 300, behavior: 'smooth' });
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-halcones-blue text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 -mr-4 md:-mr-8"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Gallery Container */}
                        <div
                            id="gallery-container"
                            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {Array.from({ length: 32 }, (_, i) => i + 1).map((num) => (
                                <div key={num} className="flex-none w-72 h-48 md:h-64 relative overflow-hidden rounded-lg group/item snap-center">
                                    <img
                                        src={`/img2/halcones${num}.jpeg`}
                                        alt={`Galería Halcones ${num}`}
                                        className="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Sponsors Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center uppercase tracking-wider">Nuestros Patrocinadores</h2>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale hover:grayscale-0 transition-all duration-500">
                        <a href="https://www.youtube.com/@halconestorrevieja" target="_blank" rel="noopener noreferrer">
                            <img src="/img/youtube.jpg" alt="Halcones Channel" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="https://hernaproyectos.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/herna.png" alt="Herna Proyectos" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity bg-gray-800 p-2 rounded" />
                        </a>
                        <a href="https://santamardelavega.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/santamar.png" alt="Santamara" className="h-10 md:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="https://www.volabola.es/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/Volabola.png" alt="Volabola" className="h-10 md:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="https://torrevieja.es/es" target="_blank" rel="noopener noreferrer">
                            <img src="/img/Captura.PNG" alt="Ayuntamiento de Torrevieja" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </a>
                        <img src="/img/torre.PNG" alt="Torrevieja Sports City" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        <a href="https://vidriopool.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/vidriopool.png" alt="VidrioPool" className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-halcones-blue text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 drop-shadow-md">¿QUIERES FORMAR PARTE DEL EQUIPO?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto drop-shadow-sm">
                        Únete a nuestra escuela de hockey y aprende con los mejores entrenadores. Todas las edades y niveles.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://instagram.com/halcones_torrevieja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <Instagram className="w-6 h-6 mr-3" />
                            Síguenos en Instagram
                        </a>
                        <a
                            href="https://www.youtube.com/@halconestorrevieja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <Youtube className="w-6 h-6 mr-3" />
                            Canal de YouTube
                        </a>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default Home;
