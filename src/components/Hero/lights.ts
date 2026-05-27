import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export interface LightsHandle {
  /** Brightness of the flood light spilling through the open door. */
  setFlood(intensity: number): void;
  /** Brightness of the dim ambient inside the dark room. */
  setAmbient(intensity: number): void;
}

let uniformsInitialised = false;
function initRectAreaUniforms() {
  if (uniformsInitialised) return;
  RectAreaLightUniformsLib.init();
  uniformsInitialised = true;
}

export function createLights(scene: THREE.Scene): LightsHandle {
  initRectAreaUniforms();

  // Very low ambient so the door itself catches a hint of definition.
  const ambient = new THREE.AmbientLight(0xfff5e0, 0.04);
  scene.add(ambient);

  // Flood light behind the door — initially OFF. Phase 1.3 will ramp this
  // up as the door opens. Width/height roughly matches the door for a
  // believable directional bleed when the door swings open.
  const flood = new THREE.RectAreaLight(0xfff5e0, 0, 1.4, 2.6);
  flood.position.set(0, 1.6, -0.6); // just behind the door, threshold-level
  flood.lookAt(0, 1.6, 1); // shines forward toward the camera
  flood.name = 'door-flood';
  scene.add(flood);

  function setFlood(intensity: number) {
    flood.intensity = intensity;
  }

  function setAmbient(intensity: number) {
    ambient.intensity = intensity;
  }

  return { setFlood, setAmbient };
}
