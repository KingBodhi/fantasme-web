import * as THREE from 'three';

export interface FloorHandle {
  mesh: THREE.Mesh;
  /** Brightness of the trapezoidal light pool on the floor in front of the door. */
  setSpillIntensity(intensity: number): void;
}

/**
 * Generate a vertical gradient texture used for the light pool on the floor.
 * Bright at the door-end (UV.v ≈ 0), fading to transparent at the camera-end.
 */
function makeSpillTexture(): THREE.CanvasTexture {
  const W = 128;
  const H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('floor.ts: 2D canvas context unavailable');
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0.0, 'rgba(255, 248, 220, 1.0)');
  grad.addColorStop(0.15, 'rgba(255, 248, 220, 0.75)');
  grad.addColorStop(0.5, 'rgba(255, 246, 210, 0.30)');
  grad.addColorStop(1.0, 'rgba(255, 246, 210, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  // Slight horizontal feathering so the edges of the beam aren't razor-sharp.
  const sideGrad = ctx.createLinearGradient(0, 0, W, 0);
  sideGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0.9)');
  sideGrad.addColorStop(0.15, 'rgba(0, 0, 0, 0.0)');
  sideGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.0)');
  sideGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.9)');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = sideGrad;
  ctx.fillRect(0, 0, W, H);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/**
 * Build a trapezoidal quad on the floor that catches the doorway light.
 * Narrow at the door (matches doorway), wider at the camera side.
 */
function buildSpillGeometry(): THREE.BufferGeometry {
  const NEAR_HALF = 0.5; // door-side half-width (matches door)
  const FAR_HALF = 1.4; // camera-side half-width (light spreads)
  const NEAR_Z = 0.05; // just in front of the door, on the dark-room side
  const FAR_Z = 5.0; // extends well into the dark room
  const Y = -0.045; // hover just above the (slightly recessed) floor

  // 4 vertices, 2 triangles
  const positions = new Float32Array([
    -NEAR_HALF, Y, NEAR_Z, // door-left (UV 0,0)
    +NEAR_HALF, Y, NEAR_Z, // door-right (UV 1,0)
    -FAR_HALF, Y, FAR_Z,   // far-left (UV 0,1)
    +FAR_HALF, Y, FAR_Z,   // far-right (UV 1,1)
  ]);
  const uvs = new Float32Array([
    0, 0,
    1, 0,
    0, 1,
    1, 1,
  ]);
  const indices = [0, 1, 2, 1, 3, 2];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function createFloor(scene: THREE.Scene): FloorHandle {
  // ── Floor: covers only the DARK room (z >= ~−1). Past the doorway the
  // floor doesn't extend, so the bright back-wall fills the camera view
  // once the user has stepped through.
  // Floor begins exactly at the doorway plane (z=0) and extends back into
  // the dark room. NOT extending into z<0 keeps the camera's line-of-sight
  // to the bottom of the wall hole unobstructed (visible bottom crack), and
  // means the floor never enters the bright room past the threshold.
  const FLOOR_CENTER_Z = 6.5;
  const FLOOR_W = 24;
  const FLOOR_D = 13;
  const geo = new THREE.PlaneGeometry(FLOOR_W, FLOOR_D);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.88,
    metalness: 0.0,
  });
  // Floor sits a few cm below the door's bottom edge so it doesn't occlude
  // the bottom perimeter crack of light at the doorway.
  const FLOOR_Y = -0.05;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(0, FLOOR_Y, FLOOR_CENTER_Z);
  mesh.name = 'floor';
  scene.add(mesh);

  // ── Light spill: the trapezoidal pool of light that pours out from under
  // the door. Additive blend so it adds warmth on top of the dark floor.
  const spillTex = makeSpillTexture();
  const spillMat = new THREE.MeshBasicMaterial({
    map: spillTex,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const spillMesh = new THREE.Mesh(buildSpillGeometry(), spillMat);
  spillMesh.name = 'floor-light-spill';
  scene.add(spillMesh);

  function setSpillIntensity(intensity: number) {
    spillMat.opacity = Math.max(0, Math.min(1.4, intensity)) * 0.85;
  }

  return { mesh, setSpillIntensity };
}
