import { chromium } from 'playwright';

async function testDoors() {
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
  const buttonX = box.x + box.width / 2;
  const buttonY = box.y + (480 / 720) * box.height;
  await page.mouse.click(buttonX, buttonY);
  await page.waitForTimeout(2000);

  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(200);
  }

  // Player starts at (480, 500)
  console.log('Starting position screenshot...');
  await page.screenshot({ path: 'door-start.png', fullPage: true });

  // Test 1: SERVER ROOM (top-left)
  // Door gap is at bottom of wall (y=5,6,7 tiles = 176-256 pixels)
  // Need to go up-left to the door gap area around (272, 200)
  console.log('\n=== Testing SERVER ROOM ===');
  await move('w', 1500);  // Move up first
  await move('a', 2000);  // Move left toward server room
  await page.screenshot({ path: 'door-server-approach.png', fullPage: true });

  // Try to enter through door gap
  await move('a', 1500);  // Continue left into server room
  await page.screenshot({ path: 'door-server-inside.png', fullPage: true });
  console.log('Server room test complete');

  // Go back to center
  await move('d', 3000);
  await move('s', 500);

  // Test 2: BREAK ROOM (top-right)
  // Door gap is at bottom of wall (y=5,6,7 tiles)
  console.log('\n=== Testing BREAK ROOM ===');
  await move('d', 4000);  // Move right toward break room
  await page.screenshot({ path: 'door-break-approach.png', fullPage: true });

  // Try to enter through door gap
  await move('d', 1500);  // Continue right into break room
  await page.screenshot({ path: 'door-break-inside.png', fullPage: true });
  console.log('Break room test complete');

  // Go back to center-bottom
  await move('a', 3000);
  await move('s', 3000);

  // Test 3: MEETING ROOM (bottom-right)
  // Door gap at y=22,23,24 tiles (around 720-800 pixels)
  console.log('\n=== Testing MEETING ROOM ===');
  await move('d', 4000);  // Move right
  await page.screenshot({ path: 'door-meeting-approach.png', fullPage: true });

  await move('d', 1500);  // Enter meeting room
  await page.screenshot({ path: 'door-meeting-inside.png', fullPage: true });
  console.log('Meeting room test complete');

  console.log('\nAll door tests complete!');
  await browser.close();
}

testDoors().catch(console.error);
