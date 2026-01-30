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

        // Wait for league content to load (tabs to appear)
        await new Promise(r => setTimeout(r, 5000));

        // 2. Find and Click "PUNTOS" or "GOLES"
        // Wait for the tab to be present in the DOM
        try {
            await page.waitForFunction(() => {
                const allEls = Array.from(document.querySelectorAll('a, li, div, span'));
                return allEls.some(el => el.innerText && (el.innerText.trim().toUpperCase() === 'PUNTOS' || el.innerText.trim().toUpperCase() === 'GOLES'));
            }, { timeout: 5000 });
        } catch (e) {
            console.log('Timeout waiting for PUNTOS/GOLES tab.');
        }

        const statsClicked = await page.evaluate(() => {
            const containsText = (el, text) => el.innerText && el.innerText.trim().toUpperCase() === text.toUpperCase();
            const allEls = Array.from(document.querySelectorAll('a, div, li, span'));

            const candidates = allEls.filter(el =>
                (containsText(el, 'PUNTOS') || containsText(el, 'GOLES')) &&
                el.offsetParent !== null
            );

            // Prioritize 'A' tags, then 'LI', then 'DIV'
            let statsEl = candidates.find(el => el.tagName === 'A');
            if (!statsEl) statsEl = candidates.find(el => el.tagName === 'LI');
            if (!statsEl) statsEl = candidates.find(el => el.tagName === 'DIV' && el.className.includes('tab'));
            if (!statsEl) statsEl = candidates[0];

            if (statsEl) {
                statsEl.click();
                return true;
            }
            return false;
        });

        if (!statsClicked) {
            console.log('Could not find "PUNTOS" or "GOLES" link.');
            return [];
        }
        console.log('Clicked Stats tab...');

        // Wait for table to update
        await new Promise(r => setTimeout(r, 5000));

        // 3. Parse Table
        const players = await page.evaluate((leagueName, leagueSource) => {
            const results = [];
            const rows = Array.from(document.querySelectorAll('tr'));

            rows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                if (cells.length < 4) return;

                // Check for specific team codes as per user request
                const rowText = row.innerText.toUpperCase();
                if (!rowText.match(/HALB|HALW|HAL|TORREVIEJA|HALCONES/)) return;

                // Name extraction
                let name = '';
                const nameEl = row.querySelector('.nombre_jugador') || row.querySelector('a[href*="ficha_jugador"]');
                if (nameEl) {
                    name = nameEl.innerText.trim();
                } else {
                    // Fallback name extraction
                    if (cells[4] && cells[4].innerText.trim().length > 5) {
                        name = cells[4].innerText.trim();
                    } else if (cells[3] && cells[3].innerText.trim().length > 5) {
                        name = cells[3].innerText.trim();
                    } else {
                        const texts = cells.map(c => c.innerText.trim());
                        const longest = texts.reduce((a, b) => a.length > b.length ? a : b, '');
                        if (longest.length > 5) {
                            name = longest;
                        }
                    }
                }

                // Image extraction:
                // The player photo is not in the row, but we can construct it from the player ID.
                // Example: https://sidgad.cloud/rfep/images//fichas/4861.png

                let photoUrl = '';
                const linkEl = row.querySelector('a[id_player]');
                if (linkEl) {
                    const playerId = linkEl.getAttribute('id_player');
                    const platform = leagueSource.toLowerCase(); // 'fep' or 'fpcv'
                    // Note: The user provided example has double slash //fichas/
                    // FEP uses 'rfep', FPCV uses 'fpcv' probably?
                    // Let's assume leagueSource 'FEP' maps to 'rfep' and 'FPCV' maps to 'fpcv'
                    const platformUrl = platform === 'fep' ? 'rfep' : 'fpcv';
                    photoUrl = `https://sidgad.cloud/${platformUrl}/images//fichas/${playerId}.png`;
                } else {
                    // Fallback to previous logic if no ID found (unlikely)
                    const images = Array.from(row.querySelectorAll('img'));
                    const fichaImg = images.find(img => img.src.includes('fichas'));
                    if (fichaImg) {
                        photoUrl = fichaImg.src;
                    }
                }

                // Extract stats: User specified order: PJ, PT, G, A
                // We need to find where the numbers start.
                // Typically: Rank (optional), Team (optional), Player, PJ, PT, G, A

                const cellValues = cells.map(c => c.innerText.trim());
                // Find the first cell that is a number after the name (or after the first few columns)
                // But we know the order is PJ, PT, G, A.

                // Let's look for a sequence of 4 numbers.
                let matchesPlayed = 0;
                let points = 0;
                let goals = 0;
                let assists = 0;

                // Find index of the cell that contains the name
                const nameIndex = cells.findIndex(c => c.innerText.trim() === name);

                if (nameIndex !== -1) {
                    // The stats usually follow the name. 
                    // Sometimes there is a team column between name and stats?
                    // Let's try to find the first number after nameIndex.

                    let firstStatIndex = -1;
                    for (let i = nameIndex + 1; i < cells.length; i++) {
                        if (/^\d+$/.test(cellValues[i])) {
                            firstStatIndex = i;
                            break;
                        }
                    }

                    if (firstStatIndex !== -1 && (firstStatIndex + 3) < cells.length) {
                        matchesPlayed = parseInt(cellValues[firstStatIndex]);
                        points = parseInt(cellValues[firstStatIndex + 1]);
                        goals = parseInt(cellValues[firstStatIndex + 2]);
                        assists = parseInt(cellValues[firstStatIndex + 3]);
                    }
                } else {
                    // Fallback if name index not found (unlikely if we extracted name from row)
                    // Try to find a sequence of numbers
                    const numbers = cellValues.filter(t => /^\d+$/.test(t)).map(n => parseInt(n));
                    if (numbers.length >= 4) {
                        // Heuristic: usually the first 4 numbers are PJ, PT, G, A
                        // But if Rank is present (index 0), we skip it.
                        // If Rank is present, numbers[0] is rank.

                        // Check if the first number looks like a rank (1, 2, 3...) and second number is PJ (could be anything)
                        // This is risky.
                        // Let's rely on the user saying "PJ, PT, G, A" are the columns.

                        // If we have many numbers, assume the block of stats is PJ, PT, G, A
                        // In FEP screenshot: Rank, PJ, PT, G, A. 
                        // So if Rank is present, stats start at numbers[1].

                        // Let's assume if the first number is small (rank) and we have enough numbers, skip it?
                        // Better: Look at the cell indices relative to the row end? No.

                        // Let's try to grab the last 4 numbers? No, there are per-game stats.

                        // Let's go with: If there is a Rank column (index 0 is number), skip 1 number.
                        const isRank = /^\d+$/.test(cellValues[0]);
                        const offset = isRank ? 1 : 0;

                        if (numbers.length > offset + 3) {
                            matchesPlayed = numbers[offset];
                            points = numbers[offset + 1];
                            goals = numbers[offset + 2];
                            assists = numbers[offset + 3];
                        }
                    }
                }

                if (name) {
                    results.push({
                        name: name,
                        photo: photoUrl,
                        league: leagueName,
                        matchesPlayed: matchesPlayed,
                        points: points,
                        goals: goals,
                        assists: assists
                    });
                }
            });
            return results;
        }, league.name, league.source);

        console.log(`Found ${players.length} players.`);
        return players;

    } catch (e) {
        console.error(`Error scraping ${league.name}:`, e.message);
        return [];
    } finally {
        await page.close();
    }
}

function normalizeName(name) {
    return name.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/\s+/g, ' '); // Normalize spaces
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const allPlayersMap = new Map();

    for (const league of LEAGUES) {
        const players = await scrapeLeagueStats(browser, league);

        for (const p of players) {
            const key = normalizeName(p.name);
            if (!allPlayersMap.has(key)) {
                allPlayersMap.set(key, {
                    name: p.name,
                    photo: p.photo,
                    matchesPlayed: 0,
                    points: 0,
                    goals: 0,
                    assists: 0,
                    leagues: []
                });
            }

            const entry = allPlayersMap.get(key);
            entry.matchesPlayed += p.matchesPlayed;
            entry.points += p.points;
            entry.goals += p.goals;
            entry.assists += p.assists;
            entry.leagues.push(p.league);

            if (p.photo && !p.photo.includes('sin_foto') && !entry.photo) {
                entry.photo = p.photo;
            }
        }
    }

    const aggregatedPlayers = Array.from(allPlayersMap.values())
        .map(p => ({
            ...p
        }))
        .sort((a, b) => b.points - a.points);

    const outputPath = path.join(__dirname, '../src/data/player_stats.json');
    await fs.writeFile(outputPath, JSON.stringify(aggregatedPlayers, null, 2));
    console.log(`\nSaved ${aggregatedPlayers.length} aggregated players to src/data/player_stats.json`);

    await browser.close();
})();
