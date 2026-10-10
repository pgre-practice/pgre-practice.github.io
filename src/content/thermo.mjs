import * as F from '../figs.mjs';
const t = String.raw;

export default [
  {
    id: 'th-carnot',
    stem: t`A Carnot engine works between reservoirs at $500\unit{K}$ and $300\unit{K}$ and does $400\unit{J}$ of work in each cycle. How much heat does it release to the cold reservoir in each cycle?`,
    choices: [t`$240\unit{J}$`, t`$400\unit{J}$`, t`$600\unit{J}$`, t`$667\unit{J}$`, t`$1000\unit{J}$`],
    answer: 'C',
    solution: t`Key idea: A Carnot engine has the largest possible efficiency,

$$\eta = 1 - \frac{T_C}{T_H} = 1 - \frac{300}{500} = 0.40$$

The heat taken in is $Q_H = W/\eta = 400/0.40 = 1000\unit{J}$. Energy conservation then gives the heat released:

$$Q_C = Q_H - W = 1000 - 400 = 600\unit{J}$$

Check: For a Carnot cycle, $Q_C/Q_H = T_C/T_H = 0.6$, and $0.6\times1000\unit{J} = 600\unit{J}$.

Trap: $1000\unit{J}$ is the heat taken from the hot reservoir, not the heat released.`,
  },
  {
    id: 'th-pv-cycle',
    fig: F.pvTriangle(),
    stem: t`An ideal gas is taken around the cycle $A\to B\to C\to A$ shown in the $P$–$V$ diagram above. What is the net work done by the gas in one cycle?`,
    choices: [t`$-4P_0V_0$`, t`$-2P_0V_0$`, t`$0$`, t`$2P_0V_0$`, t`$4P_0V_0$`],
    answer: 'B',
    solution: t`Key idea: The net work done by the gas in a cycle equals the area enclosed on the $P$–$V$ diagram. It is positive if the cycle runs clockwise and negative if it runs counterclockwise.

The triangle's area is $\tfrac12(2V_0)(2P_0) = 2P_0V_0$.

The path goes right along the bottom ($A\to B$), up and to the left ($B\to C$), then straight down ($C\to A$). That is counterclockwise, so the net work done by the gas is $-2P_0V_0$. Net work is done on the gas.

Check: Leg by leg:
- $A\to B$: $W = P_0(3V_0 - V_0) = +2P_0V_0$
- $B\to C$: the average pressure is $2P_0$ and $\Delta V = -2V_0$, so $W = -4P_0V_0$
- $C\to A$: no change in volume, so $W = 0$
The total is $-2P_0V_0$.`,
  },
  {
    id: 'th-adiabatic',
    stem: t`A monatomic ideal gas is compressed slowly and adiabatically to $\tfrac18$ of its original volume. By what factor does its absolute temperature increase?`,
    choices: [t`$2$`, t`$4$`, t`$8$`, t`$16$`, t`$32$`],
    answer: 'B',
    solution: t`Key idea: In a slow (reversible) adiabatic process, $TV^{\gamma - 1}$ stays constant. A monatomic ideal gas has $\gamma = \tfrac53$, so $\gamma - 1 = \tfrac23$.

$$\frac{T_f}{T_i} = \left(\frac{V_i}{V_f}\right)^{2/3} = 8^{2/3} = 4$$

Trap: $32 = 8^{5/3}$ is the factor by which the pressure rises ($PV^\gamma$ is constant). $2 = 8^{1/3}$ would apply to a gas with $\gamma = \tfrac43$.`,
  },
  {
    id: 'th-free-expansion',
    stem: t`An ideal gas of $n$ moles fills a volume $V$ in one part of a rigid, thermally insulated container. The rest of the container, of volume $2V$, is empty. A partition breaks, and the gas expands freely to fill the whole container. What is the change in the entropy of the gas?`,
    choices: [t`$0$`, t`$nR\ln\tfrac32$`, t`$nR\ln 2$`, t`$nR$`, t`$nR\ln 3$`],
    answer: 'E',
    solution: t`Key idea: In a free expansion no heat flows ($Q = 0$) and the gas does no work, so its internal energy is unchanged. For an ideal gas that means the temperature is unchanged too.

The process is irreversible, so $\Delta S = Q/T$ does not apply along the actual path. But entropy is a state function, so we may compute $\Delta S$ along any reversible path between the same two states. Use a reversible isothermal expansion from $V$ to $3V$:

$$\Delta S = \int\frac{dQ_{\text{rev}}}{T} = nR\ln\frac{V_f}{V_i} = nR\ln 3$$

Trap: $0$ uses $\Delta S = Q/T$ with $Q = 0$, but that formula holds only for reversible processes. $nR\ln 2$ uses the ratio of the empty volume to the starting volume instead of $V_f/V_i = 3$.`,
  },
  {
    id: 'th-cp-diatomic',
    stem: t`At room temperature, what is the molar heat capacity at constant pressure, $C_P$, of nitrogen gas ($\mathrm{N_2}$) treated as an ideal gas?`,
    choices: [t`$\tfrac32R$`, t`$\tfrac52R$`, t`$3R$`, t`$\tfrac72R$`, t`$\tfrac92R$`],
    answer: 'D',
    solution: t`Key idea: By equipartition, each active quadratic degree of freedom adds $\tfrac12R$ to the molar heat capacity at constant volume.

A diatomic molecule at room temperature has 3 translational and 2 rotational degrees of freedom. Vibration is frozen out, because its energy spacing is much larger than $kT$. So

$$C_V = \tfrac52R, \qquad C_P = C_V + R = \tfrac72R$$

Trap: $\tfrac52R$ is $C_V$. $\tfrac92R$ would include vibration, which becomes active only at much higher temperatures (thousands of kelvin for $\mathrm{N_2}$).`,
  },
  {
    id: 'th-two-level',
    stem: t`A system has two nondegenerate energy levels, $0$ and $\varepsilon$, and is in thermal equilibrium at temperature $T$. What is its average energy?`,
    choices: [t`$\dfrac{\varepsilon}{e^{\varepsilon/kT} + 1}$`, t`$\dfrac{\varepsilon}{e^{\varepsilon/kT} - 1}$`, t`$\varepsilon\,e^{-\varepsilon/kT}$`, t`$\dfrac{\varepsilon}{2}$`, t`$kT$`],
    answer: 'A',
    solution: t`Key idea: Use Boltzmann statistics. The partition function is $Z = 1 + e^{-\varepsilon/kT}$, and a level of energy $E$ is occupied with probability $e^{-E/kT}/Z$.

$$\langle E\rangle = \frac{0\cdot1 + \varepsilon\,e^{-\varepsilon/kT}}{1 + e^{-\varepsilon/kT}} = \frac{\varepsilon}{e^{\varepsilon/kT} + 1}$$

Check: As $T\to0$, $\langle E\rangle\to0$ (only the ground level is occupied). As $T\to\infty$, $\langle E\rangle\to\varepsilon/2$ (both levels equally likely).

Trap: $\varepsilon/(e^{\varepsilon/kT} - 1)$ is Planck's result for a harmonic oscillator, which has infinitely many evenly spaced levels. $\varepsilon e^{-\varepsilon/kT}$ is only the low-temperature limit.`,
  },
  {
    id: 'th-blackbody',
    stem: t`The absolute temperature of a blackbody is doubled. By what factors do the total power it radiates and the wavelength at which its spectrum peaks change?`,
    choices: [
      t`Power $\times\,2$; peak wavelength $\times\,\tfrac12$`,
      t`Power $\times\,4$; peak wavelength $\times\,\tfrac12$`,
      t`Power $\times\,16$; peak wavelength $\times\,2$`,
      t`Power $\times\,16$; peak wavelength $\times\,\tfrac1{16}$`,
      t`Power $\times\,16$; peak wavelength $\times\,\tfrac12$`,
    ],
    answer: 'E',
    solution: t`Key idea: Two blackbody laws apply.

- Stefan–Boltzmann law: $P = \sigma AT^4$, so doubling $T$ multiplies the power by $2^4 = 16$.
- Wien's displacement law: $\lambda_{\max}T = 2.90\times10^{-3}\unit{m\cdot K}$, so doubling $T$ halves the peak wavelength.

Note: This is why hotter stars look bluer, and why they are far brighter than cooler stars of the same size.`,
  },
];
