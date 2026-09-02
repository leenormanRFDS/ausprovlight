const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

// Update state properties
code = code.replace(
  'greenResponse: 0,',
  'greenResponse: 0,\n    cosThetaI: 0,\n    cosThetaV: 0,\n    cosHalf: 0,\n    lambdaGreen: 0,\n    lambdaBlue: 0,'
);

// Update shader modes 5 and 6 to flip normal if not gl_FrontFacing
code = code.replace(
  /vec3 domainNormal = normalize\(vOpalWorldRotation \* localDomainNormal\);\n\n            float cosThetaI = clamp\(dot\(domainNormal, L\), 0\.0, 1\.0\);/g,
  'vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);\n            domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;\n\n            float cosThetaI = clamp(dot(domainNormal, L), 0.0, 1.0);'
);

// Add modes 31-35
const modesToAdd = `
        // Diagnostic Mode 31: TEST U — MASKED cosThetaI
        if (uDebugMode == 31) {
          vec3 L = normalize(uKeyLightDir);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float cosThetaI = clamp(dot(domainNormal, L), 0.0, 1.0);
          float test = cosThetaI * g_totalFireMask;
          gl_FragColor = vec4(vec3(test), 1.0);
        }

        // Diagnostic Mode 32: TEST V — MASKED cosThetaV
        if (uDebugMode == 32) {
          vec3 V = normalize(cameraPosition - vOpalWorldPos);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float cosThetaV = clamp(dot(domainNormal, V), 0.0, 1.0);
          float test = cosThetaV * g_totalFireMask;
          gl_FragColor = vec4(vec3(test), 1.0);
        }

        // Diagnostic Mode 33: TEST W — OPTICAL VALIDITY GATE
        if (uDebugMode == 33) {
          vec3 L = normalize(uKeyLightDir);
          vec3 V = normalize(cameraPosition - vOpalWorldPos);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float cosThetaI = clamp(dot(domainNormal, L), 0.0, 1.0);
          float cosThetaV = clamp(dot(domainNormal, V), 0.0, 1.0);
          float valid = (cosThetaI > 0.01 && cosThetaV > 0.01) ? 1.0 : 0.0;
          gl_FragColor = vec4(vec3(valid * g_totalFireMask), 1.0);
        }

        // Diagnostic Mode 34: TEST X — PRODUCTION SPECTRUM WITHOUT VIEW GATE
        if (uDebugMode == 34) {
          vec3 L = normalize(uKeyLightDir);
          vec3 V = normalize(cameraPosition - vOpalWorldPos);
          vec3 H = normalize(L + V);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float cosHalf = clamp(dot(domainNormal, H), 0.0, 1.0);
          float flashFactor = pow(cosHalf, 12.0) * 1.8;
          float nSilica = 1.450;
          float dGreen = 221.0 + opalSpacingField(vOpalLocalPos) * 6.5;
          float dBlue = 188.0 + opalSpacingField(vOpalLocalPos) * 5.5;
          float cosThetaI = clamp(dot(domainNormal, L), 0.0, 1.0);
          float shiftFactor = sqrt(max(0.0, nSilica * nSilica - 1.0 + cosThetaI * cosThetaI));
          float lambdaGreen = 2.0 * dGreen * shiftFactor;
          float lambdaBlue = 2.0 * dBlue * shiftFactor;
          vec3 spectralGreen = spectralDiffractionRGB(lambdaGreen);
          vec3 spectralBlue = spectralDiffractionRGB(lambdaBlue);
          vec3 testFire = spectralGreen * flashFactor * g_greenFireMask + spectralBlue * flashFactor * g_blueFireMask;
          gl_FragColor = vec4(testFire, 1.0);
        }

        // Diagnostic Mode 35: TEST Y — PRODUCTION SPECTRAL RGB
        if (uDebugMode == 35) {
          vec3 L = normalize(uKeyLightDir);
          vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);
          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);
          domainNormal = gl_FrontFacing ? domainNormal : -domainNormal;
          float cosThetaI = clamp(dot(domainNormal, L), 0.0, 1.0);
          float nSilica = 1.450;
          float dGreen = 221.0 + opalSpacingField(vOpalLocalPos) * 6.5;
          float dBlue = 188.0 + opalSpacingField(vOpalLocalPos) * 5.5;
          float shiftFactor = sqrt(max(0.0, nSilica * nSilica - 1.0 + cosThetaI * cosThetaI));
          float lambdaGreen = 2.0 * dGreen * shiftFactor;
          float lambdaBlue = 2.0 * dBlue * shiftFactor;
          vec3 spectralGreen = spectralDiffractionRGB(lambdaGreen);
          vec3 spectralBlue = spectralDiffractionRGB(lambdaBlue);
          vec3 spectralTest = spectralGreen * g_greenFireMask + spectralBlue * g_blueFireMask;
          gl_FragColor = vec4(spectralTest * 2.0, 1.0);
        }
`;

code = code.replace(
  '// Diagnostic Mode 27: TEST Q — RENDER GLOBAL g_totalFireMask DIRECTLY',
  modesToAdd + '\n        // Diagnostic Mode 27: TEST Q — RENDER GLOBAL g_totalFireMask DIRECTLY'
);

// Update telemetry code
code = code.replace(
  'const cosLightGreen = Math.max(0, greenWorldNorm.dot(keyLightDir));',
  'const cosLightGreen = Math.max(0, greenWorldNorm.dot(keyLightDir));\n        const cosThetaVGreen = Math.max(0, greenWorldNorm.dot(viewDir));\n        const nSilica = 1.450;\n        const dGreen = 221.0;\n        const shiftFactorGreen = Math.sqrt(Math.max(0, nSilica * nSilica - 1.0 + cosLightGreen * cosLightGreen));\n        const lambdaGreen = 2.0 * dGreen * shiftFactorGreen;'
);
code = code.replace(
  'const cosLightBlue = Math.max(0, blueWorldNorm.dot(keyLightDir));',
  'const cosLightBlue = Math.max(0, blueWorldNorm.dot(keyLightDir));\n        const dBlue = 188.0;\n        const shiftFactorBlue = Math.sqrt(Math.max(0, nSilica * nSilica - 1.0 + cosLightBlue * cosLightBlue));\n        const lambdaBlue = 2.0 * dBlue * shiftFactorBlue;'
);
code = code.replace(
  'flashFactorNum = Number((Math.max(flashGreen, flashBlue) * 0.16).toFixed(3));',
  'flashFactorNum = Number((Math.max(flashGreen, flashBlue) * 0.16).toFixed(3));\n\n        const cosThetaI = Number(cosLightGreen.toFixed(3));\n        const cosThetaV = Number(cosThetaVGreen.toFixed(3));\n        const cosHalfNum = Number(cosHalfGreen.toFixed(3));\n        const lambdaGreenNum = Number(lambdaGreen.toFixed(1));\n        const lambdaBlueNum = Number(lambdaBlue.toFixed(1));'
);

const stateUpdateReg = /prev\.pitchDeg === pitchDeg &&\n\s*prev\.yawDeg === yawDeg &&\n\s*prev\.rollDeg === rollDeg &&\n\s*prev\.camAzimuth === camAzimuth &&\n\s*prev\.camElevation === camElevation\n\s*\)\n\s*return prev;\n\n\s*return \{\n\s*\.\.\.prev,\n\s*yawDeg,\n\s*pitchDeg,\n\s*rollDeg,\n\s*camAzimuth,\n\s*camElevation,\n\s*camDistance,\n\s*camPos: \[Number\(camera\.position\.x\.toFixed\(2\)\), Number\(camera\.position\.y\.toFixed\(2\)\), Number\(camera\.position\.z\.toFixed\(2\)\)\],\n\s*camDir: \[Number\(camDir\.x\.toFixed\(2\)\), Number\(camDir\.y\.toFixed\(2\)\), Number\(camDir\.z\.toFixed\(2\)\)\],\n\s*keyLightPos: \[Number\(keyLightPosVec\.x\.toFixed\(2\)\), Number\(keyLightPosVec\.y\.toFixed\(2\)\), Number\(keyLightPosVec\.z\.toFixed\(2\)\)\],\n\s*L: \[Number\(keyLightDir\.x\.toFixed\(2\)\), Number\(keyLightDir\.y\.toFixed\(2\)\), Number\(keyLightDir\.z\.toFixed\(2\)\)\],\n\s*V: \[Number\(viewDir\.x\.toFixed\(2\)\), Number\(viewDir\.y\.toFixed\(2\)\), Number\(viewDir\.z\.toFixed\(2\)\)\],\n\s*H: \[Number\(halfVec\.x\.toFixed\(2\)\), Number\(halfVec\.y\.toFixed\(2\)\), Number\(halfVec\.z\.toFixed\(2\)\)\],\n\s*flashFactor: flashFactorNum,\n\s*greenResponse: greenResp,\n\s*blueResponse: blueResp,\n\s*totalResponse: totalResp,\n\s*\};/g;

code = code.replace(stateUpdateReg, (match) => {
  return match.replace(
    'totalResponse: totalResp,',
    'totalResponse: totalResp,\n            cosThetaI,\n            cosThetaV,\n            cosHalf: cosHalfNum,\n            lambdaGreen: lambdaGreenNum,\n            lambdaBlue: lambdaBlueNum,'
  );
});

// Update UI Buttons
code = code.replace(
  "{ id: 30, label: '30 · TEST T: BLUE MASKED FLASH' },",
  "{ id: 30, label: '30 · TEST T: BLUE MASKED FLASH' },\n          { id: 31, label: '31 · TEST U: MASKED cosThetaI' },\n          { id: 32, label: '32 · TEST V: MASKED cosThetaV' },\n          { id: 33, label: '33 · TEST W: OPTICAL VALIDITY GATE' },\n          { id: 34, label: '34 · TEST X: SPECTRUM NO VIEW GATE' },\n          { id: 35, label: '35 · TEST Y: SPECTRAL RGB' },"
);

// Update telemetry UI rendering
code = code.replace(
  '<div>GREEN RESPONSE (APPROXIMATE REFERENCE RESPONSE): <span className="text-provenance-gold font-bold">{calibrationTelemetry.greenResponse}</span></div>',
  `<div>GREEN RESPONSE (APPROXIMATE REFERENCE RESPONSE): <span className="text-provenance-gold font-bold">{calibrationTelemetry.greenResponse}</span></div>
              <div className="grid grid-cols-3 gap-1 pt-0.5 text-bone-muted border-t border-hairline-subtle mt-0.5">
                <div>cosThetaI: <span className="text-bone-primary font-bold">{calibrationTelemetry.cosThetaI}</span></div>
                <div>cosThetaV: <span className="text-bone-primary font-bold">{calibrationTelemetry.cosThetaV}</span></div>
                <div>cosHalf: <span className="text-bone-primary font-bold">{calibrationTelemetry.cosHalf}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-0.5 text-bone-muted">
                <div>λ Green: <span className="text-bone-primary font-bold">{calibrationTelemetry.lambdaGreen}nm</span></div>
                <div>λ Blue: <span className="text-bone-primary font-bold">{calibrationTelemetry.lambdaBlue}nm</span></div>
              </div>`
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
