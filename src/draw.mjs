// Build-time SVG line-art helpers for exam diagrams.
// Every stroke and label uses currentColor, so a diagram follows the page theme.
// Coordinates are SVG user units; y grows downward.

const r2 = (n) => Math.round(n * 100) / 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cls = (c) => (c ? ` class="${c}"` : '');
const P = (a) => a.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' ');

export const flat = (parts) => parts.flat(Infinity).filter(Boolean).join('');

export function fig(w, h, label, ...parts) {
  return `<svg class="fsvg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">${flat(parts)}</svg>`;
}

/* ---------- primitives ---------- */
export const line = (x1, y1, x2, y2, c = '') =>
  `<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}"${cls(c)}/>`;
export const poly = (pts, c = '') => `<polyline points="${P(pts)}"${cls(c)}/>`;
export const polygon = (pts, c = '') => `<polygon points="${P(pts)}"${cls(c)}/>`;
export const path = (d, c = '') => `<path d="${d}"${cls(c)}/>`;
export const circle = (cx, cy, r, c = '') => `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}"${cls(c)}/>`;
export const ellipse = (cx, cy, rx, ry, c = '') =>
  `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(rx)}" ry="${r2(ry)}"${cls(c)}/>`;
export const rect = (x, y, w, h, c = '') =>
  `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}"${cls(c)}/>`;
export const dot = (x, y, r = 2.7) => circle(x, y, r, 'fill');
export const ring = (x, y, r = 3) => circle(x, y, r, 'paper');

/* ---------- vector helpers ---------- */
function frame(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  const u = [dx / L, dy / L];
  const n = [-u[1], u[0]]; // left-hand normal in SVG coords
  const at = (s, t = 0) => [x1 + s * u[0] + t * n[0], y1 + s * u[1] + t * n[1]];
  return { L, u, n, at };
}

/* ---------- arrows ---------- */
export function head(x, y, ux, uy, size = 9, half = 3.6) {
  const nx = -uy, ny = ux;
  const bx = x - size * ux, by = y - size * uy;
  return polygon([[x, y], [bx + half * nx, by + half * ny], [bx - half * nx, by - half * ny]], 'fill nos');
}
export function arrow(x1, y1, x2, y2, { size = 9, half = 3.6, c = '', both = false } = {}) {
  const f = frame(x1, y1, x2, y2);
  const a = both ? f.at(size * 0.8) : [x1, y1];
  const b = f.at(f.L - size * 0.8);
  return [
    line(a[0], a[1], b[0], b[1], c),
    head(x2, y2, f.u[0], f.u[1], size, half),
    both ? head(x1, y1, -f.u[0], -f.u[1], size, half) : '',
  ];
}
// Arc in math convention (degrees, counterclockwise positive, y up); arrowhead at a2.
export function arcArrow(cx, cy, r, a1, a2, { size = 8, half = 3.4, c = '', headAt = 'end' } = {}) {
  const pt = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)];
  const ccw = a2 > a1;
  const p1 = pt(a1), p2 = pt(a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  const sweep = ccw ? 0 : 1;
  const out = [path(`M${r2(p1[0])} ${r2(p1[1])} A${r2(r)} ${r2(r)} 0 ${large} ${sweep} ${r2(p2[0])} ${r2(p2[1])}`, c)];
  const tan = (a, dir) => {
    const t = (a * Math.PI) / 180;
    return dir ? [-Math.sin(t), -Math.cos(t)] : [Math.sin(t), Math.cos(t)];
  };
  if (headAt === 'end' || headAt === 'both') {
    const d = tan(a2, ccw);
    out.push(head(p2[0] + d[0] * 2, p2[1] + d[1] * 2, d[0], d[1], size, half));
  }
  if (headAt === 'start' || headAt === 'both') {
    const d = tan(a1, !ccw);
    out.push(head(p1[0] + d[0] * 2, p1[1] + d[1] * 2, d[0], d[1], size, half));
  }
  return out;
}
// Plain arc (math convention degrees), e.g. angle markers.
export function arc(cx, cy, r, a1, a2, c = '') {
  const pt = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)];
  const p1 = pt(a1), p2 = pt(a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return path(`M${r2(p1[0])} ${r2(p1[1])} A${r2(r)} ${r2(r)} 0 ${large} ${a2 > a1 ? 0 : 1} ${r2(p2[0])} ${r2(p2[1])}`, c);
}

/* ---------- labels ----------
   Mini syntax: letters are math italic, digits and symbols upright.
   `text` = upright run, _x or _{..} = subscript, ^x or ^{..} = superscript. */
const ITALIC = /[A-Za-zα-ωϑϕϵℓ]/;
function parseLabel(spec) {
  const runs = [];
  let i = 0;
  const push = (text, it, shift) => {
    const last = runs[runs.length - 1];
    if (last && last.it === it && last.shift === shift) last.text += text;
    else runs.push({ text, it, shift });
  };
  const readGroup = () => {
    if (spec[i] === '{') {
      let depth = 1, j = i + 1;
      while (j < spec.length && depth) { if (spec[j] === '{') depth++; if (spec[j] === '}') depth--; j++; }
      const g = spec.slice(i + 1, j - 1); i = j; return g;
    }
    const g = spec[i]; i += 1; return g;
  };
  const emit = (str, shift) => {
    let up = false;
    for (const ch of str) {
      if (ch === '`') { up = !up; continue; }
      push(ch, !up && ITALIC.test(ch), shift);
    }
  };
  let upright = false;
  while (i < spec.length) {
    const ch = spec[i];
    if (ch === '`') { upright = !upright; i++; continue; }
    if ((ch === '_' || ch === '^') && !upright) {
      i++;
      emit(readGroup(), ch === '_' ? 'sub' : 'sup');
      continue;
    }
    push(ch, !upright && ITALIC.test(ch), 0);
    i++;
  }
  return runs;
}
export function text(x, y, spec, { size = 16, anchor = 'middle', v = 'middle', c = '', weight, rot } = {}) {
  const runs = parseLabel(spec);
  const base = v === 'middle' ? y + 0.34 * size : v === 'top' ? y + 0.78 * size : y;
  let cur = 0;
  const shiftOf = (s) => (s === 'sub' ? 0.3 * size : s === 'sup' ? -0.42 * size : 0);
  const spans = runs.map((r) => {
    const target = shiftOf(r.shift);
    const dy = target - cur; cur = target;
    const attrs = [`class="${r.it ? 'i' : 'u'}"`];
    if (dy) attrs.push(`dy="${r2(dy)}"`);
    if (r.shift) attrs.push(`font-size="${r2(size * 0.7)}"`);
    return `<tspan ${attrs.join(' ')}>${esc(r.text)}</tspan>`;
  });
  const w = weight ? ` font-weight="${weight}"` : '';
  const t = rot ? ` transform="rotate(${rot} ${r2(x)} ${r2(y)})"` : '';
  return `<text x="${r2(x)}" y="${r2(base)}" font-size="${size}" text-anchor="${anchor}"${w}${t}${cls(c)} xml:space="preserve">${spans.join('')}</text>`;
}

/* ---------- surfaces ---------- */
// Hatch ticks along segment p1->p2 on the side given by sign of the left normal.
export function hatch(x1, y1, x2, y2, { side = 1, step = 7.5, len = 7, c = 'thin' } = {}) {
  const f = frame(x1, y1, x2, y2);
  const out = [line(x1, y1, x2, y2)];
  const k = Math.SQRT1_2;
  const d = [side * f.n[0] * k - f.u[0] * k, side * f.n[1] * k - f.u[1] * k];
  for (let s = step * 0.6; s <= f.L + 0.01; s += step) {
    const p = f.at(s);
    out.push(line(p[0], p[1], p[0] + d[0] * len, p[1] + d[1] * len, c));
  }
  return out;
}
export const ground = (x1, x2, y, o = {}) => hatch(x1, y, x2, y, { side: -1, ...o }); // ticks below
export const ceiling = (x1, x2, y, o = {}) => hatch(x1, y, x2, y, { side: 1, ...o }); // ticks above
export const wallL = (x, y1, y2, o = {}) => hatch(x, y1, x, y2, { side: -1, ...o }); // ticks to the left
export const wallR = (x, y1, y2, o = {}) => hatch(x, y1, x, y2, { side: 1, ...o }); // ticks to the right

/* ---------- mechanics ---------- */
// Coil spring drawn as a prolate cycloid: loops on one side, wide arcs on the other.
export function spring(x1, y1, x2, y2, { coils = 7, r = 7, lead = 9, c = '' } = {}) {
  const f = frame(x1, y1, x2, y2);
  const t0 = Math.PI / 2, t1 = t0 + 2 * Math.PI * coils;
  const Lc = f.L - 2 * lead;
  const p = Lc / (t1 - t0);
  const a = Math.max(p * 1.7, r * 0.45);
  const X = (t) => p * (t - t0) - a * (Math.sin(t) - Math.sin(t0));
  const N = coils * 32;
  const pts = [f.at(0), f.at(lead)];
  for (let k = 1; k <= N; k++) {
    const t = t0 + ((t1 - t0) * k) / N;
    pts.push(f.at(lead + X(t), r * Math.cos(t)));
  }
  pts.push(f.at(f.L));
  return poly(pts, c);
}
export function zigzagSpring(x1, y1, x2, y2, { n = 8, amp = 7, lead = 9, c = '' } = {}) {
  const f = frame(x1, y1, x2, y2);
  const len = f.L - 2 * lead, d = len / n;
  const pts = [f.at(0), f.at(lead)];
  for (let k = 0; k < n; k++) pts.push(f.at(lead + d * (k + 0.5), k % 2 ? -amp : amp));
  pts.push(f.at(f.L - lead), f.at(f.L));
  return poly(pts, c);
}
export function block(x, y, w, h, label, o = {}) {
  return [rect(x, y, w, h, 'paper'), label ? text(x + w / 2, y + h / 2, label, o) : ''];
}

/* ---------- circuits ---------- */
export function wire(...pts) { return poly(pts); }
export function resistor(x1, y1, x2, y2, { len = 38, amp = 6.5, n = 6 } = {}) {
  const f = frame(x1, y1, x2, y2);
  const s0 = (f.L - len) / 2, d = len / n;
  const pts = [f.at(0), f.at(s0)];
  for (let k = 0; k < n; k++) pts.push(f.at(s0 + d * (k + 0.5), k % 2 ? -amp : amp));
  pts.push(f.at(s0 + len), f.at(f.L));
  return poly(pts);
}
export function capacitor(x1, y1, x2, y2, { gap = 8, plate = 26 } = {}) {
  const f = frame(x1, y1, x2, y2);
  const m = f.L / 2;
  const a = f.at(m - gap / 2), b = f.at(m + gap / 2);
  const pl = (s) => { const c1 = f.at(s, plate / 2), c2 = f.at(s, -plate / 2); return line(c1[0], c1[1], c2[0], c2[1], 'thick'); };
  return [line(x1, y1, a[0], a[1]), line(b[0], b[1], x2, y2), pl(m - gap / 2), pl(m + gap / 2)];
}
// Long plate = positive terminal. plus: 'start' puts the long plate toward (x1,y1).
export function battery(x1, y1, x2, y2, { gap = 7, long = 28, short = 13, plus = 'start' } = {}) {
  const f = frame(x1, y1, x2, y2);
  const m = f.L / 2;
  const sL = plus === 'start' ? m - gap / 2 : m + gap / 2;
  const sS = plus === 'start' ? m + gap / 2 : m - gap / 2;
  const a = f.at(m - gap / 2), b = f.at(m + gap / 2);
  const pl = (s, len, c) => { const c1 = f.at(s, len / 2), c2 = f.at(s, -len / 2); return line(c1[0], c1[1], c2[0], c2[1], c); };
  return [line(x1, y1, a[0], a[1]), line(b[0], b[1], x2, y2), pl(sL, long, ''), pl(sS, short, 'thick')];
}
export function openSwitch(x1, y1, x2, y2, { len = 30, angle = 28 } = {}) {
  const f = frame(x1, y1, x2, y2);
  const s0 = (f.L - len) / 2;
  const a = f.at(s0), b = f.at(s0 + len);
  const t = (angle * Math.PI) / 180;
  const tip = [a[0] + len * (f.u[0] * Math.cos(t) + f.n[0] * Math.sin(t)), a[1] + len * (f.u[1] * Math.cos(t) + f.n[1] * Math.sin(t))];
  return [line(x1, y1, a[0], a[1]), line(b[0], b[1], x2, y2), line(a[0], a[1], tip[0], tip[1]), ring(a[0], a[1], 2.6), ring(b[0], b[1], 2.6)];
}
export function groundSym(x, y) {
  return [line(x, y, x, y + 10), line(x - 11, y + 10, x + 11, y + 10), line(x - 7, y + 15, x + 7, y + 15), line(x - 3, y + 20, x + 3, y + 20)];
}

/* ---------- dimensions & angles ---------- */
export function dim(x1, y1, x2, y2, label, { off = 0, lo = 13, size = 15, ext = false, anchor } = {}) {
  const f = frame(x1, y1, x2, y2);
  const a = [x1 + f.n[0] * off, y1 + f.n[1] * off];
  const b = [x2 + f.n[0] * off, y2 + f.n[1] * off];
  const out = [arrow(a[0], a[1], b[0], b[1], { size: 7, half: 2.8, both: true, c: 'thin' })];
  if (ext && off) {
    out.push(line(x1, y1, a[0] + f.n[0] * 4 * Math.sign(off), a[1] + f.n[1] * 4 * Math.sign(off), 'thin'));
    out.push(line(x2, y2, b[0] + f.n[0] * 4 * Math.sign(off), b[1] + f.n[1] * 4 * Math.sign(off), 'thin'));
  }
  if (label) {
    const m = [(a[0] + b[0]) / 2 + f.n[0] * lo, (a[1] + b[1]) / 2 + f.n[1] * lo];
    out.push(text(m[0], m[1], label, { size, anchor: anchor || 'middle' }));
  }
  return out;
}
export function angleMark(cx, cy, r, a1, a2, label, { lr, size = 15 } = {}) {
  const mid = ((a1 + a2) / 2) * (Math.PI / 180);
  const R = lr || r + 13;
  return [arc(cx, cy, r, a1, a2, 'thin'), label ? text(cx + R * Math.cos(mid), cy - R * Math.sin(mid), label, { size }) : ''];
}

/* ---------- optics ---------- */
export function lens(x, yc, h, { bulge = 7 } = {}) {
  const y1 = yc - h / 2, y2 = yc + h / 2;
  return path(`M${r2(x)} ${r2(y1)} Q${r2(x + bulge * 2)} ${r2(yc)} ${r2(x)} ${r2(y2)} Q${r2(x - bulge * 2)} ${r2(yc)} ${r2(x)} ${r2(y1)} Z`, 'paper');
}

/* ---------- plots ---------- */
export function scale(x0, x1, y0, y1, box) {
  // box = {x, y, w, h} with (x, y) the top-left of the plotting area
  const sx = (v) => box.x + ((v - x0) / (x1 - x0)) * box.w;
  const sy = (v) => box.y + box.h - ((v - y0) / (y1 - y0)) * box.h;
  return { sx, sy };
}
export function sample(fn, a, b, n, sx, sy, { ymax = Infinity, ymin = -Infinity } = {}) {
  const segs = [];
  let cur = [];
  for (let k = 0; k <= n; k++) {
    const x = a + ((b - a) * k) / n;
    const y = fn(x);
    if (!Number.isFinite(y) || y > ymax || y < ymin) { if (cur.length > 1) segs.push(cur); cur = []; continue; }
    cur.push([sx(x), sy(y)]);
  }
  if (cur.length > 1) segs.push(cur);
  return segs;
}
export function axes(ox, oy, w, h, { xl = '', yl = '', size = 15, arrowSize = 8, xlOff = [8, 0], ylOff = [0, -10], c = '' } = {}) {
  return [
    arrow(ox, oy, ox + w, oy, { size: arrowSize, half: 3.2, c }),
    arrow(ox, oy, ox, oy - h, { size: arrowSize, half: 3.2, c }),
    xl ? text(ox + w + xlOff[0], oy + xlOff[1], xl, { size, anchor: 'start' }) : '',
    yl ? text(ox + ylOff[0], oy - h + ylOff[1], yl, { size }) : '',
  ];
}
