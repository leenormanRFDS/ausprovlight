const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /\/\/ Diagnostic Mode 9:[\s\S]*?gl_FragColor = vec4\(forcedRes, 1\.0\);\n        }/;
const replacement = `// Diagnostic Mode 9: FORCED RESONANCE (Test 4 - Bragg output on masks, bypassing geometry orientation)
        if (uDebugMode == 9) {
          float lambdaGreen = 530.0;
          float lambdaBlue = 460.0;
          vec3 specG = spectralJet(lambdaGreen);
          vec3 specB = spectralJet(lambdaBlue);
          vec3 forcedRes = (specG * g_greenFireMask * 2.8) + (specB * g_blueFireMask * 2.8);
          gl_FragColor = vec4(forcedRes, 1.0);
        }`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
