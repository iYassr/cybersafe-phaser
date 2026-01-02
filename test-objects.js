import { chromium } from 'playwright';

async function testObjects() {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('console', msg => {
    if (msg.type() === 'log') console.log(`Browser: ${msg.text()}`);
  });

  console.log('Navigating to game...');
  await page.goto('https://cybersafe-phaser.pages.dev', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const canvas = await page.$('canvas');
  const box = await canvas.boundingBox();

  // Click START TRAINING
  await page.mouse.click(box.x + box.width / 2, box.y + (480 / 720) * box.height);
  await page.waitForTimeout(2000);

  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(200);
  }

  // Player starts at (480, 500)
  await page.screenshot({ path: 'obj-start.png', fullPage: true });

  // Test 1: Go to SERVER ROOM and reach the server object at (150, 150)
  console.log('\n=== Going to SERVER (150, 150) ===');
  await move('w', 2000);  // Up to y~300
  await move('a', 2000);  // Left toward server room
  await move('w', 1500);  // Up more toward server
  await move('a', 1000);  // More left
  await page.screenshot({ path: 'obj-server.png', fullPage: true });

  // Try to interact
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'obj-server-interact.png', fullPage: true });

  // Press Escape to close any dialog
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // Test 2: Go to BREAK ROOM objects at (1100, 150) and (1180, 150)
  console.log('\n=== Going to BREAK ROOM (1100-1180, 150) ===');
  await move('d', 5000);  // Go right across map
  await move('w', 1000);  // Up to break room height
  await move('d', 2000);  // More right into break room
  await page.screenshot({ path: 'obj-breakroom.png', fullPage: true });

  // Try to interact with coffee (public-wifi)
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'obj-breakroom-interact.png', fullPage: true });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // Test 3: Go to MEETING ROOM (bottom right area)
  console.log('\n=== Going to MEETING ROOM area ===');
  await move('s', 4000);  // Down
  await page.screenshot({ path: 'obj-meeting.png', fullPage: true });

  console.log('\nAll object tests complete!');
  await browser.close();
}

testObjects().catch(console.error);
