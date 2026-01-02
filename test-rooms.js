import { chromium } from 'playwright';

async function testRooms() {
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
  console.log(`Canvas size: ${box.width}x${box.height}`);

  // Click START TRAINING
  const buttonX = box.x + box.width / 2;
  const buttonY = box.y + (480 / 720) * box.height;
  await page.mouse.click(buttonX, buttonY);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'room-test-start.png', fullPage: true });
  console.log('Screenshot: room-test-start.png - Starting position');

  async function move(key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
    await page.waitForTimeout(300);
  }

  // Test 1: Try to enter SERVER ROOM (top-left)
  console.log('\n=== Testing SERVER ROOM access ===');
  // Move up first
  await move('w', 2500);
  await page.screenshot({ path: 'room-test-up.png', fullPage: true });

  // Move left to server room
  await move('a', 2500);
  await page.screenshot({ path: 'room-test-server.png', fullPage: true });
  console.log('Screenshot: room-test-server.png');

  // Test 2: Try to enter BREAK ROOM (top-right)
  console.log('\n=== Testing BREAK ROOM access ===');
  // Move right across the map
  await move('d', 6000);
  await page.screenshot({ path: 'room-test-break.png', fullPage: true });
  console.log('Screenshot: room-test-break.png');

  // Test 3: Try to enter MEETING ROOM (bottom-right)
  console.log('\n=== Testing MEETING ROOM access ===');
  // Move down
  await move('s', 4000);
  await page.screenshot({ path: 'room-test-meeting.png', fullPage: true });
  console.log('Screenshot: room-test-meeting.png');

  // Test 4: Check RECEPTION (bottom-left)
  console.log('\n=== Testing RECEPTION access ===');
  // Move left
  await move('a', 6000);
  await page.screenshot({ path: 'room-test-reception.png', fullPage: true });
  console.log('Screenshot: room-test-reception.png');

  console.log('\nAll room tests complete!');
  await browser.close();
}

testRooms().catch(console.error);
