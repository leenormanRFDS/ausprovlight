const fs = require('fs');
const buffer = fs.readFileSync('public/images/Matrixtwin_opal.glb');
const magic = buffer.readUInt32LE(0);
if (magic !== 0x46546C67) { console.log('Not a GLB'); process.exit(1); }
const chunkLength = buffer.readUInt32LE(12);
const chunkType = buffer.readUInt32LE(16);
if (chunkType !== 0x4E4F534A) { console.log('First chunk not JSON'); process.exit(1); }
const jsonStr = buffer.toString('utf8', 20, 20 + chunkLength);
const gltf = JSON.parse(jsonStr);

let min = [Infinity, Infinity, Infinity];
let max = [-Infinity, -Infinity, -Infinity];

gltf.meshes.forEach(mesh => {
  mesh.primitives.forEach(prim => {
    if (prim.attributes.POSITION !== undefined) {
      const acc = gltf.accessors[prim.attributes.POSITION];
      if (acc.min) {
        min[0] = Math.min(min[0], acc.min[0]);
        min[1] = Math.min(min[1], acc.min[1]);
        min[2] = Math.min(min[2], acc.min[2]);
      }
      if (acc.max) {
        max[0] = Math.max(max[0], acc.max[0]);
        max[1] = Math.max(max[1], acc.max[1]);
        max[2] = Math.max(max[2], acc.max[2]);
      }
    }
  });
});
console.log('Min:', min);
console.log('Max:', max);
