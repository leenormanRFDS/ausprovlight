const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /float frontFaceLock = smoothstep\(-0\.10, 0\.20, localNormal\.z\);/;
const replacement = `float frontFacing = dot(normalize(localNormal), normalize(uSpecimenFrontLocal));
          float frontFaceLock = smoothstep(-0.10, 0.20, frontFacing);`;

code = code.replace(regex, replacement);

const regex2 = /g_testSpecimenPosZ = specimenPos\.z;/;
const replacement2 = `g_testSpecimenPosZ = specimenFrontDepth;`;
code = code.replace(regex2, replacement2);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
