## Conceito

O Planner da Diretora 2027 é uma peça de papelaria premium, não uma agenda escolar convencional. A identidade é **Paisley Artístico**: sofisticada, feminina, atemporal, autoral. Toda decisão de layout testa a mesma pergunta: isto parece uma peça de coleção, ou parece uma agenda genérica de papelaria?

Regra de ouro de toda a diagramação: **quanto mais uma página é usada para escrever, menos decoração ela recebe.** Capa e aberturas de mês carregam o paisley; páginas de planejamento semanal e mensal ficam quase limpas; páginas de anotação não têm decoração nenhuma.

## Paleta

Use `creme` como fundo de praticamente toda página interna — ele deve dominar pelo menos 90% da área visível. Nunca ocupe uma página inteira com estampa ou cor sólida.

Use `verde-petroleo` exclusivamente nos títulos manuscritos (`titulo-mes`, `frase-capa`, `titulo-secao-manuscrito|). É a cor que "assina" a letra à mão do planner — não aplique essa cor em texto Montserrat nem em elementos decorativos.

Use `laranja` para números de calendário, datas e numeração de página (token `numero-data`). É a cor que marca o tempo no produto.

Use `vinho`, `rosa` e `coral` apenas em elementos decorativos do paisley e em detalhes pontuais — nunca como fundo atrás de um campo de preenchimento, nunca em grandes áreas de uma página de escrita.

Use `tinta` como cor padrão do corpo de texto Montserrat sobre `creme`. Nunca use preto puro.

Use `linha-suave` em linhas de pauta, divisórias e bordas finas de tabela. Nenhuma linha da diagramação deve ser preta ou cinza neutro — sempre esse tom creme-acastanhado.

Nenhuma página deve usar as seis cores simultaneamente. Combine no máximo 3–4 por página, sempre com `creme` como base.

## Tipografia

Use `manuscrita` (Kristi, aproximação livre e nativa do Canva da referência Milena, sem o rabicho de assinatura) só nos três estilos do grupo "Manuscrita — títulos": nome do mês, frase de capa e títulos de seção/reflexão pessoal. Nunca use a fonte manuscrita em texto de instrução, tabela ou campo de preenchimento — ela é só para o título, nunca para o corpo.

Use `montserrat` para absolutamente todo o resto: títulos de ferramenta (`h1`, `h2`), rótulos (`eyebrow`, `legenda`), corpo de texto (`corpo`, `corpo-medium`), campos de preenchimento (`campo-preenchimento`) e números/datas (`numero-data`).

Aplique `h1` e `h2` sempre em bold, com `letterSpacing` zero ou quase zero — é a instrução explícita do projeto: título Montserrat bold e compacto, sem letras espaçadas. Reserve o único leve espaçamento entre letras (`letterSpacing: 1px`) para o estilo `eyebrow`, o rótulo pequeno acima de um título.

Use `serifada` (Cormorant Garamond) apenas no estilo `epigrafe` — citações e epígrafes nas aberturas de parte. É a terceira família, opcional, e deve aparecer raramente: se uma página não tem uma citação de verdade, não force o uso dessa fonte.

Não use nenhuma fonte caligráfica rebuscada, com floreios ou rabichos de assinatura — isso inclui a referência Milena original, cujo estilo foi conscientemente simplificado na escolha da Kristi.

## Margens e grid

A página individual mede 21 × 18cm; a página dupla aberta mede 42 × 18cm. Os tokens de `spacing` documentam essas margens a 96dpi (referência de tela): `margem-encadernacao` (1,5cm, lado interno, alterna entre página par e ímpar) e `margem-externa` (0,8cm nas demais bordas). Aplique `sangria` (3mm) somente onde um elemento decorativo — tipicamente o paisley — encosta na borda física da página; a produção final em 300dpi deve escalar esses valores proporcionalmente (fator ×3,125).

Use a escala `espaco-1` a `espaco-5` para o ritmo interno de cada página: `espaco-1`–`espaco-2` entre campos do mesmo bloco, `espaco-3` entre blocos funcionais (ex.: entre um dia e o próximo), `espaco-4` entre seções maiores (ex.: cabeçalho do mês e calendário), `espaco-5` reservado só para páginas de abertura de mês e de parte.

Nunca desenhe um campo, tabela, caixa ou bloco de conteúdo com cantos arredondados — todos usam `radius-zero`. A única exceção tolerada é `radius-etiqueta`, e só em pequenas etiquetas/adesivos.

## Regras de aplicação do paisley

A intensidade do paisley varia por tipo de página, do mais decorado ao mais limpo:

1. **Capa e contracapa** — maior presença da estampa, mantendo a composição aprovada (ver grupo de ativos `Paisley`).
2. **Aberturas de mês e de seção** — elementos grandes do paisley, concentrados em um ou dois cantos apenas.
3. **Páginas de conteúdo e exercícios** (reflexão pessoal, ferramentas de gestão) — elementos pequenos, só nos cantos e bordas.
4. **Planejamento mensal e semanal** — fundo quase só `creme`, linhas delicadas (`linha-suave`), paisley reduzido a um detalhe mínimo de canto ou ausente.
5. **Páginas de anotação livre** — sem decoração.

Nunca posicione um elemento do paisley atrás de um campo de preenchimento — ele nunca pode comprometer a legibilidade ou o espaço de escrita. Use os dois ativos do grupo `Paisley` (`paisley-frente`, `paisley-verso`) como os cantos decorativos de referência: recorte e redimensione a partir deles, mas não redesenhe nem substitua a estampa por ilustração genérica.

## O que evitar

Molduras pesadas, excesso de caixas, sombras, gradientes, ícones genéricos, corações e qualquer elemento decorativo que não venha do paisley aprovado. Nenhum campo tem cantos arredondados por padrão (veja `radius`). Nenhuma cor de fundo sólida cobrindo uma página inteira. Nenhuma fonte manuscrita fora dos três estilos do grupo "Manuscrita — títulos".
