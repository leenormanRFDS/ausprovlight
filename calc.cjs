const THREE = require('three');
const L = new THREE.Vector3(4.0, 5.0, 3.0).normalize();
const V = new THREE.Vector3(0, 0, 1);
const H = new THREE.Vector3().addVectors(L, V).normalize();

const bluePlane = new THREE.Vector3(-0.489, 0.546, 0.680);
const greenPlane = new THREE.Vector3(0.495, 0.331, 0.803);

const blueGeo = new THREE.Vector3(-0.3, 0.5, 0.3).normalize();
const greenGeo = new THREE.Vector3(0.58, 0.35, 0.30).normalize();

const blueBase = new THREE.Vector3().lerpVectors(blueGeo, bluePlane, 0.8).normalize();
const greenBase = new THREE.Vector3().lerpVectors(greenGeo, greenPlane, 0.8).normalize();

console.log("Blue Base:", blueBase.x.toFixed(3), blueBase.y.toFixed(3), blueBase.z.toFixed(3));
console.log("Green Base:", greenBase.x.toFixed(3), greenBase.y.toFixed(3), greenBase.z.toFixed(3));
