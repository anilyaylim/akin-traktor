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
    """A = tractor cab: flat canopy bar on top ('–'), two slanted ROPS posts ('/ \\'), red dash line as
    the crossbar, and the rear wheel spinning centred right under the A (fender arch cut into the posts)."""
    rw, fw = (40, 97, 30), (241, 104, 21)
    mask = ('<mask id="m-hc" maskUnits="userSpaceOnUse" x="-20" y="-40" width="340" height="200">'
            '<rect x="-20" y="-40" width="340" height="200" fill="#fff"/>'
            f'<circle cx="{rw[0]}" cy="{rw[1]}" r="{rw[2] + 6}" fill="#000"/><circle cx="{fw[0]}" cy="{fw[1]}" r="{fw[2] + 5}" fill="#000"/></mask>')
    cab = ('<path d="M-2 -2H82V10H-2Z"/>'                                     # canopy / roof
           '<path d="M21 10H37L18 84H0Z"/><path d="M43 10H59L80 84H62Z"/>')    # ROPS posts
    letters = (cab +
               '<path d="M92 0H112V80H92Z"/><path d="M112 30L135 0H161L112 62Z"/><path d="M127 45L141 29L166 80H141Z"/>'
               '<path d="M176 -16L196 -24V80H176Z"/>'                         # I = exhaust stack with a slanted cap
               '<path d="M208 0H228L250 44V0H270V80H250L228 36V80H208Z"/>'
               '<path d="M-4 84H276V92H-4Z"/>')                                # chassis
    wheel = lambda c, lug0, lug1, n, hub: (f'<g class="spin{" f" if c is fw else ""}" style="transform-origin:{c[0]}px {c[1]}px">'
        f'<g class="c1">{lugs(c[0], c[1], c[2] - 2, c[2] + lug1, n, lug0, lug0 * .62)}</g>'
        f'<circle class="c1" cx="{c[0]}" cy="{c[1]}" r="{c[2]}"/><circle class="bg" cx="{c[0]}" cy="{c[1]}" r="{c[2] - hub}"/>'
        f'<circle class="acc" cx="{c[0]}" cy="{c[1]}" r="{max(4, c[2] * .22):.1f}"/></g>')
    spokes = ''.join(f'<rect class="c1" x="{rw[0] - 2}" y="{rw[1] - 19}" width="4" height="11" transform="rotate({k * 60} {rw[0]} {rw[1]})"/>' for k in range(6))
    w_r = wheel(rw, .09, 6, 21, 10).replace('<circle class="acc"', spokes + '<circle class="acc"', 1)
    return (mask + f'<g class="c1" mask="url(#m-hc)">{letters}</g>'
            '<path class="acc" d="M27 44H53L55.6 54H24.4Z"/>'                  # red crossbar = dashboard line
            + w_r + wheel(fw, .12, 5, 15, 7))
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
    clip = '<clipPath id="cl-hci"><rect x="-6" y="-10" width="92" height="160"/></clipPath>'
    return clip + f'<g clip-path="url(#cl-hci)">{full}</g>'
HYB_CAPS_ICON = _hyb_caps_icon()

# 3c · C3 — the whole word is a tractor in side view, with real proportions: tall cab "A" over a big rear
#      wheel with its fender, low hood made of K-I-N (I = exhaust stack), front weight, small front wheel.
#      (≈ 300 × 165 + tagline)
_WM_K = '<path d="M92 0H112V80H92Z"/><path d="M112 30L135 0H161L112 62Z"/><path d="M127 45L141 29L166 80H141Z"/>'
_WM_N = '<path d="M208 0H228L250 44V0H270V80H250L228 36V80H208Z"/>'
def _c3(mid='m-c3'):
    rw, fw = (59, 108, 42), (240, 132, 20)
    mask = (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="-30" y="-30" width="360" height="230">'
            '<rect x="-30" y="-30" width="360" height="230" fill="#fff"/>'
            f'<circle cx="{rw[0]}" cy="{rw[1]}" r="{rw[2] + 7}" fill="#000"/><circle cx="{fw[0]}" cy="{fw[1]}" r="{fw[2] + 5}" fill="#000"/></mask>')
    cab = ('<path d="M8 0H114V10H8Z"/>'                                              # roof with overhang
           '<path d="M28 10H44L31 72H13Z"/>'                                          # rear post
           '<path d="M66 10H82L106 72H88Z"/>')                                        # windscreen post (raked forward)
    hood = (f'<g transform="translate(124 48) scale(.68 .65) translate(-92 0)">{_WM_K}</g>'
            '<path d="M184 30L199 20V100H184Z"/>'                                      # I = exhaust stack, slanted cap
            f'<g transform="translate(210 48) scale(.68 .65) translate(-208 0)">{_WM_N}</g>'
            '<path d="M256 60H272L280 70V108H256Z"/>'                                  # front weight / grille block
            '<path d="M110 98H280V108H110Z"/>')                                        # chassis rail
    fender = f'<path class="c1" d="M{rw[0]-58} {rw[1]}A58 58 0 0 1 {rw[0]+58} {rw[1]}H{rw[0]+49}A49 49 0 0 0 {rw[0]-49} {rw[1]}Z"/>'
    grille = ''.join(f'<rect class="bg" x="260" y="{y}" width="16" height="3"/>' for y in (74, 82, 90))
    wheel = lambda c, n, lug, hub, f='': (f'<g class="spin{f}" style="transform-origin:{c[0]}px {c[1]}px">'
        f'<g class="c1">{lugs(c[0], c[1], c[2] - 2, c[2] + lug, n, .1 if not f else .13, .062 if not f else .08)}</g>'
        f'<circle class="c1" cx="{c[0]}" cy="{c[1]}" r="{c[2]}"/><circle class="bg" cx="{c[0]}" cy="{c[1]}" r="{c[2] - hub}"/>'
        + (''.join(f'<rect class="c1" x="{c[0]-2}" y="{c[1]-c[2]+hub-1}" width="4" height="{c[2]-hub-8}" transform="rotate({k*60} {c[0]} {c[1]})"/>' for k in range(6)) if not f else '')
        + f'<circle class="acc" cx="{c[0]}" cy="{c[1]}" r="{max(4.5, c[2] * .22):.1f}"/></g>')
    return (mask + f'<g class="c1" mask="url(#{mid})">{cab}{hood}</g>' + fender + grille +
            '<path class="acc" d="M37.2 40H76.9L79.9 48H35.4Z"/>'                       # red crossbar = dashboard
            '<path class="acc" d="M272 60H276L280 64V70H272Z"/>'                         # headlight
            + wheel(rw, 22, 7, 12) + wheel(fw, 15, 5, 7, ' f')
            + '<path class="c1" d="M-12 159H292V162H-12Z" opacity=".35"/>')              # ground line
C3 = _c3()
def _c3_icon():
    clip = '<clipPath id="cl-c3i"><rect x="-4" y="-4" width="126" height="170"/></clipPath>'
    return clip + f'<g clip-path="url(#cl-c3i)">{_c3("m-c3i")}</g>'
C3_ICON = _c3_icon()

# 4c · D (new) — front-view emblem: two big tyres either side, the cab between them reads as an "A"
#      (roof bar + raked posts, red dashboard crossbar), grille + headlights below; stacked wordmark. (100 × 100)
def _front(x=0, y=0):
    tread = lambda tx: ''.join(f'<rect class="bg" x="{tx + 3}" y="{yy}" width="14" height="2.6" rx="1"/>' for yy in range(47, 92, 7))
    return (f'<g transform="translate({x} {y})">'
            '<rect class="c1" x="4" y="40" width="20" height="56" rx="6"/><rect class="c1" x="76" y="40" width="20" height="56" rx="6"/>'
            + tread(4) + tread(76) +
            '<rect class="c1" x="2" y="32" width="26" height="5" rx="2"/><rect class="c1" x="72" y="32" width="26" height="5" rx="2"/>'   # fenders
            '<rect class="c1" x="20" y="6" width="60" height="8" rx="2"/>'                                                              # roof
            '<path class="c1" d="M33 14H43L35 60H24Z"/><path class="c1" d="M57 14H67L76 60H65Z"/>'                                     # posts = A legs
            '<path class="acc" d="M38.6 33H61.4L62.7 40H37.3Z"/>'                                                                       # crossbar
            '<rect class="c1" x="34" y="58" width="32" height="30" rx="4"/>'                                                            # hood front / grille
            + ''.join(f'<rect class="bg" x="39" y="{yy}" width="22" height="2.4" rx="1"/>' for yy in (68, 74, 80)) +
            '<circle class="acc" cx="40" cy="63" r="2.6"/><circle class="acc" cx="60" cy="63" r="2.6"/>'                             # headlights
            '<rect class="c1" x="24" y="76" width="10" height="4"/><rect class="c1" x="66" y="76" width="10" height="4"/>'              # axle
            '</g>')
FRONT = _front()
D_NEW = (_front(85, 0) +
         f'<g transform="translate(27 120) scale(.8)"><g class="c1">{WM}</g><g class="acc">{WM_ACC}</g></g>'
         '<rect class="acc" x="27" y="196" width="216" height="3"/>')

# 3d · C4 — like C3, but the whole word AKIN rides on the hood; where the "A" was, the tractor keeps its
#      real operator station: canopy, two posts, seat and steering wheel over the big rear wheel. (≈ 350 × 165)
_WM_A = '<path d="M0 80L28 0H52L80 80H59L40 24L21 80Z"/>'
def _c4(mid='m-c4', with_hood=True):
    rw, fw = (59, 108, 42), (293, 132, 20)
    mask = (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="-30" y="-30" width="440" height="230">'
            '<rect x="-30" y="-30" width="440" height="230" fill="#fff"/>'
            f'<circle cx="{rw[0]}" cy="{rw[1]}" r="{rw[2] + 7}" fill="#000"/><circle cx="{fw[0]}" cy="{fw[1]}" r="{fw[2] + 9}" fill="#000"/></mask>')
    cab = ('<path d="M6 0H106V9H6Z"/>'                                    # canopy
           '<path d="M16 9H27L25 76H12Z"/>'                               # rear post
           '<path d="M86 9H97L111 74H100Z"/>'                             # front post, raked
           '<path d="M33 18L43 16L48 46H38Z"/><path d="M36 42H70V50H36Z"/>'  # seat back + cushion
           '')
    hood = ''
    if with_hood:
        sx, sy = .72, .7
        hood = (f'<g transform="translate(119 44) scale({sx} {sy})">{_WM_A}</g>'
                f'<g transform="translate(185 44) scale({sx} {sy}) translate(-92 0)">{_WM_K}</g>'
                '<path d="M246 28L260 19V100H246Z"/>'                             # I = exhaust stack
                f'<g transform="translate(268 44) scale({sx} {sy}) translate(-208 0)">{_WM_N}</g>'
                '<path d="M317 62H333L341 72V108H317Z"/>'                         # front weight / grille
                '<path d="M108 98H341V108H108Z"/>')                               # chassis rail
    fender = f'<path class="c1" d="M{rw[0]-58} {rw[1]}A58 58 0 0 1 {rw[0]+58} {rw[1]}H{rw[0]+49}A49 49 0 0 0 {rw[0]-49} {rw[1]}Z"/>'
    steer = ('<g fill="none" class="ln" stroke-width="4.5" stroke-linecap="round">'
             '<path d="M88 56L80 34"/><path d="M68 30L92 36"/></g>')            # column + wheel rim (side view)
    extra = ''
    if with_hood:
        extra = (''.join(f'<rect class="bg" x="321" y="{y}" width="16" height="3"/>' for y in (76, 84, 92)) +
                 f'<g transform="translate(119 44) scale(.72 .7)"><g class="acc">{WM_ACC}</g></g>' +   # A crossbar, red
                 '<path class="acc" d="M333 62H337L341 66V72H333Z"/>')                                # headlight
    wheel = lambda c, n, lug, hub, f='': (f'<g class="spin{f}" style="transform-origin:{c[0]}px {c[1]}px">'
        f'<g class="c1">{lugs(c[0], c[1], c[2] - 2, c[2] + lug, n, .1 if not f else .13, .062 if not f else .08)}</g>'
        f'<circle class="c1" cx="{c[0]}" cy="{c[1]}" r="{c[2]}"/><circle class="bg" cx="{c[0]}" cy="{c[1]}" r="{c[2] - hub}"/>'
        + (''.join(f'<rect class="c1" x="{c[0]-2}" y="{c[1]-c[2]+hub-1}" width="4" height="{c[2]-hub-8}" transform="rotate({k*60} {c[0]} {c[1]})"/>' for k in range(6)) if not f else '')
        + f'<circle class="acc" cx="{c[0]}" cy="{c[1]}" r="{max(4.5, c[2] * .22):.1f}"/></g>')
    out = mask + f'<g class="c1" mask="url(#{mid})">{cab}{hood}</g>' + fender + steer + extra + wheel(rw, 22, 7, 12)
    if with_hood:
        ff = f'<path class="c1" d="M{fw[0]-36} {fw[1]}A36 36 0 0 1 {fw[0]+36} {fw[1]}H{fw[0]+31}A31 31 0 0 0 {fw[0]-31} {fw[1]}Z"/>'   # front wheel arch
        out += ff + wheel(fw, 15, 5, 7, ' f') + '<path class="c1" d="M-12 159H352V162H-12Z" opacity=".35"/>'
    return out
C4 = _c4()
def _c4_icon():
    clip = '<clipPath id="cl-c4i"><rect x="-4" y="-4" width="128" height="170"/></clipPath>'
    return clip + f'<g clip-path="url(#cl-c4i)">{_c4("m-c4i", with_hood=False)}</g>'
C4_ICON = _c4_icon()

# 4d · D (v3, refined) — a fine-line emblem: thin double ring, the front-view tractor drawn in clean strokes
#      (cab posts + roof draw the "A", red dashboard line, grille, headlights), light spaced wordmark.
def _emblem(x=0, y=0):
    s = lambda d, w=4, extra='': f'<path d="{d}" stroke-width="{w}"{extra}/>'
    return (f'<g transform="translate({x} {y})" fill="none" stroke-linecap="round" stroke-linejoin="round">'
            '<g class="ln">'
            '<circle cx="50" cy="50" r="46" stroke-width="3"/><circle cx="50" cy="50" r="41" stroke-width="1.2" opacity=".45"/>'
            + s('M30 24H70') + s('M40 24L33 58') + s('M60 24L67 58') +                          # roof + posts = "A"
            '<rect x="18.5" y="47" width="13" height="30" rx="5" stroke-width="3.5"/><rect x="68.5" y="47" width="13" height="30" rx="5" stroke-width="3.5"/>'
            + ''.join(s(f'M22 {yy}H28 M72 {yy}H78', 2) for yy in (54, 60, 66, 72)) +            # tread
            s('M15 42H34 M66 42H85', 3.5) +                                                     # fenders
            '<rect x="40.5" y="54" width="19" height="20" rx="3" stroke-width="3"/>' + s('M45 64H55 M45 69H55', 2) +   # grille
            s('M31.5 66H40.5 M59.5 66H68.5', 3) + s('M24 84H76', 1.6, ' opacity=".5"') +
            '</g>'
            '<path d="M37.4 39H62.6" stroke-width="3.6" style="stroke:var(--a)"/>'
            '</g>'
            '<circle class="acc" cx="' + str(x + 45) + '" cy="' + str(y + 58.8) + '" r="1.9"/><circle class="acc" cx="' + str(x + 55) + '" cy="' + str(y + 58.8) + '" r="1.9"/>')
EMBLEM = _emblem()
D_V3 = (_emblem(0, 0) +
        '<text class="wm" x="124" y="64" font-size="54" letter-spacing="9">AKIN</text>'
        '<path class="c1" d="M126 77H300V78.4H126Z" opacity=".3"/>')
