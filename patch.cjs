const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

code = code.replace(
  'float g_testOutBlueDomain = 0.0;',
  'float g_testOutBlueDomain = 0.0;\n        float g_testGreenLodeRawXY = 0.0;\n        float g_testDepthEnvelope = 0.0;\n        float g_testFrontFaceLock = 0.0;\n        float g_testSpecimenPosZ = 0.0;'
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
