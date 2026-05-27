import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetikerRegular from 'three/examples/fonts/helvetiker_regular.typeface.json';

export interface LogoHandle {
  group: THREE.Group;
  setOpacity(opacity: number): void;
  /** Per-frame update: idle bob + ease toward mouse-driven tilt. */
  update(deltaSeconds: number, mouseX: number, mouseY: number): void;
  /** Legacy compatibility — no longer used. */
  setBlur(_: number): void;
}

const LOGO_Z = -10;
const LOGO_Y = 1.6;

const font = new FontLoader().parse(helvetikerRegular as unknown as Parameters<FontLoader['parse']>[0]);

/**
 * Build an extruded 3D wordmark "FANTASME⁺" centred at the origin of the
 * returned group. Two TextGeometries — "FANTASME" at full size, "+" at a
 * smaller superscript size — share a single material.
 */
function buildLogoGroup(): THREE.Group {
  const group = new THREE.Group();

  // Pure flat black per the brief — fully diffuse, no metallic reflections.
  const mat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 1.0,
    metalness: 0.0,
    transparent: true,
    opacity: 0,
  });
  // Tag for the shared material on the group so setOpacity can update it.
  (group.userData as Record<string, unknown>).mat = mat;

  const SIZE = 0.65;
  const DEPTH = 0.13;
  const TRACK = SIZE * 0.18;

  // Letter-by-letter so we can apply tracking that matches the brand spec.
  const word = 'FANTASME';
  let xCursor = 0;
  const letterMeshes: { mesh: THREE.Mesh; width: number }[] = [];
  for (const ch of word) {
    const g = new TextGeometry(ch, {
      font,
      size: SIZE,
      depth: DEPTH,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.008,
      bevelOffset: 0,
      bevelSegments: 3,
    });
    g.computeBoundingBox();
    const bbox = g.boundingBox!;
    const w = bbox.max.x - bbox.min.x;
    const mesh = new THREE.Mesh(g, mat);
    mesh.position.x = xCursor - bbox.min.x;
    group.add(mesh);
    letterMeshes.push({ mesh, width: w });
    xCursor += w + TRACK;
  }

  // Superscript "+"
  const plusGeo = new TextGeometry('+', {
    font,
    size: SIZE * 0.55,
    depth: DEPTH,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.008,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  plusGeo.computeBoundingBox();
  const plusBb = plusGeo.boundingBox!;
  const plusMesh = new THREE.Mesh(plusGeo, mat);
  plusMesh.position.x = xCursor - plusBb.min.x + 0.04;
  plusMesh.position.y = SIZE * 0.45;
  group.add(plusMesh);
  xCursor += (plusBb.max.x - plusBb.min.x) + 0.04;

  // Centre the assembled glyphs around the group origin.
  const totalWidth = xCursor - TRACK; // last TRACK shouldn't count
  for (const child of group.children) {
    child.position.x -= totalWidth / 2;
    // Centre vertically on the base-line of capital glyphs (~0.5 size).
    child.position.y -= SIZE * 0.3;
  }

  return group;
}

export function createLogo(scene: THREE.Scene): LogoHandle {
  const group = buildLogoGroup();
  group.position.set(0, LOGO_Y, LOGO_Z);
  group.name = 'fantasme-logo';
  scene.add(group);

  const mat = (group.userData as { mat: THREE.MeshStandardMaterial }).mat;
  let elapsed = 0;

  function setOpacity(opacity: number) {
    mat.opacity = Math.max(0, Math.min(1, opacity));
  }

  function update(dt: number, mouseX: number, mouseY: number) {
    elapsed += dt;
    // Idle bob — subtle vertical float so the logo reads as a hovering object.
    group.position.y = LOGO_Y + Math.sin(elapsed * 0.7) * 0.04;

    // Mouse-driven tilt — lerp toward target rotation for smoothness. Limits
    // the rotation to a small range so the logo "floats" rather than spins.
    const targetRotY = mouseX * 0.18;
    const targetRotX = -mouseY * 0.12;
    group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.06;
  }

  function setBlur(_: number) {
    /* legacy no-op */
  }

  return { group, setOpacity, update, setBlur };
}
