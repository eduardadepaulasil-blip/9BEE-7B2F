// Exporta planner.html para PDF em tamanho físico real, usando o Chromium
// empacotado com o Playwright deste ambiente. Respeita as regras @page do
// print.css (artboard 216x186mm = 210x180mm de corte + 3mm de sangria).
"use strict";
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const htmlPath = path.join(__dirname, "..", "planner.html");
  const outPath = path.join(__dirname, "..", "planner-2027-prototipos.pdf");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + htmlPath, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: outPath,
    printBackground: true,
    preferCSSPageSize: true, // respeita o @page { size: ... } do print.css
  });

  await browser.close();
  console.log("PDF gerado em:", outPath);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
