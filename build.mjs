// Build: pre-render every formula to HTML with KaTeX, draw every figure as inline SVG,
// and emit one self-contained page (dist/index.html). The browser only runs a small state script.
import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import { ALL, ORDER, TOPICS, GROUPS } from './src/content/index.mjs';

const root = path.dirname(new URL(import.meta.url).pathname);
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const L5 = ['A', 'B', 'C', 'D', 'E'];
const OUTPUT = process.env.KATEX_OUTPUT || 'html';

const macros = {
  '\\unit': '\\ \\mathrm{#1}',
  '\\xhat': '\\hat{\\mathbf{x}}',
  '\\yhat': '\\hat{\\mathbf{y}}',
  '\\zhat': '\\hat{\\mathbf{z}}',
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');

function tex(src, display) {
  const html = katex.renderToString(src, { displayMode: display, throwOnError: true, macros: { ...macros }, output: OUTPUT, strict: 'ignore' });
  if (OUTPUT === 'html') {
    // keep a readable fallback for screen readers: the TeX source as the label
    return html.replace(/^<span class="katex(-display)?">/, (m) => m.replace('">', `" role="math" aria-label="${attr(src.trim())}">`));
  }
  return html;
}

// Inline formatting: $..$ math, $$..$$ display math, **bold**, *italic*.
// Short inline formulas, and any "(" or punctuation touching a formula, are kept on one line.
const fmt = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
function inline(s) {
  const toks = [];
  let i = 0;
  while (i < s.length) {
    if (s.startsWith('$$', i)) {
      const j = s.indexOf('$$', i + 2);
      if (j < 0) throw new Error('unclosed $$ in: ' + s);
      toks.push({ k: 'b', h: mathBlock(s.slice(i + 2, j)) });
      i = j + 2;
    } else if (s[i] === '$') {
      const j = s.indexOf('$', i + 1);
      if (j < 0) throw new Error('unclosed $ in: ' + s);
      const src = s.slice(i + 1, j);
      toks.push({ k: 'm', src, h: tex(src, false), pre: '', post: '' });
      i = j + 1;
    } else {
      let j = s.indexOf('$', i);
      if (j < 0) j = s.length;
      toks.push({ k: 't', s: s.slice(i, j) });
      i = j;
    }
  }
  toks.forEach((t, n) => {
    if (t.k !== 'm' || t.src.length > 40) return;
    const prev = toks[n - 1], next = toks[n + 1];
    if (prev && prev.k === 't') { const m = prev.s.match(/[([]$/); if (m) { t.pre = m[0]; prev.s = prev.s.slice(0, -1); } }
    if (next && next.k === 't') { const m = next.s.match(/^[)\].,;:?!]+/); if (m) { t.post = m[0]; next.s = next.s.slice(m[0].length); } }
  });
  return toks.map((t) => {
    if (t.k === 't') return fmt(t.s);
    if (t.k === 'b') return t.h;
    return t.src.length <= 40 ? `<span class="nb">${esc(t.pre)}${t.h}${esc(t.post)}</span>` : t.h;
  }).join('');
}

// Split a display formula at top-level \qquad and \quad\Rightarrow\quad into chunks that wrap as units.
function splitDisplay(src) {
  const parts = [];
  let depth = 0, last = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (c === '\\' && depth === 0) {
      if (src.startsWith('\\quad\\Rightarrow\\quad', i)) {
        parts.push(src.slice(last, i));
        last = i + '\\quad'.length; // keep "\Rightarrow\quad B" as the next chunk
        i += '\\quad\\Rightarrow\\quad'.length - 1;
      } else if (src.startsWith('\\qquad', i)) {
        parts.push(src.slice(last, i));
        last = i + '\\qquad'.length;
        i += '\\qquad'.length - 1;
      }
    }
  }
  parts.push(src.slice(last));
  return parts.map((p) => p.trim()).filter(Boolean);
}

// Display math is typeset as \displaystyle inside a centered block, in KaTeX's inline mode:
// it looks the same as display mode on wide screens, and can wrap at = and other relations on phones.
function mathBlock(src) {
  const chunks = splitDisplay(src.replace(/\\tfrac/g, '\\frac')).map((part) => {
    const html = katex.renderToString('\\displaystyle ' + part, { displayMode: false, throwOnError: true, macros: { ...macros }, output: OUTPUT, strict: 'ignore' });
    const labelled = OUTPUT === 'html' ? html.replace(/^<span class="katex">/, `<span class="katex" role="math" aria-label="${attr(part)}">`) : html;
    return `<span class="mpart">${labelled}</span>`;
  });
  return `<div class="math">${chunks.join(' ')}</div>`;
}

function linesToHtml(p) {
  const lines = p.split('\n').map((l) => l.trim()).filter(Boolean);
  let html = '', para = [], list = [];
  const flushPara = () => {
    if (para.length) html += `<p>${inline(para.join(' '))}</p>`;
    para = [];
  };
  const flushList = () => {
    if (list.length) html += `<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`;
    list = [];
  };
  for (const l of lines) {
    const isMath = l.startsWith('$$') && l.endsWith('$$') && l.indexOf('$$', 2) === l.length - 2;
    if (isMath) { flushPara(); flushList(); html += mathBlock(l.slice(2, -2)); }
    else if (l.startsWith('- ')) { flushPara(); list.push(l.slice(2)); }
    else { flushList(); para.push(l); }
  }
  flushPara();
  flushList();
  return html;
}

const NOTE = { Trap: 'Common trap', Check: 'Check', Note: 'Note' };
function richText(src) {
  return src.trim().split(/\n\s*\n/).map((p) => {
    const m = p.match(/^(Key idea|Trap|Check|Note|Why):\s*/);
    if (!m) return linesToHtml(p);
    const body = linesToHtml(p.slice(m[0].length));
    if (m[1] === 'Key idea' || m[1] === 'Why') {
      const lead = `<span class="lead">${m[1]}.</span> `;
      return body.startsWith('<p>') ? body.replace('<p>', `<p>${lead}`) : `<p>${lead}</p>${body}`;
    }
    return `<div class="note"><span class="label">${NOTE[m[1]]}</span>${body}</div>`;
  }).join('\n');
}

/* ---------- questions ---------- */
const byId = Object.fromEntries(ALL.map((q) => [q.id, q]));
const seq = ORDER.map((id) => byId[id]);
const groupRange = {};
seq.forEach((q, i) => {
  if (!q.group) return;
  const r = groupRange[q.group] || (groupRange[q.group] = [i + 1, i + 1]);
  r[1] = i + 1;
});

const articles = seq.map((q, i) => {
  const n = i + 1;
  const isSvg = (c) => c.trim().startsWith('<svg');
  const graphs = q.choices.every(isSvg);
  const grp = q.group ? GROUPS[q.group] : null;
  const groupIntro = grp ? `<p class="q-group">${inline(grp.intro.replace('{range}', `${groupRange[q.group][0]}–${groupRange[q.group][1]}`))}</p>` : '';
  const fig = grp ? grp.fig : q.fig;
  const choices = q.choices.map((c, k) => {
    const L = L5[k];
    const body = isSvg(c) ? c : inline(c.replace(/\\tfrac/g, '\\dfrac'));
    return `<label class="ch"><input type="radio" id="q${n}${L.toLowerCase()}" name="a${n}" value="${L}"><span class="bub" aria-hidden="true">${L}</span><span class="ch-body"><span class="sr-only">(${L}) </span>${body}</span><span class="ch-tag"></span></label>`;
  }).join('');
  return `<article class="q" id="q${n}" data-i="${i}" hidden aria-labelledby="qh${n}">
${groupIntro}${fig ? `<figure class="fig">${fig}</figure>` : ''}
<div class="q-stem"><h2 class="q-n" id="qh${n}"><span class="sr-only">Question </span>${n}.</h2>${richText(q.stem)}</div>
<fieldset class="choices${graphs ? ' graphs' : ''}"><legend class="sr-only">Answer choices for question ${n}</legend>${choices}</fieldset>
<div class="q-actions">
<button type="button" class="btn primary act-check" disabled>Check answer <span class="kbd">Enter</span></button>
<button type="button" class="btn quiet act-reveal">Show the answer</button>
<p class="feedback" role="status" hidden></p>
<button type="button" class="btn act-sol" aria-expanded="false" aria-controls="sol${n}" hidden>Show solution <span class="kbd">S</span></button>
<p class="exam-note" hidden>Solutions open after you submit the exam.</p>
</div>
<section class="sol" id="sol${n}" hidden aria-label="Solution to question ${n}">
<h3 class="label">Solution</h3>
${richText(q.solution)}
<p class="answer">Answer: (${q.answer})</p>
</section>
</article>`;
}).join('\n');

const mini = seq.map((q, i) => `<button type="button" class="mb" data-i="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`).join('');
const rows = seq.map((q, i) => `<button type="button" class="row" data-i="${i}"><span class="rn">${i + 1}</span>${L5.map((L) => `<span class="b">${L}</span>`).join('')}</button>`).join('');

/* ---------- cover & sheet bits ---------- */
const topicOrder = Object.keys(TOPICS).sort((a, b) => TOPICS[b].share - TOPICS[a].share);
const count = (t) => seq.filter((q) => q.topic === t).length;
const maxShare = Math.max(...topicOrder.map((t) => TOPICS[t].share));
const topicRows = topicOrder.map((t) => `<tr><td>${esc(TOPICS[t].name)}<span class="bar" style="width:${Math.round((TOPICS[t].share / maxShare) * 100)}%"></span></td><td class="num">${TOPICS[t].share}%</td><td class="num">${count(t)}</td></tr>`).join('');
const topicOptions = [`<option value="all">All topics (${seq.length})</option>`, ...topicOrder.map((t) => `<option value="${t}">${esc(TOPICS[t].name)} (${count(t)})</option>`)].join('');

/* ---------- constants table ---------- */
const C = [
  ['Physical constants', [
    ['Electron rest mass', 'm_e = 9.11\\times10^{-31}\\unit{kg}'],
    ['Electron rest energy', 'm_ec^2 = 0.511\\unit{MeV}'],
    ['Proton rest mass', 'm_p = 1.67\\times10^{-27}\\unit{kg}'],
    ['Elementary charge', 'e = 1.60\\times10^{-19}\\unit{C}'],
    ['Speed of light', 'c = 3.00\\times10^{8}\\unit{m/s}'],
    ['Planck constant', 'h = 6.63\\times10^{-34}\\unit{J{\\cdot}s} = 4.14\\times10^{-15}\\unit{eV{\\cdot}s}'],
    ['Reduced Planck constant', '\\hbar = 1.05\\times10^{-34}\\unit{J{\\cdot}s} = 6.58\\times10^{-16}\\unit{eV{\\cdot}s}'],
    ['Useful product', 'hc = 1240\\unit{eV{\\cdot}nm}'],
    ['Boltzmann constant', 'k = 1.38\\times10^{-23}\\unit{J/K} = 8.62\\times10^{-5}\\unit{eV/K}'],
    ['Avogadro number', 'N_A = 6.02\\times10^{23}\\unit{mol^{-1}}'],
    ['Gas constant', 'R = 8.31\\unit{J/(mol{\\cdot}K)}'],
    ['Gravitational constant', 'G = 6.67\\times10^{-11}\\unit{N{\\cdot}m^2/kg^2}'],
    ['Free-fall acceleration', 'g = 9.8\\unit{m/s^2}'],
    ['Vacuum permittivity', '\\varepsilon_0 = 8.85\\times10^{-12}\\unit{C^2/(N{\\cdot}m^2)}'],
    ['Coulomb constant', '1/4\\pi\\varepsilon_0 = 8.99\\times10^{9}\\unit{N{\\cdot}m^2/C^2}'],
    ['Vacuum permeability', '\\mu_0 = 4\\pi\\times10^{-7}\\unit{T{\\cdot}m/A}'],
    ['Bohr magneton', '\\mu_B = 9.27\\times10^{-24}\\unit{J/T}'],
    ['Bohr radius', 'a_0 = 0.0529\\unit{nm}'],
    ['Hydrogen ground-state energy', 'E_1 = -13.6\\unit{eV}'],
    ['Stefan–Boltzmann constant', '\\sigma = 5.67\\times10^{-8}\\unit{W/(m^2{\\cdot}K^4)}'],
    ['Wien constant', 'b = 2.90\\times10^{-3}\\unit{m{\\cdot}K}'],
    ['Electron Compton wavelength', 'h/m_ec = 2.43\\unit{pm}'],
    ['Atomic mass unit', '1\\unit{u} = 1.66\\times10^{-27}\\unit{kg} = 931\\unit{MeV}/c^2'],
  ]],
  ['Conversions', [
    ['Electron volt', '1\\unit{eV} = 1.60\\times10^{-19}\\unit{J}'],
    ['Atmosphere', '1\\unit{atm} = 1.01\\times10^{5}\\unit{Pa}'],
    ['Ångström', '1\\ \\text{Å} = 10^{-10}\\unit{m}'],
    ['Femtometer (fermi)', '1\\unit{fm} = 10^{-15}\\unit{m}'],
    ['Parsec', '1\\unit{pc} = 3.09\\times10^{16}\\unit{m} = 3.26\\ \\text{ly}'],
  ]],
  ['Prefixes', [
    ['tera, giga, mega, kilo', '\\mathrm{T}\\ 10^{12},\\ \\mathrm{G}\\ 10^{9},\\ \\mathrm{M}\\ 10^{6},\\ \\mathrm{k}\\ 10^{3}'],
    ['centi, milli, micro', '\\mathrm{c}\\ 10^{-2},\\ \\mathrm{m}\\ 10^{-3},\\ \\mu\\ 10^{-6}'],
    ['nano, pico, femto', '\\mathrm{n}\\ 10^{-9},\\ \\mathrm{p}\\ 10^{-12},\\ \\mathrm{f}\\ 10^{-15}'],
  ]],
  ['Moments of inertia about the center of mass', [
    ['Thin rod (axis perpendicular)', '\\tfrac{1}{12}ML^2'],
    ['Solid disk or cylinder', '\\tfrac12 MR^2'],
    ['Thin ring or hoop', 'MR^2'],
    ['Solid sphere', '\\tfrac25 MR^2'],
    ['Thin spherical shell', '\\tfrac23 MR^2'],
  ]],
];
const constRow = ([nm, v]) => `<div class="const-row"><span class="nm">${esc(nm)}</span><span class="v">${tex(v, false)}</span></div>`;
const constants = `<div class="const-grid"><div>${[C[0]].map(([h, rs]) => `<section class="const-sec"><h3 class="label">${h}</h3>${rs.map(constRow).join('')}</section>`).join('')}</div><div>${C.slice(1).map(([h, rs]) => `<section class="const-sec"><h3 class="label">${h}</h3>${rs.map(constRow).join('')}</section>`).join('')}</div></div>`;

/* ---------- meta for the script ---------- */
const meta = {
  q: seq.map((q) => ({ id: q.id, t: q.topic, k: q.answer, g: q.group || null })),
  topics: TOPICS,
  topicOrder,
};

/* ---------- KaTeX stylesheet with embedded fonts ---------- */
let katexCss = read('node_modules/katex/dist/katex.min.css');
const pageSoFar = articles + constants;
const familyUsed = (fam) => {
  const probes = {
    KaTeX_AMS: /class="[^"]*amsrm|mathbb|\\mathbb/,
    KaTeX_Caligraphic: /mathcal/,
    KaTeX_Fraktur: /mathfrak/,
    KaTeX_SansSerif: /mathsf|textsf/,
    KaTeX_Script: /mathscr/,
    KaTeX_Typewriter: /mathtt|texttt/,
  };
  return probes[fam] ? probes[fam].test(pageSoFar) : true;
};
const dropped = [];
katexCss = katexCss.replace(/@font-face\{([^}]*)\}/g, (all, body) => {
  const fam = (body.match(/font-family:"?(KaTeX_[A-Za-z0-9]+)"?/) || [])[1];
  if (!fam) return all;
  if (!familyUsed(fam)) { dropped.push(fam); return ''; }
  const m = body.match(/url\(fonts\/([^)]+\.woff2)\)/);
  if (!m) throw new Error('no woff2 for ' + fam);
  const b64 = fs.readFileSync(path.join(root, 'node_modules/katex/dist/fonts', m[1])).toString('base64');
  const newBody = body.replace(/src:[^;}]+/, `src:url(data:font/woff2;base64,${b64}) format("woff2")`);
  return `@font-face{${newBody}}`;
});

if (/url\(fonts\//.test(katexCss)) throw new Error('a KaTeX font was not embedded');

/* ---------- assemble ---------- */
const html = read('src/template.html')
  .replace('{{KATEX_CSS}}', () => katexCss)
  .replace('{{CSS}}', () => read('src/style.css'))
  .replace('{{TOPIC_ROWS}}', () => topicRows)
  .replace('{{TOPIC_OPTIONS}}', () => topicOptions)
  .replace('{{ARTICLES}}', () => articles)
  .replace('{{SHEET_ROWS}}', () => rows)
  .replace('{{MINI}}', () => mini)
  .replace('{{CONSTANTS}}', () => constants)
  .replace('{{META}}', () => JSON.stringify(meta).replace(/</g, '\\u003c'))
  .replace('{{JS}}', () => read('src/app.js'))
  .replaceAll('{{N}}', String(seq.length));

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), html);
const kb = (n) => (n / 1024).toFixed(0) + ' KB';
console.log('questions:', seq.length, '| page:', kb(Buffer.byteLength(html)), '| katex css:', kb(katexCss.length), '| dropped fonts:', dropped.join(', ') || 'none');
