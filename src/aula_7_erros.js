// Gera: AULA_OS_7_ERROS_2027.pptx (16:9, 26 slides)
const path = require('path');
const pptxgen = require(process.env.PPTXGEN || 'pptxgenjs');
const { applyTheme } = require(process.env.APPLY_THEME);

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'AULA_7_ERROS_2027_VERSAO_FINAL.pptx');
const FOTO_D = path.join(ROOT, 'assets/foto-slide-direita.jpg');
const FOTO_E = path.join(ROOT, 'assets/foto-slide-esquerda.jpg');

const THEME = {
  name: 'Escola Estruturada',
  headFontFace: 'Montserrat ExtraBold',
  bodyFontFace: 'Montserrat',
  colors: {
    dk1: '111111', lt1: 'FFFFFF', dk2: '242424', lt2: 'F4F4F5',
    accent1: 'C4C6CA', accent2: '777A80', accent3: '242424', accent4: '111111', accent5: 'C4C6CA', accent6: '777A80',
    hlink: '777A80', folHlink: '777A80',
  },
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pres.title = 'Os 7 erros que podem custar caro para sua escola em 2027';
pres.author = 'Eduarda de Paula + Ionara Oliveira';
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const W = 13.333, H = 7.5, M = 0.75;
const BLACK = 'Montserrat Black', XB = 'Montserrat ExtraBold', SB = 'Montserrat SemiBold', MED = 'Montserrat Medium', REG = 'Montserrat';

// ---------- layouts ----------
const numStyle = (color) => ({ x: W - M - 1, y: H - 0.55, w: 1, h: 0.3, fontFace: SB, fontSize: 9, color, align: 'right', margin: 0 });
pres.defineSlideMaster({
  title: 'ESCURO', background: { color: C.text1 },
  objects: [{ text: { text: 'OS 7 ERROS · JURÍDICO + GESTÃO ESCOLAR', options: { x: M, y: H - 0.55, w: 6, h: 0.3, fontFace: SB, fontSize: 8, charSpacing: 3, color: C.accent2, margin: 0 } } }],
  slideNumber: numStyle(C.accent2),
});
pres.defineSlideMaster({
  title: 'CLARO', background: { color: C.background2 },
  objects: [{ text: { text: 'OS 7 ERROS · JURÍDICO + GESTÃO ESCOLAR', options: { x: M, y: H - 0.55, w: 6, h: 0.3, fontFace: SB, fontSize: 8, charSpacing: 3, color: C.accent2, margin: 0 } } }],
  slideNumber: numStyle(C.accent2),
});
pres.defineSlideMaster({ title: 'FOTO', background: { color: C.text1 } });
pres.defineSlideMaster({
  title: 'OFERTA', background: { color: C.text1 },
  objects: [{ text: { text: 'ESCOLA ESTRUTURADA™ · JURÍDICO + GESTÃO ESCOLAR', options: { x: M, y: H - 0.55, w: 7, h: 0.3, fontFace: SB, fontSize: 8, charSpacing: 3, color: C.accent2, margin: 0 } } }],
  slideNumber: numStyle(C.accent2),
});
pres.defineSlideMaster({
  title: 'OFERTA_CLARO', background: { color: C.background2 },
  objects: [{ text: { text: 'ESCOLA ESTRUTURADA™ · JURÍDICO + GESTÃO ESCOLAR', options: { x: M, y: H - 0.55, w: 7, h: 0.3, fontFace: SB, fontSize: 8, charSpacing: 3, color: C.accent2, margin: 0 } } }],
  slideNumber: numStyle(C.accent2),
});

// ---------- helpers ----------
let n = 0;
function T(slide, text, o) {
  slide.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: 'top', fit: 'none', objectName: 'texto-' + (++n) }, o));
}
const eyebrow = (s, text, color, y = 0.7) => T(s, text, { x: M, y, w: 8, h: 0.3, fontFace: SB, fontSize: 11, charSpacing: 4, color });
const title = (s, text, o) => T(s, text, Object.assign({ fontFace: XB, charSpacing: -1.5, lineSpacingMultiple: 0.88 }, o));
const rule = (s, x, y, w, color, pt = 1) => s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: pt }, objectName: 'linha-' + (++n) });

function slideErroIntro(sec, num, tema, pergunta, apoio) {
  const s = pres.addSlide({ masterName: 'ESCURO', sectionTitle: sec });
  T(s, String(num).padStart(2, '0'), { x: W - 6.2, y: 0.2, w: 6, h: 4.2, fontFace: BLACK, fontSize: 300, charSpacing: -20, color: C.text2, align: 'right' });
  eyebrow(s, `ERRO ${num}  ·  ${tema}`, C.accent1);
  title(s, pergunta, { x: M, y: 2.0, w: 10.6, h: 3.4, fontSize: 46, color: C.background1, valign: 'top' });
  if (apoio) T(s, apoio, { x: M, y: 5.45, w: 10, h: 1.0, fontFace: MED, fontSize: 20, color: C.accent1, lineSpacingMultiple: 1.15 });
  return s;
}

function slideCaso(sec, num, tema, frase, gestao, juridico, caso, pergunta, acao) {
  const s = pres.addSlide({ masterName: 'CLARO', sectionTitle: sec });
  eyebrow(s, `ERRO ${num}  ·  ${tema}  ·  GESTÃO + JURÍDICO`, C.accent2, 0.55);
  title(s, frase, { x: M, y: 0.88, w: 11.8, h: 0.6, fontSize: 28, color: C.text1 });
  const top = 1.62, bot = 4.58, colW = W / 2;
  s.addShape(pres.shapes.RECTANGLE, { x: colW, y: top, w: colW, h: bot - top, fill: { color: C.text1 }, line: { type: 'none' }, objectName: 'painel-juridico' });
  const col = (x, head, sub, items, cHead, cSub, cItem, fs) => {
    T(s, head, { x, y: top + 0.28, w: 5.6, h: 0.35, fontFace: BLACK, fontSize: 15, charSpacing: 3, color: cHead });
    T(s, sub, { x, y: top + 0.62, w: 5.6, h: 0.25, fontFace: MED, fontSize: 11, color: cSub });
    items.forEach((it, i) => {
      const y = top + 0.98 + i * 0.6;
      T(s, String(i + 1).padStart(2, '0'), { x, y: y + 0.03, w: 0.45, h: 0.3, fontFace: XB, fontSize: 11, color: C.accent2 });
      T(s, it, { x: x + 0.5, y, w: 5.3, h: 0.5, fontFace: SB, fontSize: fs, color: cItem, lineSpacingMultiple: 1.0 });
    });
  };
  col(M, 'GESTÃO', 'com Eduarda', gestao, C.text1, C.accent2, C.text1, 16);
  col(colW + 0.5, 'JURÍDICO  |  PODE OU NÃO PODE?', 'com Ionara', juridico, C.background1, C.accent1, C.background1, 14);
  // caso do chão da escola
  const lab = { x: M, w: 2.7, h: 0.5, fontFace: BLACK, fontSize: 11, charSpacing: 2, lineSpacingMultiple: 1.05 };
  const tx = M + 2.95, tw = W - M - tx;
  rule(s, M, 4.85, W - 2 * M, '111111', 1.5);
  T(s, 'CASO DO CHÃO\nDA ESCOLA', Object.assign({ y: 5.02, color: C.text1 }, lab));
  T(s, caso, { x: tx, y: 4.98, w: tw, h: 0.5, fontFace: MED, fontSize: 14, color: C.text1, lineSpacingMultiple: 1.05 });
  T(s, [{ text: 'PERGUNTA:  ', options: { fontFace: BLACK, fontSize: 11, charSpacing: 2, color: C.accent2 } }, { text: pergunta, options: { fontFace: XB, fontSize: 15, color: C.text1 } }],
    { x: tx, y: 5.55, w: tw, h: 0.35 });
  rule(s, M, 6.08, W - 2 * M, 'C4C6CA', 0.75);
  T(s, 'AÇÃO DE GESTÃO', Object.assign({ y: 6.22, color: C.accent2 }, lab));
  T(s, acao, { x: tx, y: 6.18, w: tw, h: 0.55, fontFace: SB, fontSize: 14, color: C.text1, lineSpacingMultiple: 1.05 });
  return s;
}

// ================= ABERTURA =================
let sec = 'Abertura';
pres.addSection({ title: sec });
{ // 01 CAPA
  const s = pres.addSlide({ masterName: 'FOTO', sectionTitle: sec });
  s.addImage({ path: FOTO_D, x: W - 7.2, y: 0, w: 7.2, h: 7.5, objectName: 'foto-eduarda-ionara', altText: 'Eduarda de Paula e Ionara Oliveira' });
  T(s, 'AULA GRATUITA  ·  21 DE NOVEMBRO DE 2026', { x: M, y: 0.7, w: 7, h: 0.3, fontFace: SB, fontSize: 11, charSpacing: 4, color: C.accent1 });
  title(s, [
    { text: 'os 7 erros', options: { color: C.background1, breakLine: true } },
    { text: 'que podem custar caro para sua escola em ', options: { color: C.background1 } },
    { text: '2027', options: { color: C.accent1 } },
  ], { x: M, y: 1.45, w: 6.6, h: 3.6, fontSize: 46, fontFace: BLACK });
  T(s, 'JURÍDICO + GESTÃO ESCOLAR', { x: M, y: 5.05, w: 6, h: 0.35, fontFace: XB, fontSize: 14, charSpacing: 5, color: C.background1 });
  rule(s, M, 5.75, 5.6, '777A80', 0.75);
  T(s, 'Eduarda de Paula + Ionara Oliveira', { x: M, y: 5.95, w: 6, h: 0.35, fontFace: SB, fontSize: 15, color: C.background1 });
  T(s, '@nasaladadiretora  |  @ionaraoliveira', { x: M, y: 6.35, w: 6, h: 0.35, fontFace: MED, fontSize: 13, color: C.accent1 });
  T(s, 'Eduarda de Paula', { x: W - 6.9, y: 6.55, w: 3, h: 0.3, fontFace: SB, fontSize: 10, color: C.background1 });
  T(s, 'Ionara Oliveira', { x: W - 3.6, y: 6.55, w: 3, h: 0.3, fontFace: SB, fontSize: 10, color: C.background1, align: 'right' });
}
{ // 02
  const s = pres.addSlide({ masterName: 'ESCURO', sectionTitle: sec });
  eyebrow(s, 'PARA COMEÇAR', C.accent2);
  title(s, [
    { text: 'sua escola está estruturada', options: { color: C.background1, breakLine: true } },
    { text: 'ou você apenas consegue', options: { color: C.accent1, breakLine: true } },
    { text: 'fazer tudo funcionar?', options: { color: C.accent1 } },
  ], { x: M, y: 2.0, w: 11.8, h: 3.6, fontSize: 54 });
}
{ // 03
  const s = pres.addSlide({ masterName: 'ESCURO', sectionTitle: sec });
  T(s, '7', { x: W - 5.6, y: 0.0, w: 5.2, h: 6.4, fontFace: BLACK, fontSize: 440, color: C.text2, align: 'right' });
  eyebrow(s, 'IDENTIFICAÇÃO', C.accent2);
  title(s, 'se você se ausentar por 7 dias, sua escola continua funcionando bem?', { x: M, y: 1.8, w: 9.4, h: 3.0, fontSize: 46, color: C.background1 });
  T(s, 'Ou tudo depende de você?', { x: M, y: 5.25, w: 9, h: 0.6, fontFace: XB, fontSize: 28, charSpacing: -1, color: C.accent1 });
}
{ // 04 DIAGNÓSTICO
  const s = pres.addSlide({ masterName: 'CLARO', sectionTitle: sec });
  eyebrow(s, 'DIAGNÓSTICO', C.accent2);
  title(s, 'de 0 a 10, quanto sua escola está estruturada hoje?', { x: M, y: 1.15, w: 11.5, h: 1.3, fontSize: 36, color: C.text1 });
  const areas = ['Atendimento', 'Equipe', 'Processos', 'Financeiro', 'Jurídico'];
  const y0 = 2.95, rowH = 0.74, scaleX = 4.1, step = (W - M - scaleX) / 10.6;
  areas.forEach((a, i) => {
    const y = y0 + i * rowH;
    rule(s, M, y, W - 2 * M, 'C4C6CA', 0.75);
    T(s, a, { x: M, y: y + 0.18, w: 3.2, h: 0.45, fontFace: XB, fontSize: 22, charSpacing: -0.5, color: C.text1 });
    for (let k = 0; k <= 10; k++)
      T(s, String(k), { x: scaleX + k * step, y: y + 0.22, w: step, h: 0.4, fontFace: SB, fontSize: 16, color: C.accent2, align: 'center' });
  });
  rule(s, M, y0 + 5 * rowH, W - 2 * M, 'C4C6CA', 0.75);
}

// ================= OS 7 ERROS =================
sec = 'Os 7 erros';
pres.addSection({ title: sec });
{ // 05
  const s = pres.addSlide({ masterName: 'ESCURO', sectionTitle: sec });
  eyebrow(s, 'ERRO 1  ·  MATRÍCULAS', C.accent1);
  title(s, [
    { text: 'sua escola pode estar perdendo matrículas todos os dias.', options: { color: C.background1, breakLine: true } },
    { text: 'e você nem percebe.', options: { color: C.accent1 } },
  ], { x: M, y: 1.4, w: 11.6, h: 2.6, fontSize: 42 });
  T(s, 'Quantas famílias procuram, visitam e realmente fecham?', { x: M, y: 4.2, w: 11, h: 0.5, fontFace: MED, fontSize: 20, color: C.accent1 });
  const steps = ['procuram', 'visitam', 'fecham'], sw = (W - 2 * M) / 3;
  steps.forEach((t, i) => {
    const x = M + i * sw;
    rule(s, x, 5.15, sw - 0.35, i === 2 ? 'FFFFFF' : '777A80', i === 2 ? 2 : 1);
    T(s, '___ famílias', { x, y: 5.35, w: sw - 0.4, h: 0.35, fontFace: MED, fontSize: 13, color: C.accent2 });
    T(s, t, { x, y: 5.7, w: sw - 0.4, h: 0.6, fontFace: XB, fontSize: 30, charSpacing: -1, color: i === 2 ? C.background1 : C.accent1 });
  });
}
slideCaso(sec, 1, 'MATRÍCULAS', 'a matrícula exige critérios claros e legais.',
  ['Atendimento sem padrão', 'Vagas sem controle', 'Respostas improvisadas'],
  ['Pode negar matrícula de aluno com deficiência?', 'Pode cobrar valor extra pela inclusão?', 'Pode encerrar o prazo de rematrícula e abrir vagas?'],
  'Uma mãe recebe a informação de que não há mais vagas e afirma que a negativa ocorreu porque seu filho é autista.',
  'toda negativa de matrícula é discriminatória?',
  'Controle de vagas + registro do atendimento + critérios transparentes e não discriminatórios.');

slideErroIntro(sec, 2, 'CONTRATOS E DOCUMENTOS', 'você atualizou os documentos da sua escola ou apenas trocou o ano?');
slideCaso(sec, 2, 'CONTRATOS E DOCUMENTOS', 'contrato antigo não protege decisões novas.',
  ['Contrato com ano apenas alterado', 'Edital sem regras claras', 'Combinados feitos por mensagem'],
  ['Pode reter valor após desistência da matrícula?', 'Pode alterar regras durante o ano letivo?', 'O que deve constar no edital e no regimento?'],
  'A família paga a matrícula de 2027, desiste antes das aulas e exige devolução integral.',
  'o contrato prevê uma solução válida?',
  'Fluxo de cancelamento + conferência financeira + registro da solicitação.');

slideErroIntro(sec, 3, 'INADIMPLÊNCIA', 'sua escola tem um problema de inadimplência ou de gestão da inadimplência?');
slideCaso(sec, 3, 'INADIMPLÊNCIA', 'cobrar errado pode ampliar o prejuízo.',
  ['Atrasos sem acompanhamento', 'Cobranças que expõem a família', 'Cancelamentos informais'],
  ['Pode impedir prova ou atividade pedagógica?', 'Pode reter documentos por dívida?', 'Pode recusar rematrícula de inadimplente?'],
  'Após quatro mensalidades em atraso, a escola impede o aluno de participar de uma atividade escolar.',
  'qual é o limite legal da cobrança?',
  'Régua de cobrança + responsável definido + histórico dos acordos.');

slideErroIntro(sec, 4, 'INCLUSÃO ESCOLAR', 'a inclusão da sua escola é planejada ou depende do improviso?', 'Garantir direitos não significa decidir sem critérios.');
slideCaso(sec, 4, 'INCLUSÃO ESCOLAR', 'inclusão exige avaliação, planejamento e registro.',
  ['Equipe sem fluxo de inclusão', 'PEI sem acompanhamento', 'Pedidos familiares sem análise'],
  ['Acompanhante exclusivo é sempre obrigatório?', 'Pode exigir laudo para efetivar matrícula?', 'Pode reduzir jornada sem análise individual?'],
  'A mãe exige acompanhante exclusivo e ameaça denunciar a escola se o pedido não for atendido.',
  'toda exigência da família é obrigação da escola?',
  'Acolhimento + avaliação das necessidades + planejamento dos apoios + acompanhamento pedagógico.');

slideErroIntro(sec, 5, 'PROCESSOS E ROTINAS', 'sua escola tem processos ou apenas combinados?', 'E quando algo dá errado, quem assume a responsabilidade?');
slideCaso(sec, 5, 'PROCESSOS E ROTINAS', 'uma ocorrência exige protocolo, não improviso.',
  ['Ocorrências sem registro', 'Equipe sem fluxo de resposta', 'Câmeras sem procedimento'],
  ['A escola responde por toda lesão no recreio?', 'Pode enviar vídeo com outros alunos?', 'Quando investigar bullying e acionar a rede?'],
  'Um aluno se machuca após ser empurrado no recreio. A família exige vídeo e despesas médicas.',
  'qual deve ser a primeira providência?',
  'Atendimento imediato + comunicação à família + registro + acompanhamento da ocorrência.');

slideErroIntro(sec, 6, 'FAMÍLIAS E RECLAMAÇÕES', 'uma reclamação simples pode virar uma grande dor de cabeça.', 'Sua equipe sabe como agir?');
slideCaso(sec, 6, 'FAMÍLIAS E RECLAMAÇÕES', 'acolher não é aceitar ofensas ou exigências.',
  ['Respostas dadas no impulso', 'Reuniões sem registro', 'Equipe exposta a conflitos'],
  ['A família pode exigir demissão de professor?', 'Pode acessar ocorrência de outro aluno?', 'A escola pode encerrar atendimento ofensivo?'],
  'Uma mãe grita com a coordenadora e exige que outro aluno seja retirado da turma.',
  'como acolher sem ceder a exigências indevidas?',
  'Acolher + estabelecer limites + apurar + registrar + responder formalmente.');

slideErroIntro(sec, 7, 'DECISÕES DA DIREÇÃO', 'quantas decisões você já tomou para resolver um problema e acabou criando outro?');
slideCaso(sec, 7, 'DECISÕES DA DIREÇÃO', 'autonomia exige fundamento e documentação.',
  ['Sanções decididas no calor do momento', 'Exceções sem critérios', 'Decisões sem respaldo escrito'],
  ['Pode suspender aluno?', 'Pode determinar transferência compulsória?', 'Pode expor nome de aluno em comunicado coletivo?'],
  'Após ocorrências reiteradas, a direção informa que o aluno não poderá continuar no próximo ano.',
  'o regimento sustenta essa decisão?',
  'Apuração dos fatos + acompanhamento pedagógico + registros + avaliação da decisão.');

// ================= REFLEXÃO =================
sec = 'Reflexão e transformação';
pres.addSection({ title: sec });
{ // 19
  const s = pres.addSlide({ masterName: 'ESCURO', sectionTitle: sec });
  eyebrow(s, 'REFLEXÃO', C.accent2);
  title(s, [
    { text: 'sua escola pode ter problemas de gestão que você ainda nem percebeu que ', options: { color: C.background1 } },
    { text: 'também são jurídicos.', options: { color: C.accent1 } },
  ], { x: M, y: 1.9, w: 11.6, h: 3.8, fontSize: 50 });
}
{ // 20
  const s = pres.addSlide({ masterName: 'CLARO', sectionTitle: sec });
  eyebrow(s, 'TRANSFORMAÇÃO', C.accent2);
  title(s, 'o que diferencia uma escola no improviso de uma escola estruturada?', { x: M, y: 1.15, w: 11.5, h: 1.6, fontSize: 34, color: C.text1 });
  const top = 3.05, colW = W / 2;
  s.addShape(pres.shapes.RECTANGLE, { x: colW, y: top, w: colW, h: H - top, fill: { color: C.text1 }, line: { type: 'none' }, objectName: 'painel-estruturada' });
  const col = (x, head, items, cHead, cItem) => {
    T(s, head, { x, y: top + 0.45, w: 5.4, h: 0.4, fontFace: BLACK, fontSize: 18, charSpacing: 4, color: cHead });
    items.forEach((it, i) => T(s, it, { x, y: top + 1.15 + i * 0.6, w: 5.6, h: 0.45, fontFace: SB, fontSize: 20, color: cItem }));
  };
  col(M, 'NO IMPROVISO', ['Tudo depende da diretora', 'Documentos desatualizados', 'Processos indefinidos', 'Problemas recorrentes'], C.accent2, C.accent2);
  col(colW + 0.6, 'MAIS ESTRUTURADA', ['Responsabilidades claras', 'Documentação revisada', 'Processos organizados', 'Decisões fundamentadas'], C.accent1, C.background1);
}
{ // 21
  const s = pres.addSlide({ masterName: 'ESCURO', sectionTitle: sec });
  eyebrow(s, 'PRÓXIMO PASSO', C.accent2);
  title(s, 'agora que você reconheceu os problemas, por onde vai começar?', { x: M, y: 1.6, w: 11.4, h: 2.8, fontSize: 48, color: C.background1 });
  rule(s, M, 4.75, 11.8, '777A80', 0.75);
  T(s, 'Conhecer os erros é o primeiro passo.', { x: M, y: 5.0, w: 5.6, h: 0.9, fontFace: MED, fontSize: 20, color: C.accent1, lineSpacingMultiple: 1.15 });
  T(s, 'Organizar sua escola para evitá-los é o próximo.', { x: M + 6.1, y: 5.0, w: 5.7, h: 0.9, fontFace: XB, fontSize: 20, color: C.background1, lineSpacingMultiple: 1.15 });
}

// ================= SOLUÇÃO =================
sec = 'Escola Estruturada™';
pres.addSection({ title: sec });
{ // 22 REVELAÇÃO
  const s = pres.addSlide({ masterName: 'FOTO', sectionTitle: sec });
  s.addImage({ path: FOTO_D, x: W - 7.2, y: 0, w: 7.2, h: 7.5, objectName: 'foto-eduarda-ionara', altText: 'Eduarda de Paula e Ionara Oliveira' });
  T(s, 'A SOLUÇÃO', { x: M, y: 0.7, w: 5, h: 0.3, fontFace: SB, fontSize: 11, charSpacing: 4, color: C.accent2 });
  title(s, [
    { text: 'escola', options: { color: C.background1, breakLine: true } },
    { text: 'estruturada', options: { color: C.accent1 } },
    { text: '™', options: { color: C.accent1, fontSize: 32, fontFace: SB, superscript: true } },
  ], { x: M, y: 1.6, w: 6.6, h: 2.5, fontSize: 72, fontFace: BLACK, charSpacing: -3, lineSpacingMultiple: 0.82 });
  T(s, 'JURÍDICO + GESTÃO ESCOLAR', { x: M, y: 4.35, w: 6, h: 0.35, fontFace: XB, fontSize: 14, charSpacing: 5, color: C.background1 });
  T(s, 'Duas especialistas. Uma solução para preparar sua escola para 2027.', { x: M, y: 5.05, w: 5.4, h: 0.9, fontFace: MED, fontSize: 18, color: C.accent1, lineSpacingMultiple: 1.15 });
  T(s, 'Eduarda de Paula\nGestão Escolar', { x: W - 6.9, y: 6.35, w: 3, h: 0.6, fontFace: SB, fontSize: 10, color: C.background1 });
  T(s, 'Ionara Oliveira\nJurídico Educacional', { x: W - 3.6, y: 6.35, w: 3, h: 0.6, fontFace: SB, fontSize: 10, color: C.background1, align: 'right' });
}
{ // 23
  const s = pres.addSlide({ masterName: 'OFERTA_CLARO', sectionTitle: sec });
  eyebrow(s, 'O QUE VOCÊ RECEBE', C.accent2);
  title(s, 'dois kits completos + quatro encontros de aplicação.', { x: M, y: 1.15, w: 11.5, h: 1.6, fontSize: 36, color: C.text1 });
  const items = [
    ['KIT DE MATRÍCULAS E GESTÃO ESCOLAR 2027', 'Eduarda de Paula  |  @nasaladadiretora'],
    ['COMBO ESCOLA LEGALMENTE SEGURA 2027', 'Ionara Oliveira  |  @ionaraoliveira'],
    ['QUATRO ENCONTROS AO VIVO COM EDUARDA E IONARA', 'Gestão + Jurídico + aplicação prática'],
  ];
  const cw = (W - 2 * M - 0.8) / 3;
  items.forEach(([t, sub], i) => {
    const x = M + i * (cw + 0.4);
    rule(s, x, 3.3, cw, '111111', 2);
    T(s, String(i + 1).padStart(2, '0'), { x, y: 3.5, w: cw, h: 1.1, fontFace: BLACK, fontSize: 60, charSpacing: -3, color: C.accent1 });
    T(s, t, { x, y: 4.75, w: cw, h: 1.0, fontFace: XB, fontSize: 18, charSpacing: -0.5, color: C.text1, lineSpacingMultiple: 1.0 });
    T(s, sub, { x, y: 5.85, w: cw, h: 0.4, fontFace: MED, fontSize: 12, color: C.accent2 });
  });
}
{ // 24
  const s = pres.addSlide({ masterName: 'OFERTA_CLARO', sectionTitle: sec });
  eyebrow(s, 'ENCONTROS DE APLICAÇÃO · AO VIVO', C.accent2);
  title(s, 'quatro encontros. uma dor central por semana.', { x: M, y: 1.15, w: 11.5, h: 1.3, fontSize: 36, color: C.text1 });
  const aulas = [['30/11', 'Matrículas sem improviso'], ['07/12', 'Cobranças, cancelamentos e inclusão escolar'], ['14/12', 'Equipe alinhada, famílias bem orientadas'], ['21/12', 'Decisões difíceis sem agir no impulso']];
  const cw = (W - 2 * M - 0.9) / 4;
  aulas.forEach(([d, t], i) => {
    const x = M + i * (cw + 0.3);
    rule(s, x, 3.0, cw, '111111', 2);
    T(s, `AULA ${i + 1}`, { x, y: 3.2, w: cw, h: 0.3, fontFace: SB, fontSize: 11, charSpacing: 3, color: C.accent2 });
    T(s, d, { x, y: 3.55, w: cw, h: 0.85, fontFace: BLACK, fontSize: 44, charSpacing: -2, color: C.text1 });
    T(s, t, { x, y: 4.55, w: cw - 0.1, h: 1.2, fontFace: XB, fontSize: 17, charSpacing: -0.5, color: C.text1, lineSpacingMultiple: 1.0 });
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 6.05, w: W, h: H - 6.05, fill: { color: C.text1 }, line: { type: 'none' }, objectName: 'faixa-encontros' });
  T(s, [
    { text: 'Gestão + Jurídico + ', options: { color: C.background1 } },
    { text: 'Bate-bola de casos reais.', options: { color: C.accent1 } },
  ], { x: M, y: 6.33, w: 9, h: 0.45, fontFace: XB, fontSize: 20, charSpacing: -0.5 });
  T(s, 'às segundas-feiras', { x: W - M - 4, y: 6.4, w: 4, h: 0.35, fontFace: MED, fontSize: 13, color: C.accent2, align: 'right' });
}
{ // 25 BÔNUS
  const s = pres.addSlide({ masterName: 'OFERTA', sectionTitle: sec });
  eyebrow(s, 'BÔNUS EXCLUSIVOS', C.accent2);
  title(s, 'quem chega primeiro, recebe mais.', { x: M, y: 1.1, w: 11.8, h: 1.0, fontSize: 40, color: C.background1 });
  const rows = [
    { big: 'TODAS', sub: 'as compradoras', txt: 'Gravação da aula de 20/11.', hi: false },
    { big: '20 PRIMEIRAS', sub: 'compradoras', txt: 'Acesso ao Escola Plural, de Ionara Oliveira, e ao Escola Magnética, de Eduarda de Paula.', hi: true },
    { big: '10 PRIMEIRAS', sub: 'compradoras', txt: 'Participação no sorteio de uma consultoria VIP individual com Eduarda e Ionara.', hi: true },
  ];
  rows.forEach((r, i) => {
    const y = 2.55 + i * 1.42;
    rule(s, M, y, W - 2 * M, '3A3A3A', 0.75);
    T(s, r.big, { x: M, y: y + (r.hi ? 0.28 : 0.36), w: 5.4, h: 0.75, fontFace: BLACK, fontSize: r.hi ? 38 : 26, charSpacing: -1.5, color: r.hi ? C.background1 : C.accent1, valign: 'top' });
    T(s, r.sub, { x: M, y: y + (r.hi ? 0.98 : 0.86), w: 5, h: 0.3, fontFace: MED, fontSize: 12, color: C.accent2 });
    T(s, r.txt, { x: 6.6, y: y + 0.32, w: W - M - 6.6, h: 0.9, fontFace: r.hi ? SB : MED, fontSize: 17, color: r.hi ? C.background1 : C.accent1, lineSpacingMultiple: 1.15 });
  });
}
{ // 26 PRESENTE
  const s = pres.addSlide({ masterName: 'OFERTA_CLARO', sectionTitle: sec });
  eyebrow(s, 'PRESENTE DA AULA AO VIVO', C.accent2);
  title(s, 'hoje, uma diretora será presenteada.', { x: M, y: 1.15, w: 11.8, h: 1.9, fontSize: 48, color: C.text1 });
  T(s, 'Uma participante da aula ganhará:', { x: M, y: 3.25, w: 8, h: 0.45, fontFace: MED, fontSize: 18, color: C.accent2 });
  const cw = (W - 2 * M - 0.5) / 2;
  [['Escola Plural', 'Ionara Oliveira'], ['Escola Magnética', 'Eduarda de Paula']].forEach(([p, a], i) => {
    const x = M + i * (cw + 0.5);
    rule(s, x, 4.2, cw, '111111', 2);
    T(s, '1', { x, y: 4.4, w: 1.1, h: 1.5, fontFace: BLACK, fontSize: 96, charSpacing: -4, color: C.accent1 });
    T(s, 'acesso ao', { x: x + 1.25, y: 4.62, w: cw - 1.3, h: 0.35, fontFace: MED, fontSize: 15, color: C.accent2 });
    T(s, p, { x: x + 1.25, y: 4.95, w: cw - 1.3, h: 0.6, fontFace: XB, fontSize: 28, charSpacing: -1, color: C.text1 });
    T(s, a, { x: x + 1.25, y: 5.55, w: cw - 1.3, h: 0.3, fontFace: MED, fontSize: 12, color: C.accent2 });
  });
}
{ // 27 OFERTA
  const s = pres.addSlide({ masterName: 'OFERTA', sectionTitle: sec });
  eyebrow(s, 'OFERTA ESPECIAL', C.accent2);
  title(s, [
    { text: 'escola estruturada', options: { color: C.background1 } },
    { text: '™', options: { color: C.background1, fontSize: 22, fontFace: SB, superscript: true } },
  ], { x: M, y: 1.1, w: 7, h: 0.9, fontSize: 40 });
  const rows = [
    ['Kit de Matrículas e Gestão Escolar 2027', '', 'R$ 297,00'],
    ['Combo Escola Legalmente Segura 2027', '', 'R$ 497,00'],
    ['Quatro encontros de aplicação', 'valor de referência', 'R$ 2.000,00'],
  ];
  const lx = M, lw = 6.4;
  rows.forEach(([a, sub, b], i) => {
    const y = 2.4 + i * 0.78;
    rule(s, lx, y, lw, '3A3A3A', 0.75);
    T(s, a, { x: lx, y: y + 0.2, w: 4.9, h: 0.35, fontFace: MED, fontSize: 14, color: C.background1 });
    if (sub) T(s, sub, { x: lx, y: y + 0.5, w: 4.6, h: 0.25, fontFace: MED, fontSize: 10, color: C.accent2 });
    T(s, b, { x: lx + 4.9, y: y + 0.2, w: lw - 4.9, h: 0.35, fontFace: XB, fontSize: 15, color: C.background1, align: 'right' });
  });
  rule(s, lx, 2.4 + 3 * 0.78, lw, '3A3A3A', 0.75);
  T(s, 'VALOR TOTAL DE REFERÊNCIA', { x: lx, y: 4.95, w: 4.4, h: 0.35, fontFace: SB, fontSize: 11, charSpacing: 3, color: C.accent1 });
  T(s, 'R$ 2.794,00', { x: lx + 4.4, y: 4.9, w: lw - 4.4, h: 0.4, fontFace: XB, fontSize: 17, color: C.accent1, align: 'right', strike: 'sngStrike' });
  // bloco do preço
  s.addShape(pres.shapes.RECTANGLE, { x: 7.75, y: 0, w: W - 7.75, h: H, fill: { color: C.text2 }, line: { type: 'none' }, objectName: 'painel-preco' });
  T(s, 'CONDIÇÃO ESPECIAL DE LANÇAMENTO', { x: 8.35, y: 2.15, w: 4.5, h: 0.3, fontFace: SB, fontSize: 11, charSpacing: 3, color: C.accent1 });
  T(s, [
    { text: 'R$ ', options: { fontSize: 26, fontFace: XB, color: C.accent1 } },
    { text: '497,00', options: { fontSize: 66, fontFace: BLACK, color: C.background1, charSpacing: -3 } },
  ], { x: 8.35, y: 2.6, w: 4.6, h: 1.3, valign: 'middle' });
  rule(s, 8.35, 4.2, 4.2, '777A80', 0.75);
  T(s, 'Os dois kits + quatro encontros ao vivo.', { x: 8.35, y: 4.45, w: 4.3, h: 0.9, fontFace: MED, fontSize: 17, color: C.background1, lineSpacingMultiple: 1.15 });
  T(s, '+ BÔNUS EXCLUSIVOS', { x: 8.35, y: 5.45, w: 4.3, h: 0.4, fontFace: BLACK, fontSize: 18, charSpacing: 2, color: C.accent1 });
}
{ // 28 ENCERRAMENTO
  const s = pres.addSlide({ masterName: 'FOTO', sectionTitle: sec });
  s.addImage({ path: FOTO_E, x: 0, y: 0, w: 7.2, h: 7.5, objectName: 'foto-eduarda-ionara', altText: 'Eduarda de Paula e Ionara Oliveira' });
  const x = 6.95, w = W - x - M;
  title(s, '2027 não precisa ser a repetição dos mesmos problemas.', { x, y: 0.85, w, h: 2.3, fontSize: 34, color: C.background1 });
  T(s, 'Sua escola merece começar o próximo ano mais estruturada.', { x, y: 3.2, w, h: 0.8, fontFace: MED, fontSize: 17, color: C.accent1, lineSpacingMultiple: 1.15 });
  T(s, [
    { text: 'escola estruturada', options: {} },
    { text: '™', options: { fontSize: 16, fontFace: SB, superscript: true } },
  ], { x, y: 4.3, w, h: 0.5, fontFace: BLACK, fontSize: 24, charSpacing: -1, color: C.background1 });
  s.addShape(pres.shapes.RECTANGLE, { x, y: 5.05, w, h: 0.75, fill: { color: C.accent1 }, line: { type: 'none' }, objectName: 'botao-cta' });
  T(s, 'ADQUIRA AGORA — R$ 497,00', { x, y: 5.05, w, h: 0.75, fontFace: BLACK, fontSize: 17, charSpacing: 2, color: C.text1, align: 'center', valign: 'middle' });
  T(s, '@nasaladadiretora + @ionaraoliveira', { x, y: 6.25, w, h: 0.35, fontFace: SB, fontSize: 13, color: C.accent1 });
  T(s, 'Eduarda de Paula', { x: 0.45, y: 6.55, w: 3, h: 0.3, fontFace: SB, fontSize: 10, color: C.background1 });
  T(s, 'Ionara Oliveira', { x: 3.6, y: 6.55, w: 2.4, h: 0.3, fontFace: SB, fontSize: 10, color: C.background1, align: 'right' });
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('ok', OUT);
})();
