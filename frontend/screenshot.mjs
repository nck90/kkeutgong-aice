import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/bagjun-won/kkeutgong-aice/frontend/public/pitch-assets';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    async function take(url, filename) {
        console.log(`Navigating to ${url}...`);
        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
            await new Promise(r => setTimeout(r, 2000));
            await page.screenshot({ path: path.join(outDir, filename) });
            console.log(`Saved ${filename}`);
        } catch (e) {
            console.log(`Failed ${filename}:`, e);
        }
    }

    await take('http://localhost:5173/', 'dashboard.png');
    // Since dashboard redirects to onboarding/tracker if not logged in, we might need to set local storage
    await page.evaluate(() => {
        localStorage.setItem('aice-visited', 'true');
        // We should emulate zunstand tracking
        localStorage.setItem('aice-storage', JSON.stringify({
            state: {
                trackId: 'associate',
                isOnboarded: true,
                examDate: '2026-05-30',
                level: 1,
                xp: 50
            },
            version: 0
        }));
    });

    // Reload dashboard with injected state
    await take('http://localhost:5173/', 'dashboard-auth.png');
    await take('http://localhost:5173/labs', 'labs.png');
    await take('http://localhost:5173/plan', 'plan.png');
    await take('http://localhost:5173/textbook', 'textbook.png');
    await take('http://localhost:5173/learning/session/demo-001', 'session.png');
    await take('http://localhost:5173/diagnostic', 'diagnostic.png');

    console.log("Done taking screenshots.");
    await browser.close();
})();
