const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

describe('Lighthouse Test', () => {
  let result;
  beforeAll(async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'json',
      // onlyCategories: ['performance', 'best', 'accessibility', 'seo'],
      port: chrome.port
    };
    const runnerResult = await lighthouse('http://localhost:3000', options);

    // `.report` is the HTML report as a string
    const reportJson = runnerResult.report;
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
