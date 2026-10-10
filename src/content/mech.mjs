import * as F from '../figs.mjs';
const t = String.raw;

export default [
  {
    id: 'mech-incline',
    fig: F.incline(),
    stem: t`A small block slides down a rough plane inclined at $30^\circ$ to the horizontal, as shown above. The coefficient of kinetic friction between the block and the plane is $\mu_k = 0.20$. What is the magnitude of the block's acceleration? (Use $g = 9.8\unit{m/s^2}$.)`,
    choices: [t`$3.2\unit{m/s^2}$`, t`$4.9\unit{m/s^2}$`, t`$6.6\unit{m/s^2}$`, t`$8.5\unit{m/s^2}$`, t`$9.8\unit{m/s^2}$`],
    answer: 'A',
    solution: t`Key idea: Along the slope, gravity pulls the block down with $mg\sin\theta$. Friction acts up the slope (against the sliding) with size $\mu_k N$, and the normal force is $N = mg\cos\theta$.

$$ma = mg\sin\theta - \mu_k mg\cos\theta \quad\Rightarrow\quad a = g(\sin\theta - \mu_k\cos\theta)$$

$$a = 9.8\,(0.500 - 0.20\times 0.866) = 9.8\times 0.327 \approx 3.2\unit{m/s^2}$$

Trap: Adding the friction term gives $6.6\unit{m/s^2}$, and leaving it out gives $4.9\unit{m/s^2}$. Friction always opposes the sliding, so the answer must be smaller than $g\sin\theta$.`,
  },
  {
    id: 'mech-atwood',
    fig: F.atwood(),
    stem: t`Two blocks, of masses $3m$ and $m$, hang from a light string that passes over a pulley, as shown above. The pulley is a uniform solid disk of mass $2m$ and radius $R$ that turns on a frictionless axle, and the string does not slip on it. What is the magnitude of the acceleration of the blocks?`,
    choices: [t`$g/5$`, t`$g/3$`, t`$2g/5$`, t`$g/2$`, t`$2g/3$`],
    answer: 'C',
    solution: t`Key idea: The pulley has mass, so it needs a net torque to speed up. That means the string tension is different on the two sides.

Let $a$ be the acceleration, with the $3m$ block moving down. Newton's second law for each part:

$$3mg - T_1 = 3ma, \qquad T_2 - mg = ma, \qquad (T_1 - T_2)R = I\alpha = \left(\tfrac12\cdot 2mR^2\right)\frac{a}{R}$$

The last equation gives $T_1 - T_2 = ma$. Adding the first two equations gives $2mg - (T_1 - T_2) = 4ma$, so $2mg = 5ma$:

$$a = \frac{2g}{5}$$

Note: A quick way to see it: the acceleration is the net driving force divided by the total effective mass, and the pulley adds $I/R^2 = m$ to that mass:
$$a = \frac{(3m - m)g}{3m + m + I/R^2} = \frac{2mg}{5m}$$

Trap: A massless pulley gives $g/2$. Treating the pulley as a thin ring ($I = MR^2$) gives $g/3$.`,
  },
  {
    id: 'mech-orbit-raise',
    stem: t`A satellite of mass $m$ is in a circular orbit of radius $R$ around a planet of mass $M \gg m$. How much work must the satellite's engines do on it to move it into a circular orbit of radius $3R$?`,
    choices: [t`$\dfrac{GMm}{6R}$`, t`$\dfrac{GMm}{3R}$`, t`$\dfrac{GMm}{2R}$`, t`$\dfrac{2GMm}{3R}$`, t`$\dfrac{GMm}{R}$`],
    answer: 'B',
    solution: t`Key idea: In a circular orbit the kinetic energy is half the size of the potential energy, so the total energy is

$$E = K + U = \frac{GMm}{2r} - \frac{GMm}{r} = -\frac{GMm}{2r}$$

The engines must supply the change in total energy:

$$W = E_f - E_i = -\frac{GMm}{6R} - \left(-\frac{GMm}{2R}\right) = \frac{GMm}{3R}$$

Trap: $2GMm/3R$ is the change in potential energy alone. The satellite moves more slowly in the higher orbit, so it loses kinetic energy $GMm/3R$, which pays for half of the climb.`,
  },
  {
    id: 'mech-binary',
    fig: F.binary(),
    stem: t`Two stars, of masses $M$ and $2M$, move in circular orbits about their common center of mass (CM) under their mutual gravity, as shown above. The distance between them is always $d$. What is the orbital period?`,
    choices: [t`$2\pi\sqrt{\dfrac{d^3}{3GM}}$`, t`$2\pi\sqrt{\dfrac{d^3}{2GM}}$`, t`$2\pi\sqrt{\dfrac{2d^3}{3GM}}$`, t`$2\pi\sqrt{\dfrac{d^3}{GM}}$`, t`$2\pi\sqrt{\dfrac{3d^3}{2GM}}$`],
    answer: 'A',
    solution: t`Key idea: Both stars circle the CM with the same period. The heavier star is closer to the CM, so the star of mass $M$ is a distance $\tfrac23 d$ from it.

Gravity supplies the centripetal force on the star of mass $M$:

$$\frac{G(M)(2M)}{d^2} = M\omega^2\left(\frac{2d}{3}\right) \quad\Rightarrow\quad \omega^2 = \frac{3GM}{d^3}$$

$$T = \frac{2\pi}{\omega} = 2\pi\sqrt{\frac{d^3}{3GM}}$$

Note: This is Kepler's third law for two bodies, $T^2 = \dfrac{4\pi^2 d^3}{G(m_1 + m_2)}$. The total mass $3M$ appears.

Trap: Using only one star's mass ($GM$ or $2GM$ under the root) is right only when one body is much heavier than the other.`,
  },
  {
    id: 'mech-rolling-race',
    stem: t`A solid sphere, a solid cylinder, and a thin-walled hollow cylinder are released together from rest at the top of the same incline. Each rolls without slipping. In what order do they reach the bottom?`,
    choices: [
      t`All three arrive at the same time.`,
      t`Hollow cylinder, then solid cylinder, then solid sphere`,
      t`Solid cylinder, then solid sphere, then hollow cylinder`,
      t`Solid sphere, then hollow cylinder, then solid cylinder`,
      t`Solid sphere, then solid cylinder, then hollow cylinder`,
    ],
    answer: 'E',
    solution: t`Key idea: Write the moment of inertia as $I = \beta m r^2$. For rolling without slipping, $\omega = v/r$, and energy conservation gives

$$mgh = \tfrac12 mv^2 + \tfrac12 I\omega^2 = \tfrac12 mv^2(1 + \beta)$$

This gives the speed at any height and the acceleration along the slope:

$$v^2 = \frac{2gh}{1 + \beta}, \qquad a = \frac{g\sin\theta}{1 + \beta}$$

Mass and radius cancel. Only $\beta$ (how far the mass sits from the axis) matters, and smaller $\beta$ is faster:

- solid sphere, $\beta = 2/5$: first
- solid cylinder, $\beta = 1/2$: second
- hollow cylinder, $\beta = 1$: last

Trap: Heavier or larger objects are not faster. Each object's own mass and radius drop out.`,
  },
  {
    id: 'mech-bead-rod',
    fig: F.beadRod(),
    stem: t`A bead slides without friction on a straight rod. The rod lies in a horizontal plane and turns about a vertical axis through one end with constant angular speed $\omega$, as shown above. At $t = 0$ the bead is a distance $r_0$ from the axis and is at rest relative to the rod. While the bead is on the rod, its distance from the axis is`,
    choices: [t`$r_0\cos\omega t$`, t`$r_0(1 + \omega t)$`, t`$r_0\,e^{\omega t}$`, t`$r_0\left(1 + \tfrac12\omega^2t^2\right)$`, t`$r_0\cosh\omega t$`],
    answer: 'E',
    solution: t`Key idea: Use polar coordinates. The rod forces $\theta = \omega t$, so the only free coordinate is $r$. The plane is horizontal, so there is no potential energy:

$$L = \tfrac12 m\left(\dot r^2 + r^2\omega^2\right)$$

The Euler–Lagrange equation for $r$ gives

$$m\ddot r = m\omega^2 r \quad\Rightarrow\quad r(t) = Ae^{\omega t} + Be^{-\omega t}$$

The starting conditions $r(0) = r_0$ and $\dot r(0) = 0$ give $A = B = r_0/2$, so $r = r_0\cosh\omega t$.

Trap: $r_0e^{\omega t}$ solves the same equation but starts with $\dot r(0) = \omega r_0$, not zero. $r_0(1 + \frac12\omega^2t^2)$ is only the small-$t$ approximation of $\cosh$.

Note: The rod pushes sideways on the bead and does work on it, so the bead's energy is not conserved. The Lagrangian method handles this without ever needing the rod's force.`,
  },
  {
    id: 'mech-coupled',
    fig: F.coupled(),
    stem: t`Two identical blocks of mass $m$ rest on a frictionless horizontal surface. They are joined to each other by a spring of force constant $2k$ and to fixed walls by springs of force constant $k$, as shown above. What are the angular frequencies of the normal modes?`,
    choices: [
      t`$\sqrt{k/m}$ and $\sqrt{5k/m}$`,
      t`$\sqrt{k/m}$ and $\sqrt{3k/m}$`,
      t`$\sqrt{k/m}$ and $\sqrt{2k/m}$`,
      t`$\sqrt{2k/m}$ and $\sqrt{3k/m}$`,
      t`$\sqrt{3k/m}$ and $\sqrt{5k/m}$`,
    ],
    answer: 'A',
    solution: t`Key idea: By symmetry, the normal modes are the two blocks moving together and the two blocks moving opposite each other.

With displacements $x_1$ and $x_2$ from equilibrium:

$$m\ddot x_1 = -kx_1 - 2k(x_1 - x_2), \qquad m\ddot x_2 = -kx_2 - 2k(x_2 - x_1)$$

- In phase ($x_1 = x_2$): the middle spring never stretches, so $m\ddot x_1 = -kx_1$ and $\omega = \sqrt{k/m}$.
- Out of phase ($x_2 = -x_1$): the middle spring stretches by $2x_1$, so $m\ddot x_1 = -kx_1 - 4kx_1 = -5kx_1$ and $\omega = \sqrt{5k/m}$.

Trap: Taking the middle spring's stretch as $x_1$ instead of $2x_1$ gives $\sqrt{3k/m}$.`,
  },
  {
    id: 'mech-q-factor',
    stem: t`A lightly damped harmonic oscillator has quality factor $Q = 50$. As it oscillates freely, about what fraction of its energy is lost in each cycle?`,
    choices: [t`$0.02$`, t`$0.06$`, t`$0.13$`, t`$0.25$`, t`$0.50$`],
    answer: 'C',
    solution: t`Key idea: For light damping, the quality factor is

$$Q = 2\pi\times\frac{\text{energy stored}}{\text{energy lost per cycle}}$$

So the fraction lost per cycle is

$$\frac{2\pi}{Q} = \frac{2\pi}{50} \approx 0.13$$

Check: The energy decays as $e^{-\omega_0 t/Q}$. One cycle lasts $2\pi/\omega_0$, so the fraction left after a cycle is $e^{-2\pi/Q} \approx 0.88$, and about $0.12$ is lost.

Trap: $1/Q = 0.02$ leaves out the $2\pi$. The amplitude drops by about $\pi/Q \approx 0.06$ per cycle, but energy goes as amplitude squared, which doubles the fraction.`,
  },
  {
    id: 'mech-elastic',
    stem: t`A ball of mass $m$ moving with speed $v$ collides head-on and elastically with a ball of mass $3m$ that is at rest. What fraction of the first ball's kinetic energy is transferred to the second ball?`,
    choices: [t`$\tfrac14$`, t`$\tfrac13$`, t`$\tfrac12$`, t`$\tfrac23$`, t`$\tfrac34$`],
    answer: 'E',
    solution: t`Key idea: In a one-dimensional elastic collision with the target at rest, the target leaves with speed

$$v_2' = \frac{2m_1}{m_1 + m_2}\,v = \frac{2m}{4m}\,v = \frac{v}{2}$$

Its kinetic energy is

$$K_2 = \tfrac12(3m)\left(\tfrac{v}{2}\right)^2 = \tfrac38 mv^2 = \tfrac34\left(\tfrac12 mv^2\right)$$

Check: The first ball bounces back with $v_1' = \frac{m - 3m}{4m}\,v = -\frac{v}{2}$, keeping $\frac14$ of the energy. And $\frac14 + \frac34 = 1$, as it must be for an elastic collision.

Note: In general the fraction transferred is $\dfrac{4m_1m_2}{(m_1 + m_2)^2}$. It equals 1 only for equal masses.`,
  },
  {
    id: 'mech-physical-pendulum',
    fig: F.rodPendulum(),
    stem: t`A uniform thin rod of mass $m$ and length $L$ swings in a vertical plane about a horizontal, frictionless pivot located $L/4$ from one end, as shown above. What is the period of small oscillations?`,
    choices: [t`$2\pi\sqrt{\dfrac{L}{3g}}$`, t`$2\pi\sqrt{\dfrac{7L}{12g}}$`, t`$2\pi\sqrt{\dfrac{2L}{3g}}$`, t`$2\pi\sqrt{\dfrac{L}{g}}$`, t`$2\pi\sqrt{\dfrac{4L}{3g}}$`],
    answer: 'B',
    solution: t`Key idea: For a physical pendulum, $T = 2\pi\sqrt{\dfrac{I}{mgd}}$, where $I$ is the moment of inertia about the pivot and $d$ is the distance from the pivot to the center of mass.

Here $d = L/4$. Use the parallel-axis theorem:

$$I = \frac{mL^2}{12} + m\left(\frac{L}{4}\right)^2 = \frac{7mL^2}{48}$$

$$T = 2\pi\sqrt{\frac{7mL^2/48}{mg\,(L/4)}} = 2\pi\sqrt{\frac{7L}{12g}}$$

Trap: $2\pi\sqrt{2L/3g}$ is the period for a pivot at the very end. Using the end-pivot inertia $mL^2/3$ with $d = L/4$ gives $2\pi\sqrt{4L/3g}$.`,
  },
  {
    id: 'mech-torricelli',
    fig: F.tank(),
    stem: t`A large open tank stands on level ground and holds water to a depth of $1.0\unit{m}$. A small hole is opened in the side of the tank $0.20\unit{m}$ above the ground, as shown above. Neglecting viscosity, at what horizontal distance $x$ from the tank does the stream of water strike the ground?`,
    choices: [t`$0.20\unit{m}$`, t`$0.40\unit{m}$`, t`$0.60\unit{m}$`, t`$0.80\unit{m}$`, t`$1.0\unit{m}$`],
    answer: 'D',
    solution: t`Key idea: By Bernoulli's equation (Torricelli's law), water leaves the hole with speed $v = \sqrt{2gh}$, where $h$ is the depth of the hole below the water surface. Here $h = 1.0 - 0.20 = 0.80\unit{m}$.

The water then falls a height $H = 0.20\unit{m}$ like a projectile launched horizontally, which takes $t = \sqrt{2H/g}$. The horizontal distance is

$$x = vt = \sqrt{2gh}\,\sqrt{\frac{2H}{g}} = 2\sqrt{hH} = 2\sqrt{(0.80)(0.20)}\unit{m} = 0.80\unit{m}$$

Note: $g$ cancels. Swapping $h$ and $H$ gives the same distance, so a hole $0.20\unit{m}$ below the surface would land at the same spot.

Trap: Using the hole's height above the ground ($0.20\unit{m}$) as the depth gives $0.40\unit{m}$.`,
  },
  {
    id: 'mech-bucket',
    fig: F.bucket(),
    stem: t`A cylindrical bucket of water rotates about its vertical axis with constant angular speed $\omega$. Once the water turns with the bucket, its surface is curved, as shown above. The surface at the wall (radius $R$) is a height $h$ above the surface at the center. What is $h$?`,
    choices: [t`$\dfrac{\omega^2R^2}{4g}$`, t`$\dfrac{\omega^2R^2}{2g}$`, t`$\dfrac{\omega^2R^2}{g}$`, t`$\dfrac{2\omega^2R^2}{g}$`, t`$\dfrac{4\omega^2R^2}{g}$`],
    answer: 'B',
    solution: t`Key idea: Each bit of water moves in a circle, so it needs a centripetal acceleration $\omega^2 r$. The surface tilts so that the pressure force (perpendicular to the surface) supplies this while also balancing gravity. The slope of the surface at radius $r$ is therefore

$$\frac{dz}{dr} = \frac{\omega^2 r}{g}$$

Integrate from the center to the wall:

$$h = \int_0^R \frac{\omega^2 r}{g}\,dr = \frac{\omega^2R^2}{2g}$$

The surface is a paraboloid, $z = \dfrac{\omega^2 r^2}{2g}$.

Note: In the rotating frame, the surface has constant effective potential energy, $mgz - \tfrac12 m\omega^2r^2$. This gives the same result.

Trap: Forgetting the factor $\tfrac12$ from the integral gives $\omega^2R^2/g$.`,
  },
  {
    id: 'mech-explode',
    fig: F.projectile(),
    stem: t`A projectile is launched from level ground. Without any explosion it would land a distance $D$ from the launch point. At the top of its path it explodes into two pieces of equal mass. Just after the explosion one piece is at rest, and it falls straight down. Ignoring air resistance, how far from the launch point does the other piece land?`,
    choices: [t`$D$`, t`$\tfrac54 D$`, t`$\tfrac32 D$`, t`$2D$`, t`$3D$`],
    answer: 'C',
    solution: t`Key idea: The explosion forces are internal, so the center of mass keeps following the original path and lands at $D$.

Both pieces start falling from the top with zero vertical velocity, so they land at the same time. The piece that drops straight down lands at $D/2$. For the center of mass to land at $D$:

$$\frac{\tfrac12 D + x}{2} = D \quad\Rightarrow\quad x = \tfrac32 D$$

Check: Momentum gives the same answer. The moving piece has half the mass, so it has twice the horizontal speed. In the remaining fall time it covers $2\times\frac{D}{2} = D$ beyond the top point, landing at $\frac{D}{2} + D = \frac32 D$.

Trap: $2D$ comes from doubling the whole range instead of only the second half of the flight.`,
  },
  {
    id: 'mech-phase-space',
    fig: F.phaseEllipse(),
    stem: t`A one-dimensional harmonic oscillator of mass $m$ and angular frequency $\omega$ has total energy $E$. Its path in phase space (position $x$, momentum $p$) is the closed curve shown above. What area does the curve enclose?`,
    choices: [t`$\dfrac{E}{2\pi\omega}$`, t`$\dfrac{E}{\omega}$`, t`$\dfrac{\pi E}{\omega}$`, t`$\dfrac{2\pi E}{\omega}$`, t`$\dfrac{4\pi E}{\omega}$`],
    answer: 'D',
    solution: t`Key idea: Energy conservation gives the shape of the curve:

$$\frac{p^2}{2m} + \frac12 m\omega^2x^2 = E$$

This is an ellipse with semi-axes

$$x_{\max} = \sqrt{\frac{2E}{m\omega^2}}, \qquad p_{\max} = \sqrt{2mE}$$

An ellipse with semi-axes $a$ and $b$ has area $\pi ab$:

$$A = \pi\,x_{\max}\,p_{\max} = \pi\sqrt{\frac{2E}{m\omega^2}}\,\sqrt{2mE} = \frac{2\pi E}{\omega}$$

Note: This area is the action $\oint p\,dx$. Setting it equal to $nh$ (the old Bohr–Sommerfeld rule) gives $E = n\hbar\omega$, close to the exact quantum result $(n + \tfrac12)\hbar\omega$.`,
  },
];
