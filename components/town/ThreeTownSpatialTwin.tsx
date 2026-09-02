import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  SpatialScaleId, 
  SpatialLayerCategory, 
  SpatialEntity, 
  SubterraneanHorizon 
} from '../../types/townTwin';
import { 
  Maximize2, 
  RotateCcw, 
  Layers, 
  Eye, 
  Compass, 
  Activity, 
  Sliders,
  Sparkles,
  Info,
  MapPin
} from 'lucide-react';

export type TerrainRenderMode = 'LIDAR_POINT_CLOUD' | 'SOLID_SHADED' | 'CONTOUR_TOPOGRAPHY' | 'SUBTERRANEAN_XRAY';

interface ThreeTownSpatialTwinProps {
  activeScale: SpatialScaleId;
  visibleLayers: Record<SpatialLayerCategory, boolean>;
  entities: SpatialEntity[];
  subterraneanHorizons: SubterraneanHorizon[];
  selectedEntity: SpatialEntity | null;
  onSelectEntity: (entity: SpatialEntity | null) => void;
  renderMode: TerrainRenderMode;
  onChangeRenderMode: (mode: TerrainRenderMode) => void;
  subterraneanDepthCut: number; // 0 to 25 meters depth
  className?: string;
}

export function ThreeTownSpatialTwin({
  activeScale,
  visibleLayers,
  entities,
  subterraneanHorizons,
  selectedEntity,
  onSelectEntity,
  renderMode,
  onChangeRenderMode,
  subterraneanDepthCut,
  className = '',
}: ThreeTownSpatialTwinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredEntity, setHoveredEntity] = useState<SpatialEntity | null>(null);
  const [mouseScreenPos, setMouseScreenPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  // References for Three.js scene instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Target camera positions for smooth interpolation
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 16, 18));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Visual Groups
  const terrainMeshGroupRef = useRef<THREE.Group | null>(null);
  const pointCloudGroupRef = useRef<THREE.Points | null>(null);
  const subterraneanGroupRef = useRef<THREE.Group | null>(null);
  const entitiesGroupRef = useRef<THREE.Group | null>(null);
  const raycastObjectsRef = useRef<{ mesh: THREE.Object3D; entity: SpatialEntity }[]>([]);

  // Orbit control state
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 24, theta: 0, phi: Math.PI / 4 });

  // Camera scale presets mapped from SpatialScaleId
  const getCameraTargetForScale = useCallback((scaleId: SpatialScaleId): { pos: [number, number, number]; target: [number, number, number] } => {
    switch (scaleId) {
      case 'AUSTRALIA':
        return { pos: [0, 55, 65], target: [0, 0, 0] };
      case 'SOUTH_AUSTRALIA':
        return { pos: [0, 34, 40], target: [0, 0, 0] };
      case 'ANDAMOOKA_REGION':
        return { pos: [0, 22, 26], target: [0, 0, 0] };
      case 'TOWN_SETTLEMENT':
        return { pos: [0, 12, 14], target: [0, 0, 0] };
      case 'STREET_ARTERY':
        return { pos: [2.0, 4.5, 5.0], target: [0.2, 0.05, 0.4] };
      case 'BUILDING_DUGOUT':
        return { pos: [2.8, 1.8, 2.5], target: [0.5, -0.15, 0.2] };
      case 'MINE_FIELD':
        return { pos: [-3.2, 1.2, 1.8], target: [-0.6, -0.5, -0.4] };
      case 'ASSET_SPECIMEN':
        return { pos: [-1.4, -0.2, 0.6], target: [-0.62, -0.52, -0.41] };
      case 'STORY_PROVENANCE':
        return { pos: [-0.5, 1.5, 1.2], target: [-0.1, 0.05, -0.1] };
      default:
        return { pos: [0, 16, 18], target: [0, 0, 0] };
    }
  }, []);

  // Update target camera when activeScale changes
  useEffect(() => {
    const config = getCameraTargetForScale(activeScale);
    targetCamPosRef.current.set(config.pos[0], config.pos[1], config.pos[2]);
    targetLookAtRef.current.set(config.target[0], config.target[1], config.target[2]);
  }, [activeScale, getCameraTargetForScale]);

  // Center on selected entity if clicked
  useEffect(() => {
    if (selectedEntity) {
      const [x, y, z] = selectedEntity.spatialPosition;
      targetLookAtRef.current.set(x, y, z);
      targetCamPosRef.current.set(x + 1.8, y + 1.6, z + 2.2);
    }
  }, [selectedEntity]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);
    scene.fog = new THREE.FogExp2(0x060606, 0.015);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(0, 16, 18);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xd4d0c5, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    sunLight.position.set(25, 45, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Subtle golden rim light
    const rimLight = new THREE.DirectionalLight(0xc5a059, 1.2);
    rimLight.position.set(-30, 15, -25);
    scene.add(rimLight);

    // 5. Build Procedural Outback Terrain Mesh & LiDAR Point Cloud
    const terrainGroup = new THREE.Group();
    terrainMeshGroupRef.current = terrainGroup;
    scene.add(terrainGroup);

    const terrainSize = 28;
    const terrainSegments = 90;
    const terrainGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, terrainSegments, terrainSegments);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    const colors: number[] = [];
    const elevationData: number[] = [];

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);

      // Procedural outback topography: gentle undulating plateau + erosion creek gully
      const gullyDist = Math.abs(vx - 0.2 * Math.sin(vz * 0.4));
      const gullyIncision = Math.exp(-gullyDist * 1.5) * 0.8;
      
      const ridgeNoise = 
        Math.sin(vx * 0.25) * Math.cos(vz * 0.25) * 0.7 +
        Math.sin(vx * 0.6 + 1.2) * Math.cos(vz * 0.6) * 0.35 +
        Math.sin(vx * 1.4) * Math.sin(vz * 1.4) * 0.12;

      let vy = ridgeNoise - gullyIncision;
      // Edge falloff
      const edgeDist = Math.sqrt(vx * vx + vz * vz) / (terrainSize * 0.5);
      if (edgeDist > 0.7) {
        vy -= (edgeDist - 0.7) * 2.5;
      }

      posAttr.setY(i, vy);
      elevationData.push(vy);

      // Color based on elevation: sandstone red -> ochre -> calcrete ridge
      const normY = (vy + 1.2) / 2.2;
      const c1 = new THREE.Color(0x7a3020); // Deep red sandstone
      const c2 = new THREE.Color(0xa36c3c); // Warm ochre
      const c3 = new THREE.Color(0xd1c2a5); // Calcrete ridge
      const finalColor = normY < 0.5 ? c1.clone().lerp(c2, normY * 2) : c2.clone().lerp(c3, (normY - 0.5) * 2);
      
      colors.push(finalColor.r, finalColor.g, finalColor.b);
    }

    terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    terrainGeo.computeVertexNormals();

    // Solid Terrain Material
    const textureLoader = new THREE.TextureLoader();
    const aerialTexture = textureLoader.load('/images/AndaAerial.png');
    aerialTexture.colorSpace = THREE.SRGBColorSpace;
    aerialTexture.wrapS = THREE.ClampToEdgeWrapping;
    aerialTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    const solidMat = new THREE.MeshStandardMaterial({
      map: aerialTexture,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, solidMat);
    terrainMesh.receiveShadow = true;
    terrainGroup.add(terrainMesh);

    // Wireframe / Contour Overlay
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(terrainGeo, wireframeMat);
    wireMesh.position.y += 0.005;
    terrainGroup.add(wireMesh);

    // 6. Point Cloud LiDAR representation
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', terrainGeo.attributes.position);
    pointGeo.setAttribute('color', terrainGeo.attributes.color);
    const pointMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const pointCloud = new THREE.Points(pointGeo, pointMat);
    pointCloud.visible = false;
    pointCloudGroupRef.current = pointCloud;
    scene.add(pointCloud);

    // 7. Subterranean Strata Layers
    const subterraneanGroup = new THREE.Group();
    subterraneanGroupRef.current = subterraneanGroup;
    scene.add(subterraneanGroup);

    // Horizon planes
    const horizonsData = [
      { y: -0.3, color: 0xd1c2a5, label: 'Z1 Calcrete Cap' },
      { y: -0.8, color: 0xf4ecd8, label: 'Z2 Weathered Sandstone' },
      { y: -1.5, color: 0x655b50, label: 'Z3 Bulldog Shale (Opal Level)' },
      { y: -2.2, color: 0x38322d, label: 'Z4 Basal Quartzite' },
    ];

    horizonsData.forEach((h) => {
      const planeGeo = new THREE.PlaneGeometry(terrainSize * 0.9, terrainSize * 0.9);
      planeGeo.rotateX(-Math.PI / 2);
      const planeMat = new THREE.MeshStandardMaterial({
        color: h.color,
        roughness: 0.9,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.y = h.y;
      subterraneanGroup.add(planeMesh);
    });

    // 8. 3D Architectural & Mining Models (Dugouts, Vertical Shafts, Horizontal Drives)
    const entitiesGroup = new THREE.Group();
    entitiesGroupRef.current = entitiesGroup;
    scene.add(entitiesGroup);

    // Clear raycasting list
    raycastObjectsRef.current = [];

    // Helper: Build Duke's Bottlehouse Dugout 3D model
    const buildDugoutMesh = (entity: SpatialEntity) => {
      const g = new THREE.Group();
      g.position.set(...entity.spatialPosition);

      // Dugout sandstone portal
      const portalGeo = new THREE.BoxGeometry(0.8, 0.5, 0.7);
      const portalMat = new THREE.MeshStandardMaterial({ color: 0x8a6042, roughness: 0.8 });
      const portal = new THREE.Mesh(portalGeo, portalMat);
      portal.position.y = 0.25;
      portal.castShadow = true;
      g.add(portal);

      // Glowing glass-bottle wall
      const bottleWallGeo = new THREE.BoxGeometry(0.75, 0.35, 0.05);
      const bottleWallMat = new THREE.MeshStandardMaterial({
        color: 0x58b983,
        emissive: 0x1f6643,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.1,
      });
      const bottleWall = new THREE.Mesh(bottleWallGeo, bottleWallMat);
      bottleWall.position.set(0, 0.2, 0.36);
      g.add(bottleWall);

      // Subterranean hollow chamber
      const chamberGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 12);
      const chamberMat = new THREE.MeshStandardMaterial({
        color: 0x5a4231,
        roughness: 0.95,
        wireframe: true,
      });
      const chamber = new THREE.Mesh(chamberGeo, chamberMat);
      chamber.position.y = -0.2;
      g.add(chamber);

      entitiesGroup.add(g);
      raycastObjectsRef.current.push({ mesh: portal, entity });
    };

    // Helper: Build Vertical Mine Shaft (Lunatic 12 & German Gully)
    const buildMineShaftMesh = (entity: SpatialEntity) => {
      const g = new THREE.Group();
      g.position.set(...entity.spatialPosition);

      // Surface collar / headframe timbers
      const frameGeo = new THREE.BoxGeometry(0.3, 0.4, 0.3);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x4a3b32, roughness: 0.9 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.y = 0.2;
      g.add(frame);

      // Vertical shaft cylinder plunging into earth
      const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 12);
      const shaftMat = new THREE.MeshStandardMaterial({
        color: 0xe06d53,
        emissive: 0x591e12,
        emissiveIntensity: 0.4,
        roughness: 0.5,
      });
      const shaft = new THREE.Mesh(shaftGeo, shaftMat);
      shaft.position.y = -0.9;
      g.add(shaft);

      // Subterranean horizontal drive
      const driveGeo = new THREE.BoxGeometry(1.2, 0.2, 0.3);
      const driveMat = new THREE.MeshStandardMaterial({
        color: 0x3d3028,
        roughness: 0.9,
      });
      const drive = new THREE.Mesh(driveGeo, driveMat);
      drive.position.set(0.4, -1.7, 0);
      g.add(drive);

      // If this is Lunatic 12, add the glowing Opal Specimen origin pip
      if (entity.id === 'ent-mine-lunatic-shaft-12' || entity.id === 'ent-asset-opal-specimen-001') {
        const opalPipGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const opalPipMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0ea5e9,
          emissiveIntensity: 1.5,
          roughness: 0.1,
        });
        const opalPip = new THREE.Mesh(opalPipGeo, opalPipMat);
        opalPip.position.set(0.7, -1.7, 0);
        g.add(opalPip);
      }

      entitiesGroup.add(g);
      raycastObjectsRef.current.push({ mesh: frame, entity });
    };

    // Helper: Build Surface Structure (Solar microgrid, Cottages)
    const buildSurfaceStructure = (entity: SpatialEntity) => {
      const g = new THREE.Group();
      g.position.set(...entity.spatialPosition);

      const boxGeo = new THREE.BoxGeometry(0.6, 0.25, 0.5);
      const boxMat = new THREE.MeshStandardMaterial({
        color: entity.layer === 'INFRASTRUCTURE' ? 0x5c95d4 : 0xb8926a,
        roughness: 0.7,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.y = 0.125;
      box.castShadow = true;
      g.add(box);

      entitiesGroup.add(g);
      raycastObjectsRef.current.push({ mesh: box, entity });
    };

    // Helper: Build Generic Glowing Spatial Marker Pip
    const buildMarkerPip = (entity: SpatialEntity) => {
      const g = new THREE.Group();
      g.position.set(...entity.spatialPosition);

      let pipColor = 0xc5a059;
      if (entity.layer === 'HERITAGE') pipColor = 0x6aa89d;
      if (entity.layer === 'STORIES') pipColor = 0x9b72cf;
      if (entity.layer === 'TOURISM') pipColor = 0x58b983;
      if (entity.layer === 'FUTURE_OPPORTUNITIES') pipColor = 0xe5a93c;

      // Vertical marker stalk
      const stalkGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
      const stalkMat = new THREE.MeshBasicMaterial({ color: pipColor, transparent: true, opacity: 0.8 });
      const stalk = new THREE.Mesh(stalkGeo, stalkMat);
      stalk.position.y = 0.3;
      g.add(stalk);

      // Top glowing head
      const headGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const headMat = new THREE.MeshStandardMaterial({
        color: pipColor,
        emissive: pipColor,
        emissiveIntensity: 0.9,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 0.6;
      g.add(head);

      entitiesGroup.add(g);
      raycastObjectsRef.current.push({ mesh: head, entity });
    };

    // Instantiate 3D objects for all dataset entities
    entities.forEach((ent) => {
      if (ent.geometryType === '3D_DUGOUT_VOLUME') {
        buildDugoutMesh(ent);
      } else if (ent.geometryType === '3D_VERTICAL_SHAFT') {
        buildMineShaftMesh(ent);
      } else if (ent.geometryType === 'SURFACE_STRUCTURE') {
        buildSurfaceStructure(ent);
      } else {
        buildMarkerPip(ent);
      }
    });

    // 9. Render Loop with Smooth Camera Damping
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // Smooth camera interpolation toward target position
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.05);
        currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
        cameraRef.current.lookAt(currentLookAtRef.current);
      }

      // Gentle rotation for celestial lights or pulse indicators
      if (sceneRef.current) {
        const time = clock.getElapsedTime();
        sunLight.position.x = 25 + Math.sin(time * 0.05) * 5;
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 10. Resize Observer
    let resizeAnimId: number | null = null;
    const handleResize = () => {
      if (resizeAnimId) cancelAnimationFrame(resizeAnimId);
      resizeAnimId = requestAnimationFrame(() => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (resizeAnimId) cancelAnimationFrame(resizeAnimId);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [entities]);

  // Update render mode (Point Cloud vs Solid Shaded vs Contours vs Subterranean X-ray)
  useEffect(() => {
    if (!terrainMeshGroupRef.current || !pointCloudGroupRef.current || !subterraneanGroupRef.current) return;

    const terrainMesh = terrainMeshGroupRef.current.children[0] as THREE.Mesh;
    const wireMesh = terrainMeshGroupRef.current.children[1] as THREE.Mesh;
    const pointCloud = pointCloudGroupRef.current;
    const subterranean = subterraneanGroupRef.current;

    if (renderMode === 'LIDAR_POINT_CLOUD') {
      terrainMesh.visible = false;
      wireMesh.visible = false;
      pointCloud.visible = true;
      subterranean.visible = true;
    } else if (renderMode === 'SOLID_SHADED') {
      terrainMesh.visible = true;
      wireMesh.visible = false;
      pointCloud.visible = false;
      subterranean.visible = false;
    } else if (renderMode === 'CONTOUR_TOPOGRAPHY') {
      terrainMesh.visible = true;
      wireMesh.visible = true;
      pointCloud.visible = false;
      subterranean.visible = false;
    } else if (renderMode === 'SUBTERRANEAN_XRAY') {
      terrainMesh.visible = true;
      wireMesh.visible = true;
      pointCloud.visible = false;
      subterranean.visible = true;
      // Make surface semi-transparent
      if (terrainMesh.material instanceof THREE.MeshStandardMaterial) {
        terrainMesh.material.transparent = true;
        terrainMesh.material.opacity = 0.35;
      }
    }
  }, [renderMode]);

  // Mouse Orbit Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container || !cameraRef.current) return;

    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    setMouseScreenPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (isDraggingRef.current) {
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      // Orbit camera around currentLookAt
      const cam = cameraRef.current;
      const offset = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);
      
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta -= deltaX * 0.006;
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2.05, spherical.phi - deltaY * 0.006));
      
      offset.setFromSpherical(spherical);
      targetCamPosRef.current.copy(currentLookAtRef.current).add(offset);
    } else {
      // Raycasting hover check
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const intersects = raycaster.intersectObjects(
        raycastObjectsRef.current.map((o) => o.mesh),
        true
      );

      if (intersects.length > 0) {
        const hit = raycastObjectsRef.current.find((o) => o.mesh === intersects[0].object || o.mesh.children.includes(intersects[0].object));
        if (hit) {
          setHoveredEntity(hit.entity);
        }
      } else {
        setHoveredEntity(null);
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsInteracting(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    const cam = cameraRef.current;
    const offset = new THREE.Vector3().subVectors(cam.position, currentLookAtRef.current);
    offset.multiplyScalar(zoomFactor);
    targetCamPosRef.current.copy(currentLookAtRef.current).add(offset);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hoveredEntity) {
      onSelectEntity(hoveredEntity);
    }
  };

  const handleResetCamera = () => {
    const config = getCameraTargetForScale(activeScale);
    targetCamPosRef.current.set(config.pos[0], config.pos[1], config.pos[2]);
    targetLookAtRef.current.set(config.target[0], config.target[1], config.target[2]);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleClick}
      className={`relative w-full bg-[#0C0B0A] border border-[rgba(245,243,237,0.1)] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Grid Overlay / Reticle HUD */}
      <div className="absolute inset-0 pointer-events-none p-6 pt-24 pb-12 flex flex-col justify-between">
        {/* Top Bar HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0C0B0A]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[rgba(245,243,237,0.08)] pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00ffd5] animate-pulse" />
            <span className="font-mono text-xs text-[#f5f2ed] tracking-wider uppercase">
              ANDAMOOKA SPATIAL SIS // ACTIVE SCALE: {activeScale.replace(/_/g, ' ')}
            </span>
          </div>

          {/* Render Mode Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => onChangeRenderMode('LIDAR_POINT_CLOUD')}
              className={`font-mono text-[10px] px-2.5 py-1 rounded transition-colors ${
                renderMode === 'LIDAR_POINT_CLOUD'
                  ? 'bg-[#00ffd5] text-[#050505] font-bold'
                  : 'bg-[#151515] text-[#888] hover:text-[#DDD]'
              }`}
            >
              LIDAR POINTS
            </button>
            <button
              onClick={() => onChangeRenderMode('CONTOUR_TOPOGRAPHY')}
              className={`font-mono text-[10px] px-2.5 py-1 rounded transition-colors ${
                renderMode === 'CONTOUR_TOPOGRAPHY'
                  ? 'bg-[#00ffd5] text-[#050505] font-bold'
                  : 'bg-[#151515] text-[#888] hover:text-[#DDD]'
              }`}
            >
              CONTOURS
            </button>
            <button
              onClick={() => onChangeRenderMode('SOLID_SHADED')}
              className={`font-mono text-[10px] px-2.5 py-1 rounded transition-colors ${
                renderMode === 'SOLID_SHADED'
                  ? 'bg-[#00ffd5] text-[#050505] font-bold'
                  : 'bg-[#151515] text-[#888] hover:text-[#DDD]'
              }`}
            >
              SOLID SURFACE
            </button>
            <button
              onClick={() => onChangeRenderMode('SUBTERRANEAN_XRAY')}
              className={`font-mono text-[10px] px-2.5 py-1 rounded transition-colors ${
                renderMode === 'SUBTERRANEAN_XRAY'
                  ? 'bg-[#00ffd5] text-[#050505] font-bold'
                  : 'bg-[#151515] text-[#888] hover:text-[#DDD]'
              }`}
            >
              SUBTERRANEAN X-RAY
            </button>
          </div>
        </div>

        {/* Center Reticle Corner Marks */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
          <div className="w-12 h-12 border border-[#00ffd5] rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#00ffd5] rounded-full" />
          </div>
        </div>

        {/* Bottom Bar Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-3 bg-[#0C0B0A]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[rgba(245,243,237,0.08)] font-mono text-[10px] text-[#888]">
            <span>CRS: EPSG:7853 (GDA2020)</span>
            <span>•</span>
            <span>RES: 2.1cm AHD</span>
            <span>•</span>
            <span className="text-[#00ffd5]">Z-SLICE: {subterraneanDepthCut.toFixed(1)}m</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCamera}
              className="bg-[#0C0B0A]/80 hover:bg-[#181818] text-[#D4D0C5] p-2 rounded-lg border border-[rgba(245,243,237,0.1)] text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Reset View Orientation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#00ffd5]" />
              <span>RESET ORIENTATION</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip HUD */}
      {hoveredEntity && !isInteracting && (
        <div
          style={{
            left: `${Math.min(window.innerWidth - 300, mouseScreenPos.x + 16)}px`,
            top: `${Math.min(window.innerHeight - 200, mouseScreenPos.y + 16)}px`,
          }}
          className="absolute z-30 pointer-events-none bg-[#0c0c0c]/95 backdrop-blur-md border border-[#00ffd5] p-3.5 rounded-xl shadow-2xl flex flex-col gap-1 max-w-xs transition-all"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[rgba(245,243,237,0.08)] pb-1.5 mb-1">
            <span className="font-mono text-[9px] text-[#00ffd5] uppercase tracking-wider">
              {hoveredEntity.layer} // {hoveredEntity.scale}
            </span>
            <span className="font-mono text-[8px] bg-[#222] px-1.5 py-0.5 rounded text-[#AAA]">
              {hoveredEntity.geometryType.replace(/_/g, ' ')}
            </span>
          </div>
          <span className="font-display text-sm text-[#f5f2ed] font-medium leading-tight">
            {hoveredEntity.vernacularName || hoveredEntity.name}
          </span>
          <p className="font-sans text-[11px] text-[#999] line-clamp-2 leading-relaxed">
            {hoveredEntity.description}
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-[#666] pt-1.5 border-t border-[rgba(245,243,237,0.06)] mt-1">
            <span>AHD: {hoveredEntity.coordinates.elevationAHD}m</span>
            <span className="text-[#00ffd5]">CLICK TO INSPECT DOSSIER</span>
          </div>
        </div>
      )}
    </div>
  );
}
