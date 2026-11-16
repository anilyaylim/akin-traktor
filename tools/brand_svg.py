"""Generates the logo SVG symbols used by public/brand/index.html (and copied into the site).
Geometry helpers for tyre treads etc.; run: python3 tools/brand_svg.py > public/brand/symbols.svg.txt"""
import math

def f(v): return f"{v:.2f}".rstrip('0').rstrip('.')

def lugs(cx, cy, r0, r1, n, w0=0.09, w1=0.055, skew=0.0):
    """tyre tread lugs: trapezoids between r0 and r1 (angles in rad)"""
    out = []
    for i in range(n):
        a = i * 2 * math.pi / n
        p = [(r0, a - w0), (r1, a - w1 + skew), (r1, a + w1 + skew), (r0, a + w0)]
        pts = ' '.join(f"{f(cx + r * math.cos(t))},{f(cy + r * math.sin(t))}" for r, t in p)
        out.append(f'<polygon points="{pts}"/>')
    return ''.join(out)

# 1 · wordmark only (270 × 80)
WM = ('<path d="M0 80L28 0H52L80 80H59L40 24L21 80Z"/>'
      '<path d="M92 0H112V80H92Z"/><path d="M112 30L135 0H161L112 62Z"/><path d="M127 45L141 29L166 80H141Z"/>'
      '<path d="M176 0H196V80H176Z"/>'
      '<path d="M208 0H228L250 44V0H270V80H250L228 36V80H208Z"/>')
WM_ACC = '<rect x="31" y="51" width="18" height="10"/>'

# 2 · tread-A icon (100 × 100)
TREAD = (f'<g class="c1">{lugs(50, 50, 39, 48, 22)}</g>'
         '<circle class="c1" cx="50" cy="50" r="40"/><circle class="bg" cx="50" cy="50" r="31"/>'
         '<path class="c1" d="M32 72L45 30H55L68 72H58.5L50 44L41.5 72Z"/><rect class="acc" x="44" y="58" width="12" height="7"/>')

# 3 · hybrid: lowercase "akın" built as a tractor (300 × 124). ground = 115
RW = (66, 66, 42)   # rear wheel = bowl of "a"
FW = (251, 97, 14)  # front wheel hangs under the "n" (front axle)
RWG = (f'<g class="spin" style="transform-origin:{RW[0]}px {RW[1]}px">'
       f'<g class="c1">{lugs(RW[0], RW[1], RW[2] - 2, RW[2] + 7, 26, 0.07, 0.045)}</g>'
       f'<circle class="c1" cx="{RW[0]}" cy="{RW[1]}" r="{RW[2]}"/><circle class="bg" cx="{RW[0]}" cy="{RW[1]}" r="{RW[2] - 13}"/>'
       + ''.join(f'<rect class="c1" x="{RW[0] - 2}" y="{RW[1] - 27}" width="4" height="18" transform="rotate({k * 60} {RW[0]} {RW[1]})"/>' for k in range(6))
       + f'<circle class="acc" cx="{RW[0]}" cy="{RW[1]}" r="9"/></g>')
FWG = (f'<g class="spin f" style="transform-origin:{FW[0]}px {FW[1]}px">'
       f'<g class="c1">{lugs(FW[0], FW[1], FW[2] - 1, FW[2] + 5, 16, 0.12, 0.075)}</g>'
       f'<circle class="c1" cx="{FW[0]}" cy="{FW[1]}" r="{FW[2]}"/><circle class="bg" cx="{FW[0]}" cy="{FW[1]}" r="{FW[2] - 6}"/><circle class="acc" cx="{FW[0]}" cy="{FW[1]}" r="4"/></g>')
HYB = (RWG +
       '<path class="c1" d="M104 26H118V92H104Z"/>'                                   # stem of "a" (seat post)
       '<path class="c1" d="M134 0H148V92H134Z"/><path class="c1" d="M148 58L170 30H188L148 80Z"/><path class="c1" d="M160 64L170 52L190 92H173Z"/>'  # k (cab post)
       '<path class="c1" d="M200 32L214 26V92H200Z"/>'                                 # ı (exhaust-cut top)
       '<path class="c1" d="M226 92V54A25 25 0 0 1 276 54V92H262V56A11 11 0 0 0 240 56V92Z"/>'   # n (hood)
       '<path class="c1" d="M104 86H276V96H104Z"/>'                                    # chassis
       + FWG)

# 4 · retouched current logo: red disc A + KIN + line tractor (420 × 112)
TRACTOR = ('<g class="ln" fill="none" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">'
           '<circle cx="338" cy="70" r="21"/><circle cx="398" cy="82" r="11"/>'
           '<path d="M322 46V12H360L368 46"/><path d="M330 20H354L359 40H330Z" stroke-width="4"/><path d="M314 46H406V68"/><path d="M386 46V24"/></g>'
           '<g class="c1"><circle cx="338" cy="70" r="6"/><circle cx="398" cy="82" r="3.5"/>'
           f'{lugs(338, 70, 22, 29, 18, 0.1, 0.06)}</g>')
RET = ('<circle class="acc" cx="44" cy="52" r="44"/>'
       '<path fill="#fff" fill-rule="evenodd" d="M16 84L38 22H51L73 84H61L56 70H33L28 84ZM37 59H52L44.5 37Z"/><path fill="#fff" d="M60 50L86 40L84 47Z"/>'
       '<g class="acc" transform="translate(96 12) skewX(-8)"><path d="M0 0H20V80H0Z"/><path d="M20 34L46 0H71L35 47Z"/><path d="M27 41L42 29L74 80H49Z"/>'
       '<path d="M84 0H104V80H84Z"/><path d="M116 0H136L158 44V0H178V80H158L136 36V80H116Z"/></g>' + TRACTOR)

if __name__ == '__main__':
    print('WM', WM); print('WM_ACC', WM_ACC); print('TREAD', TREAD); print('HYB', HYB); print('RET', RET)

# 3b · hybrid uppercase: AKIN rides on wheels — the wheels cut fender arches out of the letters,
#      the I is the exhaust stack. (300 × 136)
def _hyb_caps():
    rw, fw = (50, 98, 32), (241, 104, 21)
    mask = ('<mask id="m-hc" maskUnits="userSpaceOnUse" x="-20" y="-40" width="340" height="200">'
            '<rect x="-20" y="-40" width="340" height="200" fill="#fff"/>'
            f'<circle cx="{rw[0]}" cy="{rw[1]}" r="{rw[2] + 6}" fill="#000"/><circle cx="{fw[0]}" cy="{fw[1]}" r="{fw[2] + 5}" fill="#000"/></mask>')
    letters = ('<path d="M0 80L28 0H52L80 80H59L40 24L21 80Z"/>'
               '<path d="M92 0H112V80H92Z"/><path d="M112 30L135 0H161L112 62Z"/><path d="M127 45L141 29L166 80H141Z"/>'
               '<path d="M176 -16L196 -24V80H176Z"/>'                         # I = exhaust stack with a slanted cap
               '<path d="M208 0H228L250 44V0H270V80H250L228 36V80H208Z"/>'
               '<path d="M-4 84H276V92H-4Z"/>')                                # chassis
    wheel = lambda c, lug0, lug1, n, hub: (f'<g class="spin{" f" if c is fw else ""}" style="transform-origin:{c[0]}px {c[1]}px">'
        f'<g class="c1">{lugs(c[0], c[1], c[2] - 2, c[2] + lug1, n, lug0, lug0 * .62)}</g>'
        f'<circle class="c1" cx="{c[0]}" cy="{c[1]}" r="{c[2]}"/><circle class="bg" cx="{c[0]}" cy="{c[1]}" r="{c[2] - hub}"/>'
        f'<circle class="acc" cx="{c[0]}" cy="{c[1]}" r="{max(4, c[2] * .22):.1f}"/></g>')
    spokes = ''.join(f'<rect class="c1" x="{rw[0] - 2}" y="{rw[1] - 20}" width="4" height="12" transform="rotate({k * 60} {rw[0]} {rw[1]})"/>' for k in range(6))
    w_r = wheel(rw, .085, 6, 22, 10).replace('<circle class="acc"', spokes + '<circle class="acc"', 1)
    return (mask + f'<g class="c1" mask="url(#m-hc)">{letters}</g><rect class="acc" x="31" y="44" width="18" height="10"/>' + w_r + wheel(fw, .12, 5, 15, 7))
HYB_CAPS = _hyb_caps()

# 4b · stronger alternative to the current logo: red badge, white A breaking out into a speed line
#      under a heavy italic navy KIN, solid tractor silhouette riding on that line. (430 × 120)
_TR = ('<g class="acc">'
       '<path d="M342 44V10H372L382 44H418V70H342Z"/><path d="M350 16H368L375 40H350Z" class="bg"/>'      # body + cab window
       '<path d="M400 44V22H408V44Z"/></g>'                                                               # exhaust
       f'<g class="c1">{lugs(362, 78, 21, 28, 18, .1, .06)}<circle cx="362" cy="78" r="22"/>{lugs(408, 88, 11, 16, 12, .14, .09)}<circle cx="408" cy="88" r="12"/></g>'
       '<circle class="bg" cx="362" cy="78" r="9"/><circle class="bg" cx="408" cy="88" r="5"/>')
RET2 = ('<rect class="acc" x="0" y="6" width="96" height="96" rx="22"/>'
        '<path fill="#fff" fill-rule="evenodd" d="M14 92L40 18H58L84 92H66L60 74H38L32 92ZM43 60H55L49 40Z"/>'
        '<path class="c1" d="M104 98H430V106H98Z"/>'                                                        # ground line
        '<g class="c1" transform="translate(112 18) skewX(-12)"><path d="M0 0H22V80H0Z"/><path d="M22 34L48 0H74L36 49Z"/><path d="M30 42L45 29L78 80H51Z"/>'
        '<path d="M88 0H110V80H88Z"/><path d="M122 0H144L168 46V0H190V80H168L144 34V80H122Z"/></g>' + _TR)

# icon for 3b: the A riding on the rear wheel
def _hyb_caps_icon():
    full = HYB_CAPS.replace('m-hc', 'm-hci')
    clip = '<clipPath id="cl-hci"><rect x="-14" y="-10" width="104" height="160"/></clipPath>'
    return clip + f'<g clip-path="url(#cl-hci)">{full}</g>'
HYB_CAPS_ICON = _hyb_caps_icon()
