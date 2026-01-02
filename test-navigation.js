import { chromium } from 'playwright';

async function testNavigation() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`Browser: [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`Browser error: ${err.message}`);
  });

  console.log('Navigating to game...');
  await page.goto('https://cybersafe-phaser.pages.dev', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const canvas = await page.$('canvas');
  if (!canvas) {
    console.log('No canvas found!');
    await browser.close();
    return;
  }

  const box = await canvas.boundingBox();

  // Click START TRAINING
  const buttonX = box.x + box.width / 2;
  const buttonY = box.y + (500 / 640) * box.height;
  await page.mouse.click(buttonX, buttonY);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'nav-1-start.png' });
  console.log('1. Starting position');

  // Helper function
  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(200);
  }

  // Player starts at (480, 500). Server room door is around x=144-176, y=208
  // Need to: go LEFT to x~160, then UP to enter room

  // Step 1: Move LEFT first to align with server room door (x=480 -> x=160, need ~320px = 1600ms at 200 speed)
  console.log('2. Moving LEFT to align with server room door...');
  await move('a', 2000);
  await page.screenshot({ path: 'nav-2-moved-left.png' });

  // Step 2: Move UP towards server room (y=500 -> y=200, need ~300px = 1500ms)
  console.log('3. Moving UP towards server room...');
  await move('w', 1800);
  await page.screenshot({ path: 'nav-3-near-server.png' });

  // Step 3: Try to enter server room (continue UP through doorway)
  console.log('4. Trying to enter server room...');
  await move('w', 1000);
  await page.screenshot({ path: 'nav-4-enter-server.png' });

  // Step 4: If we're in server room, move around to confirm
  console.log('5. Moving around in server room...');
  await move('w', 500);
  await move('a', 500);
  await page.screenshot({ path: 'nav-5-inside-server.png' });

  // Now try break room - go back down, then right
  console.log('6. Going back to main area...');
  await move('s', 2000);
  await page.screenshot({ path: 'nav-6-back-to-main.png' });

  console.log('7. Moving RIGHT towards break room...');
  await move('d', 4000);
  await page.screenshot({ path: 'nav-7-moved-right.png' });

  console.log('8. Moving UP towards break room...');
  await move('w', 1800);
  await page.screenshot({ path: 'nav-8-near-break.png' });

  console.log('9. Trying to enter break room...');
  await move('w', 1000);
  await page.screenshot({ path: 'nav-9-enter-break.png' });

  console.log('\nTest complete! Check nav-*.png screenshots');
  await browser.close();
}

testNavigation().catch(console.error);
