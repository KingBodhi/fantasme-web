import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../../lib/lenis';
import type { HeroScene } from './scene';

export interface HeroScrollHandle {
  timeline: gsap.core.Timeline;
  destroy(): void;
}

export function initHeroScroll(heroEl: HTMLElement, hero: HeroScene): HeroScrollHandle {
  getLenis();

  const proxy = {
    cameraT: 0,
    doorOpen: 0,
    crack: 3.5,
    flood: 0,
    ambient: 0.04,
    logoOpacity: 0,
  };

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
    onUpdate() {
      hero.rig.setProgress(proxy.cameraT);
      hero.door.setOpenAmount(proxy.doorOpen);
      hero.door.setCrackIntensity(proxy.crack);
      hero.lights.setFlood(proxy.flood);
      hero.lights.setAmbient(proxy.ambient);
      hero.logo.setOpacity(proxy.logoOpacity);
      // Floor light spill tracks door open (light pours in as door opens).
      hero.floor.setSpillIntensity(proxy.doorOpen);
    },
  });

  // ── Camera: linear progress 0→1; camera.ts shapes the keyframe ease.
  tl.to(proxy, { cameraT: 1, duration: 1 }, 0);

  // ── Door: opens early (cracks at 5%, fully open by 30%). The light response
  // below is *synchronized* with the door's opening curve so the brightness
  // grows naturally as more light pours through — not a fixed glow.
  tl.to(proxy, { doorOpen: 0.30, duration: 0.10, ease: 'power2.in'    }, 0.05);
  tl.to(proxy, { doorOpen: 0.90, duration: 0.10, ease: 'power2.inOut' }, 0.15);
  tl.to(proxy, { doorOpen: 1.00, duration: 0.05, ease: 'power2.out'   }, 0.25);

  // ── Crack base intensity: stays HIGH at scroll 0 (dramatic perimeter
  // glow). door.ts applies an inverse decay tied to doorOpen, so the
  // visible glow naturally fades as the door swings open and the bright
  // back-wall takes over the lighting load.
  tl.to(proxy, { crack: 4.0, duration: 0.10, ease: 'sine.in' }, 0.0);
  tl.to(proxy, { crack: 2.5, duration: 0.40, ease: 'sine.out' }, 0.40);

  // ── Flood (RectAreaLight behind the door): scales with door open amount —
  // more open = more directional light pouring out.
  tl.to(proxy, { flood: 3.5, duration: 0.25, ease: 'sine.in'  }, 0.05);
  tl.to(proxy, { flood: 1.2, duration: 0.30, ease: 'sine.out' }, 0.45);

  // ── Ambient: dark room is lifted slightly by the door light spill, then
  // continues rising once the camera crosses the threshold.
  tl.to(proxy, { ambient: 0.30, duration: 0.25, ease: 'sine.in' }, 0.05);
  tl.to(proxy, { ambient: 0.65, duration: 0.30, ease: 'sine.in' }, 0.40);

  // ── Logo: visible AS SOON AS the door cracks open, reaches full black by
  // the time the camera is well inside the bright room.
  tl.to(proxy, { logoOpacity: 1.0, duration: 0.30, ease: 'sine.in' }, 0.05);

  // ── DOM overlay choreography ─────────────────────────────────
  const hintEl  = document.querySelector<HTMLElement>('[data-scroll-hint]');
  const endUiEl = document.querySelector<HTMLElement>('[data-hero-end-ui]');

  // Scroll hint fades out as soon as user starts scrolling
  if (hintEl) {
    tl.to(hintEl, { opacity: 0, duration: 0.06, ease: 'sine.out' }, 0.04);
  }

  // End-state UI fades in only at the very end of the scroll animation
  if (endUiEl) {
    tl.to(endUiEl, { opacity: 1, duration: 0.10, ease: 'sine.in' }, 0.88);
    tl.call(() => endUiEl.classList.add('is-visible'), [], 0.95);
  }

  return {
    timeline: tl,
    destroy() {
      tl.scrollTrigger?.kill();
      tl.kill();
    },
  };
}
