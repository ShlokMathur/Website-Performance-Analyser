const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 5003;

app.use(cors({
  origin: 'http://localhost:3000' // Allow only this origin to access the server
}));
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Starting analysis for: ${url}`);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Browser launched');
    
    const page = await browser.newPage();
    console.log('New page created');
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log(`Navigated to ${url}`);

    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    console.log('Performance timing captured');

    const metrics = {
      pageLoadTime: performanceTiming.loadEventEnd - performanceTiming.navigationStart,
      totalRequestSize: await page.evaluate(() =>
        window.performance.getEntriesByType('resource').reduce((acc, resource) => acc + resource.transferSize, 0)
      ),
      numberOfRequests: await page.evaluate(() => window.performance.getEntriesByType('resource').length),
    };
    console.log('Metrics calculated');

    await browser.close();
    console.log('Browser closed');

    res.json(metrics);
  } catch (error) {
    console.error('Error analyzing the website:', error);
    res.status(500).json({ error: 'Error analyzing the website' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
