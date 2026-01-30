import puppeteer from 'puppeteer';
import fs from 'fs/promises';

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

async function scrapeLeague(browser, league) {
    console.log(`\nScraping ${league.name} (${league.source})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });

    let capturedHtmlChunks = [];

    await page.setRequestInterception(true);

    page.on('request', request => {
        request.continue();
    });

    page.on('response', async response => {
        const url = response.url();
        if (url.includes('sidgad.es') && url.includes('_cal_idc_')) {
            try {
                const text = await response.text();
                capturedHtmlChunks.push(text);
            } catch (err) {
                // ignore
            }
        }
    });

    try {
        await page.goto(league.url, { waitUntil: 'networkidle2', timeout: 60000 });

        const selector = `a[id="${league.id}"]`;
        await page.waitForSelector(selector, { timeout: 10000 });

        await page.evaluate((sel) => {
            document.querySelector(sel).click();
        }, selector);
        console.log('Clicked league...');

        // Wait for responses
        await new Promise(r => setTimeout(r, 5000));

        if (capturedHtmlChunks.length === 0) {
            console.log('No calendar data intercepted.');
            return [];
        }

        const matches = await page.evaluate((htmlChunks, leagueName, source) => {
            const results = [];
            const parser = new DOMParser();

            htmlChunks.forEach(html => {
                const doc = parser.parseFromString(html, 'text/html');
                const rows = doc.querySelectorAll('tr.team_class');

                rows.forEach(row => {
                    const text = row.innerText;
                    if (!text.match(/halcones|torrevieja/i)) return;

                    const cells = row.querySelectorAll('td');

                    // 1. Date (usually 2nd cell)
                    let date = 'TBD';
                    if (cells[1]) {
                        date = cells[1].innerText.trim();
                    }

                    // 2. Time (usually 3rd cell)
                    let time = 'TBD';
                    if (cells[2] && cells[2].innerText.trim()) {
                        time = cells[2].innerText.trim();
                    }

                    // 3. Location (Index 3)
                    let location = 'Unknown';
                    if (cells[3]) {
                        location = cells[3].innerText.trim();
                    }

                    // 4. Teams and Logos
                    const logos = row.querySelectorAll('img.team_logo');
                    const names = row.querySelectorAll('.nombre_junto_logo');

                    let homeTeam = 'Unknown';
                    let awayTeam = 'Unknown';
                    let homeLogo = '';
                    let awayLogo = '';

                    if (names.length >= 2) {
                        homeTeam = names[0].innerText.trim();
                        awayTeam = names[1].innerText.trim();
                    }

                    if (logos.length >= 2) {
                        homeLogo = logos[0].src;
                        awayLogo = logos[1].src;
                    }

                    // 5. Score and Winner in Draw
                    let score = '';
                    let winnerInDraw = null;

                    const scoreCell = row.querySelector('.web_link_td');
                    if (scoreCell) {
                        score = scoreCell.innerText.trim();
                        if (score === '-' || score === 'Aplaz.') score = ''; // Not played yet or postponed

                        // Check for Winner in Draw (Bonus Point)
                        // Look for .fa-bold icon in previous or next sibling element
                        const prevTd = scoreCell.previousElementSibling;
                        const nextTd = scoreCell.nextElementSibling;

                        const homeBonus = prevTd && prevTd.querySelector('.fa-bold');
                        const awayBonus = nextTd && nextTd.querySelector('.fa-bold');

                        if (homeBonus && !awayBonus) {
                            winnerInDraw = 'home';
                        } else if (awayBonus && !homeBonus) {
                            winnerInDraw = 'away';
                        } else if (homeBonus && awayBonus) {
                            // Both have it? Maybe check color if possible, but for now mark as ambiguous or null
                            // In the dump, both were gray #AAA.
                            // If both have it, it might be a true tie or both got points.
                            // Let's leave it null if ambiguous.
                        }
                    }

                    results.push({
                        league: leagueName,
                        source: source,
                        date: date,
                        time: time,
                        home_team: homeTeam,
                        away_team: awayTeam,
                        home_logo: homeLogo,
                        away_logo: awayLogo,
                        location: location,
                        score: score,
                        winner_in_draw: winnerInDraw
                    });
                });
            });
            return results;
        }, capturedHtmlChunks, league.name, league.source);

        console.log(`Found ${matches.length} matches for ${league.name}`);
        return matches;

    } catch (e) {
        console.error(`Error scraping ${league.name}:`, e.message);
        return [];
    } finally {
        await page.close();
    }
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const allMatches = [];

    for (const league of LEAGUES) {
        const matches = await scrapeLeague(browser, league);
        allMatches.push(...matches);
        await new Promise(r => setTimeout(r, 1000));
    }

    await browser.close();

    console.log(`\nTotal matches found: ${allMatches.length}`);
    await fs.writeFile('halcones_matches.json', JSON.stringify(allMatches, null, 2));
    console.log('Saved to halcones_matches.json');
})();
