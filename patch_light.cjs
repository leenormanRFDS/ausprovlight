const fs = require('fs');
let code = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

code = code.replace(
  'shader.uniforms.uKeyLightDir = { value: new THREE.Vector3(4.0, 5.0, 3.0).normalize() };',
  `shader.uniforms.uKeyLightDir = { value: new THREE.Vector3(4.0, 5.0, -4.0).normalize() };
      shader.uniforms.uSpecimenFrontLocal = { value: new THREE.Vector3(0.0, 0.0, -1.0).normalize() };
      shader.uniforms.uSpecimenUpLocal = { value: new THREE.Vector3(0.0, 1.0, 0.0).normalize() };`
);

code = code.replace(
  'const keyLight = new THREE.DirectionalLight(0xfaf8f5, 2.0);\n    keyLight.position.set(4, 5, 3);',
  'const keyLight = new THREE.DirectionalLight(0xfaf8f5, 2.0);\n    keyLight.position.set(4, 5, -4);'
);

code = code.replace(
  'uniform vec3 uKeyLightDir;',
  `uniform vec3 uKeyLightDir;
        uniform vec3 uSpecimenFrontLocal;
        uniform vec3 uSpecimenUpLocal;`
);

fs.writeFileSync('src/components/opal/ThreeOpalViewer.tsx', code);
