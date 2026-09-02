const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

// Add state for captured vectors
const stateRegex = /const \[debugMode, setDebugMode\] = useState\(0\);/;
const stateReplacement = `const [debugMode, setDebugMode] = useState(0);
  const [capturedFrontLocal, setCapturedFrontLocal] = useState<THREE.Vector3 | null>(null);
  const [capturedFrontWorld, setCapturedFrontWorld] = useState<THREE.Vector3 | null>(null);`;
code = code.replace(stateRegex, stateReplacement);

// Add capturePhysicalFront function
const fnRegex = /const handlePointerDown = \(e: PointerEvent\) => {/;
const fnReplacement = `const capturePhysicalFront = () => {
    if (!cameraRef.current || !modelGroupRef.current || !sceneRef.current) return;
    
    // The camera is looking at the origin, so the vector from origin to camera is the camera position normalized
    const worldFront = cameraRef.current.position.clone().normalize();
    
    // Transform this world direction into the model's local space
    const inverseRotation = new THREE.Matrix4().extractRotation(modelGroupRef.current.matrixWorld).invert();
    const localFront = worldFront.clone().applyMatrix4(inverseRotation).normalize();
    
    setCapturedFrontWorld(worldFront.clone());
    setCapturedFrontLocal(localFront.clone());
    
    // We want the light to be in the same hemisphere but at an oblique angle
    // We can offset it slightly from the world front
    const lightDir = worldFront.clone().add(new THREE.Vector3(0.5, 0.5, 0)).normalize();
    
    modelMaterialsRef.current.forEach(mat => {
      if ((mat as any).userData?.shader?.uniforms?.uSpecimenFrontLocal) {
        (mat as any).userData.shader.uniforms.uSpecimenFrontLocal.value.copy(localFront);
      }
      if ((mat as any).userData?.shader?.uniforms?.uKeyLightDir) {
        (mat as any).userData.shader.uniforms.uKeyLightDir.value.copy(lightDir);
      }
    });

    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.DirectionalLight) {
        child.position.copy(lightDir.multiplyScalar(6.403)); // length of (4, 5, 3) is ~7.07
      }
    });
  };

  const handlePointerDown = (e: PointerEvent) => {`;
code = code.replace(fnRegex, fnReplacement);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
