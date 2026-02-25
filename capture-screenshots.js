import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1400, height: 900 }
    });

    // Set auth state so we don't get redirected (if applicable)
    await context.addInitScript(() => {
        localStorage.setItem('aice_auth', JSON.stringify({
            state: {
                session: { user: { id: "u1", name: "학생", email: "test@test", role: "USER" }, token: "test" }
            }
        }));
    });

    const page = await context.newPage();

    const takeShot = async (path, filename) => {
        console.log(`Taking screenshot of ${path}...`);
        await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
        // Wait for any animations to settle
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `frontend/public/pitch-assets/${filename}` });
    };

    await takeShot('/plan', 'plan.png');
    await takeShot('/textbook/c1', 'textbook.png');
    await takeShot('/labs', 'labs.png');
    await takeShot('/course/associate/a1_s01', 'session.png');
    await takeShot('/diagnostic', 'diagnostic.png');
    await takeShot('/report', 'dashboard-auth.png');

    await browser.close();
    console.log('All screenshots captured!');
})();
