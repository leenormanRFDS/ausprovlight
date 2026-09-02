const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

// Update Mode 7
code = code.replace(
  'vec3 forceColour = vec3(0.0, 4.0, 0.2) * g_testGreenAllGates + vec3(0.15, 0.35, 4.0) * g_testBlueAllGates;',
  'vec3 forceColour = vec3(0.0, 4.0, 0.2) * g_greenFireMask + vec3(0.15, 0.35, 4.0) * g_blueFireMask;'
);

// Add Mode 28, 29, 30
const modesToAdd = `
        // Diagnostic Mode 28: TEST R — TOTAL MASKED FLASH
        if (uDebugMode == 28) {
          vec3 L = normalize(uKeyLightDir);
          vec3 V = normalize(cameraPosition - vOpalWorldPos);
          vec3 H = normalize(L + V);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          float cosHalf = clamp(dot(domainNormal, H), 0.0, 1.0);
          float flashFactor = pow(cosHalf, 12.0) * 1.8;
          float maskedFlash = flashFactor * g_totalFireMask;
          gl_FragColor = vec4(vec3(clamp(maskedFlash * 2.0, 0.0, 1.0)), 1.0);
        }

        // Diagnostic Mode 29: TEST S — GREEN MASKED FLASH
        if (uDebugMode == 29) {
          vec3 L = normalize(uKeyLightDir);
          vec3 V = normalize(cameraPosition - vOpalWorldPos);
          vec3 H = normalize(L + V);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          float cosHalf = clamp(dot(domainNormal, H), 0.0, 1.0);
          float flashFactor = pow(cosHalf, 12.0) * 1.8;
          float maskedFlash = flashFactor * g_greenFireMask;
          gl_FragColor = vec4(vec3(clamp(maskedFlash * 2.0, 0.0, 1.0)), 1.0);
        }

        // Diagnostic Mode 30: TEST T — BLUE MASKED FLASH
        if (uDebugMode == 30) {
          vec3 L = normalize(uKeyLightDir);
          vec3 V = normalize(cameraPosition - vOpalWorldPos);
          vec3 H = normalize(L + V);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          float cosHalf = clamp(dot(domainNormal, H), 0.0, 1.0);
          float flashFactor = pow(cosHalf, 12.0) * 1.8;
          float maskedFlash = flashFactor * g_blueFireMask;
          gl_FragColor = vec4(vec3(clamp(maskedFlash * 2.0, 0.0, 1.0)), 1.0);
        }
`;

code = code.replace(
  '// Diagnostic Mode 27: TEST Q — RENDER GLOBAL g_totalFireMask DIRECTLY',
  modesToAdd + '\n        // Diagnostic Mode 27: TEST Q — RENDER GLOBAL g_totalFireMask DIRECTLY'
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
