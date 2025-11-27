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

    try {
        await page.goto(league.url, { waitUntil: 'networkidle2', timeout: 60000 });

        const selector = `a[id="${league.id}"]`;
        await page.waitForSelector(selector, { timeout: 10000 });

        // Click
        await page.evaluate((sel) => {
            document.querySelector(sel).click();
        }, selector);
        console.log('Clicked league...');

        // Wait for modal content to load (blind wait)
        await new Promise(r => setTimeout(r, 6000));

        // Get all text content from the modal
        const modalText = await page.evaluate(() => {
            const modal = document.querySelector('#sidgad_thickbox');
            return modal ? modal.innerText : '';
        });

        if (!modalText) {
            console.log('No modal text found.');
            return [];
        }

        // Parse text line by line
        const lines = modalText.split('\n');
        const matches = [];

        // Regex to find date (DD/MM/YYYY) and time (HH:MM)
        // Example line: "29/11/2025 18:00 HALCONES TORREVIEJA vs RIVAL"
        // Or: "29/11/2025 18:00 RIVAL vs HALCONES TORREVIEJA"

        // We look for lines with "Halcones" or "Torrevieja"
        // AND a date pattern close by.

        // Since the text might be split across lines (Date \n Time \n Team), 
        // we might need to look at chunks.

        // Let's try to find blocks.
        // But first, simple line scan.

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Check if this line or adjacent lines contain Halcones
            // We need a context window because Date might be on one line and Team on another.

            // Heuristic: If we find a Date, look ahead 5 lines for Halcones.
            const dateMatch = line.match(/(\d{2}\/\d{2}\/\d{4})/);

            if (dateMatch) {
                const date = dateMatch[1];
                // Look ahead for time and teams
                let time = 'TBD';
                let foundHalcones = false;
                let context = '';

                // Gather context from this line and next 5 lines
                for (let j = 0; j < 6; j++) {
                    if (i + j < lines.length) {
                        const subLine = lines[i + j];
                        context += subLine + ' | ';
                        if (subLine.match(/(\d{2}:\d{2})/)) time = subLine.match(/(\d{2}:\d{2})/)[1];
                        if (subLine.match(/halcones|torrevieja/i)) foundHalcones = true;
                    }
                }

                if (foundHalcones) {
                    // We found a match block!
                    // Try to extract opponent.
                    // Context looks like: "29/11/2025 | 18:00 | HALCONES | vs | RIVAL |"

                    // Let's try to identify Home and Away from the context string
                    // This is tricky without structure, but let's save the raw context.
                    // We can refine later.

                    // Simple logic: 
                    // If Halcones is mentioned, it's a match.
                    // We'll save it.

                    matches.push({
                        league: league.name,
                        source: league.source,
                        date: date,
                        time: time,
                        // We'll put the full context in 'home_team' for now so the user can see it
                        // and we can decide how to parse it better if needed.
                        home_team: 'Halcones Match (See Context)',
                        away_team: 'Opponent (See Context)',
                        raw_context: context,
                        home_logo: null,
                        away_logo: null
                    });

                    // Skip ahead to avoid duplicate detection for the same match
                    i += 3;
                }
            }
        }

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
