const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regexRef = /const modelMaterialsRef = useRef<THREE\.Material\[\]>\(\[\]\);/;
const replacementRef = `const modelMaterialsRef = useRef<THREE.Material[]>([]);
  const capturePhysicalFrontRef = React.useRef<(() => void) | null>(null);`;
code = code.replace(regexRef, replacementRef);

const regexAssign = /const capturePhysicalFront = \(\) => {/;
const replacementAssign = `capturePhysicalFrontRef.current = () => {`;
code = code.replace(regexAssign, replacementAssign);

const regexCall = /capturePhysicalFront\(\)/;
const replacementCall = `capturePhysicalFrontRef.current?.()`;
code = code.replace(regexCall, replacementCall);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
