import * as F from '../figs.mjs';
const t = String.raw;

export default [
  {
    id: 'qm-sudden-expansion',
    fig: F.wellExpand(),
    stem: t`A particle is in the ground state of a one-dimensional infinite square well with walls at $x = 0$ and $x = L$. The right wall is suddenly moved to $x = 2L$, so quickly that the wave function has no time to change, as shown above. What is the probability that an energy measurement made right afterward finds the particle in the ground state of the new, wider well?`,
    choices: [t`$\dfrac14$`, t`$\dfrac{32}{9\pi^2}$`, t`$\dfrac12$`, t`$\dfrac{4\sqrt2}{3\pi}$`, t`$\dfrac{8}{\pi^2}$`],
    answer: 'B',
    solution: t`Key idea: The probability is $|\langle\phi_1|\psi\rangle|^2$, where $\psi$ is the old ground state and $\phi_1$ is the ground state of the new well:

$$\psi(x) = \sqrt{\frac2L}\,\sin\frac{\pi x}{L}\ \ (0\le x\le L), \qquad \phi_1(x) = \sqrt{\frac1L}\,\sin\frac{\pi x}{2L}\ \ (0\le x\le 2L)$$

Since $\psi = 0$ for $x > L$, the overlap integral runs only from $0$ to $L$:

$$\langle\phi_1|\psi\rangle = \frac{\sqrt2}{L}\int_0^L \sin\frac{\pi x}{L}\,\sin\frac{\pi x}{2L}\,dx = \frac{\sqrt2}{L}\cdot\frac{4L}{3\pi} = \frac{4\sqrt2}{3\pi}$$

(Do the integral with $\sin a\,\sin b = \tfrac12[\cos(a - b) - \cos(a + b)]$.)

$$P = \left(\frac{4\sqrt2}{3\pi}\right)^2 = \frac{32}{9\pi^2} \approx 0.36$$

Trap: $4\sqrt2/3\pi\approx0.60$ is the amplitude. The probability is its square.`,
  },
  {
    id: 'qm-3d-oscillator',
    stem: t`A particle moves in the three-dimensional isotropic harmonic oscillator potential $V = \tfrac12 m\omega^2(x^2 + y^2 + z^2)$. Ignoring spin, what is the degeneracy of the energy level $E = \tfrac72\hbar\omega$?`,
    choices: [t`$1$`, t`$3$`, t`$4$`, t`$6$`, t`$10$`],
    answer: 'D',
    solution: t`Key idea: The potential separates into three independent one-dimensional oscillators:

$$E = \left(n_x + n_y + n_z + \tfrac32\right)\hbar\omega$$

$E = \tfrac72\hbar\omega$ needs $n_x + n_y + n_z = 2$. Count the ways:

- one quantum number equal to 2: $(2,0,0)$, $(0,2,0)$, $(0,0,2)$, which is 3 states
- two quantum numbers equal to 1: $(1,1,0)$, $(1,0,1)$, $(0,1,1)$, which is 3 more

The total is 6. In general, the level with $n_x + n_y + n_z = N$ has degeneracy $\tfrac12(N + 1)(N + 2)$.

Trap: 3 counts only the $(2,0,0)$-type states. 10 is the degeneracy of the next level up, $N = 3$.`,
  },
  {
    id: 'qm-commutator',
    stem: t`The position and momentum operators in one dimension satisfy $[\hat x, \hat p] = i\hbar$. What is the commutator $[\hat x, \hat p^{\,2}]$?`,
    choices: [t`$0$`, t`$i\hbar$`, t`$-2i\hbar\,\hat p$`, t`$i\hbar\,\hat p^{\,2}$`, t`$2i\hbar\,\hat p$`],
    answer: 'E',
    solution: t`Key idea: Use the product rule for commutators, $[A, BC] = [A, B]\,C + B\,[A, C]$:

$$[\hat x, \hat p^{\,2}] = [\hat x, \hat p]\,\hat p + \hat p\,[\hat x, \hat p] = i\hbar\,\hat p + i\hbar\,\hat p = 2i\hbar\,\hat p$$

Check: In position space $\hat p = -i\hbar\,\dfrac{d}{dx}$. Acting on a test function $f$:
$$[\hat x, \hat p^{\,2}]f = -\hbar^2\left(xf'' - (xf)''\right) = 2\hbar^2 f' = 2i\hbar\left(-i\hbar f'\right) = 2i\hbar\,\hat p f$$

Note: This commutator is what gives $\dfrac{d\langle x\rangle}{dt} = \dfrac{\langle p\rangle}{m}$, through $\dfrac{d\langle x\rangle}{dt} = \dfrac{i}{\hbar}\langle[\hat H, \hat x]\rangle$.`,
  },
  {
    id: 'qm-spin-sy',
    stem: t`A spin-$\tfrac12$ particle is in the state $|\chi\rangle = \dfrac{1}{\sqrt5}\Big(|{\uparrow}\rangle + 2i\,|{\downarrow}\rangle\Big)$, where $|{\uparrow}\rangle$ and $|{\downarrow}\rangle$ are the eigenstates of $S_z$. What is the expectation value of $S_y$?`,
    choices: [t`$0$`, t`$\dfrac{\hbar}{5}$`, t`$\dfrac{3\hbar}{10}$`, t`$\dfrac{2\hbar}{5}$`, t`$\dfrac{\hbar}{2}$`],
    answer: 'D',
    solution: t`Key idea: Write the state as a column vector and use the Pauli matrix: $S_y = \frac{\hbar}{2}\sigma_y$, with $\sigma_y = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}$.

$$\chi = \frac{1}{\sqrt5}\begin{pmatrix}1\\ 2i\end{pmatrix}, \qquad \sigma_y\chi = \frac{1}{\sqrt5}\begin{pmatrix}(-i)(2i)\\ (i)(1)\end{pmatrix} = \frac{1}{\sqrt5}\begin{pmatrix}2\\ i\end{pmatrix}$$

$$\langle\sigma_y\rangle = \chi^\dagger\sigma_y\chi = \frac15\Big[(1)(2) + (-2i)(i)\Big] = \frac15(2 + 2) = \frac45$$

$$\langle S_y\rangle = \frac{\hbar}{2}\cdot\frac45 = \frac{2\hbar}{5}$$

Check: Here $\langle S_x\rangle = 0$ and $\langle S_z\rangle = \frac{\hbar}{2}\left(\frac15 - \frac45\right) = -\frac{3\hbar}{10}$. For any pure spin-$\frac12$ state, $\langle S_x\rangle^2 + \langle S_y\rangle^2 + \langle S_z\rangle^2 = (\hbar/2)^2$, and indeed $0 + \frac{16}{100}\hbar^2 + \frac{9}{100}\hbar^2 = \frac14\hbar^2$.

Trap: $3\hbar/10$ is the size of $\langle S_z\rangle$, not $\langle S_y\rangle$.`,
  },
  {
    id: 'qm-tunneling',
    stem: t`A particle tunnels through a rectangular barrier that is higher than the particle's energy. The transmission probability is small, about $10^{-4}$. If the width of the barrier is doubled and nothing else changes, the transmission probability becomes about`,
    choices: [t`$10^{-8}$`, t`$10^{-6}$`, t`$2.5\times10^{-5}$`, t`$5\times10^{-5}$`, t`$10^{-4}$`],
    answer: 'A',
    solution: t`Key idea: Inside the barrier the wave function decays as $e^{-\kappa x}$, with $\kappa = \sqrt{2m(V_0 - E)}/\hbar$. For a wide barrier the transmission probability is

$$T \approx C\,e^{-2\kappa a}$$

where $a$ is the width and $C$ is a factor of order 1.

Doubling the width squares the exponential factor:

$$e^{-2\kappa(2a)} = \left(e^{-2\kappa a}\right)^2 \approx \left(10^{-4}\right)^2 = 10^{-8}$$

The order-1 factor $C$ changes this by only a small factor, so the result stays near $10^{-8}$, far below every other choice.

Trap: $5\times10^{-5}$ assumes $T$ is inversely proportional to the width, and $2.5\times10^{-5}$ assumes it falls as the width squared. Tunneling falls off exponentially, which is much faster.`,
  },
  {
    id: 'qm-beat-frequency',
    stem: t`A particle in a one-dimensional infinite square well is in an equal superposition of the ground state (energy $E_1$) and the first excited state. At what angular frequency does the probability density $|\Psi(x, t)|^2$ oscillate?`,
    choices: [t`$E_1/\hbar$`, t`$2E_1/\hbar$`, t`$3E_1/\hbar$`, t`$4E_1/\hbar$`, t`$5E_1/\hbar$`],
    answer: 'C',
    solution: t`Key idea: Each stationary state carries its own phase factor $e^{-iE_nt/\hbar}$. In a box, $E_n = n^2E_1$, so $E_2 = 4E_1$.

$$\Psi = \frac{1}{\sqrt2}\left(\psi_1e^{-iE_1t/\hbar} + \psi_2e^{-iE_2t/\hbar}\right)$$

$$|\Psi|^2 = \frac12\left[\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2\cos\frac{(E_2 - E_1)t}{\hbar}\right]$$

(the $\psi_n$ are real). The density oscillates at

$$\omega = \frac{E_2 - E_1}{\hbar} = \frac{3E_1}{\hbar}$$

Note: Only energy differences show up in measurable quantities. A single stationary state has a probability density that never changes.

Trap: $4E_1/\hbar$ uses $E_2$ alone, and $5E_1/\hbar$ uses the sum $E_1 + E_2$.`,
  },
  {
    id: 'qm-l-angle',
    stem: t`An electron is in a state with orbital angular momentum quantum number $l = 2$. What is the smallest possible angle between its orbital angular momentum vector $\vec L$ and the $z$-axis?`,
    choices: [t`$0^\circ$`, t`$24^\circ$`, t`$35^\circ$`, t`$45^\circ$`, t`$55^\circ$`],
    answer: 'C',
    solution: t`Key idea: The magnitude of $\vec L$ is $\sqrt{l(l + 1)}\,\hbar = \sqrt6\,\hbar$, while its largest $z$-component is $L_z = l\hbar = 2\hbar$.

$$\cos\theta_{\min} = \frac{2\hbar}{\sqrt6\,\hbar} \approx 0.816 \quad\Rightarrow\quad \theta_{\min}\approx 35^\circ$$

Trap: $0^\circ$ would need $L_z = |\vec L|$, which would force $L_x = L_y = 0$ exactly. That is impossible, because the components of $\vec L$ do not commute. $45^\circ$ is the answer for $l = 1$.`,
  },
  {
    id: 'qm-normalize',
    stem: t`The wave function of a particle in one dimension is $\psi(x) = A\,e^{-|x|/a}$, where $a > 0$. What real, positive value of $A$ normalizes $\psi$?`,
    choices: [t`$\dfrac{1}{\sqrt a}$`, t`$\dfrac{1}{\sqrt{2a}}$`, t`$\sqrt{\dfrac2a}$`, t`$\dfrac1a$`, t`$\dfrac{1}{2a}$`],
    answer: 'A',
    solution: t`Key idea: Require $\int_{-\infty}^{\infty}|\psi|^2\,dx = 1$. The function is symmetric, so integrate over $x > 0$ and double:

$$A^2\int_{-\infty}^{\infty}e^{-2|x|/a}\,dx = 2A^2\int_0^{\infty}e^{-2x/a}\,dx = 2A^2\cdot\frac a2 = A^2a = 1$$

$$A = \frac{1}{\sqrt a}$$

Check: $|\psi|^2$ is a probability per unit length, so $A$ must have units of $1/\sqrt{\text{length}}$. That rules out $1/a$ and $1/2a$ at once.

Trap: Integrating over only $x > 0$ gives $\sqrt{2/a}$. Forgetting that squaring doubles the exponent gives $1/\sqrt{2a}$.`,
  },
  {
    id: 'qm-perturb-step',
    fig: F.wellStep(),
    stem: t`A particle is in the ground state of an infinite square well with walls at $x = 0$ and $x = L$. A small perturbation is added: $V' = V_0$ for $0 < x < L/2$ and $V' = 0$ for $L/2 < x < L$, as shown above. To first order in $V_0$, by how much does the ground-state energy change?`,
    choices: [t`$0$`, t`$\dfrac{V_0}{4}$`, t`$\dfrac{V_0}{2}$`, t`$V_0$`, t`$2V_0$`],
    answer: 'C',
    solution: t`Key idea: In first-order perturbation theory, the energy shift is the expectation value of the perturbation in the unperturbed state:

$$\Delta E = \langle\psi_1|V'|\psi_1\rangle = V_0\int_0^{L/2}|\psi_1|^2\,dx$$

The probability density $|\psi_1|^2$ is symmetric about the center of the well, so exactly half of the probability lies in the left half:

$$\Delta E = \frac{V_0}{2}$$

Note: The same symmetry argument gives a first-order shift of $V_0/2$ for every level $n$.`,
  },
];
