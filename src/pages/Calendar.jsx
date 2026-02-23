import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Shield,
    X,
    Filter
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    parseISO,
    isToday
} from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState(['Todos']);

    const categories = ['Todos', 'Senior', 'Junior', 'Juvenil', 'Infantil', 'Alevín', 'Benjamín'];

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

            } catch (error) {
                console.error('Error in fetchData:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleCategory = (category) => {
        if (category === 'Todos') {
            setSelectedCategories(['Todos']);
            return;
        }

        setSelectedCategories(prev => {
            let newCategories;
            if (prev.includes('Todos')) {
                newCategories = [category];
            } else if (prev.includes(category)) {
                newCategories = prev.filter(c => c !== category);
            } else {
                newCategories = [...prev, category];
            }

            return newCategories.length === 0 ? ['Todos'] : newCategories;
        });
    };

    // Memoize filtered matches to avoid recalculating on every render
    const filteredMatches = useMemo(() => {
        if (selectedCategories.includes('Todos')) {
            return matches;
        }
        return matches.filter(match => selectedCategories.includes(match.category));
    }, [matches, selectedCategories]);

    const nextMonth = useCallback(() => setCurrentMonth(addMonths(currentMonth, 1)), [currentMonth]);
    const prevMonth = useCallback(() => setCurrentMonth(subMonths(currentMonth, 1)), [currentMonth]);

    const onDateClick = useCallback((day) => {
        setSelectedDate(day);
    }, []);

    // Memoize selected date matches at component level (not inside render function)
    const selectedDateMatches = useMemo(() => {
        if (!selectedDate) return [];
        return filteredMatches.filter(match => isSameDay(parseISO(match.date), selectedDate));
    }, [selectedDate, filteredMatches]);

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-8 px-4">
                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white capitalize">
                    {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

        for (let i = 0; i < 7; i++) {
            const dayDate = addDays(startDate, i);
            const dayFull = format(dayDate, "eeee", { locale: es });
            const dayInitial = dayFull.charAt(0).toUpperCase();

            // Handle Wednesday (miércoles) as 'X'
            const mobileInitial = dayFull.toLowerCase().includes('miércoles') ? 'X' : dayInitial;

            days.push(
                <div key={i} className="text-center text-sm font-medium text-gray-400 uppercase py-2">
                    <span className="hidden md:inline">{dayFull}</span>
                    <span className="md:hidden">{mobileInitial}</span>
                </div>
            );
        }

        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                // Check if there are matches on this day (using filteredMatches)
                const dayMatches = filteredMatches.filter(match => isSameDay(parseISO(match.date), cloneDay));
                const hasMatches = dayMatches.length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);

                days.push(
                    <div
                        key={day}
                        className={`relative h-24 md:h-32 border border-white/5 flex flex-col items-start justify-start p-2 transition-all cursor-pointer group
                            ${!isCurrentMonth ? "bg-black/20 text-gray-600" : "bg-slate-800/50 text-white hover:bg-slate-700/50"}
                            ${isSelected ? "ring-2 ring-halcones-blue z-10 bg-slate-700" : ""}
                            ${isToday(day) ? "bg-halcones-blue/10" : ""}
                        `}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className={`text-sm font-medium ${!isCurrentMonth ? "text-gray-600" : "text-gray-300"} ${isToday(day) ? "text-halcones-blue font-bold" : ""}`}>
                            {formattedDate}
                        </span>

                        {hasMatches && (
                            <div className="mt-auto w-full">
                                <div className="flex flex-wrap gap-1">
                                    {dayMatches.slice(0, 3).map((match, idx) => (
                                        <div key={idx} className="w-2 h-2 rounded-full bg-halcones-blue" title={`${match.home_team} vs ${match.away_team}`} />
                                    ))}
                                    {dayMatches.length > 3 && (
                                        <span className="text-[10px] text-gray-400 leading-none">+</span>
                                    )}
                                </div>
                                <div className="hidden md:block mt-1 text-[10px] text-halcones-blue font-medium truncate w-full">
                                    {dayMatches.length} partido{dayMatches.length > 1 ? 's' : ''}
                                </div>
                            </div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">{rows}</div>;
    };

    const renderSelectedDateDetails = () => {
        if (!selectedDate) return null;

        // Use the memoized selectedDateMatches from component level
        const selectedMatches = selectedDateMatches;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedDate(null)}
            >
                <div
                    className="bg-slate-900 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-white capitalize">
                                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {selectedMatches.length} partido{selectedMatches.length !== 1 ? 's' : ''} programado{selectedMatches.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedDate(null)}
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        {selectedMatches.length > 0 ? (
                            selectedMatches.map((match) => {
                                const homeLogo = match.home_team_logo;
                                const awayLogo = match.away_team_logo;

                                let homeScore = null;
                                let awayScore = null;
                                if (match.score && match.score.includes('-')) {
                                    [homeScore, awayScore] = match.score.split('-').map(s => s.trim());
                                }

                                return (
                                    <div
                                        key={match.id}
                                        className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden hover:border-halcones-blue/30 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Date & Info Column */}
                                            <div className="w-full md:w-1/4 bg-black/20 p-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 border-b md:border-b-0 md:border-r border-white/5">
                                                <div className="text-center">
                                                    <span className="block text-xs font-bold uppercase tracking-wider text-halcones-blue mb-1">{match.category}</span>
                                                    <div className="flex items-center justify-center gap-2 md:flex-col md:gap-0">
                                                        {(() => {
                                                            const matchTime = match.time === 'TBD' ? '00:00' : match.time;
                                                            const matchDate = new Date(`${match.date}T${matchTime}`);
                                                            const now = new Date();
                                                            const diffMs = matchDate - now;

                                                            if (diffMs < 0) {
                                                                if (match.time === 'TBD') return null;
                                                                return (
                                                                    <>
                                                                        <Clock className="w-4 h-4 text-gray-400 md:mb-1" />
                                                                        <span className="text-lg font-bold text-white">{match.time}</span>
                                                                    </>
                                                                );
                                                            }

                                                            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                                                            const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);

                                                            if (match.time === 'TBD') return null;

                                                            if (diffHours >= 24) {
                                                                const diffDays = Math.floor(diffHours / 24);
                                                                return (
                                                                    <>
                                                                        <Clock className="w-4 h-4 text-gray-400 md:mb-1" />
                                                                        <span className="text-lg font-bold text-white">{match.time} (En {diffDays}d)</span>
                                                                    </>
                                                                );
                                                            }

                                                            return (
                                                                <>
                                                                    <Clock className="w-4 h-4 text-gray-400 md:mb-1" />
                                                                    <span className="text-lg font-bold text-white">{match.time} (En {diffHours}h {diffMins}m)</span>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-gray-400 text-xs text-right md:text-center">
                                                    <MapPin className="w-3 h-3 mr-1 text-halcones-blue" />
                                                    <span className="truncate max-w-[150px]">{match.location}</span>
                                                </div>
                                            </div>

                                            {/* Teams & Score Column */}
                                            <div className="flex-1 p-4 flex items-center justify-center">
                                                <div className="flex items-center justify-between w-full gap-4">
                                                    {/* Home Team */}
                                                    <div className="flex-1 flex flex-col items-center text-center gap-2">
                                                        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                                                            {homeLogo ? (
                                                                <img src={homeLogo} alt={match.home_team} className="w-full h-full object-contain drop-shadow-md" />
                                                            ) : (
                                                                <Shield className="w-8 h-8 text-gray-600 opacity-50" />
                                                            )}
                                                        </div>
                                                        <span className={`text-xs md:text-sm font-bold leading-tight ${match.winner_in_draw === 'home' ? 'text-green-400' : 'text-white'}`}>
                                                            {match.home_team}
                                                        </span>
                                                    </div>

                                                    {/* Score / VS */}
                                                    <div className="flex flex-col items-center justify-center px-2">
                                                        {homeScore !== null && awayScore !== null ? (
                                                            <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm flex items-center gap-2">
                                                                <div className="flex items-center">
                                                                    <span className={`text-xl md:text-2xl font-heading font-bold tracking-widest ${match.winner_in_draw === 'home' ? 'text-green-400' : 'text-halcones-blue'}`}>
                                                                        {homeScore}
                                                                    </span>
                                                                    {match.winner_in_draw === 'home' && (
                                                                        <span className="ml-1 text-[10px] bg-green-500 text-black font-bold px-1 rounded">B</span>
                                                                    )}
                                                                </div>
                                                                <span className="text-gray-400 font-bold">-</span>
                                                                <div className="flex items-center">
                                                                    <span className={`text-xl md:text-2xl font-heading font-bold tracking-widest ${match.winner_in_draw === 'away' ? 'text-green-400' : 'text-halcones-blue'}`}>
                                                                        {awayScore}
                                                                    </span>
                                                                    {match.winner_in_draw === 'away' && (
                                                                        <span className="ml-1 text-[10px] bg-green-500 text-black font-bold px-1 rounded">B</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                                <span className="text-xs font-bold text-gray-500">VS</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Away Team */}
                                                    <div className="flex-1 flex flex-col items-center text-center gap-2">
                                                        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                                                            {awayLogo ? (
                                                                <img src={awayLogo} alt={match.away_team} className="w-full h-full object-contain drop-shadow-md" />
                                                            ) : (
                                                                <Shield className="w-8 h-8 text-gray-600 opacity-50" />
                                                            )}
                                                        </div>
                                                        <span className={`text-xs md:text-sm font-bold leading-tight ${match.winner_in_draw === 'away' ? 'text-green-400' : 'text-white'}`}>
                                                            {match.away_team}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12">
                                <CalendarIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No hay partidos programados para este día con los filtros seleccionados.</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-halcones-dark">
                <Loader2 className="h-12 w-12 text-halcones-blue animate-spin" />
            </div>
        );
    }

    return (
        <div className="py-12 bg-halcones-dark min-h-screen relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">CALENDARIO</h1>
                    <p className="text-xl text-gray-400">Próximos encuentros de nuestros equipos</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategories.includes(cat)
                                ? 'bg-halcones-blue text-white shadow-lg shadow-blue-500/30'
                                : 'bg-halcones-card text-gray-400 hover:bg-white/5 hover:text-white border border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto">
                    {renderHeader()}
                    {renderDays()}
                    {renderCells()}
                </div>
            </div>

            <AnimatePresence>
                {selectedDate && renderSelectedDateDetails()}
            </AnimatePresence>
        </div>
    );
};

export default Calendar;
