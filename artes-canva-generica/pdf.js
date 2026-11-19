const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1350}});
  for (const n of ['arte1','arte2']) {
    await p.goto('file://'+__dirname+'/'+n+'.html',{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
    await p.screenshot({path:__dirname+'/'+n+'-preview.png'});
    await p.pdf({path:__dirname+'/'+n+'.pdf',width:'1080px',height:'1350px',printBackground:true,pageRanges:'1'});
  }
  await b.close();
})();
