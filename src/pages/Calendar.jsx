import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Filter, Loader2, Shield } from 'lucide-react';
import Button from '../components/UI/Button';
import { supabase } from '../lib/supabase';

const Calendar = () => {
    const [filter, setFilter] = useState('Todos');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teamLogos, setTeamLogos] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch matches
                const { data: matchesData, error: matchesError } = await supabase
                    .from('matches')
                    .select('*')
                    .order('date', { ascending: true });

                if (matchesError) {
                    console.error('Error fetching matches:', matchesError);
                } else {
                    setMatches(matchesData || []);
                }

                // Fetch teams (safely)
                const { data: teamsData, error: teamsError } = await supabase
                    .from('teams')
                    .select('*'); // Select all to avoid error if specific column missing

                if (teamsError) {
                    console.error('Error fetching teams:', teamsError);
                } else {
                    // Create a map of team name -> logo_url (or image_url as fallback)
                    const logoMap = {};
                    teamsData?.forEach(team => {
                        logoMap[team.name] = team.logo_url || team.image_url;
                    });
                    console.log('Loaded Team Logos Map:', logoMap);
                    setTeamLogos(logoMap);
                }

            } catch (error) {
                console.error('Error in fetchData:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const categories = ['Todos', 'Senior', 'Junior', 'Juvenil', 'Infantil', 'Alevín', 'Benjamín'];

    const filteredMatches = filter === 'Todos'
        ? matches
        : matches.filter(match => match.category === filter);

    const getTeamLogo = (teamName) => {
        if (!teamName) return null;
        const normalizedTeamName = teamName.toLowerCase();

        // 1. Try exact match (case insensitive)
        const exactKey = Object.keys(teamLogos).find(key => key.toLowerCase() === normalizedTeamName);
        if (exactKey) return teamLogos[exactKey];

        // 2. Try partial match (case insensitive)
        const partialKey = Object.keys(teamLogos).find(key => normalizedTeamName.includes(key.toLowerCase()));
        if (partialKey) return teamLogos[partialKey];

        // 3. Special case for Halcones (Hardcoded to ensure it works)
        if (normalizedTeamName.includes('halcones')) {
            return '/logos/halcones.png';
        }

        console.warn(`No logo found for: ${teamName}. Available keys:`, Object.keys(teamLogos));
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-halcones-dark">
                <Loader2 className="h-12 w-12 text-halcones-blue animate-spin" />
            </div>
        );
    }

    return (
        <div className="py-12 bg-halcones-dark min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">CALENDARIO</h1>
                    <p className="text-xl text-gray-400">Próximos encuentros de nuestros equipos</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-halcones-blue text-white shadow-lg shadow-blue-500/30'
                                : 'bg-halcones-card text-gray-400 hover:bg-white/5 hover:text-white border border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Matches List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                    {filteredMatches.length > 0 ? (
                        filteredMatches.map((match) => {
                            const homeLogo = getTeamLogo(match.home_team);
                            const awayLogo = getTeamLogo(match.away_team);

                            return (
                                <div
                                    key={match.id}
                                    className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:shadow-xl hover:border-halcones-blue/30 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Date & Info Column */}
                                        <div className="w-full md:w-1/4 bg-black/20 p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 border-b md:border-b-0 md:border-r border-white/5">
                                            <div className="text-center">
                                                <span className="block text-xs font-bold uppercase tracking-wider text-halcones-blue mb-1">{match.category}</span>
                                                <span className="block text-3xl font-heading font-bold text-white">{match.date.split('-')[2]}</span>
                                                <span className="block text-sm uppercase text-gray-400">
                                                    {new Date(match.date).toLocaleString('es-ES', { month: 'short' }).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2 text-right md:text-center">
                                                <div className="flex items-center justify-end md:justify-center text-gray-400 text-sm">
                                                    <Clock className="w-4 h-4 mr-1 text-halcones-blue" /> {match.time}
                                                </div>
                                                <div className="flex items-center justify-end md:justify-center text-gray-400 text-sm">
                                                    <MapPin className="w-4 h-4 mr-1 text-halcones-blue" /> <span className="truncate max-w-[150px]">{match.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Teams & Score Column */}
                                        <div className="flex-1 p-6 flex items-center justify-center">
                                            <div className="flex items-center justify-between w-full max-w-2xl gap-4">
                                                {/* Home Team */}
                                                <div className="flex-1 flex flex-col items-center text-center gap-3">
                                                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                                        {homeLogo ? (
                                                            <img
                                                                src={homeLogo}
                                                                alt={match.home_team}
                                                                className="w-full h-full object-contain drop-shadow-md"
                                                                referrerPolicy="no-referrer"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                        ) : (
                                                            <Shield className="w-12 h-12 text-gray-600 opacity-50" />
                                                        )}
                                                        <Shield className="w-12 h-12 text-gray-600 opacity-50 hidden" />
                                                    </div>
                                                    <span className="text-sm md:text-base font-bold text-white leading-tight">{match.home_team}</span>
                                                </div>

                                                {/* Score / VS */}
                                                <div className="flex flex-col items-center justify-center px-2 md:px-6">
                                                    {match.home_score !== null && match.away_score !== null ? (
                                                        <div className="bg-black/40 px-6 py-3 rounded-lg border border-white/10 backdrop-blur-sm">
                                                            <span className="text-3xl md:text-4xl font-heading font-bold text-halcones-blue tracking-widest">
                                                                {match.home_score}-{match.away_score}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                            <span className="text-sm font-bold text-gray-500">VS</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Away Team */}
                                                <div className="flex-1 flex flex-col items-center text-center gap-3">
                                                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                                        {awayLogo ? (
                                                            <img
                                                                src={awayLogo}
                                                                alt={match.away_team}
                                                                className="w-full h-full object-contain drop-shadow-md"
                                                                referrerPolicy="no-referrer"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                        ) : (
                                                            <Shield className="w-12 h-12 text-gray-600 opacity-50" />
                                                        )}
                                                        <Shield className="w-12 h-12 text-gray-600 opacity-50 hidden" />
                                                    </div>
                                                    <span className="text-sm md:text-base font-bold text-white leading-tight">{match.away_team}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 bg-halcones-card rounded-xl border border-dashed border-white/10">
                            <CalendarIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No hay partidos programados para esta categoría.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
