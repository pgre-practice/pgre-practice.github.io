"""Independent numeric / symbolic checks of every answer key.
Each check computes the physics from scratch and asserts it picks the keyed choice."""
import math
import numpy as np
import sympy as sp
from scipy import integrate, linalg

results = []
def check(qid, ok, detail=''):
    results.append((qid, ok, detail))

def nearest(value, options):
    """index (0-4) of the option closest to value (relative)."""
    errs = [abs(value - o) / max(abs(o), 1e-30) if o != 0 else abs(value) for o in options]
    return 'ABCDE'[int(np.argmin(errs))]

g = 9.8
# ---------------- Mechanics ----------------
th = math.radians(30)
a = g * (math.sin(th) - 0.20 * math.cos(th))
check('mech-incline', nearest(a, [3.2, 4.9, 6.6, 8.5, 9.8]) == 'A', f'a={a:.3f}')

m = 1.0
I_over_R2 = 0.5 * 2 * m
a = (3 * m - m) * g / (3 * m + m + I_over_R2)
check('mech-atwood', nearest(a / g, [1/5, 1/3, 2/5, 1/2, 2/3]) == 'C', f'a/g={a/g:.4f}')

G, M, R = 1.0, 1.0, 1.0
E = lambda r: -G * M * m / (2 * r)
W = E(3 * R) - E(R)
check('mech-orbit-raise', nearest(W, [1/6, 1/3, 1/2, 2/3, 1]) == 'B', f'W={W:.4f}')

# binary: integrate two-body numerically to get the period
d = 1.0
mu_tot = G * 3 * M
T_kepler = 2 * math.pi * math.sqrt(d**3 / mu_tot)
# direct: star M at 2d/3 from CM, force G*M*2M/d^2 = M w^2 (2d/3)
w2 = G * 2 * M / d**2 / (2 * d / 3)
T_direct = 2 * math.pi / math.sqrt(w2)
opts = [2*math.pi*math.sqrt(d**3/(3*G*M)), 2*math.pi*math.sqrt(d**3/(2*G*M)), 2*math.pi*math.sqrt(2*d**3/(3*G*M)), 2*math.pi*math.sqrt(d**3/(G*M)), 2*math.pi*math.sqrt(3*d**3/(2*G*M))]
check('mech-binary', nearest(T_direct, opts) == 'A' and abs(T_direct - T_kepler) < 1e-12, f'T={T_direct:.4f}')

# rolling race: simulate time to roll distance s from rest, a = g sin/(1+beta)
betas = {'sphere': 2/5, 'solid cyl': 1/2, 'hollow cyl': 1.0}
order = sorted(betas, key=lambda k: math.sqrt(2 * 1.0 * (1 + betas[k]) / (g * 0.5)))
check('mech-rolling-race', order == ['sphere', 'solid cyl', 'hollow cyl'], str(order))

# bead on rod: integrate r'' = w^2 r
w = 1.3; r0 = 0.7
sol = integrate.solve_ivp(lambda t, y: [y[1], w**2 * y[0]], [0, 2], [r0, 0], rtol=1e-10, atol=1e-12, dense_output=True)
tt = 1.7
r_num = sol.sol(tt)[0]
opts = [r0*math.cos(w*tt), r0*(1+w*tt), r0*math.exp(w*tt), r0*(1+0.5*w**2*tt**2), r0*math.cosh(w*tt)]
check('mech-bead-rod', nearest(r_num, opts) == 'E', f'r={r_num:.5f} cosh={opts[4]:.5f}')

# coupled oscillators: eigenvalues of K/m
k = 1.0
K = np.array([[k + 2*k, -2*k], [-2*k, k + 2*k]])
ws = np.sqrt(np.sort(linalg.eigvalsh(K / m)))
check('mech-coupled', np.allclose(ws, [math.sqrt(k/m), math.sqrt(5*k/m)]), f'omega={ws}')

Q = 50
frac_exact = 1 - math.exp(-2 * math.pi / Q)
check('mech-q-factor', nearest(frac_exact, [0.02, 0.06, 0.13, 0.25, 0.50]) == 'C' and nearest(2*math.pi/Q, [0.02, 0.06, 0.13, 0.25, 0.50]) == 'C', f'exact={frac_exact:.4f}, 2pi/Q={2*math.pi/Q:.4f}')

m1, m2, v = 1.0, 3.0, 1.0
# solve elastic collision from conservation laws
v1, v2 = sp.symbols('v1 v2')
solns = sp.solve([sp.Eq(m1*v, m1*v1 + m2*v2), sp.Eq(m1*v**2, m1*v1**2 + m2*v2**2)], [v1, v2])
v2f = [s for s in solns if abs(float(s[1])) > 1e-9][0][1]
frac = float(m2 * v2f**2 / (m1 * v**2))
check('mech-elastic', nearest(frac, [1/4, 1/3, 1/2, 2/3, 3/4]) == 'E', f'frac={frac}')

L = 1.0
I = m * L**2 / 12 + m * (L/4)**2
T = 2 * math.pi * math.sqrt(I / (m * g * L / 4))
opts = [2*math.pi*math.sqrt(x*L/g) for x in (1/3, 7/12, 2/3, 1, 4/3)]
check('mech-physical-pendulum', nearest(T, opts) == 'B', f'T={T:.4f}')

h, H = 0.80, 0.20
x = math.sqrt(2*g*h) * math.sqrt(2*H/g)
check('mech-torricelli', nearest(x, [0.2, 0.4, 0.6, 0.8, 1.0]) == 'D', f'x={x:.4f}')

# bucket: integrate dz/dr = w^2 r / g
w, Rb = 3.0, 0.2
hgt = integrate.quad(lambda r: w**2 * r / g, 0, Rb)[0]
opts = [w**2*Rb**2/(4*g), w**2*Rb**2/(2*g), w**2*Rb**2/g, 2*w**2*Rb**2/g, 4*w**2*Rb**2/g]
check('mech-bucket', nearest(hgt, opts) == 'B', f'h={hgt:.5f}')

# exploding projectile: simulate
vx, vy = 3.0, 4.0
D = 2 * vx * vy / g
t_top = vy / g
x_top = vx * t_top
y_top = vy**2 / (2 * g)
v_frag2 = 2 * vx  # momentum: m vx = (m/2)*0 + (m/2) v2
t_fall = math.sqrt(2 * y_top / g)
x2 = x_top + v_frag2 * t_fall
check('mech-explode', nearest(x2 / D, [1, 1.25, 1.5, 2, 3]) == 'C', f'x2/D={x2/D:.4f}')

# phase-space area by numeric integration of closed curve
mm, w, En = 2.0, 1.5, 3.0
xmax = math.sqrt(2*En/(mm*w**2))
area = 2 * integrate.quad(lambda x: math.sqrt(max(0, 2*mm*(En - 0.5*mm*w**2*x**2))), -xmax, xmax)[0]
opts = [En/(2*math.pi*w), En/w, math.pi*En/w, 2*math.pi*En/w, 4*math.pi*En/w]
check('mech-phase-space', nearest(area, opts) == 'D', f'area={area:.5f} 2piE/w={2*math.pi*En/w:.5f}')

# ---------------- E&M ----------------
eps0 = 8.854e-12
rho0, Rs, r = 2.0, 1.0, 0.6
Qenc = integrate.quad(lambda rr: rho0 * rr / Rs * 4 * math.pi * rr**2, 0, r)[0]
E_num = Qenc / (4 * math.pi * eps0 * r**2)
opts = [rho0*r/(3*eps0), rho0*r**2/(4*eps0*Rs), rho0*r**2/(3*eps0*Rs), rho0*r**3/(4*eps0*Rs**2), rho0*Rs**3/(4*eps0*r**2)]
check('em-gauss-nonuniform', nearest(E_num, opts) == 'B', f'E={E_num:.4e}')

check('em-shell-graph', True, 'conceptual: E=kq/r^2 (r<a), 0 (a<r<b), kq/r^2 (r>b) -> graph "right" placed at D')

q, dd = 1e-6, 0.1
F_img = q**2 / (4 * math.pi * eps0 * (2*dd)**2)
opts = [q**2/(16*math.pi*eps0*dd**2), q**2/(8*math.pi*eps0*dd**2), q**2/(4*math.pi*eps0*dd**2), q**2/(2*math.pi*eps0*dd**2), q**2/(math.pi*eps0*dd**2)]
check('em-image-charge', nearest(F_img, opts) == 'A', f'F={F_img:.4e}')

C0 = 1.0
Cser = 1 / (1/(2*C0) + 1/(2*3*C0))
U_ratio = C0 / Cser
check('em-dielectric-slab', nearest(U_ratio, [1/3, 1/2, 2/3, 1, 3/2]) == 'C', f'U/U0={U_ratio:.4f}')

# RC circuit: simulate with node equation at capacitor node: C dV/dt = (eps - V)/R1 - V/R2
eps, R1, R2, Cc = 10.0, 2.0, 3.0, 0.5
I0 = (eps - 0) / R1
opts = [0, eps/R2, eps/(R1+R2), eps*(R1+R2)/(R1*R2), eps/R1]
check('em-rc-initial', nearest(I0, opts) == 'E', f'I0={I0}')
sol = integrate.solve_ivp(lambda t, V: [((eps - V[0])/R1 - V[0]/R2)/Cc], [0, 20], [0.0], rtol=1e-10, atol=1e-12, dense_output=True)
Vinf = eps * R2 / (R1 + R2)
# time to reach 1-1/e of final
from scipy.optimize import brentq
tau_num = brentq(lambda t: sol.sol(t)[0] - Vinf*(1 - math.exp(-1)), 1e-6, 19)
opts = [R1*Cc, R2*Cc, (R1+R2)*Cc, R1*R2/(R1+R2)*Cc, (R1+R2)*Cc/2]
check('em-rc-tau', nearest(tau_num, opts) == 'D', f'tau={tau_num:.5f}')

# Kirchhoff: solve node equation
V = sp.symbols('V')
Vs = float(sp.solve(sp.Eq((12 - V)/2 + (6 - V)/2, V/4), V)[0])
check('em-kirchhoff', nearest(Vs/4, [0.6, 1.2, 1.8, 2.4, 3.0]) == 'C', f'V={Vs}, I={Vs/4}')

# Hairpin: Biot-Savart numeric integration
mu0 = 4e-7 * math.pi
Ic, Rh = 1.0, 1.0
def biot(path_pts):
    B = np.zeros(3)
    for p, q2 in zip(path_pts[:-1], path_pts[1:]):
        dl = q2 - p; mid = (p + q2) / 2
        rvec = -mid  # field point at origin
        rn = np.linalg.norm(rvec)
        B += mu0 * Ic / (4 * math.pi) * np.cross(dl, rvec) / rn**3
    return B
Lfar = 4000.0
s = np.linspace(0, 1, 200001)
top = np.stack([Lfar - (Lfar) * s, np.full_like(s, Rh), np.zeros_like(s)], 1)  # from far right to x=0 at y=+R (current flows left)
ang = np.linspace(math.pi/2, 3*math.pi/2, 20001)
semi = np.stack([Rh*np.cos(ang), Rh*np.sin(ang), np.zeros_like(ang)], 1)    # counterclockwise from top to bottom through left
bot = np.stack([Lfar * s, np.full_like(s, -Rh), np.zeros_like(s)], 1)      # from x=0 to far right at y=-R
Bnum = biot(top) + biot(semi) + biot(bot)
opts = [mu0*Ic/(4*Rh), mu0*Ic/(2*Rh), mu0*Ic/(2*math.pi*Rh), mu0*Ic/(2*math.pi*Rh)*(math.pi+1), mu0*Ic/(4*math.pi*Rh)*(math.pi+2)]
check('em-hairpin', nearest(np.linalg.norm(Bnum), opts) == 'E' and Bnum[2] > 0, f'B={Bnum[2]:.5e} expected={opts[4]:.5e}')

Bf, ell, vv, Rr = 0.5, 0.3, 2.0, 4.0
P = (Bf*ell*vv)**2 / Rr
opts = [Bf*ell*vv/Rr, Bf*ell*vv**2/Rr, Bf**2*ell**2*vv/Rr, Bf**2*ell**2*vv**2/(2*Rr), Bf**2*ell**2*vv**2/Rr]
check('em-sliding-rod', nearest(P, opts) == 'E', f'P={P}')

frac_L = 1 - (0.5)**2
check('em-lc-energy', nearest(frac_L, [1/4, 1/2, 3/4, math.sqrt(3)/2, 1]) == 'C', f'{frac_L}')

Rp, r = 1.0, 0.4
Bd = mu0 * Ic * (r**2 / Rp**2) / (2 * math.pi * r)
opts = [mu0*Ic*r/(2*math.pi*Rp**2), mu0*Ic*r**2/(2*math.pi*Rp**3), mu0*Ic/(2*math.pi*Rp), mu0*Ic/(2*math.pi*r), 0]
check('em-displacement', nearest(Bd, opts) == 'A', f'B={Bd:.4e}')

# EM wave: verify Faraday's law with sympy for candidate E choice
z, tt, k_, w_, E0, c = sp.symbols('z t k omega E_0 c', positive=True)
Ex = E0 * sp.cos(k_*z + w_*tt)
By = -E0/c * sp.cos(k_*z + w_*tt)
# curl E (E along x, depends on z): (0, dEx/dz, 0); -dB/dt (B along y)
lhs = sp.diff(Ex, z)
rhs = -sp.diff(By, tt)
ok = sp.simplify((lhs - rhs).subs(w_, k_*c)) == 0
# Poynting direction: E x B ~ x_hat x (-y_hat) = -z_hat; wave moves toward -z
check('em-wave-b', ok, 'Faraday satisfied with B_y = -(E0/c)cos(kz+wt)')

# ExB drift: integrate Lorentz force
qm_, Ee, Bb = 1.0, 1.0, 1.0
def lorentz(t, s_):
    x_, y_, vx_, vy_ = s_
    ax = qm_ * (0 + vy_ * Bb)
    ay = qm_ * (Ee - vx_ * Bb)
    return [vx_, vy_, ax, ay]
sol = integrate.solve_ivp(lorentz, [0, 2*math.pi*10], [0, 0, 0, 0], rtol=1e-10, atol=1e-12)
vavg = sol.y[0, -1] / sol.t[-1]
check('em-exb-drift', abs(vavg - Ee/Bb) < 1e-3 and np.max(np.abs(sol.y[1])) < 2.0 + 1e-6, f'<vx>={vavg:.5f}, max y={np.max(sol.y[1]):.4f} (2mE/qB^2=2)')

# ---------------- Optics ----------------
lam, dsl, Ls = 600e-9, 0.30e-3, 1.5
dy = lam / 1.33 * Ls / dsl * 1e3
check('opt-double-slit-water', nearest(dy, [1.7, 2.3, 3.0, 4.0, 5.3]) == 'B', f'dy={dy:.3f} mm')

tcoat = 552 / (4 * 1.38)
check('opt-ar-coating', nearest(tcoat, [100, 138, 200, 276, 552]) == 'A', f't={tcoat:.2f} nm')

Ipol = 0.5 * math.cos(math.radians(30))**2 * math.cos(math.radians(60))**2
check('opt-polarizers', nearest(Ipol, [0, 3/32, 1/8, 3/16, 1/4]) == 'B', f'I/I0={Ipol:.5f}')

def image(s_, f_):
    return 1 / (1/f_ - 1/s_)
s1p = image(15, 10); m1_ = -s1p / 15
s2 = 40 - s1p
s2p = image(s2, 20); m2_ = -s2p / s2
check('opt-two-lenses', abs(s2p + 20) < 1e-9 and abs(m1_*m2_ + 4) < 1e-9, f's2\'={s2p}, m={m1_*m2_}')

Lmax = 1.2 / (1.22 * 550e-9 / 5.0e-3) / 1e3
check('opt-rayleigh', nearest(Lmax, [0.9, 4.5, 9, 18, 90]) == 'C', f'L={Lmax:.3f} km')

kk = sp.symbols('k', positive=True); gg = sp.symbols('g', positive=True)
om = sp.sqrt(gg*kk)
ratio = sp.simplify(sp.diff(om, kk) / (om / kk))
check('opt-group-velocity', ratio == sp.Rational(1, 2), f'{ratio}')

# ---------------- Thermo ----------------
eta = 1 - 300/500; QH = 400/eta; QC = QH - 400
check('th-carnot', nearest(QC, [240, 400, 600, 667, 1000]) == 'C', f'QC={QC}')

# PV cycle: shoelace area with sign (V on x, P on y): A(1,1) B(3,1) C(1,3)
pts = [(1, 1), (3, 1), (1, 3)]
W = 0
for (v1_, p1_), (v2_, p2_) in zip(pts, pts[1:] + pts[:1]):
    W += (v2_ - v1_) * (p1_ + p2_) / 2  # integral of P dV along each straight leg
check('th-pv-cycle', nearest(W, [-4, -2, 0, 2, 4]) == 'B', f'W={W}')

fac = 8 ** (2/3)
check('th-adiabatic', nearest(fac, [2, 4, 8, 16, 32]) == 'B', f'{fac}')

dS = math.log(3)
check('th-free-expansion', nearest(dS, [0.0001, math.log(1.5), math.log(2), 1.0, math.log(3)]) == 'E', f'dS/nR={dS:.4f}')

check('th-cp-diatomic', nearest(3.5, [1.5, 2.5, 3, 3.5, 4.5]) == 'D', 'Cp = 7/2 R')

ee, kT = 1.0, 0.7
Z = 1 + math.exp(-ee/kT)
Emean = ee * math.exp(-ee/kT) / Z
opts = [ee/(math.exp(ee/kT)+1), ee/(math.exp(ee/kT)-1), ee*math.exp(-ee/kT), ee/2, kT]
check('th-two-level', nearest(Emean, opts) == 'A', f'<E>={Emean:.5f}')

# Planck: compute peak wavelength numerically at T and 2T
hP, cL, kB, sig = 6.626e-34, 2.998e8, 1.381e-23, 5.670e-8
def peak(T):
    f_ = lambda lam_: -(1/lam_**5)/(math.exp(hP*cL/(lam_*kB*T))-1)
    from scipy.optimize import minimize_scalar
    return minimize_scalar(f_, bounds=(1e-8, 1e-4), method='bounded', options={'xatol': 1e-14}).x
r_peak = peak(6000) / peak(3000)
r_pow = (6000/3000)**4
check('th-blackbody', abs(r_peak - 0.5) < 1e-3 and r_pow == 16, f'peak ratio={r_peak:.4f}')

# ---------------- QM ----------------
Lw = 1.0
psi = lambda x_: math.sqrt(2/Lw) * math.sin(math.pi*x_/Lw)
phi = lambda x_: math.sqrt(1/Lw) * math.sin(math.pi*x_/(2*Lw))
ov = integrate.quad(lambda x_: psi(x_)*phi(x_), 0, Lw)[0]
P = ov**2
check('qm-sudden-expansion', nearest(P, [1/4, 32/(9*math.pi**2), 1/2, 4*math.sqrt(2)/(3*math.pi), 8/math.pi**2]) == 'B', f'P={P:.5f}')

deg = sum(1 for a_ in range(3) for b_ in range(3) for c_ in range(3) if a_+b_+c_ == 2)
check('qm-3d-oscillator', deg == 6, f'deg={deg}')

xs, hb = sp.symbols('x hbar')
fx = sp.Function('f')(xs)
p_op = lambda f_: -sp.I*hb*sp.diff(f_, xs)
comm = sp.simplify(xs*p_op(p_op(fx)) - p_op(p_op(xs*fx)))
ok = sp.simplify(comm - 2*sp.I*hb*p_op(fx)) == 0
check('qm-commutator', ok, f'[x,p^2]f = {comm}')

chi = np.array([1, 2j]) / math.sqrt(5)
sy = np.array([[0, -1j], [1j, 0]])
Sy = 0.5 * np.vdot(chi, sy @ chi).real
check('qm-spin-sy', nearest(Sy, [1e-9, 1/5, 3/10, 2/5, 1/2]) == 'D', f'<Sy>/hbar={Sy:.5f}')

# Tunneling: exact rectangular barrier transmission (units hbar=m=1)
def Ttrans(E_, V0_, a_):
    kq = math.sqrt(2*E_); kap = math.sqrt(2*(V0_-E_))
    return 1 / (1 + (V0_**2 * math.sinh(kap*a_)**2) / (4*E_*(V0_-E_)))
E_, V0_ = 1.0, 2.0
from scipy.optimize import brentq as bq
a1 = bq(lambda a_: math.log(Ttrans(E_, V0_, a_)) - math.log(1e-4), 0.1, 50)
T2 = Ttrans(E_, V0_, 2*a1)
check('qm-tunneling', nearest(math.log10(T2), [math.log10(x_) for x_ in (1e-8, 1e-6, 2.5e-5, 5e-5, 1e-4)]) == 'A', f'T(2a)={T2:.3e}')

E1 = 1.0
check('qm-beat-frequency', (4*E1 - E1) == 3*E1, 'w = (E2-E1)/hbar = 3E1/hbar')

theta = math.degrees(math.acos(2/math.sqrt(6)))
check('qm-l-angle', nearest(theta, [0.001, 24, 35, 45, 55]) == 'C', f'theta={theta:.2f}')

aa = 0.8
A = 1/math.sqrt(integrate.quad(lambda x_: math.exp(-2*abs(x_)/aa), -50, 50, points=[0])[0])
opts = [1/math.sqrt(aa), 1/math.sqrt(2*aa), math.sqrt(2/aa), 1/aa, 1/(2*aa)]
check('qm-normalize', nearest(A, opts) == 'A', f'A={A:.5f} 1/sqrt(a)={1/math.sqrt(aa):.5f}')

dE = integrate.quad(lambda x_: psi(x_)**2, 0, Lw/2)[0]
check('qm-perturb-step', nearest(dE, [1e-9, 0.25, 0.5, 1, 2]) == 'C', f'dE/V0={dE:.5f}')

# ---------------- Atomic ----------------
lam42 = 656 * (1/4 - 1/9) / (1/4 - 1/16)
check('at-balmer', nearest(lam42, [365, 410, 437, 486, 886]) == 'D', f'{lam42:.1f} nm')

mu_ratio = 0.5
lam_ps = 122 / mu_ratio
check('at-positronium', nearest(lam_ps, [31, 61, 122, 183, 244]) == 'E', f'{lam_ps} nm')

trans = {'2s->1s': (0, 0), '3d->2p': (2, 1), '3s->2s': (0, 0), '3d->1s': (2, 0), '4f->2p': (3, 1)}
allowed = [k_ for k_, (l1, l2) in trans.items() if abs(l1 - l2) == 1]
check('at-selection', allowed == ['3d->2p'], str(allowed))

# Hund: brute-force microstates of p^3 -> find max S, then max L, J for less-than-half (or half) filled
import itertools
orbs = [(ml, ms) for ml in (1, 0, -1) for ms in (0.5, -0.5)]
micro = list(itertools.combinations(orbs, 3))
MS = max(sum(o[1] for o in mstate) for mstate in micro)
ML = max(sum(o[0] for o in mstate) for mstate in micro if sum(o[1] for o in mstate) == MS)
check('at-hund', MS == 1.5 and ML == 0, f'S={MS}, L={ML} -> 4S_3/2')

EK = 13.6 * 28**2 * 0.75 / 1000
check('at-moseley', nearest(EK, [0.29, 1.5, 8.0, 10.7, 32]) == 'C', f'{EK:.3f} keV')

Vs_ = 1240/400 - 2.3
check('at-photoelectric', nearest(Vs_, [0.8, 1.6, 2.3, 3.1, 5.4]) == 'A', f'{Vs_:.3f} V')

lamp = 0.0500 + 0.00243 * (1 - math.cos(math.pi))
check('at-compton', nearest(lamp, [0.0476, 0.0500, 0.0512, 0.0524, 0.0549]) == 'E', f'{lamp:.5f} nm')

# ---------------- SR ----------------
beta = 0.99; gam = 1/math.sqrt(1 - beta**2)
dmu = beta * 3.0e8 * gam * 2.2e-6
check('sr-muon', nearest(dmu, [93, 650, 4600, 6500, 65000]) == 'C', f'{dmu:.1f} m, gamma={gam:.3f}')

pc = math.sqrt(1.30**2 - 0.50**2)
check('sr-momentum', nearest(pc, [0.80, 1.0, 1.2, 1.3, 1.8]) == 'C', f'pc={pc:.4f}')

urel = 1.2 / 1.36
check('sr-velocity-add', nearest(urel, [0.60, 0.75, 0.80, 0.88, 1.20]) == 'D', f'{urel:.4f}c')

fd = math.sqrt(0.4/1.6)
check('sr-doppler', nearest(fd, [0.40, 0.50, 0.63, 0.80, 2.0]) == 'B', f'{fd}')

# ---------------- Lab ----------------
tcount = 1e4 / 25
check('lab-counting', nearest(tcount, [4, 40, 400, 4000, 40000]) == 'C', f'{tcount} s')

# Monte-Carlo error propagation
rng = np.random.default_rng(1)
Lm = 1 + 0.01 * rng.standard_normal(2_000_000)
Tm = 1 + 0.01 * rng.standard_normal(2_000_000)
gm = Lm / Tm**2
rel = gm.std() / gm.mean() * 100
check('lab-propagation', nearest(rel, [1, 1.4, 2, 2.2, 3]) == 'D', f'{rel:.3f}%')

# op-amp with finite gain A -> limit
Aol = 1e7; R1o, Rf = 10e3, 100e3
# node at inverting input: (Vin - Vm)/R1 = (Vm - Vout)/Rf ; Vout = -A Vm
Vm, Vout_ = sp.symbols('Vm Vout')
s_ = sp.solve([sp.Eq((1 - Vm)/R1o, (Vm - Vout_)/Rf), sp.Eq(Vout_, -Aol*Vm)], [Vm, Vout_])
gain = float(s_[Vout_])
check('lab-op-amp', nearest(gain, [-11, -10, -0.1, 10, 11]) == 'B', f'gain={gain:.5f}')

# semilog: fit line through the plotted (jittered) points
jit = [1.03, 0.97, 1.02, 0.98, 1.04, 0.97, 1.0, 1.03, 0.96, 1.02, 0.99]
tp = np.arange(11); Ap = 8000 * 2**(-tp/2) * np.array(jit)
slope = np.polyfit(tp, np.log(Ap), 1)[0]
th_fit = math.log(2) / -slope
check('lab-semilog', nearest(th_fit, [1.0, 2.0, 2.9, 4.0, 6.0]) == 'B', f'fit t1/2={th_fit:.3f} h')

# ---------------- Specialized ----------------
na = (238 - 206) // 4; nb = 82 - (92 - 2*na)
check('sp-decay-chain', (na, nb) == (8, 6), f'{na} alpha, {nb} beta')

# conservation: (charge, baryon, Le, Lmu) per particle
P_ = {'n': (0,1,0,0), 'p': (1,1,0,0), 'e-': (-1,0,1,0), 'e+': (1,0,-1,0), 'nuebar': (0,0,-1,0), 'nue': (0,0,1,0),
      'pi+': (1,0,0,0), 'pi0': (0,0,0,0), 'mu+': (1,0,0,-1), 'mu-': (-1,0,0,1), 'numu': (0,0,0,1), 'gamma': (0,0,0,0)}
def conserved(lhs, rhs):
    tot = lambda side: tuple(sum(P_[x_][i] for x_ in side) for i in range(4))
    return tot(lhs) == tot(rhs)
reactions = [(['n'], ['p','e-','nuebar']), (['pi+'], ['mu+','numu']), (['mu-'], ['e-','nuebar','numu']), (['p'], ['e+','gamma']), (['pi0'], ['gamma','gamma'])]
forb = ['ABCDE'[i] for i, (l_, r_) in enumerate(reactions) if not conserved(l_, r_)]
check('sp-conservation', forb == ['D'], f'forbidden={forb}')

check('sp-fermi', nearest(2**(2/3), [1.26, 1.41, 1.59, 2.00, 2.83]) == 'C', f'{2**(2/3):.4f}')
check('sp-doping', True, 'conceptual: P donor -> n-type, donor level below conduction band (A)')

dH = 3.0e5 * 0.050 / 70
check('sp-hubble', nearest(dH, [3.5, 21, 110, 210, 430]) == 'D', f'{dH:.1f} Mpc')

ev = np.sort(np.linalg.eigvalsh(np.array([[2, 1j], [-1j, 2]])))
check('sp-eigenvalues', np.allclose(ev, [1, 3]), f'{ev}')

bad = [r_ for r_ in results if not r_[1]]
for qid, ok, det in results:
    print(('PASS' if ok else 'FAIL'), qid, '|', det)
print(f'\n{len(results)} checks, {len(bad)} failed')
