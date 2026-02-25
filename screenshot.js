const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = '/Users/bagjun-won/kkeutgong-aice/frontend/public/pitch-assets';
if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to Dashboard...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 }).catch(e=>console.log(e));
  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'dashboard.png') });
  
  console.log("Navigating to Plan...");
  await page.goto('http://localhost:5173/plan', { waitUntil: 'networkidle0', timeout: 30000 }).catch(e=>console.log(e));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'plan.png') });

  console.log("Navigating to Labs...");
  await page.goto('http://localhost:5173/labs', { waitUntil: 'networkidle0', timeout: 30000 }).catch(e=>console.log(e));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'labs.png') });

  console.log("Navigating to Textbook...");
  await page.goto('http://localhost:5173/textbook', { waitUntil: 'networkidle0', timeout: 30000 }).catch(e=>console.log(e));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'textbook.png') });

  // Try to find a specific lab or session
  console.log("Navigating to Session...");
  await page.goto('http://localhost:5173/learning/session/demo-001', { waitUntil: 'networkidle0', timeout: 30000 }).catch(e=>console.log(e));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'session.png') });

  console.log("Done taking screenshots.");
  await browser.close();
})();
