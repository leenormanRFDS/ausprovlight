const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

// 4. Update opalOrientationField signature
code = code.replace(
  'vec3 opalOrientationField(vec3 localPos, vec3 worldNormal) {',
  'vec3 opalOrientationField(vec3 localPos, vec3 baseNormal) {'
);

// 5. Update Mode 5 / 6 Usage
code = code.replace(
  'vec3 L = normalize(uKeyLightPos - vOpalWorldPos);',
  'vec3 L = normalize(uKeyLightDir);'
);

code = code.replace(
  'vec3 domainNormal = opalOrientationField(vOpalLocalPos, vOpalWorldNormal);',
  'vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);\n            vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);'
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
