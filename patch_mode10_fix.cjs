const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

code = code.replace(
  'vec3 domainNormal = opalOrientationField(vOpalLocalPos, vOpalWorldNormal);',
  'vec3 localDomainNormal = opalOrientationField(vOpalLocalPos, vOpalLocalNormal);\n          vec3 domainNormal = normalize(vOpalWorldRotation * localDomainNormal);'
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
