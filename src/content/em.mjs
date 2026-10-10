import * as F from '../figs.mjs';
const t = String.raw;

export const groups = {
  rc: {
    intro: t`Questions {range} refer to the circuit below. The switch S has been open for a long time, and the capacitor is uncharged. The switch is closed at time $t = 0$.`,
    fig: F.rcCircuit(),
  },
};

export default [
  {
    id: 'em-gauss-nonuniform',
    stem: t`A nonconducting solid sphere of radius $R$ has a charge density that grows linearly with distance from the center: $\rho(r) = \rho_0\,r/R$ for $r \le R$. What is the magnitude of the electric field at a distance $r < R$ from the center?`,
    choices: [t`$\dfrac{\rho_0 r}{3\varepsilon_0}$`, t`$\dfrac{\rho_0 r^2}{4\varepsilon_0 R}$`, t`$\dfrac{\rho_0 r^2}{3\varepsilon_0 R}$`, t`$\dfrac{\rho_0 r^3}{4\varepsilon_0 R^2}$`, t`$\dfrac{\rho_0 R^3}{4\varepsilon_0 r^2}$`],
    answer: 'B',
    solution: t`Key idea: Use Gauss's law with a sphere of radius $r$. By symmetry the field points radially and has the same size everywhere on that sphere.

Charge inside radius $r$:

$$Q_{\text{enc}} = \int_0^r \rho_0\frac{r'}{R}\,4\pi r'^2\,dr' = \frac{\pi\rho_0 r^4}{R}$$

Gauss's law:

$$E\cdot 4\pi r^2 = \frac{Q_{\text{enc}}}{\varepsilon_0} \quad\Rightarrow\quad E = \frac{\rho_0 r^2}{4\varepsilon_0 R}$$

Trap: $\rho_0 r/3\varepsilon_0$ is the answer for a uniform density $\rho_0$. The last choice is the field outside the sphere.`,
  },
  {
    id: 'em-shell-graph',
    fig: F.shell(),
    stem: t`A point charge $+q$ sits at the center of an uncharged, thick conducting spherical shell with inner radius $a$ and outer radius $b$, as shown above. Which graph best shows the magnitude $E$ of the electric field as a function of the distance $r$ from the center?`,
    choices: [F.shellGraph('bare'), F.shellGraph('shield'), F.shellGraph('cavity'), F.shellGraph('right'), F.shellGraph('const')],
    answer: 'D',
    solution: t`Key idea: In electrostatic equilibrium the field inside the metal is zero. The charge $+q$ pulls $-q$ onto the inner surface ($r = a$). The shell is neutral, so $+q$ is left on the outer surface ($r = b$).

- $r < a$: only $+q$ is enclosed, so $E = \dfrac{q}{4\pi\varepsilon_0 r^2}$.
- $a < r < b$: inside the metal, $E = 0$.
- $r > b$: the enclosed charge is $q - q + q = q$, so $E = \dfrac{q}{4\pi\varepsilon_0 r^2}$ again: the same curve as with no shell at all.

Trap: A neutral conducting shell does not shield the outside from a charge placed inside it. (It does shield the inside from charges outside.)`,
  },
  {
    id: 'em-image-charge',
    stem: t`A point charge $q$ is held a distance $d$ above a large, flat, grounded conducting plane. What is the magnitude of the force that the plane exerts on the charge?`,
    choices: [t`$\dfrac{q^2}{16\pi\varepsilon_0 d^2}$`, t`$\dfrac{q^2}{8\pi\varepsilon_0 d^2}$`, t`$\dfrac{q^2}{4\pi\varepsilon_0 d^2}$`, t`$\dfrac{q^2}{2\pi\varepsilon_0 d^2}$`, t`$\dfrac{q^2}{\pi\varepsilon_0 d^2}$`],
    answer: 'A',
    solution: t`Key idea: Method of images. Above the plane, the charge induced on the plane makes the same field as an image charge $-q$ placed a distance $d$ below the plane.

The real charge and its image are $2d$ apart, so the force is

$$F = \frac{1}{4\pi\varepsilon_0}\,\frac{q^2}{(2d)^2} = \frac{q^2}{16\pi\varepsilon_0 d^2}$$

and it pulls the charge toward the plane.

Trap: Using the distance to the plane, $d$, instead of the distance to the image, $2d$, gives $q^2/4\pi\varepsilon_0 d^2$.`,
  },
  {
    id: 'em-dielectric-slab',
    fig: F.capSlab(),
    stem: t`An isolated parallel-plate capacitor with plate separation $d$ holds charge $Q$ and stores energy $U_0$; the space between the plates is empty. A slab with dielectric constant $\kappa = 3$, thickness $d/2$, and the same area as the plates is then slid in against one plate, as shown above. The charge on the plates does not change. What is the stored energy now?`,
    choices: [t`$\dfrac{U_0}{3}$`, t`$\dfrac{U_0}{2}$`, t`$\dfrac{2U_0}{3}$`, t`$U_0$`, t`$\dfrac{3U_0}{2}$`],
    answer: 'C',
    solution: t`Key idea: The capacitor now acts like two capacitors in series: a gap of thickness $d/2$ filled with dielectric, and an empty gap of thickness $d/2$.

Let $C_0 = \varepsilon_0A/d$. Then

$$C_{\text{empty}} = \frac{\varepsilon_0A}{d/2} = 2C_0, \qquad C_{\text{slab}} = \frac{\kappa\varepsilon_0A}{d/2} = 6C_0$$

$$\frac1C = \frac{1}{2C_0} + \frac{1}{6C_0} = \frac{4}{6C_0} \quad\Rightarrow\quad C = \tfrac32 C_0$$

With $Q$ fixed, $U = \dfrac{Q^2}{2C}$, so

$$U = U_0\,\frac{C_0}{C} = \tfrac23\,U_0$$

Trap: $U_0/3$ assumes the slab fills the whole gap. $3U_0/2$ would be right if a battery held the voltage fixed, because then $U = \tfrac12 CV^2$ grows with $C$.`,
  },
  {
    id: 'em-rc-initial',
    group: 'rc',
    stem: t`What is the current through the battery immediately after the switch is closed?`,
    choices: [t`$0$`, t`$\dfrac{\varepsilon}{R_2}$`, t`$\dfrac{\varepsilon}{R_1 + R_2}$`, t`$\dfrac{\varepsilon(R_1 + R_2)}{R_1R_2}$`, t`$\dfrac{\varepsilon}{R_1}$`],
    answer: 'E',
    solution: t`Key idea: An uncharged capacitor has no voltage across it. Just after the switch closes, its charge has had no time to change, so it acts like a plain wire.

That wire is in parallel with $R_2$, so it shorts $R_2$ out: there is no voltage across $R_2$ and no current through it. Only $R_1$ limits the current:

$$I(0^+) = \frac{\varepsilon}{R_1}$$

Trap: $\varepsilon/(R_1 + R_2)$ is the current long after the switch closes, when the capacitor is fully charged and carries no current.`,
  },
  {
    id: 'em-rc-tau',
    group: 'rc',
    stem: t`What is the time constant for the charging of the capacitor?`,
    choices: [t`$R_1C$`, t`$R_2C$`, t`$(R_1 + R_2)\,C$`, t`$\dfrac{R_1R_2}{R_1 + R_2}\,C$`, t`$\dfrac{(R_1 + R_2)\,C}{2}$`],
    answer: 'D',
    solution: t`Key idea: The time constant is $RC$, where $R$ is the resistance seen from the capacitor's terminals when the ideal battery is replaced by a wire.

Looking in from the capacitor's two terminals, $R_2$ connects them directly, and $R_1$ connects them through the (now shorted) battery. So the two resistors are in parallel:

$$\tau = \frac{R_1R_2}{R_1 + R_2}\,C$$

Check: Solving Kirchhoff's rules directly gives
$$V_C(t) = \frac{R_2}{R_1 + R_2}\,\varepsilon\left(1 - e^{-t/\tau}\right)$$
with the same $\tau$. Removing $R_2$ (letting $R_2 \to \infty$) gives the familiar $R_1C$.`,
  },
  {
    id: 'em-kirchhoff',
    fig: F.twoBattery(),
    stem: t`In the circuit shown above, the batteries are ideal, and each has its positive terminal connected to the top wire. What is the current in the $4\unit{\Omega}$ resistor?`,
    choices: [t`$0.6\unit{A}$`, t`$1.2\unit{A}$`, t`$1.8\unit{A}$`, t`$2.4\unit{A}$`, t`$3.0\unit{A}$`],
    answer: 'C',
    solution: t`Key idea: Use the node method. Call the bottom wire $0\unit{V}$ and the top wire $V$. Every branch connects these same two wires.

The current flowing up into the top wire through the two battery branches must equal the current flowing down through the $4\unit{\Omega}$ resistor:

$$\frac{12 - V}{2} + \frac{6 - V}{2} = \frac{V}{4} \quad\Rightarrow\quad 9 - V = \frac{V}{4} \quad\Rightarrow\quad V = 7.2\unit{V}$$

So the current in the $4\unit{\Omega}$ resistor is $7.2/4 = 1.8\unit{A}$.

Check: The left branch carries $(12 - 7.2)/2 = 2.4\unit{A}$ upward. The right branch gives $(6 - 7.2)/2 = -0.6\unit{A}$: $0.6\unit{A}$ flows down through the $6\unit{V}$ battery, charging it. $2.4 - 0.6 = 1.8\unit{A}$.

Trap: $2.4\unit{A}$ is the current in the $12\unit{V}$ branch. $0.6\unit{A}$ results if the $6\unit{V}$ battery is taken as reversed.`,
  },
  {
    id: 'em-hairpin',
    fig: F.hairpin(),
    stem: t`A long wire carrying current $I$ is bent into a hairpin: two long, straight, parallel sections joined by a semicircle of radius $R$, as shown above. What is the magnitude of the magnetic field at point $P$, the center of the semicircle?`,
    choices: [t`$\dfrac{\mu_0 I}{4R}$`, t`$\dfrac{\mu_0 I}{2R}$`, t`$\dfrac{\mu_0 I}{2\pi R}$`, t`$\dfrac{\mu_0 I}{2\pi R}(\pi + 1)$`, t`$\dfrac{\mu_0 I}{4\pi R}(\pi + 2)$`],
    answer: 'E',
    solution: t`Key idea: Add the fields of the three pieces. The current goes around $P$ in the same sense along all three pieces, so at $P$ their fields all point the same way (out of the page for the current shown), and their magnitudes simply add.

- Semicircle: half of a full loop's center field, $\dfrac{\mu_0 I}{4R}$.
- Each straight section: a semi-infinite wire, with $P$ a distance $R$ away on the perpendicular through the wire's end. That is half of an infinite wire's field, $\dfrac{\mu_0 I}{4\pi R}$.

$$B = \frac{\mu_0 I}{4R} + 2\cdot\frac{\mu_0 I}{4\pi R} = \frac{\mu_0 I}{4\pi R}(\pi + 2)$$

Trap: $\mu_0I/4R$ counts only the semicircle, and $\mu_0I/2\pi R$ counts only the straight sections. $\mu_0I/2R$ is the field at the center of a full circular loop.`,
  },
  {
    id: 'em-sliding-rod',
    fig: F.rails(),
    stem: t`A conducting rod of length $\ell$ slides without friction on two parallel conducting rails that are joined at one end by a resistor $R$, as shown above. A uniform magnetic field $B$ points out of the page. An external agent pulls the rod at constant speed $v$. The rod and rails have negligible resistance. At what rate does the agent do work?`,
    choices: [t`$\dfrac{B\ell v}{R}$`, t`$\dfrac{B\ell v^2}{R}$`, t`$\dfrac{B^2\ell^2v}{R}$`, t`$\dfrac{B^2\ell^2v^2}{2R}$`, t`$\dfrac{B^2\ell^2v^2}{R}$`],
    answer: 'E',
    solution: t`Key idea: The moving rod has a motional emf $\varepsilon = B\ell v$, which drives a current $I = B\ell v/R$ around the loop. The field then pushes on this current with a force $F = I\ell B$ that opposes the motion (Lenz's law).

At constant speed the agent must pull with an equal force, so

$$F = I\ell B = \frac{B^2\ell^2v}{R}, \qquad P = Fv = \frac{B^2\ell^2v^2}{R}$$

Check: This equals the heating rate in the resistor, $I^2R = \left(\dfrac{B\ell v}{R}\right)^2 R$. All the agent's work ends up as heat.

Trap: $B^2\ell^2v/R$ is the force, not the power.`,
  },
  {
    id: 'em-lc-energy',
    stem: t`An ideal $LC$ circuit oscillates, and the largest charge on the capacitor is $Q_0$. At an instant when the capacitor's charge is $Q_0/2$, what fraction of the circuit's total energy is stored in the inductor?`,
    choices: [t`$\tfrac14$`, t`$\tfrac12$`, t`$\tfrac34$`, t`$\tfrac{\sqrt3}{2}$`, t`$1$`],
    answer: 'C',
    solution: t`Key idea: The total energy stays constant. When the charge is largest, all of it is in the capacitor: $U = \dfrac{Q_0^2}{2C}$.

At charge $Q_0/2$ the capacitor holds

$$U_C = \frac{(Q_0/2)^2}{2C} = \frac14\,U$$

The rest, $\frac34 U$, is in the inductor.

Trap: $\frac14$ is the capacitor's share. $\frac{\sqrt3}{2}$ is the current as a fraction of its maximum, $I/I_{\max}$, not a fraction of the energy.`,
  },
  {
    id: 'em-displacement',
    fig: F.chargingCap(),
    stem: t`A parallel-plate capacitor with circular plates of radius $R$ is being charged by a steady current $I$ in the wires, as shown above. Ignore edge effects. What is the magnitude of the magnetic field between the plates at a distance $r < R$ from the central axis?`,
    choices: [t`$\dfrac{\mu_0 I r}{2\pi R^2}$`, t`$\dfrac{\mu_0 I r^2}{2\pi R^3}$`, t`$\dfrac{\mu_0 I}{2\pi R}$`, t`$\dfrac{\mu_0 I}{2\pi r}$`, t`$0$`],
    answer: 'A',
    solution: t`Key idea: No charge crosses the gap, but the electric field there is growing. Maxwell's displacement current, $I_d = \varepsilon_0\,d\Phi_E/dt$, equals the wire current $I$ and is spread evenly over the plate area.

Apply the Ampère–Maxwell law to a circle of radius $r$ centered on the axis. The circle encloses the fraction $r^2/R^2$ of the displacement current:

$$B\cdot 2\pi r = \mu_0 I\,\frac{r^2}{R^2} \quad\Rightarrow\quad B = \frac{\mu_0 I r}{2\pi R^2}$$

Trap: $0$ ignores the displacement current. $\mu_0I/2\pi r$ treats the circle as if it enclosed all of $I$.`,
  },
  {
    id: 'em-wave-b',
    stem: t`The electric field of a plane electromagnetic wave in vacuum is $\vec E = E_0\cos(kz + \omega t)\,\xhat$, where $k$ and $\omega$ are positive. Which of the following is the wave's magnetic field?`,
    choices: [
      t`$\dfrac{E_0}{c}\cos(kz + \omega t)\,\yhat$`,
      t`$\dfrac{E_0}{c}\cos(kz + \omega t)\,\zhat$`,
      t`$cE_0\cos(kz + \omega t)\,\yhat$`,
      t`$-\dfrac{E_0}{c}\sin(kz + \omega t)\,\yhat$`,
      t`$-\dfrac{E_0}{c}\cos(kz + \omega t)\,\yhat$`,
    ],
    answer: 'E',
    solution: t`Key idea: The phase $kz + \omega t$ stays constant if $z$ decreases as $t$ increases, so this wave travels in the $-z$ direction.

For a plane wave in vacuum:

- $\vec B$ is perpendicular to $\vec E$ and to the direction of travel, and $\vec E\times\vec B$ points along the direction of travel.
- $|\vec B| = |\vec E|/c$, and $\vec B$ is in phase with $\vec E$.

We need $\vec E\times\vec B$ to point along $-\zhat$. Since $\xhat\times(-\yhat) = -\zhat$, $\vec B$ must point along $-\yhat$ when $\vec E$ points along $+\xhat$:

$$\vec B = -\frac{E_0}{c}\cos(kz + \omega t)\,\yhat$$

Check: Faraday's law, $\nabla\times\vec E = -\partial\vec B/\partial t$, confirms it:
$$\nabla\times\vec E = \frac{\partial E_x}{\partial z}\,\yhat = -kE_0\sin(kz + \omega t)\,\yhat, \qquad -\frac{\partial\vec B}{\partial t} = -\frac{\omega E_0}{c}\sin(kz + \omega t)\,\yhat$$
These match because $\omega/c = k$.

Trap: The first choice has the sign that fits a wave moving toward $+z$. For $\vec E = E_0\cos(kz - \omega t)\,\xhat$, the field would be $\vec B = (E_0/c)\cos(kz - \omega t)\,\yhat$. This wave moves toward $-z$, so $\vec B$ has the opposite sign.`,
  },
  {
    id: 'em-exb-drift',
    stem: t`A particle with positive charge $q$ and mass $m$ is released from rest at the origin in uniform fields $\vec E = E\,\yhat$ and $\vec B = B\,\zhat$. Gravity is negligible. Which of the following best describes the particle's motion?`,
    choices: [
      t`A cycloid, with average velocity $(E/B)\,\xhat$`,
      t`A cycloid, with average velocity $-(E/B)\,\xhat$`,
      t`Uniform acceleration along $+\yhat$`,
      t`A circle of radius $mE/qB^2$ centered at the origin`,
      t`A helix around the $z$-axis`,
    ],
    answer: 'A',
    solution: t`Key idea: In crossed fields, a charge drifts with velocity

$$\vec v_d = \frac{\vec E\times\vec B}{B^2}$$

Here $\vec E\times\vec B = EB\,(\yhat\times\zhat) = EB\,\xhat$, so $\vec v_d = (E/B)\,\xhat$.

Why: In a frame moving at $\vec v_d$, the electric field vanishes ($\vec E + \vec v_d\times\vec B = 0$), so in that frame the particle just circles at constant speed. Starting from rest in the lab means moving at $-\vec v_d$ in that frame, so the particle traces a circle of radius $mE/qB^2$ that rolls along the $x$-axis. A point on a rolling circle traces a cycloid.

Note: The drift direction does not depend on the sign of the charge, so the second choice is never right here. The particle starts off along $+y$ (pushed by $\vec E$), curves around, and comes momentarily to rest at each cusp of the cycloid.`,
  },
];
