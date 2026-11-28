# Planner da Diretora 2027 — projeto HTML

Projeto HTML/CSS/JS real (sem Canva, sem apresentação) que gera o planner como
páginas físicas exatas e exporta para PDF de impressão via Chromium/Playwright.

## Estrutura

```
html-projeto/
  src/build.js        gera planner.html a partir dos templates + calendário 2027
  src/export-pdf.js    abre planner.html no Chromium (Playwright) e exporta o PDF
  styles/tokens.css    paleta, tipografia, fontes (@font-face local)
  styles/print.css     @page, margens espelhadas, sangria, regras de impressão
  fonts/                Kristi, Montserrat, Cormorant Garamond (woff2, licença OFL)
  assets/paisley/       as duas artes paisley aprovadas (frente/verso)
  planner.html          arquivo gerado (não editar à mão — editar build.js)
  planner-2027-prototipos.pdf   PDF exportado
```

## Como regenerar

```
node src/build.js        # regenera planner.html
node src/export-pdf.js   # regenera o PDF a partir do planner.html atual
```

Nenhuma dependência além do Node (já tem Playwright instalado neste ambiente).
Alterar o conteúdo/diagramação: editar `src/build.js` (templates de página) ou
`styles/*.css` (identidade visual) e rodar os dois comandos de novo.

## Dimensões físicas

- Página de corte (trim): 210 × 180mm.
- Artboard exportado: 216 × 186mm = corte + 3mm de sangria em cada borda.
- Margem de encadernação: 15mm, alternando de lado (par/ímpar).
- Margem externa: 8mm.
- `@page { size: 216mm 186mm; margin: 0 }` — cada `.pagina` do HTML vira exatamente
  uma página do PDF (`break-after: page`), na ordem em que aparece no documento.
- Na tela, duas páginas (`.par` + `.impar`) dentro de uma `div.dupla` aparecem lado
  a lado só para efeito visual; na impressão, `.dupla` vira `display:contents` e
  cada página sai como folha própria — exatamente como será encadernado.

## Verificado nesta rodada

- `pdfinfo`: 11 páginas, 612 × 527.04pt = 216 × 186mm exatos.
- `pdffonts`: as 4 fontes saem **embarcadas e subsetadas** no PDF.
- Conferido visualmente (capa, pilares de gestão, calendário, dupla semanal) via
  `pdftoppm` — sem cortes de texto, sem sobreposição.

## Pendências antes de qualquer impressão em gráfica real

- **Cor**: este PDF está em **RGB** (saída padrão do Chromium). Gráficas offset
  normalmente pedem **CMYK**; conversão certa depende do perfil ICC da gráfica
  específica — não faça isso às cegas. Pergunte à gráfica o perfil exigido antes
  de converter.
- **PDF/X**: não validado ainda. Se a gráfica exigir PDF/X-1a ou PDF/X-4, é um
  passo de pós-processamento (Ghostscript ou similar) a definir com as specs
  reais deles.
- **Marcas de corte**: o artboard já inclui a sangria de 3mm, mas não desenha
  marcas de corte/registro — normalmente a própria gráfica aplica isso na
  imposição. Posso adicionar marcas simples se for pedido.
- Textos marcados "RASCUNHO" no HTML ainda não são os textos definitivos.

## Fontes

Kristi, Montserrat e Cormorant Garamond — Google Fonts, licença SIL Open Font
License (uso comercial liberado, incorporação em PDF permitida).
