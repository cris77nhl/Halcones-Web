import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Loader2 } from 'lucide-react';
import Modal from '../components/UI/Modal';
import { supabase } from '../lib/supabase';
import { clsx } from 'clsx';

const Teams = () => {
    const [selectedCategoryTeams, setSelectedCategoryTeams] = useState(null);
    const [activeTeam, setActiveTeam] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(false);

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        if (activeTeam) {
            fetchPlayers(activeTeam.id);
        }
    }, [activeTeam]);

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
                        .sort(([catA], [catB]) => {
                            const order = ['Benjamín', 'Alevín', 'Infantil', 'Juvenil', 'Junior', 'Senior'];
                            return order.indexOf(catA) - order.indexOf(catB);
                        })
                        .map(([category, categoryTeams], index) => {
                            // Use the image of the first team in the category for the card
                            const displayTeam = categoryTeams[0];
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
                                        <img
                                            src={category === 'Senior' ? '/img/senior.jfif' : (displayTeam.image_url || 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=800&auto=format&fit=crop')}
                                            alt={category}
                                            className={`w-full h-full object-cover transform transition-transform duration-700 ${category === 'Senior' ? 'scale-125 group-hover:scale-135' : 'group-hover:scale-110'}`}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                                            <h3 className="text-3xl font-heading font-bold text-white">{category}</h3>
                                            <p className="text-white/80 text-sm mt-1">
                                                {categoryTeams.length > 1 ? `${categoryTeams.length} Equipos` : '1 Equipo'}
                                            </p>
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
                                            <div key={player.id} className="flex items-center p-3 bg-halcones-dark rounded-lg border border-white/10 hover:border-halcones-blue/30 transition-colors">
                                                <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 font-bold text-lg mr-4 overflow-hidden border border-white/5">
                                                    {player.photo_url ? (
                                                        <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        player.number
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{player.name}</p>
                                                    <p className="text-sm text-gray-400">{player.position}</p>
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
            </div>
        </div>
    );
};

export default Teams;
