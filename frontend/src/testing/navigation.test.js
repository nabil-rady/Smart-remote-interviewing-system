import puppeteer from 'puppeteer';

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });
  it('navigates to login page', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.guest__ul__li__login');
    await page.click('.guest__ul__li__login a');
    await page.waitForSelector('.login_header');
    const text = await page.$eval('.login_header', (e) => e.textContent);
    expect(text).toContain('Login to Vividly');
  });
  afterAll(() => {
    browser.close();
  });
});
