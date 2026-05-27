import * as THREE from 'three';
import { createCameraRig, type CameraRig } from './camera';
import { createBrightRoom, createDoor, type DoorHandle } from './door';
import { createFloor, type FloorHandle } from './floor';
import { createLights, type LightsHandle } from './lights';
import { createLogo, type LogoHandle } from './logo';
import { createPostFX, type PostFXHandle } from './postfx';

export interface HeroScene {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  rig: CameraRig;
  door: DoorHandle;
  lights: LightsHandle;
  logo: LogoHandle;
  floor: FloorHandle;
  postfx: PostFXHandle;
  /** Update mouse position for logo tilt (clientX/clientY in CSS pixels). */
  setMouse(clientX: number, clientY: number): void;
  /** Advance the entire hero scene to scroll progress t ∈ [0, 1]. */
  setProgress(t: number): void;
  /** Interpolate between dark-void aesthetic (0) and bright-luminous-room (1). */
  setLuminance(t: number): void;
  dispose(): void;
}

export function initHeroScene(canvas: HTMLCanvasElement): HeroScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.max(1, Math.min(window.devicePixelRatio, 2)));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // Light atmospheric fog — keeps the back wall from looking like a flat
  // backdrop and gives the bright room a sense of depth.
  scene.fog = new THREE.Fog(0xffffff, 8, 28);

  // setLuminance is now a no-op (kept for the timeline's onUpdate signature).
  // Brightness is driven by real geometry — the dark front wall blocks the
  // bright back room until the door opens.
  function setLuminance(_t: number) {
    /* no-op — see comment above */
  }

  const rig = createCameraRig();

  const lights = createLights(scene);
  createBrightRoom(scene); // huge bright back-wall (the actual "bright room")
  const door = createDoor(scene);
  const floor = createFloor(scene);
  const logo = createLogo(scene);

  // Mouse tracking — used by the logo to tilt as a floating object would.
  let mouseX = 0;
  let mouseY = 0;
  function setMouse(clientX: number, clientY: number) {
    mouseX = (clientX / window.innerWidth - 0.5) * 2;
    mouseY = (clientY / window.innerHeight - 0.5) * 2;
  }

  const postfx = createPostFX(renderer, scene, rig.camera);

  /** Read the canvas's CSS box and resize the renderer + composer + camera. */
  function sync() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    if (w === 0 || h === 0) return;
    // updateStyle=true so canvas.style.width/height match the CSS box exactly,
    // preventing the renderer's drawing buffer from being letterboxed when
    // the browser's devicePixelRatio is reported as < 1.
    renderer.setSize(w, h, true);
    postfx.setSize(w, h);
    rig.resize(w / h);
  }
  sync();

  // The master timeline in scroll.ts now drives the per-property setters
  // directly. This setProgress remains as a convenience hook for tests /
  // debugging that need to seek the whole scene to a specific point without
  // wiring up GSAP.
  function setProgress(t: number) {
    rig.setProgress(t);
  }
  setProgress(0);

  const ro = new ResizeObserver(() => sync());
  ro.observe(canvas);
  window.addEventListener('resize', sync, { passive: true });

  let rafId = 0;
  let lastTime = performance.now();
  function tick(now: number) {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    logo.update(dt, mouseX, mouseY);
    postfx.composer.render();
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick as FrameRequestCallback);

  return {
    renderer,
    scene,
    rig,
    door,
    lights,
    logo,
    floor,
    postfx,
    setProgress,
    setLuminance,
    setMouse,
    dispose() {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', sync);
      ro.disconnect();
      postfx.composer.dispose();
      renderer.dispose();
    },
  };
}
