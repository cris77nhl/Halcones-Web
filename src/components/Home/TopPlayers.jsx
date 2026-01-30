import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import playerStats from '../../data/player_stats.json';

const TopPlayers = () => {
    const [showAll, setShowAll] = React.useState(false);

    // Take top 10 or all players based on state
    const displayCount = showAll ? playerStats.length : 10;
    const topPlayers = playerStats.slice(0, displayCount);
    const podium = [topPlayers[1], topPlayers[0], topPlayers[2]]; // Silver, Gold, Bronze order
    const list = topPlayers.slice(3);

    const podiumColors = [
        'from-gray-300 to-gray-400 border-gray-400 text-gray-800', // Silver
        'from-yellow-300 to-yellow-500 border-yellow-500 text-yellow-900', // Gold
        'from-orange-300 to-orange-400 border-orange-400 text-orange-900' // Bronze
    ];

    const podiumHeight = ['h-32', 'h-40', 'h-24'];
    const podiumDelay = [0.2, 0, 0.4];

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        Top Halcones
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">Los mejores jugadores de la temporada</p>
                </div>

                {/* Podium */}
                <div className="flex justify-center items-end gap-4 mb-12 max-w-3xl mx-auto">
                    {podium.map((player, index) => (
                        player && (
                            <motion.div
                                key={player.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: podiumDelay[index] }}
                                className="flex flex-col items-center w-1/3"
                            >
                                <div className="relative mb-2">
                                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 overflow-hidden bg-white shadow-lg ${index === 1 ? 'border-yellow-400 w-24 h-24 md:w-32 md:h-32 z-10' :
                                        index === 0 ? 'border-gray-300' : 'border-orange-300'
                                        }`}>
                                        <img
                                            src={player.photo}
                                            alt={player.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Player'; }}
                                        />
                                    </div>
                                    <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md ${index === 1 ? 'bg-yellow-500 text-lg' :
                                        index === 0 ? 'bg-gray-400' : 'bg-orange-400'
                                        }`}>
                                        {index === 1 ? '1' : index === 0 ? '2' : '3'}
                                    </div>
                                </div>

                                <div className="text-center mb-2">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base line-clamp-1">{player.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{player.leagues[0]}</p>
                                </div>

                                <div className={`w-full rounded-t-lg bg-gradient-to-b ${podiumColors[index]} flex flex-col items-center justify-center shadow-lg ${podiumHeight[index]}`}>
                                    <span className="text-2xl md:text-3xl font-bold">{player.points}</span>
                                    <span className="text-xs md:text-sm font-medium uppercase opacity-80">Puntos</span>
                                    <div className="flex gap-2 mt-1 text-xs opacity-75">
                                        <span>{player.goals} G</span>
                                        <span>{player.assists} A</span>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </div>

                {/* List 4+ */}
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    {list.map((player, index) => (
                        <motion.div
                            key={player.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 1) }}
                            className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                        >
                            <div className="w-8 text-center font-bold text-gray-400 dark:text-gray-500 text-lg">
                                {index + 4}
                            </div>
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 mx-4">
                                <img
                                    src={player.photo}
                                    alt={player.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Player'; }}
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">{player.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{player.leagues[0]}</p>
                            </div>
                            <div className="flex items-center gap-4 text-right">
                                <div className="hidden sm:block">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Goles</div>
                                    <div className="font-bold text-gray-900 dark:text-white">{player.goals}</div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Asist.</div>
                                    <div className="font-bold text-gray-900 dark:text-white">{player.assists}</div>
                                </div>
                                <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg min-w-[60px] text-center">
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">Puntos</div>
                                    <div className="text-lg font-black text-blue-700 dark:text-blue-300">{player.points}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {playerStats.length > 10 && (
                        <div className="p-4 text-center border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-halcones-blue text-sm font-bold hover:underline py-2 px-4 focus:outline-none"
                            >
                                {showAll ? 'Ver menos' : 'Ver todos los jugadores'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TopPlayers;
