import * as THREE from 'three';

export interface CameraRig {
  camera: THREE.PerspectiveCamera;
  /** Advance the camera along its keyframed path. t ∈ [0, 1]. */
  setProgress(t: number): void;
  resize(aspect: number): void;
}

interface Keyframe {
  t: number;
  pos: THREE.Vector3;
  lookAt: THREE.Vector3;
}

const KEYFRAMES: Keyframe[] = [
  { t: 0.0,  pos: new THREE.Vector3(0, 1.6,  6), lookAt: new THREE.Vector3(0, 1.6, -10) },
  { t: 0.20, pos: new THREE.Vector3(0, 1.6,  3), lookAt: new THREE.Vector3(0, 1.6, -10) },
  { t: 0.40, pos: new THREE.Vector3(0, 1.6,  0), lookAt: new THREE.Vector3(0, 1.6, -10) },
  { t: 0.65, pos: new THREE.Vector3(0, 1.6, -3), lookAt: new THREE.Vector3(0, 1.6, -10) },
  { t: 1.0,  pos: new THREE.Vector3(0, 1.6, -6), lookAt: new THREE.Vector3(0, 1.6, -10) },
];

// Hoist the lookAt scratch vector so we don't allocate every frame.
const scratchLookAt = new THREE.Vector3();

export function createCameraRig(): CameraRig {
  const camera = new THREE.PerspectiveCamera(55, 1, 0.05, 100);

  function setProgress(t: number) {
    const clamped = Math.max(0, Math.min(1, t));

    // Find the segment [a, b] enclosing `clamped`.
    let a = KEYFRAMES[0]!;
    let b = KEYFRAMES[KEYFRAMES.length - 1]!;
    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
      const next = KEYFRAMES[i + 1]!;
      if (clamped <= next.t) {
        a = KEYFRAMES[i]!;
        b = next;
        break;
      }
    }

    const span = b.t - a.t;
    const segT = span === 0 ? 0 : (clamped - a.t) / span;
    // Smoothstep for a gentler ease between keyframes.
    const e = segT * segT * (3 - 2 * segT);

    camera.position.lerpVectors(a.pos, b.pos, e);
    scratchLookAt.lerpVectors(a.lookAt, b.lookAt, e);
    camera.lookAt(scratchLookAt);
  }

  function resize(aspect: number) {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }

  setProgress(0);
  return { camera, setProgress, resize };
}
