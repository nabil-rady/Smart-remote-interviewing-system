import puppeteer from 'puppeteer';

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('contains Smart', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.section-1__content__paragraph');
    const text = await page.$eval(
      '.section-1__content__paragraph',
      (e) => e.textContent
    );
    expect(text).toContain('Smart');
  });

  afterAll(() => {
    browser.close();
  });
});
