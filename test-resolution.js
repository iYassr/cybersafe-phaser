import { chromium } from 'playwright';

async function testResolution() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('console', msg => {
    console.log(`Browser: [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`Browser error: ${err.message}`);
  });

  console.log('Navigating to game...');
  await page.goto('https://cybersafe-phaser.pages.dev', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'test-menu.png', fullPage: true });
  console.log('Screenshot: test-menu.png');

  const canvas = await page.$('canvas');
  if (!canvas) {
    console.log('No canvas found!');
    await browser.close();
    return;
  }

  const box = await canvas.boundingBox();
  console.log(`Canvas size: ${box.width}x${box.height}`);

  // Click START TRAINING
  const buttonX = box.x + box.width / 2;
  const buttonY = box.y + (480 / 720) * box.height;
  await page.mouse.click(buttonX, buttonY);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'test-office.png', fullPage: true });
  console.log('Screenshot: test-office.png (starting position)');

  // Move around to see the rooms
  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(200);
  }

  // Move up to see server room area
  await move('w', 2000);
  await page.screenshot({ path: 'test-upper-area.png', fullPage: true });
  console.log('Screenshot: test-upper-area.png');

  // Move left to server room
  await move('a', 2000);
  await page.screenshot({ path: 'test-server-area.png', fullPage: true });
  console.log('Screenshot: test-server-area.png');

  // Move right to break room
  await move('d', 4000);
  await page.screenshot({ path: 'test-break-area.png', fullPage: true });
  console.log('Screenshot: test-break-area.png');

  console.log('\nTest complete!');
  await browser.close();
}

testResolution().catch(console.error);
