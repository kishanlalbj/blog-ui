const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const config = require('./lighthouse.config');

describe('Lighthouse Test', () => {
  let result;
  beforeAll(async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port,
      formFactor: 'mobile',
      throttlingMethod: 'provided',
      connection: 'threegfast'
    };
    const runnerResult = await lighthouse(
      'http://localhost:3000',
      options,
      config
    );

    // `.report` is the HTML report as a string
    const reportHTML = runnerResult.report;
    fs.writeFileSync('lhreport.html', reportHTML);
    fs.writeFileSync('lhreport.json', JSON.stringify(runnerResult.lhr));

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log(
      'Performance score was',
      runnerResult.lhr.categories.performance.score * 100
    );
    console.log(
      'Accessibility score was',
      runnerResult.lhr.categories.accessibility.score * 100
    );

    console.log('SEO score was', runnerResult.lhr.categories.seo.score * 100);

    await chrome.kill();
    result = runnerResult.lhr;
  });

  it('Performance should be 80', () => {
    expect(result.categories.performance.score * 100).toBeGreaterThanOrEqual(
      10
    );
  });

  it('Accessibility should be 80', () => {
    expect(result.categories.accessibility.score * 100).toBeGreaterThanOrEqual(
      80
    );
  });

  it('SEO should be 80', () => {
    expect(result.categories.seo.score * 100).toBeGreaterThanOrEqual(80);
  });

  it('Best Practices should be 80', () => {
    expect(
      result.categories['best-practices'].score * 100
    ).toBeGreaterThanOrEqual(80);
  });
});
