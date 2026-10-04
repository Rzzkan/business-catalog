import { onUnmounted } from 'vue'

// matter-js (~150 KB) is loaded on demand the first time the easter egg fires,
// so it never weighs down the initial page load. The module is cached after the
// first import, making subsequent activations instant.
let Matter = null

/**
 * useGravity — easter egg ala "Google Gravity".
 *
 * activate(elements) akan:
 *  - memotret posisi & ukuran tiap elemen, lalu memakukannya menjadi position:fixed
 *  - membuat body fisika untuk tiap elemen dan MENJATUHKANNYA dengan gravitasi
 *  - elemen menumpuk di lantai & memantul di dinding (semua dalam area layar -> terjangkau)
 *  - tiap elemen bisa diseret / dilempar (mouse + sentuh) dari titik mana pun
 *
 * deactivate() (atau tekan Escape) mengembalikan semua elemen ke keadaan semula.
 */
export function useGravity() {
  // Bound to matter-js submodules once the engine has been dynamically imported.
  let Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events

  let engine = null
  let runner = null
  let mouse = null
  let mouseConstraint = null
  let overlay = null
  let onKey = null
  let onResize = null
  let items = [] // { el, body, ox, oy }
  let walls = []
  let isActive = false
  let prevOverflow = ''
  let prevUserSelect = ''

  const WALL = 600          // tebal dinding (cegah elemen menembus saat dilempar)
  const MAX_SPEED = 45      // px / step — batas kecepatan biar tidak menembus dinding
  const FLOOR_GAP = 24      // jarak lantai dari tepi bawah -> tumpukan selalu terlihat & terjangkau

  function buildWalls(w, h) {
    const opts = { isStatic: true, friction: 0.3, restitution: 0.2 }
    const floorTop = h - FLOOR_GAP
    return [
      Bodies.rectangle(w / 2, floorTop + WALL / 2, w * 4, WALL, opts), // lantai (permukaan atas di y = h - FLOOR_GAP)
      Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 6, opts),           // dinding kiri
      Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 6, opts),        // dinding kanan
    ]
  }

  function clampVelocity() {
    for (const { body } of items) {
      const v = body.velocity
      const s = Math.hypot(v.x, v.y)
      if (s > MAX_SPEED) {
        Body.setVelocity(body, { x: (v.x / s) * MAX_SPEED, y: (v.y / s) * MAX_SPEED })
      }
    }
  }

  // Jaring pengaman: paksa bounding-box tiap elemen tetap di dalam [0,W] x [0,lantai]
  // supaya tidak ada yang tenggelam ke bawah layar / kabur ke samping (selalu terjangkau).
  function constrainBounds() {
    const W = window.innerWidth
    const floorTop = window.innerHeight - FLOOR_GAP
    for (const { body } of items) {
      const b = body.bounds
      let dx = 0
      let dy = 0
      if (b.min.x < 0) dx = -b.min.x
      else if (b.max.x > W) dx = W - b.max.x
      // hanya tahan dari bawah (lantai); biarkan boleh menyembul ke atas tanpa bertarung
      if (b.max.y > floorTop) dy = floorTop - b.max.y
      if (dx !== 0 || dy !== 0) {
        Body.translate(body, { x: dx, y: dy })
        Body.setVelocity(body, {
          x: dx !== 0 ? 0 : body.velocity.x,
          y: dy !== 0 ? 0 : body.velocity.y,
        })
      }
    }
  }

  function syncDom() {
    for (const { el, body, ox, oy } of items) {
      const dx = body.position.x - ox
      const dy = body.position.y - oy
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`
    }
  }

  async function activate(elements) {
    if (isActive) return

    // Fetch the physics engine on first activation; the module cache keeps
    // later activations synchronous-fast.
    if (!Matter) {
      Matter = (await import('matter-js')).default
    }
    ;({ Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter)

    const w = window.innerWidth
    const h = window.innerHeight

    const targets = (elements || []).filter((el) => {
      const r = el.getBoundingClientRect()
      if (r.width <= 0 || r.height <= 0) return false
      if (r.right < 0 || r.left > w || r.bottom < 0 || r.top > h) return false
      return true
    })
    if (!targets.length) return

    isActive = true

    engine = Engine.create()
    engine.gravity.y = 1
    // iterasi tinggi -> tumpukan stabil, elemen tidak tenggelam menembus lantai
    engine.positionIterations = 20
    engine.velocityIterations = 16
    engine.constraintIterations = 4

    items = targets.map((el) => {
      const r = el.getBoundingClientRect()
      const ox = r.left + r.width / 2
      const oy = r.top + r.height / 2

      // friction rendah + frictionStatic rendah -> tumpukan longgar, gampang ditarik keluar
      const opts = { restitution: 0.2, friction: 0.1, frictionStatic: 0.2, frictionAir: 0.01 }

      // Elemen yang (hampir) bundar -> body lingkaran agar menggelinding alami
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0
      const isCircle =
        Math.abs(r.width - r.height) < 4 && radius >= Math.min(r.width, r.height) / 2 - 1

      let body
      if (isCircle) {
        body = Bodies.circle(ox, oy, Math.max(r.width, r.height) / 2, opts)
      } else {
        const cr = Math.min(14, r.width / 2 - 2, r.height / 2 - 2)
        if (cr > 1) opts.chamfer = { radius: cr }
        body = Bodies.rectangle(ox, oy, r.width, r.height, opts)
      }

      // Massa seragam: elemen besar (mis. search bar) TIDAK menggencet elemen kecil
      // menembus lantai. Tumpukan jadi stabil & semua tetap di dalam layar.
      Body.setMass(body, 2)

      // Elemen sangat lebar (mis. search bar selebar layar) -> kunci rotasi supaya
      // jatuh rata. Kalau dibiarkan berputar, kotak pembatasnya bisa setinggi layar
      // dan menjebol tumpukan / mendorong elemen lain ke luar layar.
      const wide = r.width > w * 0.55
      if (wide) Body.setInertia(body, Infinity)

      // sedikit dorongan & putaran awal supaya jatuhnya terasa hidup
      if (!wide) Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1)
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0 })

      // Pakukan elemen di posisi aslinya, simpan style asli untuk dipulihkan
      el.dataset.gravPrev = el.getAttribute('style') ?? '__none__'
      Object.assign(el.style, {
        position: 'fixed',
        left: `${r.left}px`,
        top: `${r.top}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        margin: '0',
        zIndex: '40',
        transition: 'none',
        pointerEvents: 'none',
        willChange: 'transform',
        boxSizing: 'border-box',
        transformOrigin: 'center center',
      })

      return { el, body, ox, oy }
    })

    walls = buildWalls(w, h)
    Composite.add(engine.world, [...items.map((i) => i.body), ...walls])

    // Overlay penangkap mouse/sentuh. z-index DI BAWAH navbar (z-50) supaya link navbar
    // (mis. "Beranda") tetap bisa diklik. Elemen yang jatuh ber-pointer-events:none,
    // jadi klik di area lain tetap tembus ke overlay ini untuk fisika.
    overlay = document.createElement('div')
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '30',
      cursor: 'grab',
      background: 'transparent',
      touchAction: 'none',
    })
    overlay.addEventListener('mousedown', () => { overlay.style.cursor = 'grabbing' })
    overlay.addEventListener('mouseup', () => { overlay.style.cursor = 'grab' })
    document.body.appendChild(overlay)

    mouse = Mouse.create(overlay)
    mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.25, damping: 0, render: { visible: false } },
    })
    Composite.add(engine.world, mouseConstraint)

    // Kunci scroll selama efek berjalan
    prevOverflow = document.body.style.overflow
    prevUserSelect = document.body.style.userSelect
    document.body.style.overflow = 'hidden'
    document.body.style.userSelect = 'none'

    Events.on(engine, 'beforeUpdate', clampVelocity)
    Events.on(engine, 'afterUpdate', constrainBounds)
    Events.on(engine, 'afterUpdate', syncDom)

    runner = Runner.create()
    Runner.run(runner, engine)

    // Escape untuk mengembalikan (tanpa UI yang terlihat)
    onKey = (e) => { if (e.key === 'Escape') deactivate() }
    window.addEventListener('keydown', onKey)

    onResize = () => {
      if (!engine) return
      Composite.remove(engine.world, walls)
      walls = buildWalls(window.innerWidth, window.innerHeight)
      Composite.add(engine.world, walls)
    }
    window.addEventListener('resize', onResize)
  }

  function deactivate() {
    if (!isActive) return
    isActive = false

    if (runner) Runner.stop(runner)
    if (engine) {
      Events.off(engine, 'beforeUpdate', clampVelocity)
      Events.off(engine, 'afterUpdate', constrainBounds)
      Events.off(engine, 'afterUpdate', syncDom)
    }
    if (onKey) window.removeEventListener('keydown', onKey)
    if (onResize) window.removeEventListener('resize', onResize)

    for (const { el } of items) {
      const prev = el.dataset.gravPrev
      if (prev == null || prev === '__none__') {
        el.removeAttribute('style')
      } else {
        el.setAttribute('style', prev)
      }
      delete el.dataset.gravPrev
    }

    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay)
    document.body.style.overflow = prevOverflow
    document.body.style.userSelect = prevUserSelect

    if (engine) {
      Composite.clear(engine.world)
      Engine.clear(engine)
    }

    items = []
    walls = []
    engine = runner = mouse = mouseConstraint = overlay = onKey = onResize = null
  }

  onUnmounted(deactivate)

  return { activate, deactivate }
}
