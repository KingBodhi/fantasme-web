import * as THREE from 'three';
import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  KernelSize,
  NoiseEffect,
  RenderPass,
  VignetteEffect,
} from 'postprocessing';

export interface PostFXHandle {
  composer: EffectComposer;
  setSize(width: number, height: number): void;
}

export function createPostFX(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): PostFXHandle {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  // Bloom: catches only the very brightest pixels (HDR back-glow + beam
  // hotspot). High luminance threshold so the dark room stays DARK; smaller
  // kernel so bloom doesn't bleed onto the (pure-black) logo at scroll 100%.
  const bloom = new BloomEffect({
    intensity: 0.32,
    luminanceThreshold: 1.05,
    luminanceSmoothing: 0.05,
    mipmapBlur: true,
    kernelSize: KernelSize.MEDIUM,
  });

  // Vignette: darkens the corners, sells the "looking through a hood" feel.
  const vignette = new VignetteEffect({
    darkness: 0.55,
    offset: 0.35,
  });

  // Subtle film grain — overlay blend, very low opacity.
  const noise = new NoiseEffect({
    blendFunction: BlendFunction.OVERLAY,
    premultiply: true,
  });
  noise.blendMode.opacity.value = 0.08;

  composer.addPass(new EffectPass(camera, bloom, vignette, noise));

  function setSize(width: number, height: number) {
    // Composer uses the renderer's pixel ratio implicitly.
    composer.setSize(width, height);
  }

  return { composer, setSize };
}
