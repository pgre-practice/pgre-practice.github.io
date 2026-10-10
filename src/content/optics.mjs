import * as F from '../figs.mjs';
const t = String.raw;

export default [
  {
    id: 'opt-double-slit-water',
    fig: F.doubleSlit(),
    stem: t`In a double-slit experiment in air, light of wavelength $600\unit{nm}$ passes through two narrow slits $0.30\unit{mm}$ apart, and the fringes are viewed on a screen $1.5\unit{m}$ away, as shown above. The whole apparatus is then placed under water ($n = 1.33$). What is the spacing between neighboring bright fringes under water?`,
    choices: [t`$1.7\unit{mm}$`, t`$2.3\unit{mm}$`, t`$3.0\unit{mm}$`, t`$4.0\unit{mm}$`, t`$5.3\unit{mm}$`],
    answer: 'B',
    solution: t`Key idea: For small angles, bright fringes are spaced by $\Delta y = \dfrac{\lambda L}{d}$, where $\lambda$ is the wavelength in the medium between the slits and the screen.

In air:

$$\Delta y = \frac{(600\times10^{-9}\unit{m})(1.5\unit{m})}{0.30\times10^{-3}\unit{m}} = 3.0\unit{mm}$$

In water the frequency stays the same but the wavelength shrinks to $\lambda/n$, so

$$\Delta y_{\text{water}} = \frac{3.0\unit{mm}}{1.33} \approx 2.3\unit{mm}$$

Trap: $4.0\unit{mm}$ multiplies by $n$ instead of dividing. $3.0\unit{mm}$ is the spacing in air.`,
  },
  {
    id: 'opt-ar-coating',
    stem: t`A glass lens ($n = 1.50$) is coated with a thin film of magnesium fluoride ($n = 1.38$) to reduce the reflection of light of wavelength $552\unit{nm}$ (in air) at normal incidence. What is the smallest film thickness that gives the least reflection?`,
    choices: [t`$100\unit{nm}$`, t`$138\unit{nm}$`, t`$200\unit{nm}$`, t`$276\unit{nm}$`, t`$552\unit{nm}$`],
    answer: 'A',
    solution: t`Key idea: Light reflects from both surfaces of the film. Both reflections go from a lower to a higher index (air to film, then film to glass), so each picks up the same half-wave phase shift, and the two shifts cancel. Only the extra path $2nt$ through the film matters.

For destructive interference the extra path must be half a wavelength:

$$2nt = \frac{\lambda}{2} \quad\Rightarrow\quad t = \frac{\lambda}{4n} = \frac{552\unit{nm}}{4(1.38)} = 100\unit{nm}$$

Trap: With only one phase shift (as for a soap film in air), the condition would be $2nt = \lambda$, giving $200\unit{nm}$. Forgetting the film's index gives $\lambda/4 = 138\unit{nm}$.`,
  },
  {
    id: 'opt-polarizers',
    fig: F.polarizers(),
    stem: t`Unpolarized light of intensity $I_0$ passes through three ideal linear polarizers in a row. The transmission axis of the second polarizer is at $30^\circ$ to that of the first, and the axis of the third is at $90^\circ$ to that of the first, as shown above. What is the intensity $I$ of the light that leaves the third polarizer?`,
    choices: [t`$0$`, t`$\dfrac{3I_0}{32}$`, t`$\dfrac{I_0}{8}$`, t`$\dfrac{3I_0}{16}$`, t`$\dfrac{I_0}{4}$`],
    answer: 'B',
    solution: t`Key idea: An ideal polarizer passes half of unpolarized light. After that, each polarizer passes the fraction $\cos^2\theta$ (Malus's law), where $\theta$ is the angle between its axis and the light's polarization.

The angle between the second and third axes is $90^\circ - 30^\circ = 60^\circ$:

$$I = \frac{I_0}{2}\,\cos^2 30^\circ\,\cos^2 60^\circ = \frac{I_0}{2}\cdot\frac34\cdot\frac14 = \frac{3I_0}{32}$$

Trap: $0$ is right only without the middle polarizer. The first and third are crossed, but the middle one turns the polarization so some light gets through. $3I_0/16$ forgets the first factor of $\tfrac12$.`,
  },
  {
    id: 'opt-two-lenses',
    fig: F.twoLenses(),
    stem: t`A converging lens with focal length $10\unit{cm}$ and a converging lens with focal length $20\unit{cm}$ are $40\unit{cm}$ apart on a common axis. An object is $15\unit{cm}$ to the left of the first lens, as shown above. Where is the final image, and what is the overall lateral magnification?`,
    choices: [
      t`$60\unit{cm}$ right of the second lens; magnification $-2$`,
      t`$20\unit{cm}$ right of the second lens; magnification $+4$`,
      t`$10\unit{cm}$ left of the second lens; magnification $-2$`,
      t`$20\unit{cm}$ left of the second lens; magnification $-4$`,
      t`$20\unit{cm}$ left of the second lens; magnification $+4$`,
    ],
    answer: 'D',
    solution: t`Key idea: Find the image made by the first lens, then use it as the object for the second lens. Use $\dfrac1s + \dfrac1{s'} = \dfrac1f$ and $m = -\dfrac{s'}{s}$.

First lens:

$$\frac{1}{s_1'} = \frac{1}{10} - \frac{1}{15} = \frac{1}{30} \quad\Rightarrow\quad s_1' = 30\unit{cm}, \qquad m_1 = -\frac{30}{15} = -2$$

This real image is $40 - 30 = 10\unit{cm}$ in front of the second lens. That is inside the second lens's focal length, so the second lens acts as a magnifying glass:

$$\frac{1}{s_2'} = \frac{1}{20} - \frac{1}{10} = -\frac{1}{20} \quad\Rightarrow\quad s_2' = -20\unit{cm}, \qquad m_2 = -\frac{-20}{10} = +2$$

The negative $s_2'$ means a virtual image $20\unit{cm}$ to the left of the second lens. The total magnification is $m_1m_2 = -4$: inverted and four times as tall.`,
  },
  {
    id: 'opt-rayleigh',
    stem: t`The two headlights of an approaching car are $1.2\unit{m}$ apart. Assume the pupil of the eye is $5.0\unit{mm}$ across, the light has wavelength $550\unit{nm}$, and only diffraction at the pupil limits the resolution. What is the greatest distance at which the eye can see the headlights as two separate sources?`,
    choices: [t`$0.9\unit{km}$`, t`$4.5\unit{km}$`, t`$9\unit{km}$`, t`$18\unit{km}$`, t`$90\unit{km}$`],
    answer: 'C',
    solution: t`Key idea: By the Rayleigh criterion, two point sources are just resolved when their angular separation is

$$\theta_{\min} = 1.22\,\frac{\lambda}{D}$$

where $D$ is the diameter of the aperture.

$$\theta_{\min} = 1.22\times\frac{550\times10^{-9}\unit{m}}{5.0\times10^{-3}\unit{m}} = 1.34\times10^{-4}\unit{rad}$$

The headlights, a distance $s = 1.2\unit{m}$ apart, are separated by the angle $s/L$ at distance $L$:

$$L = \frac{s}{\theta_{\min}} = \frac{1.2}{1.34\times10^{-4}}\unit{m} \approx 9\times10^{3}\unit{m} = 9\unit{km}$$

Note: Real eyes do worse than this, because of other defects in the eye, but diffraction sets the best possible case.

Trap: Using the pupil's radius instead of its diameter halves the distance, to $4.5\unit{km}$.`,
  },
  {
    id: 'opt-group-velocity',
    stem: t`For gravity waves on deep water, the angular frequency and wave number are related by $\omega = \sqrt{gk}$. What is the ratio of the group velocity to the phase velocity?`,
    choices: [t`$\tfrac14$`, t`$\tfrac12$`, t`$1$`, t`$2$`, t`$4$`],
    answer: 'B',
    solution: t`Key idea: The phase velocity is $v_p = \omega/k$ and the group velocity is $v_g = d\omega/dk$.

$$v_p = \frac{\sqrt{gk}}{k} = \sqrt{\frac{g}{k}}, \qquad v_g = \frac{d}{dk}\sqrt{gk} = \frac12\sqrt{\frac{g}{k}}$$

$$\frac{v_g}{v_p} = \frac12$$

Note: You can see this on a pond. Individual crests travel twice as fast as the group, so they appear at the back of a group and fade out at its front.

Check: Any power law $\omega\propto k^{\,n}$ gives $v_g/v_p = n$. Here $n = \tfrac12$.`,
  },
];
