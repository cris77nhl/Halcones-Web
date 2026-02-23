import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEAGUES = [
    // FEP
    { id: '3197', name: 'Liga Plata Masculina', url: 'https://www.hockeylinea.fep.es/', source: 'FEP' },
    { id: '3201', name: 'Liga Élite Infantil', url: 'https://www.hockeylinea.fep.es/', source: 'FEP' },
    // FPCV
    { id: '420', name: 'Senior', url: 'https://www.hockeylinea.fpcv.es/', source: 'FPCV' },
    { id: '418', name: 'Junior', url: 'https://www.hockeylinea.fpcv.es/', source: 'FPCV' },
    { id: '417', name: 'Juvenil', url: 'https://www.hockeylinea.fpcv.es/', source: 'FPCV' },
    { id: '416', name: 'Infantil', url: 'https://www.hockeylinea.fpcv.es/', source: 'FPCV' },
    { id: '414', name: 'Alevín', url: 'https://www.hockeylinea.fpcv.es/', source: 'FPCV' },
    { id: '413', name: 'Benjamín', url: 'https://www.hockeylinea.fpcv.es/', source: 'FPCV' }
];

const CATEGORY_MAPPING = {
    'Liga Plata Masculina': 'Senior',
    'Senior': 'Senior',
    'Liga Élite Infantil': 'Infantil',
    'Infantil': 'Infantil',
    'Junior': 'Junior',
    'Juvenil': 'Juvenil',
    'Alevín': 'Alevín',
    'Benjamín': 'Benjamín'
};

async function scrapeLeagueStats(browser, league) {
    console.log(`\nScraping stats for ${league.name} (${league.source})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });

    try {
        await page.goto(league.url, { waitUntil: 'networkidle2', timeout: 60000 });

        // 1. Click League
        const leagueSelector = `a[id="${league.id}"]`;
        await page.waitForSelector(leagueSelector, { timeout: 10000 });
        await page.evaluate((sel) => {
            document.querySelector(sel).click();
        }, leagueSelector);
        console.log('Clicked league...');

        // Wait for league content to load
        await new Promise(r => setTimeout(r, 5000));

        // 2. Click Stats Tab
        const statsClicked = await page.evaluate(() => {
            const containsText = (el, text) => el.innerText && el.innerText.trim().toUpperCase() === text.toUpperCase();
            const allEls = Array.from(document.querySelectorAll('a, div, li, span'));
            let statsEl = allEls.find(el => (containsText(el, 'PUNTOS') || containsText(el, 'GOLES')) && el.offsetParent !== null);
            if (statsEl) { statsEl.click(); return true; }
            return false;
        });

        if (!statsClicked) {
            console.log('Could not find stats tab.');
            return [];
        }
        console.log('Clicked Stats tab...');
        await new Promise(r => setTimeout(r, 5000));

        // 3. Parse Table
        return await page.evaluate((leagueName, leagueSource) => {
            const results = [];
            const rows = Array.from(document.querySelectorAll('tr'));
            rows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                if (cells.length < 4) return;
                if (!row.innerText.toUpperCase().match(/HALB|HALW|HAL|TORREVIEJA|HALCONES/)) return;

                let name = row.querySelector('.nombre_jugador')?.innerText.trim() || cells[3]?.innerText.trim() || cells[4]?.innerText.trim();
                let photoUrl = '';
                const linkEl = row.querySelector('a[id_player]');
                if (linkEl) {
                    const playerId = linkEl.getAttribute('id_player');
                    photoUrl = `https://sidgad.cloud/${leagueSource === 'FEP' ? 'rfep' : 'fpcv'}/images//fichas/${playerId}.png`;
                }

                const numbers = cells.map(c => c.innerText.trim()).filter(t => /^\d+$/.test(t)).map(n => parseInt(n));
                if (numbers.length >= 4) {
                    const offset = /^\d+$/.test(cells[0].innerText.trim()) ? 1 : 0;
                    results.push({
                        name,
                        photo: photoUrl,
                        league: leagueName,
                        matchesPlayed: numbers[offset] || 0,
                        points: numbers[offset + 1] || 0,
                        goals: numbers[offset + 2] || 0,
                        assists: numbers[offset + 3] || 0
                    });
                }
            });
            return results;
        }, league.name, league.source);
    } catch (e) {
        console.error(`Error scraping ${league.name}:`, e.message);
        return [];
    } finally {
        await page.close();
    }
}

function normalizeName(name) {
    if (!name) return '';
    // Remove accents, convert to lowercase, normalize spaces
    let normalized = name.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, ' ');

    // Sort words alphabetically to handle reversed names (e.g., "DEL REY MUNAR" vs "MUNAR DEL REY")
    const words = normalized.split(' ').sort();
    return words.join(' ');
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const aggregationMap = new Map(); // Key: category_normalizedName

    for (const league of LEAGUES) {
        const players = await scrapeLeagueStats(browser, league);
        const category = CATEGORY_MAPPING[league.name] || league.name;

        for (const p of players) {
            const nameKey = normalizeName(p.name);
            const aggKey = `${category}_${nameKey}`;

            if (!aggregationMap.has(aggKey)) {
                aggregationMap.set(aggKey, {
                    name: p.name,
                    photo: p.photo,
                    category: category,
                    matchesPlayed: 0,
                    points: 0,
                    goals: 0,
                    assists: 0
                });
            }

            const entry = aggregationMap.get(aggKey);
            entry.matchesPlayed += p.matchesPlayed;
            entry.points += p.points;
            entry.goals += p.goals;
            entry.assists += p.assists;
            if (p.photo && !p.photo.includes('sin_foto') && !entry.photo) entry.photo = p.photo;
        }
    }

    const result = Array.from(aggregationMap.values()).sort((a, b) => b.points - a.points);
    const outputPath = path.join(__dirname, '../src/data/player_stats.json');
    await fs.writeFile(outputPath, JSON.stringify(result, null, 2));
    console.log(`\nSaved ${result.length} entries to src/data/player_stats.json`);
    await browser.close();
})();
