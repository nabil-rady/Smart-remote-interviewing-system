import puppeteer from 'puppeteer';

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('Flutter position contains Expiry date', async () => {
    await page.goto('http://localhost:3000/interview');
    await page.waitForSelector('#employeeform');
    await page.click('#link');
    await page.type('#link', '99AO33IM');
    await page.click('.goInterview');
    await page.waitForSelector('.info_container');
    const text = await page.$eval('.info_container', (e) => e.textContent);
    expect(text).toContain('Welcome');
  });

  afterAll(() => {
    browser.close();
  });
});
