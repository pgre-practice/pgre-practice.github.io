import mech from './mech.mjs';
import em, { groups as emGroups } from './em.mjs';
import optics from './optics.mjs';
import thermo from './thermo.mjs';
import qm from './qm.mjs';
import atomic from './atomic.mjs';
import { sr, lab, spec } from './rest.mjs';

export const TOPICS = {
  mech: { name: 'Classical Mechanics', short: 'Mechanics', share: 20 },
  em: { name: 'Electromagnetism', short: 'E&M', share: 18 },
  qm: { name: 'Quantum Mechanics', short: 'Quantum', share: 13 },
  thermo: { name: 'Thermodynamics & Statistical Mechanics', short: 'Thermo & Stat Mech', share: 10 },
  atomic: { name: 'Atomic Physics', short: 'Atomic', share: 10 },
  spec: { name: 'Specialized Topics', short: 'Specialized', share: 9 },
  optics: { name: 'Optics & Wave Phenomena', short: 'Optics & Waves', share: 8 },
  sr: { name: 'Special Relativity', short: 'Relativity', share: 6 },
  lab: { name: 'Laboratory Methods', short: 'Lab Methods', share: 6 },
};

const tag = (arr, topic) => arr.map((q) => ({ ...q, topic }));
export const ALL = [
  ...tag(mech, 'mech'), ...tag(em, 'em'), ...tag(optics, 'optics'), ...tag(thermo, 'thermo'),
  ...tag(qm, 'qm'), ...tag(atomic, 'atomic'), ...tag(sr, 'sr'), ...tag(lab, 'lab'), ...tag(spec, 'spec'),
];
export const GROUPS = { ...emGroups };

// Exam order: topics interleaved the way a real form mixes them.
export const ORDER = `
mech-incline em-gauss-nonuniform qm-commutator th-carnot opt-double-slit-water
mech-elastic at-photoelectric em-kirchhoff sr-momentum mech-coupled
qm-3d-oscillator lab-op-amp em-shell-graph th-pv-cycle mech-atwood
at-balmer opt-polarizers sp-decay-chain em-image-charge mech-physical-pendulum
qm-spin-sy th-adiabatic em-rc-initial em-rc-tau sr-muon
mech-orbit-raise at-selection lab-propagation qm-sudden-expansion mech-torricelli
em-hairpin opt-two-lenses th-free-expansion sp-conservation mech-bead-rod
em-dielectric-slab at-positronium qm-beat-frequency sr-velocity-add mech-binary
em-sliding-rod lab-semilog th-cp-diatomic sp-fermi mech-bucket
qm-tunneling opt-ar-coating at-moseley em-lc-energy mech-rolling-race
th-two-level qm-perturb-step em-displacement mech-explode at-hund
sp-doping opt-rayleigh sr-doppler mech-q-factor em-wave-b
qm-l-angle lab-counting th-blackbody mech-phase-space at-compton
em-exb-drift sp-hubble qm-normalize opt-group-velocity sp-eigenvalues
`.trim().split(/\s+/);
