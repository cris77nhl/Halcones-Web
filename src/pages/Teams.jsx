import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, Loader2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import Modal from '../components/UI/Modal';
import PlayerStatsModal from '../components/Teams/PlayerStatsModal';
import { supabase } from '../lib/supabase';
import { clsx } from 'clsx';

// Map team names (or partial matches) to local images
// Files were moved to pulic/images/teams/
const TEAM_IMAGES = {
    'senior blue': '/images/teams/senior_blue.jpg',
    'senior white': '/images/teams/senior_white.jpg',
    'senior': '/images/teams/senior_white.jpg', // Fallback to white or blue, user didn't specify preference for generic, but white is newer
    'infantil white': '/images/teams/infantil_white.jpg',
    'infantil nacional': '/images/teams/infantil_nacional.jpg',
    'infantil': '/images/teams/infantil_nacional.jpg', // Fallback
    'alevin': '/images/teams/alevin.jpg',
    'juvenil blue': '/images/teams/juvenil_blue.jpg',
    'juvenil white': '/images/teams/juvenil_white.jpg',
    'juvenil': '/images/teams/juvenil_blue.jpg',
    'junior': '/images/teams/junior.jpg',
    'benjamin': '/images/teams/benjamin.jpg'
};

const getTeamImage = (team) => {
    if (!team) return 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop';

    // Normalize name for matching
    const normalizedName = team.name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Check specific matches first
    for (const [key, path] of Object.entries(TEAM_IMAGES)) {
        if (normalizedName.includes(key)) return `${path}?v=2`;
    }

    // Fallback to category based matching if needed, or DB image
    return team.image_url || 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop';
};

const Teams = () => {
    const [selectedCategoryTeams, setSelectedCategoryTeams] = useState(null);
    const [activeTeam, setActiveTeam] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(false);

    // Stats Modal State
    const [selectedPlayerName, setSelectedPlayerName] = useState(null);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

    // Carousel state: category -> current image index
    const [carouselIndices, setCarouselIndices] = useState({});

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        if (activeTeam) {
            fetchPlayers(activeTeam.id);
        }
    }, [activeTeam]);

    // Setup carousel timers
    useEffect(() => {
        // Find categories with multiple teams
        const multiTeamCategories = Object.entries(teamsByCategory)
            .filter(([_, teams]) => teams.length > 1)
            .map(([cat]) => cat);

        if (multiTeamCategories.length === 0) return;

        const intervalId = setInterval(() => {
            setCarouselIndices(prev => {
                const nextState = { ...prev };
                multiTeamCategories.forEach(cat => {
                    const count = teamsByCategory[cat].length;
                    const currentIndex = prev[cat] || 0;
                    nextState[cat] = (currentIndex + 1) % count;
                });
                return nextState;
            });
        }, 4000); // Change every 4 seconds

        return () => clearInterval(intervalId);
    }, [teams]); // Re-run when teams load

    const fetchTeams = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .order('name');

            if (error) throw error;
            setTeams(data || []);
        } catch (error) {
            console.error('Error fetching teams:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlayers = async (teamId) => {
        try {
            setLoadingPlayers(true);
            const { data, error } = await supabase
                .from('players')
                .select('*')
                .eq('team_id', teamId)
                .order('number');

            if (error) throw error;
            setPlayers(data || []);
        } catch (error) {
            console.error('Error fetching players:', error.message);
        } finally {
            setLoadingPlayers(false);
        }
    };

    // Group teams by category
    const teamsByCategory = teams.reduce((acc, team) => {
        if (team.category === 'Rival') return acc; // Skip rival teams
        if (!acc[team.category]) {
            acc[team.category] = [];
        }
        acc[team.category].push(team);
        return acc;
    }, {});

    // Custom sort helper
    const getCategoryPriority = (category) => {
        const order = ['Benjamín', 'Alevín', 'Infantil', 'Juvenil', 'Junior', 'Senior'];
        const idx = order.indexOf(category);
        return idx === -1 ? 99 : idx;
    };

    const handleCategoryClick = (categoryTeams) => {
        setSelectedCategoryTeams(categoryTeams);
        // Default to the first team in the category
        setActiveTeam(categoryTeams[0]);
    };

    const handleCloseModal = () => {
        setSelectedCategoryTeams(null);
        setActiveTeam(null);
        setPlayers([]);
    };

    const handlePlayerClick = (playerName) => {
        setSelectedPlayerName(playerName);
        setIsStatsModalOpen(true);
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
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">NUESTROS EQUIPOS</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Desde la base hasta la élite. Conoce a las diferentes categorías que defienden nuestros colores.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(teamsByCategory)
                        .sort(([catA], [catB]) => getCategoryPriority(catA) - getCategoryPriority(catB))
                        .map(([category, categoryTeams], index) => {
                            // Determine which team to show based on carousel index
                            const currentIndex = carouselIndices[category] || 0;
                            const displayTeam = categoryTeams[currentIndex];
                            const imageUrl = getTeamImage(displayTeam);

                            return (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-halcones-card rounded-2xl overflow-hidden shadow-lg cursor-pointer group border border-halcones-border hover:border-halcones-blue/30"
                                    onClick={() => handleCategoryClick(categoryTeams)}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-halcones-blue/20 group-hover:bg-halcones-blue/0 transition-colors z-10" />

                                        {/* Image Crossfade */}
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={`${category}-${currentIndex}`} // Key change triggers animation
                                                src={imageUrl}
                                                alt={`${category} - ${displayTeam.name}`}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: category === 'Senior' ? 1.25 : 1.05 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className={`w-full h-full object-cover transform absolute inset-0 ${category === 'Senior' ? 'group-hover:scale-135' : 'group-hover:scale-110'} transition-transform duration-700`}
                                            />
                                        </AnimatePresence>

                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                                            <h3 className="text-3xl font-heading font-bold text-white">{category}</h3>
                                            <div className="flex justify-between items-end">
                                                <p className="text-white/80 text-sm mt-1">
                                                    {categoryTeams.length > 1 ? `${categoryTeams.length} Equipos` : '1 Equipo'}
                                                </p>
                                                {categoryTeams.length > 1 && (
                                                    <div className="text-xs text-halcones-blue/80 font-mono bg-black/40 px-2 py-1 rounded">
                                                        {displayTeam.name.replace('Halcones ', '')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-center text-gray-400">
                                            <span className="flex items-center"><Users className="w-5 h-5 mr-2 text-halcones-blue" /> Plantilla</span>
                                            <span className="text-halcones-blue font-medium group-hover:translate-x-1 transition-transform">Ver detalles &rarr;</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                </div>

                <Modal
                    isOpen={!!selectedCategoryTeams}
                    onClose={handleCloseModal}
                    title={activeTeam ? `Categoría ${activeTeam.category}` : 'Detalles del Equipo'}
                >
                    {selectedCategoryTeams && activeTeam && (
                        <div className="space-y-6">
                            {/* Sub-team Tabs */}
                            {selectedCategoryTeams.length > 1 && (
                                <div className="flex space-x-2 border-b border-white/10 pb-2 overflow-x-auto">
                                    {selectedCategoryTeams.map((team) => (
                                        <button
                                            key={team.id}
                                            onClick={() => setActiveTeam(team)}
                                            className={clsx(
                                                'px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                                                activeTeam.id === team.id
                                                    ? 'bg-halcones-blue text-white shadow-sm'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                            )}
                                        >
                                            {team.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Roster Section */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <Users className="mr-2 text-halcones-blue" /> Plantilla - {activeTeam.name}
                                </h3>
                                {loadingPlayers ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 text-halcones-blue animate-spin" />
                                    </div>
                                ) : players && players.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {players.map((player) => (
                                            <div
                                                key={player.id}
                                                onClick={() => handlePlayerClick(player.name)}
                                                className="flex items-center p-3 bg-halcones-dark rounded-lg border border-white/10 hover:border-halcones-blue/50 hover:bg-white/5 transition-all cursor-pointer group/player"
                                            >
                                                <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 font-bold text-lg mr-4 overflow-hidden border border-white/5 group-hover/player:border-halcones-blue/50 transition-colors">
                                                    {player.photo_url ? (
                                                        <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        player.number
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-white group-hover/player:text-halcones-blue transition-colors">{player.name}</p>
                                                    <p className="text-sm text-gray-400">{player.position}</p>
                                                </div>
                                                <div className="text-halcones-blue opacity-0 group-hover/player:opacity-100 transition-opacity">
                                                    <Zap className="w-4 h-4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">Información de la plantilla próximamente.</p>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>

                <PlayerStatsModal
                    isOpen={isStatsModalOpen}
                    onClose={() => setIsStatsModalOpen(false)}
                    playerName={selectedPlayerName}
                />
            </div>
        </div>
    );
};

export default Teams;
