import * as THREE from 'three';

export interface ProductsHandle {
  group: THREE.Group;
  /** Master opacity controlling the entire floating ensemble. */
  setVisibility(opacity: number): void;
  /** Per-frame drift advance — call from the scene's render tick. */
  update(deltaSeconds: number): void;
}

interface ProductSpec {
  x: number;
  y: number;
  z: number;
  size: number;
  driftAmplitude: number;
  driftSpeed: number;
  rotSpeed: { x: number; y: number; z: number };
  phase: number;
}

/**
 * Eight placeholder boxes scattered around the camera's forward path in the
 * void. They avoid a 2-unit corridor around x=0 (where the logo lives) so the
 * logo stays readable as the camera approaches it.
 */
const SPECS: ProductSpec[] = [
  { x: -3.2, y: 1.0, z:  -7, size: 0.45, driftAmplitude: 0.18, driftSpeed: 0.45, rotSpeed: { x: 0.05, y: 0.08, z: 0.0  }, phase: 0.1 },
  { x:  3.0, y: 2.0, z:  -9, size: 0.55, driftAmplitude: 0.22, driftSpeed: 0.35, rotSpeed: { x: 0.0,  y: 0.06, z: 0.04 }, phase: 0.7 },
  { x: -2.4, y: 2.6, z: -12, size: 0.40, driftAmplitude: 0.16, driftSpeed: 0.50, rotSpeed: { x: 0.04, y: 0.05, z: 0.0  }, phase: 1.3 },
  { x:  2.8, y: 0.5, z: -14, size: 0.50, driftAmplitude: 0.20, driftSpeed: 0.40, rotSpeed: { x: 0.06, y: 0.0,  z: 0.05 }, phase: 2.0 },
  { x: -3.5, y: 1.8, z: -16, size: 0.42, driftAmplitude: 0.24, driftSpeed: 0.30, rotSpeed: { x: 0.0,  y: 0.07, z: 0.0  }, phase: 2.8 },
  { x:  3.4, y: 2.4, z: -18, size: 0.48, driftAmplitude: 0.18, driftSpeed: 0.42, rotSpeed: { x: 0.05, y: 0.05, z: 0.0  }, phase: 3.5 },
  { x: -2.6, y: 0.7, z: -20, size: 0.52, driftAmplitude: 0.22, driftSpeed: 0.38, rotSpeed: { x: 0.03, y: 0.0,  z: 0.06 }, phase: 4.2 },
  { x:  2.5, y: 2.2, z: -22, size: 0.46, driftAmplitude: 0.20, driftSpeed: 0.36, rotSpeed: { x: 0.0,  y: 0.06, z: 0.04 }, phase: 5.0 },
];

export function createProducts(scene: THREE.Scene): ProductsHandle {
  const group = new THREE.Group();
  group.name = 'floating-products';
  scene.add(group);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const meshes: { mesh: THREE.Mesh; spec: ProductSpec; baseY: number; mat: THREE.MeshStandardMaterial }[] = [];

  for (const spec of SPECS) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x9890b8,
      emissive: 0x150f2a,
      emissiveIntensity: 0.5,
      roughness: 0.45,
      metalness: 0.15,
      transparent: true,
      opacity: 0,
    });
    const mesh = new THREE.Mesh(boxGeo, mat);
    mesh.scale.setScalar(spec.size);
    mesh.position.set(spec.x, spec.y, spec.z);
    group.add(mesh);
    meshes.push({ mesh, spec, baseY: spec.y, mat });
  }

  let elapsed = 0;
  let masterOpacity = 0;

  function update(deltaSeconds: number) {
    elapsed += deltaSeconds;
    for (const { mesh, spec, baseY, mat } of meshes) {
      mesh.position.y = baseY + Math.sin((elapsed + spec.phase) * spec.driftSpeed) * spec.driftAmplitude;
      mesh.rotation.x += spec.rotSpeed.x * deltaSeconds;
      mesh.rotation.y += spec.rotSpeed.y * deltaSeconds;
      mesh.rotation.z += spec.rotSpeed.z * deltaSeconds;
      mat.opacity = masterOpacity;
    }
  }

  function setVisibility(opacity: number) {
    masterOpacity = Math.max(0, Math.min(1, opacity));
  }

  return { group, setVisibility, update };
}
