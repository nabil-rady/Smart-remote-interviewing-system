import puppeteer from 'puppeteer';

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('shows an error message after submitting a form', async () => {
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('#Loginform');

    await page.click('.emailInput');
    await page.type('.emailInput', 'mohamed.medhat2199@gmail.com');
    await page.click('.passwordInput');
    await page.type('.passwordInput', '123456789');
    await page.click('.login_btn');

    await page.waitForSelector('.dashboard-label');

    const text = await page.$eval('.dashboard-label', (e) => e.textContent);
    expect(text).toContain('Dashboard');
  });
  afterAll(() => browser.close());
});
