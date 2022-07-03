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
    await page.waitForSelector('.addposition');
    await page.click('.addposition');
    await page.waitForSelector('.save-position');
    await page.click('.position-name');
    await page.type('.position-name', 'Test 1');
    await page.click('.expiry-date');
    await page.type('.expiry-date', '08/20/2025');
    await page.click('.question-text');
    await page.type('.question-text', 'First Test Question');
    await page.click('.read-select');
    await page.type('.read-select', '5');
    await page.click('.answer-select');
    await page.type('.answer-select', '10');
    await page.click('.question-keywords');
    await page.type(
      '.question-keywords',
      'keyword1,keyword2,keyword3,keyword4'
    );
    const logoutButton = await page.$('.save-position');
    await logoutButton.evaluate((b) => b.click());
    await page.waitForSelector('.save-position');
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForSelector('.positioncard');
    const text = await page.$eval('.positioncard', (e) => e.textContent);
    expect(text).toContain('Test 1');
  });
  afterAll(() => {
    browser.close();
  });
});
