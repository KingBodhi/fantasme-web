import * as THREE from 'three';

export interface DoorHandle {
  group: THREE.Group;
  /** Closed (0) → open (1). Rotation around the right hinge. */
  setOpenAmount(t: number): void;
  /** Brightness multiplier on the back-glow that beams through the cracks. */
  setCrackIntensity(intensity: number): void;
  backGlow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  /** Spotlight in the bright room that projects a beam onto the dark front wall. */
  beam: THREE.SpotLight;
}

const DOOR_WIDTH = 1.0;
const DOOR_HEIGHT = 2.2;
const FLOOR_Y = 0.0;
const HINGE_X = +DOOR_WIDTH / 2; // RIGHT edge
const MAX_OPEN_RAD = +1.55; // positive Y → left edge swings TOWARD camera

export function createDoor(scene: THREE.Scene): DoorHandle {
  // ── Dark front wall: 4 plane "frame" pieces around the doorway. Uses
  // MeshStandardMaterial so it RECEIVES the SpotLight beam projecting
  // through the doorway, casting a realistic doorway-shaped light wash.
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    roughness: 1.0,
    metalness: 0.0,
  });

  // Wall hole is 0.04 wider than the door perimeter, leaving a 0.02-wide
  // gap on every side. The HDR-bright back-wall behind shows through this
  // gap as the perimeter crack light — no extra back-glow plane needed.
  const GAP = 0.02;
  const HOLE_HALF_W = DOOR_WIDTH / 2 + GAP;
  const HOLE_TOP = DOOR_HEIGHT + GAP;
  const HOLE_BOTTOM = -GAP;

  const wallTop = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), wallMat);
  wallTop.position.set(0, HOLE_TOP + 15, 0.02);
  wallTop.name = 'door-wall-top';
  scene.add(wallTop);

  const wallBottom = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), wallMat);
  wallBottom.position.set(0, HOLE_BOTTOM - 15, 0.02);
  wallBottom.name = 'door-wall-bottom';
  scene.add(wallBottom);

  const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(30, HOLE_TOP - HOLE_BOTTOM), wallMat);
  wallLeft.position.set(-HOLE_HALF_W - 15, (HOLE_TOP + HOLE_BOTTOM) / 2, 0.02);
  wallLeft.name = 'door-wall-left';
  scene.add(wallLeft);

  const wallRight = new THREE.Mesh(new THREE.PlaneGeometry(30, HOLE_TOP - HOLE_BOTTOM), wallMat);
  wallRight.position.set(+HOLE_HALF_W + 15, (HOLE_TOP + HOLE_BOTTOM) / 2, 0.02);
  wallRight.name = 'door-wall-right';
  scene.add(wallRight);

  // No back-glow plane: the HDR-bright back-wall (createBrightRoom) shines
  // directly through the perimeter gap as the crack light.
  // We still expose a dummy backGlow ref so the public interface holds.
  const backGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.001, 0.001),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  backGlow.position.set(0, 1.6, -50);
  scene.add(backGlow);

  // ── Hinge hardware: two small dark mounts in the gap on the right side
  // of the door, where real hinges would attach the door to the frame.
  // They interrupt the bright perimeter crack at their positions.
  const hingeHwMat = new THREE.MeshBasicMaterial({ color: 0x080808 });
  const HINGE_HW_W = 0.06;
  const HINGE_HW_H = 0.16;
  const HINGE_HW_Z = -0.005;

  const hingeHwTop = new THREE.Mesh(
    new THREE.PlaneGeometry(HINGE_HW_W, HINGE_HW_H),
    hingeHwMat,
  );
  hingeHwTop.position.set(HINGE_X + GAP / 2, FLOOR_Y + DOOR_HEIGHT - 0.32, HINGE_HW_Z);
  hingeHwTop.name = 'door-hinge-hw-top';
  scene.add(hingeHwTop);

  const hingeHwBottom = new THREE.Mesh(
    new THREE.PlaneGeometry(HINGE_HW_W, HINGE_HW_H),
    hingeHwMat,
  );
  hingeHwBottom.position.set(HINGE_X + GAP / 2, FLOOR_Y + 0.32, HINGE_HW_Z);
  hingeHwBottom.name = 'door-hinge-hw-bottom';
  scene.add(hingeHwBottom);

  // ── Hinge group: pivot at the RIGHT edge of the doorway.
  const hinge = new THREE.Group();
  hinge.position.set(HINGE_X, FLOOR_Y, 0);
  hinge.name = 'door-hinge';
  scene.add(hinge);

  // ── Door panel: thin BOX (not a plane) so it has visible depth/thickness
  // when the camera sees it edge-on at the threshold. Extends LEFT from
  // the hinge; positive-Y rotation swings the free edge toward the camera.
  const DOOR_THICKNESS = 0.05;
  const doorGeo = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, DOOR_THICKNESS);
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.65,
    metalness: 0.0,
  });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(-DOOR_WIDTH / 2, DOOR_HEIGHT / 2, -DOOR_THICKNESS / 2);
  door.name = 'door-leaf';
  hinge.add(door);

  // ── Door handle: small metallic puck on the LEFT side of the door (the
  // free edge, opposite the hinge). Attached to the door so it rotates open
  // with the panel — adds realism and visible depth.
  const handleGeo = new THREE.SphereGeometry(0.035, 16, 12);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x9a9a9a,
    roughness: 0.25,
    metalness: 0.95,
  });
  // Outside knob — visible from the dark room (camera-side).
  const handleOutside = new THREE.Mesh(handleGeo, handleMat);
  handleOutside.position.set(-DOOR_WIDTH + 0.12, 1.0, DOOR_THICKNESS / 2 + 0.005);
  handleOutside.name = 'door-handle-outside';
  hinge.add(handleOutside);

  // Inside knob — visible from the bright-room side, once camera passes through.
  const handleInside = new THREE.Mesh(handleGeo, handleMat);
  handleInside.position.set(-DOOR_WIDTH + 0.12, 1.0, -DOOR_THICKNESS / 2 - 0.005);
  handleInside.name = 'door-handle-inside';
  hinge.add(handleInside);

  // ── SpotLight: positioned just inside the dark room, aimed back at the
  // doorway. Three.js lights only illuminate the FRONT face of a surface, so
  // to wash the dark wall with light "spilling from the bright room" we need
  // the light on the dark-room side, pointing AT the wall. As the door
  // opens we ramp its intensity — the cone projects a wide circular wash
  // around the doorway, reading as light flooding into the dark room.
  const beam = new THREE.SpotLight(0xfff5e0, 0, 14, Math.PI / 4.5, 0.5, 0.7);
  beam.position.set(0, FLOOR_Y + DOOR_HEIGHT / 2, 4);
  const beamTarget = new THREE.Object3D();
  beamTarget.position.set(0, FLOOR_Y + DOOR_HEIGHT / 2, 0);
  scene.add(beamTarget);
  beam.target = beamTarget;
  beam.name = 'door-beam';
  scene.add(beam);

  let lastOpen = 0;
  let cachedCrack = 1.0;

  function applyLight() {
    // Beam: dark when door closed, grows steeply as door opens. This is what
    // projects the realistic light wash onto the dark front wall.
    beam.intensity = Math.pow(lastOpen, 1.2) * 18;
    // crack intensity is conceptual now — the bright back-wall through the
    // wall hole gap IS the crack light. Kept for timeline compatibility.
    void cachedCrack;
  }

  function setOpenAmount(t: number) {
    lastOpen = Math.max(0, Math.min(1, t));
    hinge.rotation.y = MAX_OPEN_RAD * lastOpen;
    applyLight();
  }

  function setCrackIntensity(intensity: number) {
    cachedCrack = intensity;
    applyLight();
  }

  setCrackIntensity(1.0);
  setOpenAmount(0);

  return { group: hinge, setOpenAmount, setCrackIntensity, backGlow, beam };
}

/**
 * The huge "bright room" back wall — visible through the doorway and fills
 * the view once the camera passes through. The logo lives in front of it.
 */
export function createBrightRoom(scene: THREE.Scene): THREE.Mesh {
  const backWallGeo = new THREE.PlaneGeometry(60, 40);
  const backWallMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    toneMapped: false,
  });
  // HDR-bright enough that bloom catches the door cracks dramatically, but
  // restrained so it doesn't bleed onto the (pure-black) logo in the final
  // frame. Pushing this much higher tints the logo grey via bloom spread.
  backWallMat.color.setRGB(1.55, 1.51, 1.42);
  const backWall = new THREE.Mesh(backWallGeo, backWallMat);
  backWall.position.set(0, 1.6, -20);
  backWall.name = 'bright-room-back-wall';
  scene.add(backWall);
  return backWall;
}
