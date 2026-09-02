const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

// 1. Add uKeyLightDir
code = code.replace(
  'shader.uniforms.uKeyLightPos = { value: new THREE.Vector3(4.0, 5.0, 3.0) };',
  'shader.uniforms.uKeyLightDir = { value: new THREE.Vector3(4.0, 5.0, 3.0).normalize() };'
);

code = code.replace(
  'uniform vec3 uKeyLightPos;',
  'uniform vec3 uKeyLightDir;'
);

// 2. Vertex Shader setup
code = code.replace(
  /varying vec3 vOpalLocalNormal;`/,
  `varying vec3 vOpalLocalNormal;\n        varying mat3 vOpalWorldRotation;\n` + '`'
);

code = code.replace(
  /vOpalWorldNormal = normalize\(\(modelMatrix \* vec4\(normal, 0\.0\)\)\.xyz\);`/,
  `vOpalWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);\n        vOpalWorldRotation = mat3(modelMatrix);\n` + '`'
);

// 3. Fragment shader varying
code = code.replace(
  /varying vec3 vOpalWorldNormal;/,
  `varying vec3 vOpalWorldNormal;\n        varying mat3 vOpalWorldRotation;`
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
