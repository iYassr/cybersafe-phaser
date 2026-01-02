import { chromium } from 'playwright';

async function testGame() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Collect console logs
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`Browser console: [${msg.type()}] ${msg.text()}`);
  });

  // Collect errors
  page.on('pageerror', err => {
    console.log(`Browser error: ${err.message}`);
  });

  console.log('Navigating to game...');
  await page.goto('https://cybersafe-phaser.pages.dev', { waitUntil: 'networkidle' });

  // Wait for Phaser to initialize
  await page.waitForTimeout(3000);

  console.log('Taking screenshot of menu...');
  await page.screenshot({ path: 'screenshot-menu.png' });

  // Check if canvas exists
  const canvas = await page.$('canvas');
  if (canvas) {
    console.log('Canvas found!');
    const box = await canvas.boundingBox();
    console.log(`Canvas size: ${box.width}x${box.height} at (${box.x}, ${box.y})`);

    // Try clicking the button area (center of canvas, slightly below middle)
    const buttonX = box.x + box.width / 2;
    const buttonY = box.y + (500 / 640) * box.height; // Button is at y=500 in 640px height

    console.log(`Clicking at (${buttonX}, ${buttonY})...`);
    await page.mouse.click(buttonX, buttonY);

    await page.waitForTimeout(2000);
    console.log('Taking screenshot after click...');
    await page.screenshot({ path: 'screenshot-after-click.png' });
  } else {
    console.log('No canvas found!');
  }

  console.log('\n--- Console logs collected ---');
  consoleLogs.forEach(log => console.log(log));

  await browser.close();
  console.log('\nTest complete! Check screenshot-menu.png and screenshot-after-click.png');
}

testGame().catch(console.error);
