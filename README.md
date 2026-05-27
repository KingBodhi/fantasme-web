# FANTASME⁺ — Tier-3 Hero (test)

SS26 drop site. Branch `tier3-hero` introduces a mont-fort-class scroll experience: dark room → opening door → ethereal void with the FANTASME⁺ logo growing as the camera approaches it.

Phase 1 of the plan at `/Users/sirakstudios/.claude/plans/joyful-wibbling-treehouse.md`.

## Run it

```sh
npm install
npm run dev
```

Open <http://localhost:4321/>. Scroll. The hero spans 6 viewports of vertical scroll.

The existing static pages (the previous SS26 site) are still reachable, untouched:

- <http://localhost:4321/home.html>
- <http://localhost:4321/lookbook.html>
- <http://localhost:4321/product.html>
- <http://localhost:4321/archive.html>
- <http://localhost:4321/waitlist.html>

## Stack

| Package | Role |
|---|---|
| `astro` ^5.2 | Build + routing |
| `three` ^0.172 | WebGL scene |
| `gsap` ^3.12 + `ScrollTrigger` | Master scroll timeline |
| `lenis` ^1.1 | Smooth/inertial scroll |
| `postprocessing` ^6.36 | Bloom + vignette + grain |

## Architecture

```
src/
├── pages/index.astro         hero page entry
├── layouts/Base.astro        <html> shell + global CSS
├── lib/lenis.ts              singleton smooth-scroll
├── styles/
│   ├── tokens.css            brand variables ported from existing CSS
│   ├── global.css            reset + body bg #000
│   └── hero.css              .hero-stage + .hero-scroll positioning
└── components/Hero/
    ├── Hero.astro            stage markup + boot script
    ├── scene.ts              renderer, scene, render loop, resize
    ├── camera.ts             keyframed camera path; setProgress(t)
    ├── door.ts               door + back-glow + crack lights
    ├── logo.ts               FANTASME⁺ wordmark plane (canvas-generated texture)
    ├── products.ts           floating placeholder boxes
    ├── lights.ts             ambient + flood (behind door)
    ├── postfx.ts             EffectComposer: bloom + vignette + noise
    └── scroll.ts             master GSAP timeline (the scroll choreography)
```

The `.hero-stage` is `position: fixed; inset: 0` — the canvas + DOM overlay live at body level so the WebGL scene is never affected by pin transforms. The `.hero-scroll` sibling section is the tall invisible spacer that defines the scroll range. ScrollTrigger maps `timeline.progress()` 0→1 to the scroll range of `.hero-scroll`.

## Scroll timeline cheat-sheet

Scroll progress is verified end-to-end against the plan timeline:

| Scroll % | Camera Z | Door (rad) | Crack | Logo | Products |
|----------|----------|-----------|-------|------|----------|
| 0 | +6 | 0 | 0.15 | 0 | 0 |
| 15 | +4 | 0 | 0.6 | 0 | 0 |
| 35 | +1 | −0.39 | 1.5 | 0 | 0 |
| 50 | −2 | −1.4 | 3.0 | 0.25 | 0 |
| 70 | −5 | −1.55 | 1.0 | 0.95 | 0.13 |
| 90 | −7.22 | −1.55 | 1.0 | 1.0 | 1.0 |
| 100 | −8 | −1.55 | 1.0 | 1.0 | 1.0 |

In dev mode the hero exposes `window.__hero` for inspection: `window.__hero.hero.rig.camera.position`, `window.__hero.scroll.timeline.progress()`, etc.

## Swapping placeholders for real assets

Phase 1 ships **primitives only**. To upgrade:

| Placeholder | File | Replace with |
|-------------|------|-------------|
| Door + back-glow planes | `src/components/Hero/door.ts` | Authored door GLB (carved frame, panel detail). Hinge group is at door's left edge in world; replace the meshes inside the hinge group, keep the `setOpenAmount` rotation API. |
| Logo (canvas-generated PNG) | `src/components/Hero/logo.ts` | Higher-resolution PNG/SVG/extruded geometry. Keep the `MeshBasicMaterial({transparent, blending: AdditiveBlending})` for the glow. |
| Floating boxes | `src/components/Hero/products.ts` | Real product GLBs. Keep the `SPECS[]` layout (positions + drift parameters); swap `BoxGeometry` for loaded GLB meshes. |
| No textures | `src/components/Hero/scene.ts` | When assets arrive, wire `KTX2Loader` + `basis_transcoder.js` (the mont-fort pattern) for GPU-compressed textures. |

## Out of Phase 1 (explicitly deferred)

- **Horizontal "curated experiences" scroll** — Phase 2. Architecture supports it (single fixed stage + Lenis); needs `gsap.Observer` + scene-state machine.
- **Astro-migrating the existing pages** — Phase 3. The static `/public/*.html` files keep working at their original URLs.
- **Audio** (ambient drone, door creak, void hum) — Phase 4 polish.
- **Mobile-tier perf scaling + `prefers-reduced-motion` fallback** — Phase 1.8, ~½ day.
- **KTX2 / DRACO compressed textures + GLB models** — comes with real-asset workstream.
