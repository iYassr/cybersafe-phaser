import { chromium } from 'playwright';

async function testWideMap() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('console', msg => {
    if (msg.type() === 'log') console.log(`Browser: ${msg.text()}`);
  });

  console.log('Navigating to game...');
  await page.goto('https://cybersafe-phaser.pages.dev', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'test-wide-menu.png', fullPage: true });
  console.log('Screenshot: test-wide-menu.png');

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

  await page.screenshot({ path: 'test-wide-office.png', fullPage: true });
  console.log('Screenshot: test-wide-office.png (starting position)');

  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(200);
  }

  // Move up to main area
  await move('w', 1500);
  await page.screenshot({ path: 'test-wide-center.png', fullPage: true });
  console.log('Screenshot: test-wide-center.png');

  // Move right to see the right side of the map
  await move('d', 3000);
  await page.screenshot({ path: 'test-wide-right.png', fullPage: true });
  console.log('Screenshot: test-wide-right.png (right side)');

  // Move up to break room
  await move('w', 2000);
  await page.screenshot({ path: 'test-wide-breakroom.png', fullPage: true });
  console.log('Screenshot: test-wide-breakroom.png (break room area)');

  // Move left to server room
  await move('a', 5000);
  await page.screenshot({ path: 'test-wide-server.png', fullPage: true });
  console.log('Screenshot: test-wide-server.png (server room)');

  // Move down to reception
  await move('s', 4000);
  await page.screenshot({ path: 'test-wide-reception.png', fullPage: true });
  console.log('Screenshot: test-wide-reception.png (reception)');

  console.log('\nTest complete!');
  await browser.close();
}

testWideMap().catch(console.error);
