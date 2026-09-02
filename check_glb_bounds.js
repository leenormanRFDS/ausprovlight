const fs = require('fs');
const THREE = require('three');
require('three/examples/jsm/loaders/GLTFLoader.js');
// We need to run this in Node but GLTFLoader uses DOM.
// So let's just parse the GLTF JSON if possible.
