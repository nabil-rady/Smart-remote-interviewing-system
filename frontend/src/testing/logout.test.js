import puppeteer from 'puppeteer';

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });
  it('logout and redirects to login page', async () => {
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('#Loginform');

    await page.click('.emailInput');
    await page.type('.emailInput', 'mohamed.medhat2199@gmail.com');
    await page.click('.passwordInput');
    await page.type('.passwordInput', '123456789');
    await page.click('.login_btn');
    await page.waitForSelector('.logoutUser');
    const logoutButton = await page.$('.logoutUser');
    await logoutButton.evaluate((b) => b.click());
    await page.waitForSelector('.header__navbar');
    const text = await page.$eval('.header__navbar', (e) => e.textContent);
    expect(text).toContain('Login');
  });
  afterAll(() => {
    browser.close();
  });
});
