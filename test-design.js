import { chromium } from 'playwright';

async function testDesign() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('Navigating to game...');
  await page.goto('https://cybersafe-phaser.pages.dev', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'design-menu.png', fullPage: true });
  console.log('Screenshot: design-menu.png');

  const canvas = await page.$('canvas');
  const box = await canvas.boundingBox();

  // Click START TRAINING
  await page.mouse.click(box.x + box.width / 2, box.y + (480 / 720) * box.height);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'design-start.png', fullPage: true });
  console.log('Screenshot: design-start.png (player at entrance)');

  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(200);
  }

  // Move up to see main office
  await move('w', 2000);
  await page.screenshot({ path: 'design-office.png', fullPage: true });
  console.log('Screenshot: design-office.png (main office view)');

  // Move to top to see server and break rooms
  await move('w', 2500);
  await page.screenshot({ path: 'design-top.png', fullPage: true });
  console.log('Screenshot: design-top.png (top rooms)');

  // Move right to break room
  await move('d', 3000);
  await page.screenshot({ path: 'design-breakroom.png', fullPage: true });
  console.log('Screenshot: design-breakroom.png');

  console.log('\nDesign test complete!');
  await browser.close();
}

testDesign().catch(console.error);
