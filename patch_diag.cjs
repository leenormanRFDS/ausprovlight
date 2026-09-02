const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /\/\/ Diagnostic Mode 27: TEST Q/;
const replacement = `// Diagnostic Mode 40: 17F TEST 1 - PHYSICAL FRONT DEPTH
        if (uDebugMode == 40) {
          gl_FragColor = vec4(vec3(g_testSpecimenPosZ > 0.0 ? 1.0 : 0.0), 1.0);
        }

        // Diagnostic Mode 41: 17F TEST 2 - PHYSICAL FRONT NORMAL
        if (uDebugMode == 41) {
          float frontFacing = dot(normalize(vOpalLocalNormal), normalize(uSpecimenFrontLocal));
          gl_FragColor = vec4(vec3(frontFacing > 0.0 ? 1.0 : 0.0), 1.0);
        }

        // Diagnostic Mode 42: 17F TEST 3 - FRONT LIGHT EXPOSURE
        if (uDebugMode == 42) {
          vec3 L = normalize(uKeyLightDir);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          vec3 correctedWorldNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float exposure = max(dot(correctedWorldNormal, L), 0.0);
          gl_FragColor = vec4(vec3(exposure * g_totalFireMask), 1.0);
        }

        // Diagnostic Mode 27: TEST Q`;

code = code.replace(regex, replacement);

const regex2 = /{ id: 39, label: '39 · 17E TEST 4: VISUALISE Z' },/;
const replacement2 = `{ id: 39, label: '39 · 17E TEST 4: VISUALISE Z' },
          { id: 40, label: '40 · 17F TEST 1: FRONT DEPTH' },
          { id: 41, label: '41 · 17F TEST 2: FRONT NORMAL' },
          { id: 42, label: '42 · 17F TEST 3: FRONT LIGHT EXP' },`;

code = code.replace(regex2, replacement2);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
