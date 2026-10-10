import * as F from '../figs.mjs';
const t = String.raw;

export const sr = [
  {
    id: 'sr-muon',
    stem: t`Muons have a mean lifetime of $2.2\unit{\mu s}$ in their rest frame. A beam of muons moves through the laboratory at speed $0.99c$. On average, how far does a muon travel in the laboratory before it decays?`,
    choices: [t`$93\unit{m}$`, t`$650\unit{m}$`, t`$4.6\unit{km}$`, t`$6.5\unit{km}$`, t`$65\unit{km}$`],
    answer: 'C',
    solution: t`Key idea: In the lab the muon's clock runs slow, so its average lifetime is stretched to $\gamma\tau$.

$$\gamma = \frac{1}{\sqrt{1 - 0.99^2}} = \frac{1}{\sqrt{0.0199}}\approx 7.1$$

$$d = v\gamma\tau = (0.99)(3.0\times10^8\unit{m/s})(7.1)(2.2\times10^{-6}\unit{s})\approx 4.6\unit{km}$$

Check: In the muon's own frame it lives only $2.2\unit{\mu s}$, but the lab is shortened by $\gamma$. The muon sees $650\unit{m}$ of contracted lab pass by, which is $4.6\unit{km}$ of lab length.

Trap: $650\unit{m}$ ignores time dilation. $6.5\unit{km}$ comes from $\gamma = 1/\sqrt{1 - 0.99}$, forgetting to square $v/c$.`,
  },
  {
    id: 'sr-momentum',
    stem: t`A particle has rest energy $0.50\unit{MeV}$ and total energy $1.30\unit{MeV}$. What is the magnitude of its momentum?`,
    choices: [t`$0.80\unit{MeV}/c$`, t`$1.0\unit{MeV}/c$`, t`$1.2\unit{MeV}/c$`, t`$1.3\unit{MeV}/c$`, t`$1.8\unit{MeV}/c$`],
    answer: 'C',
    solution: t`Key idea: Use the energy–momentum relation

$$E^2 = (pc)^2 + (mc^2)^2$$

$$pc = \sqrt{(1.30)^2 - (0.50)^2}\unit{MeV} = \sqrt{1.69 - 0.25}\unit{MeV} = \sqrt{1.44}\unit{MeV} = 1.2\unit{MeV}$$

so $p = 1.2\unit{MeV}/c$.

Trap: $0.80\unit{MeV}/c$ uses the kinetic energy, $E - mc^2$, as if it were $pc$.`,
  },
  {
    id: 'sr-velocity-add',
    stem: t`Two spaceships move toward each other along a straight line. As measured from Earth, each has speed $0.60c$. What is the speed of one ship as measured by an observer on the other?`,
    choices: [t`$0.60c$`, t`$0.75c$`, t`$0.80c$`, t`$0.88c$`, t`$1.20c$`],
    answer: 'D',
    solution: t`Key idea: Velocities do not simply add in relativity. In one ship's frame, Earth moves at $0.60c$, and the other ship moves at $0.60c$ relative to Earth in the same direction. Combine them with

$$u' = \frac{u + v}{1 + uv/c^2} = \frac{0.60c + 0.60c}{1 + 0.36} = \frac{1.20c}{1.36}\approx 0.88c$$

Trap: $1.20c$ is the everyday (Galilean) sum, which is faster than light. Observers on Earth do see the gap between the ships shrink at $1.20c$, but that closing rate is not the speed of any single object.`,
  },
  {
    id: 'sr-doppler',
    stem: t`A distant source emits light of frequency $f_0$ in its own rest frame. The source moves directly away from an observer at speed $0.60c$. What frequency does the observer measure?`,
    choices: [t`$0.40\,f_0$`, t`$0.50\,f_0$`, t`$0.63\,f_0$`, t`$0.80\,f_0$`, t`$2.0\,f_0$`],
    answer: 'B',
    solution: t`Key idea: The relativistic Doppler formula for a source moving straight away, with $\beta = v/c$, is

$$f = f_0\sqrt{\frac{1 - \beta}{1 + \beta}} = f_0\sqrt{\frac{0.40}{1.60}} = \frac{f_0}{2}$$

Where it comes from: the source's clock runs slow by $\gamma = 1.25$, and the source moves away during each period, which spreads the crests apart by a factor $(1 + \beta)$:

$$f = \frac{f_0}{\gamma(1 + \beta)} = \frac{f_0}{1.25\times1.60} = 0.50\,f_0$$

Trap: $0.63f_0 = f_0/(1 + \beta)$ is the non-relativistic result, which misses time dilation. $0.80f_0 = f_0/\gamma$ includes only time dilation.`,
  },
];

export const lab = [
  {
    id: 'lab-counting',
    stem: t`A radioactive source gives about 25 counts per second in a detector, and the background is negligible. For how long must counts be collected so that the statistical uncertainty in the measured count rate is 1 percent?`,
    choices: [t`$4\unit{s}$`, t`$40\unit{s}$`, t`$400\unit{s}$`, t`$4000\unit{s}$`, t`$40{,}000\unit{s}$`],
    answer: 'C',
    solution: t`Key idea: Radioactive counts follow Poisson statistics. If you record $N$ counts, the uncertainty is $\sqrt N$, so the fractional uncertainty is

$$\frac{\sqrt N}{N} = \frac{1}{\sqrt N}$$

For 1 percent, $1/\sqrt N = 0.01$, so $N = 10^4$ counts.

$$t = \frac{10^4\ \text{counts}}{25\ \text{counts/s}} = 400\unit{s}$$

Trap: $4\unit{s}$ gives 100 counts and a 10 percent uncertainty. To make the uncertainty 10 times smaller you need 100 times as many counts.`,
  },
  {
    id: 'lab-propagation',
    stem: t`The acceleration due to gravity is measured with a simple pendulum, using $g = 4\pi^2L/T^2$. The length $L$ is known to 1 percent and the period $T$ to 1 percent. The two errors are random and independent. What is the percent uncertainty in $g$?`,
    choices: [t`$1\%$`, t`$1.4\%$`, t`$2\%$`, t`$2.2\%$`, t`$3\%$`],
    answer: 'D',
    solution: t`Key idea: For a product of powers, here $g\propto L^{1}T^{-2}$, each fractional error is multiplied by the size of its power. Independent random errors then add in quadrature:

$$\frac{\delta g}{g} = \sqrt{\left(1\cdot\frac{\delta L}{L}\right)^2 + \left(2\cdot\frac{\delta T}{T}\right)^2} = \sqrt{(1\%)^2 + (2\%)^2} = \sqrt5\,\%\approx 2.2\%$$

Trap: $3\%$ adds the errors directly. That is a worst case, too pessimistic for independent errors. $1.4\%$ forgets that $T$ is squared.`,
  },
  {
    id: 'lab-op-amp',
    fig: F.opAmp(),
    stem: t`In the ideal operational-amplifier circuit shown above, $R_1 = 10\unit{k\Omega}$ and $R_f = 100\unit{k\Omega}$. What is the voltage gain $V_{\text{out}}/V_{\text{in}}$?`,
    choices: [t`$-11$`, t`$-10$`, t`$-0.1$`, t`$+10$`, t`$+11$`],
    answer: 'B',
    solution: t`Key idea: Two rules hold for an ideal op-amp with negative feedback:

- The output adjusts until the two inputs are at the same voltage. The $+$ input is grounded, so the $-$ input sits at $0\unit{V}$. This is called a virtual ground.
- The inputs draw no current.

So the current through $R_1$, which is $V_{\text{in}}/R_1$, must all continue through $R_f$:

$$\frac{V_{\text{in}} - 0}{R_1} = \frac{0 - V_{\text{out}}}{R_f} \quad\Rightarrow\quad \frac{V_{\text{out}}}{V_{\text{in}}} = -\frac{R_f}{R_1} = -10$$

Trap: $+11 = 1 + R_f/R_1$ is the gain of the non-inverting amplifier, in which the input goes to the $+$ terminal.`,
  },
  {
    id: 'lab-semilog',
    fig: F.semilog(),
    stem: t`The activity of a radioactive sample is measured over time and plotted on semilogarithmic axes, as shown above. What is the half-life of the sample?`,
    choices: [t`$1.0\unit{h}$`, t`$2.0\unit{h}$`, t`$2.9\unit{h}$`, t`$4.0\unit{h}$`, t`$6.0\unit{h}$`],
    answer: 'B',
    solution: t`Key idea: Exponential decay, $A = A_0e^{-t/\tau}$, is a straight line on a semilog plot. Read two points far apart on the line.

The line falls from about $8000$ counts/min at $t = 0$ to $1000$ counts/min at $t = 6\unit{h}$. That is a factor of $8 = 2^3$, so three half-lives take $6\unit{h}$:

$$t_{1/2} = 2.0\unit{h}$$

Check: Between $6\unit{h}$ and $10\unit{h}$ the line falls from $1000$ to $250$, a factor of 4, which is two more half-lives.

Trap: $2.9\unit{h}$ is the mean lifetime, $\tau = t_{1/2}/\ln2$. $6.0\unit{h}$ is the time for the activity to drop by a factor of 8.`,
  },
];

export const spec = [
  {
    id: 'sp-decay-chain',
    stem: t`Uranium-238 ($ {}^{238}_{\phantom{2}92}\mathrm{U}$) decays through a series of $\alpha$ and $\beta^-$ decays to the stable isotope lead-206 ($ {}^{206}_{\phantom{2}82}\mathrm{Pb}$). How many $\alpha$ decays and how many $\beta^-$ decays occur in the series?`,
    choices: [t`$6\ \alpha$ and $8\ \beta^-$`, t`$8\ \alpha$ and $4\ \beta^-$`, t`$8\ \alpha$ and $10\ \beta^-$`, t`$10\ \alpha$ and $6\ \beta^-$`, t`$8\ \alpha$ and $6\ \beta^-$`],
    answer: 'E',
    solution: t`Key idea: Only $\alpha$ decay changes the mass number $A$. Each $\alpha$ removes 4 nucleons (2 protons and 2 neutrons). Each $\beta^-$ turns a neutron into a proton, raising $Z$ by 1 and leaving $A$ alone.

Mass number: $238 - 206 = 32$, so there are $32/4 = 8$ alpha decays.

Atomic number: 8 alpha decays lower $Z$ by 16, from 92 to 76. Lead has $Z = 82$, so $82 - 76 = 6$ beta decays are needed.`,
  },
  {
    id: 'sp-conservation',
    stem: t`Which of the following processes is forbidden by a conservation law?`,
    choices: [
      t`$n\to p + e^- + \bar\nu_e$`,
      t`$\pi^+\to\mu^+ + \nu_\mu$`,
      t`$\mu^-\to e^- + \bar\nu_e + \nu_\mu$`,
      t`$p\to e^+ + \gamma$`,
      t`$\pi^0\to\gamma + \gamma$`,
    ],
    answer: 'D',
    solution: t`Key idea: Check charge, baryon number $B$, and each lepton family number ($L_e$ and $L_\mu$).

- $n\to p + e^- + \bar\nu_e$: $B$ goes $1\to1$, and $L_e$ goes $0\to 1 - 1 = 0$. Allowed (neutron beta decay).
- $\pi^+\to\mu^+ + \nu_\mu$: $L_\mu$ goes $0\to -1 + 1 = 0$. Allowed (the usual decay of a charged pion).
- $\mu^-\to e^- + \bar\nu_e + \nu_\mu$: $L_\mu$ goes $1\to1$, and $L_e$ goes $0\to 1 - 1 = 0$. Allowed (ordinary muon decay).
- $p\to e^+ + \gamma$: charge and energy are fine, but $B$ goes from 1 to 0 (and $L_e$ from 0 to $-1$). Forbidden.
- $\pi^0\to\gamma + \gamma$: allowed; it is the main decay of the neutral pion.

Note: Experiments have never seen a proton decay. For the most sensitive decay modes, such as $p\to e^+ + \pi^0$, the lifetime is longer than about $10^{34}$ years.`,
  },
  {
    id: 'sp-fermi',
    stem: t`In the free-electron model of a metal, the Fermi energy depends on the number density $n$ of conduction electrons. If $n$ is doubled, the Fermi energy is multiplied by about`,
    choices: [t`$1.26$`, t`$1.41$`, t`$1.59$`, t`$2.00$`, t`$2.83$`],
    answer: 'C',
    solution: t`Key idea: At zero temperature the electrons fill a sphere in $k$-space. The number of states inside grows as $k_F^3$, so $n\propto k_F^3$, while $E_F = \hbar^2k_F^2/2m$. Together:

$$E_F = \frac{\hbar^2}{2m}\left(3\pi^2n\right)^{2/3}\propto n^{2/3}$$

$$2^{2/3}\approx 1.59$$

Trap: $1.26 = 2^{1/3}$ is how $k_F$ changes. $2.83 = 2^{3/2}$ inverts the exponent.`,
  },
  {
    id: 'sp-doping',
    stem: t`A small amount of phosphorus (group V) is added to pure silicon (group IV). Which of the following best describes the result?`,
    choices: [
      t`An $n$-type semiconductor, with donor levels just below the conduction band`,
      t`An $n$-type semiconductor, with acceptor levels just above the valence band`,
      t`A $p$-type semiconductor, with donor levels just below the conduction band`,
      t`A $p$-type semiconductor, with acceptor levels just above the valence band`,
      t`An insulator, because the band gap becomes larger`,
    ],
    answer: 'A',
    solution: t`Key idea: Phosphorus has five valence electrons. Four of them form bonds with neighboring silicon atoms. The fifth is only weakly bound (about $0.045\unit{eV}$), so its energy level sits just below the conduction band.

At room temperature, thermal energy easily lifts these electrons into the conduction band. The impurity donates electrons, and the main charge carriers are negative: an $n$-type semiconductor.

Note: Group III atoms such as boron do the opposite. They accept electrons from the valence band and leave holes behind, which makes a $p$-type semiconductor with acceptor levels just above the valence band.`,
  },
  {
    id: 'sp-hubble',
    stem: t`The spectral lines of a distant galaxy are redshifted by $z = \Delta\lambda/\lambda = 0.050$. Taking the Hubble constant to be $70\unit{km/s}$ per megaparsec, about how far away is the galaxy?`,
    choices: [t`$3.5\unit{Mpc}$`, t`$21\unit{Mpc}$`, t`$110\unit{Mpc}$`, t`$210\unit{Mpc}$`, t`$430\unit{Mpc}$`],
    answer: 'D',
    solution: t`Key idea: For a small redshift the galaxy's recession speed is $v\approx cz$, and Hubble's law says $v = H_0d$.

$$v\approx(3.0\times10^5\unit{km/s})(0.050) = 1.5\times10^4\unit{km/s}$$

$$d = \frac{v}{H_0} = \frac{1.5\times10^4\unit{km/s}}{70\unit{km/s}\ \text{per Mpc}}\approx 210\unit{Mpc}$$

Note: $1\unit{Mpc}$ is about 3.3 million light-years, so this galaxy is roughly 700 million light-years away.`,
  },
  {
    id: 'sp-eigenvalues',
    stem: t`What are the eigenvalues of the matrix $\begin{pmatrix} 2 & i \\ -i & 2 \end{pmatrix}$?`,
    choices: [t`$1$ and $3$`, t`$0$ and $4$`, t`$2$ and $2$`, t`$2 + i$ and $2 - i$`, t`$-1$ and $5$`],
    answer: 'A',
    solution: t`Key idea: Solve $\det(M - \lambda I) = 0$:

$$(2 - \lambda)^2 - (i)(-i) = (2 - \lambda)^2 - 1 = 0 \quad\Rightarrow\quad \lambda = 1\ \text{or}\ 3$$

(Note that $(i)(-i) = -i^2 = 1$.)

Check: The matrix is Hermitian (it equals its own conjugate transpose), so its eigenvalues must be real, which rules out $2\pm i$. The eigenvalues must also add up to the trace, 4, and multiply to the determinant, $4 - 1 = 3$. Only $1$ and $3$ do both.`,
  },
];
