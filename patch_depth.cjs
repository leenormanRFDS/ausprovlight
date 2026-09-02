const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /float depthEnvelope = smoothstep\(0\.0, 0\.35, specimenPos\.z\);/;
const replacement = `float specimenFrontDepth = dot(specimenPos, normalize(uSpecimenFrontLocal));
          float depthEnvelope = smoothstep(0.0, 0.35, specimenFrontDepth);`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
