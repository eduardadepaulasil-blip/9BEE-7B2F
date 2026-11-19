const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(__dirname, 'black_escola_estruturada.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.resolve(__dirname, '..', 'BLACK_ESCOLA_ESTRUTURADA_2027.pdf'), preferCSSPageSize: true, printBackground: true });
  await b.close();
})();
