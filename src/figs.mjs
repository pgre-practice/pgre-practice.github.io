// One function per diagram. All geometry is drawn to match the numbers in the question.
import {
  fig, line, poly, polygon, path, circle, ellipse, rect, dot, ring, arrow, head, arcArrow, arc, text,
  hatch, ground, ceiling, wallL, wallR, spring, block, resistor, capacitor, battery, openSwitch,
  groundSym, dim, angleMark, lens, scale, sample, axes,
} from './draw.mjs';

const deg = Math.PI / 180;

/* ===================== Mechanics ===================== */

export function incline() {
  const A = [40, 165], base = 250, th = 30 * deg;
  const B = [A[0] + base, A[1]], C = [B[0], A[1] - base * Math.tan(th)];
  const u = [Math.cos(th), -Math.sin(th)], n = [-Math.sin(th), -Math.cos(th)];
  const s = 128, w = 38;
  const p0 = [A[0] + s * u[0], A[1] + s * u[1]], p1 = [p0[0] + w * u[0], p0[1] + w * u[1]];
  const q0 = [p0[0] + w * n[0], p0[1] + w * n[1]], q1 = [p1[0] + w * n[0], p1[1] + w * n[1]];
  const cx = (p0[0] + q1[0]) / 2, cy = (p0[1] + q1[1]) / 2;
  return fig(330, 190, 'A block on a rough plane inclined at 30 degrees to the horizontal',
    ground(18, 316, 165),
    polygon([A, B, C], 'shade'),
    polygon([p0, p1, q1, q0], 'paper'),
    text(cx, cy, 'm'),
    angleMark(A[0], A[1], 34, 0, 30, '30°', { lr: 52 }),
  );
}

export function atwood() {
  const cx = 120, cy = 78, R = 32;
  return fig(250, 250, 'Two blocks of masses 3m and m hanging from a string over a pulley of mass 2m and radius R',
    ceiling(78, 162, 18),
    line(cx, 18, cx, cy),
    circle(cx, cy, R, 'paper'),
    line(cx, cy, cx + R * Math.cos(-35 * deg), cy - R * Math.sin(-35 * deg), 'thin'),
    text(cx + 22, cy + 3, 'R', { size: 15 }),
    dot(cx, cy, 3),
    text(cx + R + 26, cy - 22, '2m'),
    line(cx - R, cy, cx - R, 150), line(cx + R, cy, cx + R, 186),
    block(cx - R - 26, 150, 52, 52, '3m'),
    block(cx + R - 19, 186, 38, 38, 'm'),
  );
}

export function binary() {
  const cx = 175, cy = 82;
  return fig(340, 180, 'Two stars of masses M and 2M orbiting their common center of mass, a distance d apart',
    ellipse(cx, cy, 130, 40, 'dash thin'),
    ellipse(cx, cy, 65, 20, 'dash thin'),
    line(cx - 5, cy - 5, cx + 5, cy + 5, 'thin'), line(cx - 5, cy + 5, cx + 5, cy - 5, 'thin'),
    text(cx, cy + 12, '`CM`', { size: 11 }),
    circle(cx - 65, cy, 11, 'shade'), text(cx - 65, cy - 25, '2M'),
    circle(cx + 130, cy, 8, 'shade'), text(cx + 130, cy - 22, 'M'),
    line(cx - 65, cy + 14, cx - 65, 150, 'thin'), line(cx + 130, cy + 11, cx + 130, 150, 'thin'),
    dim(cx - 65, 146, cx + 130, 146, 'd', { lo: -12 }),
  );
}

export function beadRod() {
  const O = [62, 152], th = 26 * deg, L = 228, r = 118;
  const E = [O[0] + L * Math.cos(th), O[1] - L * Math.sin(th)];
  const Bd = [O[0] + r * Math.cos(th), O[1] - r * Math.sin(th)];
  const n = [Math.sin(th), Math.cos(th)];
  return fig(310, 200, 'Top view: a rod rotating with angular speed omega about a vertical axis through one end, with a bead on the rod a distance r from the axis',
    line(O[0], O[1], E[0], E[1], 'thick'),
    circle(O[0], O[1], 6, 'paper'), dot(O[0], O[1], 2.2),
    ellipse(Bd[0], Bd[1], 9, 6.5, 'paper'),
    dim(O[0] + 14 * n[0], O[1] + 14 * n[1], Bd[0] + 14 * n[0], Bd[1] + 14 * n[1], 'r', { lo: 12 }),
    arcArrow(O[0], O[1], 30, 40, 150, { size: 8 }),
    text(O[0] - 6, O[1] - 44, 'ω'),
    text(250, 182, '`top view`', { size: 13, c: 'muted' }),
  );
}

export function coupled() {
  const y = 80, by = 36, bh = 44;
  return fig(400, 104, 'Two blocks of mass m between two walls, joined to the walls by springs of constant k and to each other by a spring of constant 2k',
    ground(24, 376, y),
    wallL(24, 16, y), wallR(376, 16, y),
    spring(24, 58, 118, 58, { coils: 6, r: 7 }),
    spring(162, 58, 238, 58, { coils: 5, r: 7 }),
    spring(282, 58, 376, 58, { coils: 6, r: 7 }),
    block(118, by, 44, bh, 'm'), block(238, by, 44, bh, 'm'),
    text(71, 28, 'k'), text(200, 28, '2k'), text(329, 28, 'k'),
  );
}

export function rodPendulum() {
  const x = 112, top = 14, Lp = 236, piv = top + Lp / 4;
  return fig(220, 268, 'A uniform rod of length L pivoted at a point L/4 from its upper end',
    wallL(36, piv - 26, piv + 26),
    line(36, piv, x, piv, 'thick'),
    rect(x - 6, top, 12, Lp, 'paper'),
    circle(x, piv, 4.2, 'paper'), dot(x, piv, 1.6),
    line(x + 9, top, 190, top, 'thin'), line(x + 9, piv, 144, piv, 'thin'), line(x + 9, top + Lp, 190, top + Lp, 'thin'),
    dim(137, top, 137, piv, 'L/4', { lo: -19, size: 14 }),
    dim(182, top, 182, top + Lp, 'L', { lo: -13 }),
  );
}

export function tank() {
  const g = 200, xl = 76, xr = 190, wl = 60, ppm = 140; // pixels per meter
  const hole = g - 0.2 * ppm, land = xr + 0.8 * ppm;
  const jet = [];
  for (let k = 0; k <= 40; k++) { const xx = xr + ((land - xr) * k) / 40; jet.push([xx, hole + 0.2 * ppm * ((xx - xr) / (land - xr)) ** 2]); }
  return fig(380, 240, 'Open water tank filled to a depth of 1.0 meter with a small hole 0.20 meter above the ground; the water jet lands a horizontal distance x from the tank',
    rect(xl, wl, xr - xl, g - wl, 'shade nos'),
    line(xl, 36, xl, g, 'thick'), line(xr, 36, xr, hole - 3.5, 'thick'), line(xr, hole + 3.5, xr, g, 'thick'),
    line(xl, wl, xr, wl, 'thin'),
    polygon([[133, wl - 2], [127, wl - 10], [139, wl - 10]], 'paper thin'),
    poly(jet, 'jet'),
    ground(14, 366, g),
    dim(52, wl, 52, g, '`1.0 m`', { lo: 24, size: 14 }),
    line(xl - 22, wl, xl - 2, wl, 'thin'),
    dim(170, hole, 170, g, '`0.20 m`', { lo: 28, size: 13 }),
    line(xr - 26, hole, xr - 2, hole, 'thin'),
    line(xr, g + 9, xr, 226, 'thin'), line(land, g + 9, land, 226, 'thin'),
    dim(xr, 220, land, 220, 'x', { lo: 11 }),
  );
}

export function bucket() {
  const xl = 64, xr = 204, ax = 134, bot = 200, R = xr - ax, yc = 128, yw = 86;
  const surf = [];
  for (let k = 0; k <= 40; k++) { const xx = xl + ((xr - xl) * k) / 40; surf.push([xx, yc - (yc - yw) * ((xx - ax) / R) ** 2]); }
  const water = [...surf, [xr, bot], [xl, bot]];
  return fig(270, 246, 'A cylindrical bucket of water rotating about its vertical axis; the water surface is curved, and h is the height of the surface at the wall above the surface at the center',
    polygon(water, 'shade nos'),
    poly(surf, 'thin'),
    line(xl, 30, xl, bot, 'thick'), line(xr, 30, xr, bot, 'thick'), line(xl, bot, xr, bot, 'thick'),
    line(ax, 14, ax, 226, 'dashdot thin'),
    path(`M${ax - 16} 20 A16 6 0 1 0 ${ax + 16} 20`, 'thin'),
    head(ax + 15.5, 19.2, 0.1, -1, 7, 3),
    text(ax + 30, 16, 'ω'),
    line(ax, yc, 248, yc, 'dash thin'), line(xr, yw, 248, yw, 'dash thin'),
    dim(240, yw, 240, yc, 'h', { lo: -12 }),
    line(ax, bot + 8, ax, 222, 'thin'), line(xr, bot + 8, xr, 222, 'thin'),
    dim(ax, 216, xr, 216, 'R', { lo: 11 }),
  );
}

export function projectile() {
  const g = 168, O = 24, D = 200, H = 108, ax = O + D / 2, ay = g - H;
  const y = (x) => g - H * (1 - ((x - ax) / (D / 2)) ** 2);
  const up = [], down = [], frag = [];
  for (let k = 0; k <= 30; k++) { const x = O + (D / 2) * (k / 30); up.push([x, y(x)]); }
  for (let k = 0; k <= 30; k++) { const x = ax + (D / 2) * (k / 30); down.push([x, y(x)]); }
  for (let k = 0; k <= 30; k++) { const x = ax + 122 * (k / 30); frag.push([x, ay + H * ((x - ax) / D) ** 2]); }
  const burst = [];
  for (let k = 0; k < 8; k++) { const a = (k * 45 + 22.5) * deg; burst.push(line(ax + 6 * Math.cos(a), ay + 6 * Math.sin(a), ax + 12 * Math.cos(a), ay + 12 * Math.sin(a), 'thin')); }
  const fl = frag[frag.length - 1], fp = frag[frag.length - 3];
  const fu = [fl[0] - fp[0], fl[1] - fp[1]], fn = Math.hypot(...fu);
  return fig(360, 210, 'A projectile path that would land a distance D from launch; at the top it explodes, one fragment drops straight down and the other moves on',
    poly(up), poly(down, 'dash thin'),
    burst,
    arrow(ax, ay + 16, ax, g - 3, { size: 8, c: 'dash thin' }),
    poly(frag.slice(0, -1)), head(fl[0], fl[1], fu[0] / fn, fu[1] / fn, 8, 3.4),
    ground(10, 350, g),
    dot(O, g, 2.6),
    line(O, g + 10, O, 196, 'thin'), line(O + D, g + 10, O + D, 196, 'thin'),
    dim(O, 190, O + D, 190, 'D', { lo: -10 }),
  );
}

export function phaseEllipse() {
  const ox = 140, oy = 104, rx = 84, ry = 58;
  return fig(290, 210, 'Phase-space trajectory of a harmonic oscillator: an ellipse centered at the origin of the x-p plane, traversed clockwise',
    arrow(30, oy, 262, oy, { size: 8, half: 3.2 }),
    arrow(ox, 196, ox, 14, { size: 8, half: 3.2 }),
    text(272, oy, 'x', { anchor: 'start' }), text(ox + 14, 16, 'p'),
    ellipse(ox, oy, rx, ry),
    head(ox + 4, oy - ry, 1, 0, 9, 3.6), head(ox - 4, oy + ry, -1, 0, 9, 3.6),
    text(ox + rx + 6, oy + 14, 'x_{`max`}', { anchor: 'start', size: 15 }),
    text(ox - 8, oy - ry - 12, 'p_{`max`}', { anchor: 'end', size: 15 }),
  );
}

/* ===================== Electromagnetism ===================== */

export function shell() {
  const c = 110, a = 40, b = 76;
  return fig(220, 200, 'Cross section: a point charge +q at the center of a thick conducting spherical shell with inner radius a and outer radius b',
    circle(c, 100, b, 'hatched'),
    circle(c, 100, a, 'paper'),
    dot(c, 100, 3.2), text(c + 2, 116, '+q', { size: 15 }),
    line(c, 100, c + a * Math.cos(140 * deg), 100 - a * Math.sin(140 * deg), 'thin'),
    text(c - 17, 82, 'a', { size: 15 }),
    line(c, 100, c + b * Math.cos(35 * deg), 100 - b * Math.sin(35 * deg), 'thin'),
    text(c + 46, 78, 'b', { size: 15, c: 'onhatch' }),
  );
}

// Small E-versus-r sketches for the answer choices. kind picks the curve shape.
export function shellGraph(kind) {
  const box = { x: 26, y: 14, w: 150, h: 78 };
  const a = 1, b = 1.45, rmax = 3, ymax = 4.4;
  const { sx, sy } = scale(0, rmax, 0, ymax, box);
  const inv = (r) => 1 / (r * r);
  const parts = [];
  const seg = (fn, r0, r1) => sample(fn, r0, r1, 80, sx, sy, { ymax }).forEach((s) => parts.push(poly(s, 'curve')));
  const zero = (r0, r1) => parts.push(line(sx(r0), sy(0), sx(r1), sy(0), 'zero'));
  if (kind === 'bare') seg(inv, 0.3, rmax);
  if (kind === 'shield') { seg(inv, 0.3, a); zero(a, rmax); }
  if (kind === 'cavity') { zero(0, b); seg(inv, b, rmax); }
  if (kind === 'right') { seg(inv, 0.3, a); zero(a, b); seg(inv, b, rmax); }
  if (kind === 'const') { seg(inv, 0.3, a); seg(() => inv(a), a, b); seg(inv, b, rmax); }
  return fig(196, 116, `Graph of E versus r (${kind})`,
    line(sx(a), sy(0), sx(a), box.y + 4, 'dot thin'), line(sx(b), sy(0), sx(b), box.y + 4, 'dot thin'),
    parts,
    axes(box.x, box.y + box.h, box.w + 8, box.h + 6, { size: 14, arrowSize: 7, xlOff: [5, 0], ylOff: [-12, 4] }),
    text(box.x - 12, box.y + 6, 'E', { size: 14 }),
    text(box.x + box.w + 16, box.y + box.h, 'r', { size: 14 }),
    text(sx(a), sy(0) + 13, 'a', { size: 13 }), text(sx(b), sy(0) + 13, 'b', { size: 13 }),
    text(box.x - 6, sy(0) + 12, '0', { size: 12 }),
  );
}

export function capSlab() {
  const x1 = 72, x2 = 232, top = 40, bot = 140, mid = 90;
  return fig(300, 176, 'Parallel-plate capacitor with charges +Q and -Q and plate separation d; a dielectric slab of constant 3 and thickness d/2 lies against the lower plate',
    rect(x1, mid, x2 - x1, bot - mid, 'hatched'),
    rect(x1, top - 5, x2 - x1, 5, 'fill'),
    rect(x1, bot, x2 - x1, 5, 'fill'),
    rect(x1 + 46, mid + 13, 68, 24, 'paper nos'),
    text((x1 + x2) / 2, mid + 25, 'κ = 3', { size: 15 }),
    text((x1 + x2) / 2, top - 18, '+Q'), text((x1 + x2) / 2, bot + 22, '−Q'),
    line(36, top, x1 - 4, top, 'thin'), line(36, bot, x1 - 4, bot, 'thin'),
    dim(46, top, 46, bot, 'd', { lo: 13 }),
    line(x2 + 4, mid, 262, mid, 'thin'), line(x2 + 4, bot, 262, bot, 'thin'),
    dim(254, mid, 254, bot, 'd/2', { lo: -20, size: 15 }),
  );
}

export function rcCircuit() {
  const L = 40, T = 40, B = 172, N = 214, Rx = 296;
  return fig(330, 200, 'Circuit: battery emf epsilon, switch S and resistor R1 in series, feeding resistor R2 in parallel with capacitor C',
    battery(L, T, L, B, { plus: 'start', long: 32, short: 15, gap: 8 }),
    text(L - 22, (T + B) / 2, 'ε', { size: 19 }),
    openSwitch(L, T, 120, T, { len: 34, angle: 26 }),
    text(95, T - 22, 'S'),
    resistor(120, T, N, T),
    text(167, T - 20, 'R_1'),
    line(N, T, Rx, T),
    resistor(N, T, N, B),
    text(N + 14, (T + B) / 2, 'R_2', { anchor: 'start' }),
    capacitor(Rx, T, Rx, B),
    text(Rx + 20, (T + B) / 2, 'C', { anchor: 'start' }),
    line(L, B, Rx, B),
    dot(N, T), dot(N, B),
  );
}

export function twoBattery() {
  const T = 30, B = 172, xs = [44, 172, 300];
  return fig(350, 196, 'Circuit with three parallel branches between a top wire and a bottom wire: a 12 volt battery with a 2 ohm resistor, a 4 ohm resistor, and a 6 volt battery with a 2 ohm resistor; both batteries have their positive terminals toward the top wire',
    line(xs[0], T, xs[2], T), line(xs[0], B, xs[2], B),
    battery(xs[0], T, xs[0], 101, { plus: 'start' }), resistor(xs[0], 101, xs[0], B),
    resistor(xs[1], T, xs[1], B),
    battery(xs[2], T, xs[2], 101, { plus: 'start' }), resistor(xs[2], 101, xs[2], B),
    text(xs[0] - 20, 66, '`12 V`', { anchor: 'end', size: 15 }), text(xs[0] - 20, 138, '`2 Ω`', { anchor: 'end', size: 15 }),
    text(xs[1] + 16, 101, '`4 Ω`', { anchor: 'start', size: 15 }),
    text(xs[2] + 20, 66, '`6 V`', { anchor: 'start', size: 15 }), text(xs[2] + 20, 138, '`2 Ω`', { anchor: 'start', size: 15 }),
    text(xs[0] + 18, 50, '+', { size: 14 }), text(xs[2] - 18, 50, '+', { size: 14 }),
    dot(xs[1], T), dot(xs[1], B),
  );
}

export function hairpin() {
  const px = 92, py = 86, R = 50;
  return fig(340, 172, 'A wire bent into a hairpin: two long parallel straight sections joined by a semicircle of radius R centered on point P',
    path(`M${px} ${py - R} A${R} ${R} 0 0 0 ${px} ${py + R}`),
    line(px, py - R, 326, py - R), line(px, py + R, 326, py + R),
    head(208, py - R, -1, 0, 9, 3.8), head(220, py + R, 1, 0, 9, 3.8),
    text(214, py - R - 16, 'I'), text(214, py + R + 18, 'I'),
    dot(px, py, 3), text(px + 14, py + 4, 'P'),
    line(px, py, px + R * Math.cos(150 * deg), py - R * Math.sin(150 * deg), 'thin'),
    text(px - 26, py - 4, 'R', { size: 15 }),
  );
}

export function rails() {
  const T = 44, B = 144, xr = 232;
  const field = [];
  for (const x of [78, 122, 166, 276, 316]) for (const y of [68, 94, 120]) field.push(circle(x, y, 4.2, 'thin'), dot(x, y, 1.4));
  return fig(340, 178, 'Two parallel rails joined by a resistor R; a conducting rod of length l slides along them with speed v in a magnetic field B pointing out of the page',
    line(40, T, 330, T), line(40, B, 330, B),
    resistor(40, T, 40, B), text(26, (T + B) / 2, 'R', { anchor: 'end' }),
    field,
    line(xr, T - 12, xr, B + 12, 'rod'),
    arrow(xr + 10, 94, xr + 34, 94, { size: 8 }), text(xr + 22, 80, 'v'),
    dim(xr - 18, T, xr - 18, B, 'ℓ', { lo: 12 }),
    text(300, 164, 'B `(out of page)`', { size: 14 }),
  );
}

export function chargingCap() {
  const cy = 86, p1 = 132, p2 = 194, mx = (p1 + 5 + p2) / 2;
  return fig(330, 176, 'Side view of a parallel-plate capacitor with circular plates of radius R being charged by current I; a circle of radius r lies between the plates',
    line(14, cy, p1, cy), line(p2 + 5, cy, 316, cy),
    head(74, cy, 1, 0, 9, 3.6), head(266, cy, 1, 0, 9, 3.6),
    text(74, cy - 16, 'I'), text(266, cy - 16, 'I'),
    rect(p1, cy - 62, 5, 124, 'fill'), rect(p2, cy - 62, 5, 124, 'fill'),
    line(p1 + 9, cy, p2 - 4, cy, 'dashdot thin'),
    ellipse(mx, cy, 9, 34, 'dash'),
    line(mx, cy, mx, cy - 34, 'thin'), text(mx + 15, cy - 18, 'r', { size: 15 }),
    line(p1 - 16, cy - 62, p1 - 3, cy - 62, 'thin'),
    dim(p1 - 12, cy, p1 - 12, cy - 62, 'R', { lo: -12, size: 15 }),
  );
}

/* ===================== Optics ===================== */

export function doubleSlit() {
  const bx = 104, sx = 330, cy = 100, d = 24;
  const pat = [];
  for (let k = 0; k <= 160; k++) {
    const y = 22 + (156 * k) / 160, u = (y - cy) / 14.5;
    pat.push([sx + 4 + 28 * Math.cos(Math.PI * u) ** 2 * Math.exp(-(((y - cy) / 70) ** 2)), y]);
  }
  return fig(390, 210, 'Double-slit experiment: light falls on two slits a distance d apart, and fringes form on a screen a distance L away',
    arrow(18, 82, 62, 82, { size: 8 }), arrow(18, 100, 62, 100, { size: 8 }), arrow(18, 118, 62, 118, { size: 8 }),
    text(40, 62, 'λ'),
    line(bx, 18, bx, cy - d / 2 - 3, 'thick'), line(bx, cy - d / 2 + 3, bx, cy + d / 2 - 3, 'thick'), line(bx, cy + d / 2 + 3, bx, 182, 'thick'),
    line(bx, cy - d / 2, sx, 58, 'dash thin'), line(bx, cy + d / 2, sx, 58, 'dash thin'),
    line(sx, 18, sx, 182, 'thick'),
    poly(pat, 'thin'),
    dim(bx - 12, cy - d / 2, bx - 12, cy + d / 2, '', {}), text(bx - 24, cy, 'd', { size: 15 }),
    line(bx, 186, bx, 200, 'thin'), line(sx, 186, sx, 200, 'thin'),
    dim(bx, 194, sx, 194, 'L', { lo: -10 }),
    text(sx + 34, 14, '`screen`', { size: 12, c: 'muted' }),
  );
}

export function polarizers() {
  const cy = 70, xs = [118, 214, 310], r = 36;
  const axisLine = (x, angFromVertical) => {
    const t = angFromVertical * deg;
    const dx = r * 0.86 * Math.sin(t), dy = r * 0.86 * Math.cos(t);
    return line(x - dx, cy + dy, x + dx, cy - dy, 'thick');
  };
  return fig(400, 140, 'Three polarizers in a row; transmission axes at 0, 30 and 90 degrees from the vertical axis of the first',
    line(66, cy, 382, cy, 'dash thin'),
    arrow(14, cy, 64, cy, { size: 8 }), text(38, cy - 18, 'I_0'),
    xs.map((x) => circle(x, cy, r, 'paper')),
    [xs[1], xs[2]].map((x) => line(x, cy - r + 3, x, cy + r - 3, 'dot thin')),
    axisLine(xs[0], 0), axisLine(xs[1], 30), axisLine(xs[2], 90),
    arc(xs[1], cy, 21, 60, 90, 'thin'),
    arrow(350, cy, 392, cy, { size: 8 }), text(372, cy - 18, 'I'),
    text(xs[0], cy + r + 20, '`1:  0°`', { size: 14 }), text(xs[1], cy + r + 20, '`2:  30°`', { size: 14 }), text(xs[2], cy + r + 20, '`3:  90°`', { size: 14 }),
  );
}

export function twoLenses() {
  const ax = 92, k = 4.5, l1 = 110, l2 = l1 + 40 * k, ox = l1 - 15 * k;
  return fig(400, 176, 'Object 15 cm in front of a lens of focal length 10 cm; a second lens of focal length 20 cm is 40 cm beyond the first',
    line(10, ax, 392, ax, 'dashdot thin'),
    lens(l1, ax, 96), lens(l2, ax, 96),
    arrow(ox, ax, ox, ax - 34, { size: 8 }),
    [l1 - 10 * k, l1 + 10 * k].map((x) => line(x, ax - 4, x, ax + 4, 'thin')),
    [l2 - 20 * k, l2 + 20 * k].map((x) => line(x, ax - 4, x, ax + 4, 'thin')),
    text(l1 - 10 * k, ax + 15, 'F_1', { size: 13 }), text(l1 + 10 * k, ax + 15, 'F_1', { size: 13 }),
    text(l2 - 20 * k, ax + 15, 'F_2', { size: 13 }), text(l2 + 20 * k, ax + 15, 'F_2', { size: 13 }),
    text(l1, 26, 'f_1 = `10 cm`', { size: 14 }), text(l2, 26, 'f_2 = `20 cm`', { size: 14 }),
    line(ox, ax + 30, ox, 166, 'thin'), line(l1, ax + 50, l1, 166, 'thin'), line(l2, ax + 50, l2, 166, 'thin'),
    dim(ox, 158, l1, 158, '`15 cm`', { lo: -10, size: 13 }),
    dim(l1, 158, l2, 158, '`40 cm`', { lo: -10, size: 13 }),
  );
}

/* ===================== Thermodynamics ===================== */

export function pvTriangle() {
  const ox = 46, oy = 190;
  const sx = (v) => ox + 52 * v, sy = (p) => oy - 46 * p;
  const A = [sx(1), sy(1)], B = [sx(3), sy(1)], C = [sx(1), sy(3)];
  const mid = (p, q, f = 0.55) => [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f];
  const dir = (p, q) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / d, (q[1] - p[1]) / d]; };
  const hd = (p, q) => { const m = mid(p, q); const d = dir(p, q); return head(m[0] + 4 * d[0], m[1] + 4 * d[1], d[0], d[1], 9, 3.8); };
  return fig(270, 222, 'P-V diagram of a triangular cycle: A at (V0, P0), B at (3V0, P0), C at (V0, 3P0), traversed A to B to C to A',
    axes(ox, oy, 210, 176, { size: 15, xlOff: [8, 0] }),
    text(ox + 222, oy, 'V', { anchor: 'start' }), text(ox, 8, 'P'),
    line(A[0], A[1], A[0], oy, 'dot thin'), line(B[0], B[1], B[0], oy, 'dot thin'),
    line(ox, A[1], A[0], A[1], 'dot thin'), line(ox, C[1], C[0], C[1], 'dot thin'),
    polygon([A, B, C]),
    hd(A, B), hd(B, C), hd(C, A),
    dot(...A), dot(...B), dot(...C),
    text(A[0] - 10, A[1] + 14, 'A', { size: 15 }), text(B[0] + 10, B[1] + 14, 'B', { size: 15 }), text(C[0] + 13, C[1] - 6, 'C', { size: 15 }),
    text(A[0], oy + 15, 'V_0', { size: 14 }), text(B[0], oy + 15, '3V_0', { size: 14 }),
    text(ox - 8, A[1], 'P_0', { size: 14, anchor: 'end' }), text(ox - 8, C[1], '3P_0', { size: 14, anchor: 'end' }),
  );
}

/* ===================== Quantum ===================== */

export function wellExpand() {
  const fl = 140, x0 = 50, x1 = 158, x2 = 266;
  const psi = [];
  for (let k = 0; k <= 60; k++) { const x = x0 + ((x1 - x0) * k) / 60; psi.push([x, fl - 74 * Math.sin((Math.PI * (x - x0)) / (x1 - x0))]); }
  return fig(320, 170, 'Infinite square well from 0 to L with the ground-state wave function; the right wall moves suddenly from L to 2L',
    line(x0 - 20, fl, 300, fl, 'thin'),
    hatch(x0, 20, x0, fl, { side: -1 }),
    hatch(x1, 20, x1, fl, { side: 1 }),
    line(x2, 20, x2, fl, 'dash'),
    poly(psi),
    text((x0 + x1) / 2, 50, 'ψ_1', { size: 15 }),
    arrow(x1 + 12, 34, x2 - 8, 34, { size: 8, c: 'thin' }),
    text(x0, fl + 15, '`0`', { size: 14 }), text(x1, fl + 15, 'L', { size: 14 }), text(x2, fl + 15, '2L', { size: 14 }),
  );
}

export function wellStep() {
  const fl = 140, x0 = 54, x1 = 254, xm = (x0 + x1) / 2, h = 32;
  const psi = [];
  for (let k = 0; k <= 60; k++) { const x = x0 + ((x1 - x0) * k) / 60; psi.push([x, fl - 92 * Math.sin((Math.PI * (x - x0)) / (x1 - x0))]); }
  return fig(310, 168, 'Infinite square well from 0 to L with a small step of height V0 over the left half, 0 to L/2',
    rect(x0, fl - h, xm - x0, h, 'shade'),
    line(x0 - 18, fl, x1 + 22, fl, 'thin'),
    hatch(x0, 14, x0, fl, { side: -1 }),
    hatch(x1, 14, x1, fl, { side: 1 }),
    poly(psi, 'dash thin'),
    text(x0 + 50, fl - h / 2, 'V_0', { size: 15 }),
    text(x0, fl + 15, '`0`', { size: 14 }), text(xm, fl + 15, 'L/2', { size: 14 }), text(x1, fl + 15, 'L', { size: 14 }),
  );
}

/* ===================== Lab ===================== */

export function opAmp() {
  const lx = 176, tY = 70, bY = 160, apx = 256, mY = 115, inN = 93, inP = 137;
  return fig(360, 196, 'Inverting amplifier: input through R1 to the inverting input, feedback resistor Rf from output to inverting input, non-inverting input grounded',
    polygon([[lx, tY], [lx, bY], [apx, mY]], 'paper'),
    text(lx + 11, inN, '−', { size: 16 }), text(lx + 11, inP, '+', { size: 16 }),
    ring(30, inN, 3.4), text(30, inN - 18, 'V_{`in`}'),
    resistor(33.4, inN, 136, inN), text(85, inN - 19, 'R_1'),
    line(136, inN, lx, inN),
    line(150, inN, 150, 34), resistor(150, 34, 292, 34), line(292, 34, 292, mY),
    text(221, 12, 'R_f'),
    dot(150, inN), dot(292, mY),
    line(apx, mY, 326, mY), ring(329.4, mY, 3.4), text(329, mY - 18, 'V_{`out`}'),
    line(lx, inP, 156, inP), line(156, inP, 156, 152), groundSym(156, 152),
  );
}

export function semilog() {
  const box = { x: 74, y: 18, w: 256, h: 180 };
  const t0 = 0, t1 = 10, ylo = 2, yhi = 4; // log10 range
  const sx = (t) => box.x + ((t - t0) / (t1 - t0)) * box.w;
  const sy = (A) => box.y + box.h - ((Math.log10(A) - ylo) / (yhi - ylo)) * box.h;
  const grid = [];
  for (let e = 2; e < 4; e++) for (let m = 2; m <= 9; m++) { const y = sy(m * 10 ** e); grid.push(line(box.x, y, box.x + box.w, y, 'grid')); }
  for (let t = 1; t < 10; t++) grid.push(line(sx(t), box.y, sx(t), box.y + box.h, 'grid'));
  const major = [];
  for (const e of [2, 3, 4]) {
    major.push(line(box.x, sy(10 ** e), box.x + box.w, sy(10 ** e), 'grid2'));
    major.push(text(box.x - 8, sy(10 ** e), `10^${e}`, { anchor: 'end', size: 14 }));
  }
  const ticks = [];
  for (let t = 0; t <= 10; t += 2) ticks.push(line(sx(t), box.y + box.h, sx(t), box.y + box.h + 5, 'thin'), text(sx(t), box.y + box.h + 16, `\`${t}\``, { size: 13 }));
  const jitter = [1.03, 0.97, 1.02, 0.98, 1.04, 0.97, 1.0, 1.03, 0.96, 1.02, 0.99];
  const pts = [];
  for (let t = 0; t <= 10; t++) { const A = 8000 * 2 ** (-t / 2) * jitter[t]; pts.push(circle(sx(t), sy(A), 3.3, 'paper')); }
  return fig(350, 246, 'Semilogarithmic plot of activity versus time; the data fall on a straight line from 8000 counts per minute at t = 0 to 250 at t = 10 hours',
    grid, major,
    rect(box.x, box.y, box.w, box.h, 'thin'),
    line(sx(0), sy(8000), sx(10), sy(250), 'thin'),
    pts, ticks,
    text(box.x + box.w / 2, box.y + box.h + 36, '`Time (hours)`', { size: 13 }),
    text(18, box.y + box.h / 2, '`Activity (counts/min)`', { size: 13, rot: -90 }),
  );
}
