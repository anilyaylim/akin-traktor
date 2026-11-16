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
