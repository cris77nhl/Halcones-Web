import fs from 'fs/promises';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const matches = require('../halcones_matches.json');

function mapCategory(league) {
    if (league.includes('Plata Masculina')) return 'Senior';
    if (league.includes('Élite Infantil')) return 'Infantil';
    if (league.includes('Senior')) return 'Senior';
    if (league.includes('Junior')) return 'Junior';
    if (league.includes('Juvenil')) return 'Juvenil';
    if (league.includes('Infantil')) return 'Infantil';
    if (league.includes('Alevín')) return 'Alevín';
    if (league.includes('Benjamín')) return 'Benjamín';
    return 'Senior'; // Default
}

function escapeSql(str) {
    if (!str) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

function formatDate(dateStr) {
    // DD/MM/YYYY -> YYYY-MM-DD
    if (!dateStr || dateStr === 'TBD') return 'NULL';
    const parts = dateStr.split('/');
    if (parts.length !== 3) return 'NULL';
    return `'${parts[2]}-${parts[1]}-${parts[0]}'`;
}

let sql = `-- Re-create matches table with perfect structure for scraped data
DROP TABLE IF EXISTS matches;

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT,
    league TEXT,
    source TEXT,
    date DATE,
    time TEXT,
    home_team TEXT,
    away_team TEXT,
    home_team_logo TEXT,
    away_team_logo TEXT,
    location TEXT,
    score TEXT,
    winner_in_draw TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert data
INSERT INTO matches (category, league, source, date, time, home_team, away_team, home_team_logo, away_team_logo, location, score, winner_in_draw) VALUES
`;

const values = matches.map(m => {
    const category = mapCategory(m.league);
    const league = escapeSql(m.league);
    const source = escapeSql(m.source);
    const date = formatDate(m.date);
    const time = escapeSql(m.time);
    const home_team = escapeSql(m.home_team);
    const away_team = escapeSql(m.away_team);
    const home_logo = escapeSql(m.home_logo);
    const away_logo = escapeSql(m.away_logo);
    const location = escapeSql(m.location);
    const score = escapeSql(m.score);
    const winner = escapeSql(m.winner_in_draw);

    return `('${category}', ${league}, ${source}, ${date}, ${time}, ${home_team}, ${away_team}, ${home_logo}, ${away_logo}, ${location}, ${score}, ${winner})`;
});

sql += values.join(',\n') + ';';

await fs.writeFile('import_matches.sql', sql);
console.log('Generated import_matches.sql with ' + matches.length + ' matches.');
