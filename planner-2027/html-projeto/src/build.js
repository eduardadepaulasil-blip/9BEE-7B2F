// Gera planner.html (estático, sem JS no runtime) a partir dos dados do calendário
// e dos templates de página. Node puro, sem dependências externas.
"use strict";
const fs = require("fs");
const path = require("path");

const ANO = 2027;

function pascoa(ano) {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4,
    f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
    mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia);
}
function addDias(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function ymd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

const PASCOA = pascoa(ANO);
const FERIADOS = {};
[[0, 1, "Confraternização Universal"], [3, 21, "Tiradentes"], [4, 1, "Dia do Trabalho"], [8, 7, "Independência do Brasil"],
[9, 12, "Nossa Senhora Aparecida"], [10, 2, "Finados"], [10, 15, "Proclamação da República"], [11, 25, "Natal"]
].forEach(([m, d, nome]) => { FERIADOS[ymd(new Date(ANO, m, d))] = nome; });
FERIADOS[ymd(addDias(PASCOA, -47))] = "Carnaval";
FERIADOS[ymd(addDias(PASCOA, -2))] = "Sexta-feira Santa";
FERIADOS[ymd(PASCOA)] = "Páscoa";

const DIAS_SEMANA = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"];

// ---------- roda da vida (SVG estático) ----------
function rodaSVG() {
  const setores = ["Saúde", "Família", "Relacionamentos", "Escola/Carreira", "Financeiro", "Desenvolvimento pessoal", "Lazer", "Espiritualidade"];
  const n = setores.length, cx = 120, cy = 100, rMax = 130, aneis = [2, 4, 6, 8, 10];
  let g = "";
  aneis.forEach(v => {
    const r = rMax * (v / 10);
    g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#D8C6AE" stroke-width="1"/>`;
    g += `<text x="${cx}" y="${cy - r - 3}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="#2E2420" opacity=".55">${v}</text>`;
  });
  for (let k = 0; k < n; k++) {
    const ang = (Math.PI * 2 * k / n) - Math.PI / 2;
    const x2 = cx + rMax * Math.cos(ang), y2 = cy + rMax * Math.sin(ang);
    g += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#D8C6AE" stroke-width="1"/>`;
    const labelR = rMax + 16;
    const lx = cx + labelR * Math.cos(ang), ly = cy + labelR * Math.sin(ang);
    const words = setores[k].split(" ");
    const tspans = words.map((w, wi) => `<tspan x="${lx}" dy="${wi === 0 ? 0 : 9}">${w}</tspan>`).join("");
    g += `<text x="${lx}" y="${ly}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="8.5" font-weight="600" fill="#2E2420">${tspans}</text>`;
  }
  return `<svg width="360" height="320" viewBox="0 0 360 320"><g transform="translate(40,20)">${g}</g></svg>`;
}

// ---------- tabela de pilares ----------
function pilaresRows() {
  const pilares = ["Pedagógica", "Administrativa", "Financeira", "Pessoas", "Estrutura física", "Comunicação", "Marketing e captação", "Relacionamento com famílias"];
  return pilares.map(p => `<tr>
      <td class="corpo-medium" style="padding:1.6mm 2mm 1.6mm 0; border-bottom:.35mm solid var(--linha);">${p}</td>
      <td style="padding:1.6mm; border-bottom:.35mm solid var(--linha); text-align:center;"><span class="campo" style="display:inline-block; width:7mm; height:auto; border-bottom:.35mm solid var(--linha);">&nbsp;</span></td>
      <td style="padding:1.6mm; border-bottom:.35mm solid var(--linha); text-align:center;"><span class="campo" style="display:inline-block; width:7mm; height:auto; border-bottom:.35mm solid var(--linha);">&nbsp;</span></td>
      <td style="padding:1.6mm; border-bottom:.35mm solid var(--linha); text-align:center;"><span class="campo" style="display:inline-block; width:7mm; height:auto; border-bottom:.35mm solid var(--linha);">&nbsp;</span></td>
      <td style="padding:1.6mm; border-bottom:.35mm solid var(--linha);"><span class="campo" style="display:block; height:auto; border-bottom:.35mm solid var(--linha);">&nbsp;</span></td>
    </tr>`).join("\n");
}

// ---------- calendário mensal ----------
function calendarioMes(ano, mes) {
  const primeiro = new Date(ano, mes, 1), ultimo = new Date(ano, mes + 1, 0);
  let inicio = new Date(primeiro); inicio.setDate(inicio.getDate() - ((inicio.getDay() + 6) % 7));
  let fim = new Date(ultimo); fim.setDate(fim.getDate() + ((7 - ((fim.getDay() + 6) % 7 + 1)) % 7));
  const dias = []; for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) dias.push(new Date(d));
  let html = '<div style="display:grid; grid-template-columns:repeat(7,1fr); gap:.3mm; background:var(--linha); border:.3mm solid var(--linha);">';
  DIAS_SEMANA.forEach(d => { html += `<div class="legenda" style="background:var(--creme); padding:1.4mm 2mm;">${d}</div>`; });
  dias.forEach(d => {
    const foraDoMes = d.getMonth() !== mes;
    const feriado = FERIADOS[ymd(d)];
    html += `<div style="background:var(--creme); min-height:15mm; padding:1mm 1.8mm; opacity:${foraDoMes ? ".35" : "1"};">`
      + `<div class="numero-data">${d.getDate()}</div>`
      + (feriado ? `<div class="legenda" style="color:var(--vinho); opacity:1;">${feriado}</div>` : "")
      + `</div>`;
  });
  html += "</div>";
  return html;
}

// ---------- página dupla semanal — Alternativa A ----------
function semanaDatas(segunda) { const out = []; for (let i = 0; i < 7; i++) out.push(addDias(segunda, i)); return out; }
function cabecalhoDia(d, i) {
  const feriado = FERIADOS[ymd(d)];
  return `<div style="display:flex; align-items:baseline; justify-content:space-between; border-bottom:.35mm solid var(--tinta); padding-bottom:.8mm; margin-bottom:1.6mm;">`
    + `<span class="legenda">${DIAS_SEMANA[i]}</span><span class="numero-data">${String(d.getDate()).padStart(2, "0")}</span></div>`
    + (feriado ? `<div class="legenda" style="color:var(--vinho); margin:-1mm 0 1.6mm;">${feriado}</div>` : "");
}
function semanalAltA(segunda) {
  const datasSemana = semanaDatas(segunda);
  const periodos = ["MANHÃ", "TARDE", "NOITE"];
  function coluna(d, i) {
    let h = `<div style="flex:1; min-width:0; padding:0 1.2mm; border-right:.3mm solid var(--linha);">${cabecalhoDia(d, i)}`;
    periodos.forEach(p => {
      h += `<div class="legenda" style="opacity:.55; margin:1.8mm 0 .6mm;">${p}</div>`
        + `<div class="campo" style="margin-bottom:.8mm;"></div><div class="campo" style="margin-bottom:.8mm;"></div><div class="campo" style="margin-bottom:.8mm;"></div><div class="campo" style="margin-bottom:.8mm;"></div><div class="campo" style="margin-bottom:.8mm;"></div>`;
    });
    return h + "</div>";
  }
  let esquerda = '<section class="pagina par">';
  for (let i = 0; i < 4; i++) esquerda += `<div style="display:flex; height:100%;">` + [0, 1, 2, 3].map(j => coluna(datasSemana[j], j)).join("") + `</div>`;
  esquerda = `<section class="pagina par"><div style="display:flex; height:100%;">${[0, 1, 2, 3].map(j => coluna(datasSemana[j], j)).join("")}</div></section>`;
  let direita = `<section class="pagina impar"><div style="display:flex; height:100%;">`
    + [4, 5, 6].map(j => coluna(datasSemana[j], j)).join("")
    + `<div style="width:26mm; padding-left:2.4mm;">`
    + `<div class="h2" style="margin-bottom:2mm;">Esta semana</div>`
    + `<div class="legenda" style="margin-bottom:.8mm;">Prioridades</div><div class="campo" style="margin-bottom:.8mm;"></div><div class="campo" style="margin-bottom:2.4mm;"></div>`
    + `<div class="legenda" style="margin-bottom:.8mm;">Delegações</div><div class="campo" style="margin-bottom:.8mm;"></div><div class="campo" style="margin-bottom:2.4mm;"></div>`
    + `<div class="legenda" style="margin-bottom:.8mm;">Pendências</div><div class="campo" style="margin-bottom:.8mm;"></div><div class="campo"></div>`
    + `</div></div></section>`;
  return `<div class="dupla">${esquerda}${direita}</div>`;
}

// ---------- montagem das páginas ----------
function pag(cls, inner) { return `<section class="pagina ${cls}">${inner}</section>`; }

const paginas = [];

paginas.push(pag("unica", `
  <img src="assets/paisley/paisley-frente.png" alt="" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
  <div style="position:absolute; top:16mm; left:0; right:0; text-align:center; font-family:'Montserrat',sans-serif; font-size:4.2mm; font-weight:600; color:var(--laranja);">2027</div>
  <div class="frase-capa" style="position:absolute; top:44%; left:24mm; right:24mm; text-align:center;">É justo que muito custe<br>o que muito vale!</div>
`).replace('class="pagina unica"', 'class="pagina unica" style="padding:0;"'));

paginas.push(pag("impar", `
  <div class="corner" style="right:-3mm; bottom:-3mm; width:70mm; opacity:.9;"><img src="assets/paisley/paisley-verso.png" style="transform: scaleX(-1) scaleY(-1);"></div>
  <div class="eyebrow">Planner da Diretora · 2027</div>
  <div class="titulo-secao" style="margin-bottom:6mm;">Este planner pertence a</div>
  <div class="campo" style="width:110mm; margin-bottom:9mm;"></div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:5mm 9mm; max-width:125mm;">
    <div><div class="legenda">Escola</div><div class="campo"></div></div>
    <div><div class="legenda">Ano letivo</div><div class="campo"></div></div>
    <div><div class="legenda">Telefone</div><div class="campo"></div></div>
    <div><div class="legenda">E-mail</div><div class="campo"></div></div>
    <div style="grid-column:1/3;"><div class="legenda">Em caso de emergência, contatar</div><div class="campo"></div></div>
  </div>
`));

paginas.push(pag("par", `
  <div class="rascunho">rascunho</div>
  <div class="eyebrow">Uma carta para você</div>
  <div class="titulo-secao" style="margin-bottom:5mm;">Antes de começarmos</div>
  <div class="epigrafe" style="margin-bottom:4.5mm; max-width:135mm;">Diagnóstico → Metas → Planejamento → Execução → Avaliação → Replanejamento.</div>
  <p class="corpo" style="max-width:135mm; margin-bottom:3.5mm;">Diretora,</p>
  <p class="corpo" style="max-width:135mm; margin-bottom:3.5mm;">Esse planner nasceu de uma constatação simples: você não vive duas vidas. É a mesma mulher que fecha a folha de pagamento da escola e que também precisa lembrar da consulta médica, do aniversário da equipe e do seu próprio descanso. Por isso ele não separa o profissional do pessoal — ele junta.</p>
  <p class="corpo" style="max-width:135mm; margin-bottom:3.5mm;">Nas próximas páginas você vai planejar sua escola e vai planejar você. Use-o com a mesma seriedade que usa para tomar as decisões mais importantes do seu ano.</p>
  <p class="corpo">Com carinho,<br>Eduarda de Paula</p>
`));

paginas.push(pag("impar", `
  <div class="rascunho">rascunho</div>
  <div class="corner" style="right:-2mm; top:-2mm; width:46mm; opacity:.85;"><img src="assets/paisley/paisley-frente.png"></div>
  <div class="eyebrow">Parte 1 — Eu, além da direção</div>
  <div class="titulo-secao" style="margin-bottom:6mm;">Antes de planejar,<br>olhe para você</div>
  <div style="max-width:132mm;">
    <p class="corpo-medium" style="margin-bottom:2mm;">O que mudou em mim desde o último ano letivo?</p>
    <div class="campo" style="margin-bottom:1.5mm;"></div><div class="campo" style="margin-bottom:1.5mm;"></div><div class="campo" style="margin-bottom:5.5mm;"></div>
    <p class="corpo-medium" style="margin-bottom:2mm;">O que eu preciso deixar de lado para 2027 ser mais leve?</p>
    <div class="campo" style="margin-bottom:1.5mm;"></div><div class="campo" style="margin-bottom:1.5mm;"></div><div class="campo" style="margin-bottom:5.5mm;"></div>
    <p class="corpo-medium" style="margin-bottom:2mm;">O que eu quero sentir, com mais frequência, no dia a dia da escola?</p>
    <div class="campo" style="margin-bottom:1.5mm;"></div><div class="campo" style="margin-bottom:1.5mm;"></div><div class="campo"></div>
  </div>
`));

paginas.push(pag("par", `
  <div class="eyebrow">Parte 1 — Eu, além da direção</div>
  <div class="titulo-secao" style="margin-bottom:2.5mm;">Minha roda da vida</div>
  <p class="corpo" style="max-width:125mm; margin-bottom:3mm;">Pinte cada fatia até o número que representa o quanto você está satisfeita com essa área hoje. Quanto mais perto do centro, menos satisfeita; quanto mais perto da borda, mais satisfeita.</p>
  <div style="display:flex; justify-content:center;">${rodaSVG()}</div>
`));

paginas.push(pag("impar", `
  <div class="eyebrow">Parte 2 — A escola que eu quero construir</div>
  <div class="titulo-secao" style="margin-bottom:3mm;">Os pilares da minha gestão</div>
  <p class="corpo" style="margin-bottom:3.5mm;">Dê uma nota de 1 a 10 para cada pilar, três vezes ao longo do ano, e anote uma ação concreta para evoluir.</p>
  <table style="width:100%; border-collapse:collapse;">
    <thead><tr>
      <td class="legenda" style="padding:1mm 1.6mm 1mm 0;">Pilar</td>
      <td class="legenda" style="padding:1mm; text-align:center;">Início</td>
      <td class="legenda" style="padding:1mm; text-align:center;">Meio</td>
      <td class="legenda" style="padding:1mm; text-align:center;">Fim</td>
      <td class="legenda" style="padding:1mm;">Uma ação para evoluir</td>
    </tr></thead>
    <tbody>${pilaresRows()}</tbody>
  </table>
`));

paginas.push(pag("par", `
  <div class="corner" style="left:-4mm; top:-4mm; width:95mm; opacity:.95;"><img src="assets/paisley/paisley-frente.png"></div>
  <div style="position:absolute; left:13mm; bottom:16mm; max-width:125mm;">
    <div class="titulo-mes" style="margin-bottom:2.5mm;">Janeiro</div>
    <div class="eyebrow">Foco do mês</div>
    <div class="h1" style="margin-bottom:3mm;">Planejar e preparar.</div>
    <p class="corpo">Antes de a correria do ano letivo começar, decida o que vai guiar os próximos doze meses — para a escola e para você.</p>
  </div>
`));

paginas.push(pag("impar", `
  <div class="h1" style="margin-bottom:3.5mm;">Calendário de janeiro</div>
  ${calendarioMes(ANO, 0)}
`));

paginas.push(semanalAltA(new Date(2027, 0, 4)));

paginas.push(pag("par", `
  <div class="h1" style="margin-bottom:3.5mm;">Fechamento de janeiro</div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:3mm 9mm; margin-bottom:4mm;">
    <div><div class="legenda" style="margin-bottom:1mm;">Metas alcançadas</div><div class="campo"></div><div class="campo" style="margin-top:1.2mm;"></div></div>
    <div><div class="legenda" style="margin-bottom:1mm;">Metas não alcançadas</div><div class="campo"></div><div class="campo" style="margin-top:1.2mm;"></div></div>
  </div>
  <div class="legenda" style="margin-bottom:1mm;">Resultados da escola e conquistas pessoais</div>
  <div class="campo" style="margin-bottom:1.2mm;"></div><div class="campo" style="margin-bottom:4mm;"></div>
  <div class="legenda" style="margin-bottom:1mm;">Dificuldades enfrentadas e ajustes necessários</div>
  <div class="campo" style="margin-bottom:1.2mm;"></div><div class="campo" style="margin-bottom:4mm;"></div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:3mm 9mm;">
    <div><div class="legenda" style="margin-bottom:1mm;">Pendências para fevereiro</div><div class="campo"></div></div>
    <div><div class="legenda" style="margin-bottom:1mm;">Prioridades de fevereiro</div><div class="campo"></div></div>
  </div>
`));

const corpo = paginas.join("\n");

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Planner da Diretora 2027 — protótipos</title>
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="styles/print.css">
</head>
<body>
${corpo}
</body>
</html>
`;

const out = path.join(__dirname, "..", "planner.html");
fs.writeFileSync(out, html, "utf8");
console.log("Gerado:", out, "—", paginas.length, "itens (" + (html.match(/class="pagina/g) || []).length + " páginas físicas)");
