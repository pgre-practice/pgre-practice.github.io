const t = String.raw;

export default [
  {
    id: 'at-balmer',
    stem: t`The red Balmer line of hydrogen, from the transition $n = 3\to n = 2$, has wavelength $656\unit{nm}$. What is the wavelength of the line from the transition $n = 4\to n = 2$?`,
    choices: [t`$365\unit{nm}$`, t`$410\unit{nm}$`, t`$437\unit{nm}$`, t`$486\unit{nm}$`, t`$886\unit{nm}$`],
    answer: 'D',
    solution: t`Key idea: For hydrogen, $\dfrac1\lambda = R_H\left(\dfrac{1}{n_f^2} - \dfrac{1}{n_i^2}\right)$. Take a ratio so that $R_H$ cancels:

$$\frac{\lambda_{4\to2}}{\lambda_{3\to2}} = \frac{\frac14 - \frac19}{\frac14 - \frac1{16}} = \frac{5/36}{3/16} = \frac{20}{27}$$

$$\lambda_{4\to2} = 656\unit{nm}\times\frac{20}{27}\approx 486\unit{nm}$$

This is the blue-green H$\beta$ line.

Trap: $886\unit{nm}$ inverts the ratio; the bigger energy jump must give the shorter wavelength. $365\unit{nm}$ is the series limit ($n = \infty\to2$).`,
  },
  {
    id: 'at-positronium',
    stem: t`In hydrogen, the Lyman-$\alpha$ line ($n = 2\to n = 1$) has wavelength $122\unit{nm}$. Positronium is a bound state of an electron and a positron. According to the Bohr model, what is the wavelength of the $n = 2\to n = 1$ line of positronium?`,
    choices: [t`$31\unit{nm}$`, t`$61\unit{nm}$`, t`$122\unit{nm}$`, t`$183\unit{nm}$`, t`$244\unit{nm}$`],
    answer: 'E',
    solution: t`Key idea: Bohr energy levels are proportional to the reduced mass $\mu$ of the two orbiting bodies:

$$E_n = -\frac{\mu}{m_e}\cdot\frac{13.6\unit{eV}}{n^2}$$

In hydrogen the proton is so heavy that $\mu\approx m_e$. In positronium both particles have mass $m_e$, so

$$\mu = \frac{m_e\cdot m_e}{m_e + m_e} = \frac{m_e}{2}$$

Every level, and so every photon energy, is half as large as in hydrogen. Half the photon energy means twice the wavelength:

$$\lambda = 2\times122\unit{nm} = 244\unit{nm}$$

This matches the measured positronium line at $243\unit{nm}$.

Trap: $61\unit{nm}$ uses the total mass $2m_e$ where the reduced mass belongs.`,
  },
  {
    id: 'at-selection',
    stem: t`Which of the following transitions in a hydrogen atom is allowed by the electric dipole selection rules?`,
    choices: [t`$2s\to1s$`, t`$3d\to2p$`, t`$3s\to2s$`, t`$3d\to1s$`, t`$4f\to2p$`],
    answer: 'B',
    solution: t`Key idea: An electric dipole transition needs $\Delta l = \pm1$ (and $\Delta m_l = 0, \pm1$). The photon carries away one unit of angular momentum, and the parity of the state must change.

- $2s\to1s$ and $3s\to2s$: $\Delta l = 0$, forbidden.
- $3d\to1s$ and $4f\to2p$: $\Delta l = -2$, forbidden.
- $3d\to2p$: $\Delta l = -1$, allowed.

Note: Because $2s$ cannot decay to $1s$ by emitting a single electric-dipole photon, it lives far longer than $2p$ (about $0.1\unit{s}$ compared with $1.6\unit{ns}$). It decays mainly by emitting two photons.`,
  },
  {
    id: 'at-hund',
    stem: t`The ground-state electron configuration of nitrogen is $1s^2\,2s^2\,2p^3$. According to Hund's rules, what is the spectroscopic term of the ground state?`,
    choices: [t`$^2S_{1/2}$`, t`$^2P_{1/2}$`, t`$^2D_{5/2}$`, t`$^4S_{3/2}$`, t`$^4P_{5/2}$`],
    answer: 'D',
    solution: t`Key idea: Filled subshells ($1s^2$, $2s^2$) contribute nothing. Apply Hund's rules to the three $2p$ electrons:

- Rule 1 (largest total spin): make all three spins parallel, so $S = \tfrac32$ and $2S + 1 = 4$.
- With parallel spins, the Pauli principle forces the electrons into $m_l = +1, 0, -1$. Then $M_L = 0$, so $L = 0$: an $S$ term.
- With $L = 0$, the only possible value is $J = S = \tfrac32$.

The ground term is $^4S_{3/2}$.

Trap: A quartet $P$ term would need $L = 1$, which is impossible with three parallel spins in a $p$ subshell.`,
  },
  {
    id: 'at-moseley',
    stem: t`Moseley's law treats an L-shell electron that drops into a K-shell vacancy as a Bohr atom whose nuclear charge is screened by the one remaining K electron. Use it to estimate the energy of the $K_\alpha$ x-ray line of copper ($Z = 29$).`,
    choices: [t`$0.29\unit{keV}$`, t`$1.5\unit{keV}$`, t`$8.0\unit{keV}$`, t`$10.7\unit{keV}$`, t`$32\unit{keV}$`],
    answer: 'C',
    solution: t`Key idea: An electron dropping from $n = 2$ to $n = 1$ sees the nuclear charge $Ze$ partly screened by the one electron left in the K shell, so it sees an effective charge of about $(Z - 1)e$. The Bohr formula then gives

$$E_{K_\alpha}\approx 13.6\unit{eV}\,(Z - 1)^2\left(\frac{1}{1^2} - \frac{1}{2^2}\right) = 10.2\unit{eV}\,(Z - 1)^2$$

For copper:

$$E_{K_\alpha}\approx 10.2\unit{eV}\times28^2\approx 8.0\unit{keV}$$

The measured value is $8.05\unit{keV}$.

Trap: $10.7\unit{keV}$ leaves out the factor $\left(1 - \tfrac14\right)$. $0.29\unit{keV}$ forgets to square $(Z - 1)$.`,
  },
  {
    id: 'at-photoelectric',
    stem: t`Light of wavelength $400\unit{nm}$ shines on a metal whose work function is $2.3\unit{eV}$. What stopping potential is needed to stop all of the emitted photoelectrons?`,
    choices: [t`$0.8\unit{V}$`, t`$1.6\unit{V}$`, t`$2.3\unit{V}$`, t`$3.1\unit{V}$`, t`$5.4\unit{V}$`],
    answer: 'A',
    solution: t`Key idea: Each photon gives all of its energy to one electron. The fastest electrons leave with kinetic energy $K_{\max} = hf - \phi$.

The photon energy, using $hc = 1240\unit{eV\cdot nm}$, is

$$E = \frac{hc}{\lambda} = \frac{1240\unit{eV\cdot nm}}{400\unit{nm}} = 3.1\unit{eV}$$

$$K_{\max} = 3.1 - 2.3 = 0.8\unit{eV} \quad\Rightarrow\quad V_s = 0.8\unit{V}$$

Trap: $3.1\unit{V}$ is the photon energy itself. $5.4\unit{V}$ adds the work function instead of subtracting it.`,
  },
  {
    id: 'at-compton',
    stem: t`X-rays of wavelength $0.0500\unit{nm}$ scatter from free electrons at rest. What is the wavelength of the x-rays scattered straight back, through $180^\circ$? (The Compton wavelength of the electron is $h/m_ec = 0.00243\unit{nm}$.)`,
    choices: [t`$0.0476\unit{nm}$`, t`$0.0500\unit{nm}$`, t`$0.0512\unit{nm}$`, t`$0.0524\unit{nm}$`, t`$0.0549\unit{nm}$`],
    answer: 'E',
    solution: t`Key idea: Compton's formula for the wavelength shift is

$$\Delta\lambda = \frac{h}{m_ec}(1 - \cos\theta)$$

At $\theta = 180^\circ$, $1 - \cos\theta = 2$, the largest possible shift:

$$\lambda' = 0.0500 + 2(0.00243) = 0.0549\unit{nm}$$

Trap: $0.0524\unit{nm}$ is the result at $90^\circ$. $0.0476\unit{nm}$ has the wrong sign: the photon gives energy to the electron, so its wavelength gets longer, never shorter.`,
  },
];
