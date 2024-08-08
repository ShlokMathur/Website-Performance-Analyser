const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Browser launched');

    const page = await browser.newPage();
    console.log('New page created');

    const url = 'https://www.google.com';
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log(`Navigated to ${url}`);

    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    console.log('Performance timing:', performanceTiming);

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Error:', error);
  }
})();
