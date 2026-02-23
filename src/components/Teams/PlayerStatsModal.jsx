import React, { useState, useMemo, useEffect } from 'react';
import Modal from '../UI/Modal';
import playerStats from '../../data/player_stats.json';
import { Trophy, Target, Zap, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlayerStatsModal = React.memo(({ isOpen, onClose, playerName }) => {
    const [view, setView] = useState('total');

    // Reset view when modal opens with new player
    useEffect(() => {
        if (isOpen) {
            setView('total');
        }
    }, [isOpen, playerName]);

    // Memoize player stats lookup - only recalculate when playerName changes
    const stats = useMemo(() => {
        if (!playerName) return [];

        const normalizedTarget = playerName.toLowerCase().trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, ' ');

        return playerStats.filter(p => {
            const normalizedPlayer = p.name.toLowerCase().trim()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, ' ');
            return normalizedPlayer === normalizedTarget;
        });
    }, [playerName]);

    // Memoize total stats calculation
    const totalStats = useMemo(() => {
        return stats.reduce((acc, curr) => ({
            matchesPlayed: acc.matchesPlayed + curr.matchesPlayed,
            points: acc.points + curr.points,
            goals: acc.goals + curr.goals,
            assists: acc.assists + curr.assists
        }), { matchesPlayed: 0, points: 0, goals: 0, assists: 0 });
    }, [stats]);

    // Memoize current stats based on view
    const currentStats = useMemo(() => {
        return view === 'total' ? totalStats : stats.find(s => s.category === view);
    }, [view, totalStats, stats]);

    // Don't render anything if modal is closed
    if (!isOpen || !playerName) return null;

    if (stats.length === 0) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title={playerName}>
                <div className="py-12 text-center text-gray-400 italic">
                    No hay estadísticas detalladas disponibles todavía para esta temporada.
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Estadísticas Detalladas">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side: Avatar and Total Selection */}
                <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-halcones-blue shadow-2xl mb-4 bg-gray-800">
                        <img
                            src={stats[0].photo}
                            alt={playerName}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Player'; }}
                            loading="lazy"
                        />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-1">{playerName}</h2>
                    <p className="text-halcones-blue text-sm font-medium uppercase tracking-wider mb-6">Jugador Halcones</p>

                    <nav className="w-full space-y-2">
                        <button
                            onClick={() => setView('total')}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${view === 'total'
                                ? 'bg-halcones-blue text-white shadow-lg'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                                }`}
                        >
                            <span>General (Todas las ligas)</span>
                            <ChevronRight className={`w-4 h-4 transition-transform ${view === 'total' ? 'rotate-90' : ''}`} />
                        </button>

                        {stats.map((s) => (
                            <button
                                key={s.category}
                                onClick={() => setView(s.category)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${view === s.category
                                    ? 'bg-halcones-blue/80 text-white shadow-lg'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                                    }`}
                            >
                                <span>{s.category}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${view === s.category ? 'rotate-90' : ''}`} />
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right side: Stats Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={<Zap className="w-6 h-6 text-yellow-500" />}
                            label="Puntos"
                            value={currentStats.points}
                            color="border-yellow-500/30"
                        />
                        <StatCard
                            icon={<Target className="w-6 h-6 text-red-500" />}
                            label="Goles"
                            value={currentStats.goals}
                            color="border-red-500/30"
                        />
                        <StatCard
                            icon={<Trophy className="w-6 h-6 text-blue-500" />}
                            label="Asistencias"
                            value={currentStats.assists}
                            color="border-blue-500/30"
                        />
                        <StatCard
                            icon={<Clock className="w-6 h-6 text-green-500" />}
                            label="Partidos"
                            value={currentStats.matchesPlayed}
                            color="border-green-500/30"
                        />
                    </div>

                    <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            Promedios por partido
                        </h4>
                        <div className="space-y-4">
                            <ProgressBar
                                label="Puntos / Partido"
                                value={(currentStats.points / (currentStats.matchesPlayed || 1)).toFixed(2)}
                                max={3}
                                color="bg-yellow-500"
                            />
                            <ProgressBar
                                label="Goles / Partido"
                                value={(currentStats.goals / (currentStats.matchesPlayed || 1)).toFixed(2)}
                                max={2}
                                color="bg-red-500"
                            />
                            <ProgressBar
                                label="Asistencias / Partido"
                                value={(currentStats.assists / (currentStats.matchesPlayed || 1)).toFixed(2)}
                                max={1.5}
                                color="bg-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

PlayerStatsModal.displayName = 'PlayerStatsModal';

const StatCard = React.memo(({ icon, label, value, color }) => (
    <div className={`p-4 bg-white/5 rounded-xl border ${color} flex flex-col items-center justify-center transition-all hover:scale-105 duration-300`}>
        <div className="mb-2">{icon}</div>
        <div className="text-3xl font-black text-white">{value}</div>
        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{label}</div>
    </div>
));

StatCard.displayName = 'StatCard';

const ProgressBar = React.memo(({ label, value, max, color }) => {
    const percentage = Math.min((parseFloat(value) / max) * 100, 100);
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-bold">{value}</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

export default PlayerStatsModal;
