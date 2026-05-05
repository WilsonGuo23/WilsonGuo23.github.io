import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let group, mesh;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 10000);

// LIGHT (required)
const light = new THREE.DirectionalLight(0xff00f0, 1);
light.position.set(0,100,100);
scene.add(light);
const light2 = new THREE.DirectionalLight(0xff00f0, 1);
light2.position.set(0,-100,-100);
scene.add(light2);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// LOAD STL
export const loadObject = (filepath) => {
    const loader = new STLLoader();
    loader.load(filepath, function (geometry) {
        group = new THREE.Group();
        scene.add(group);

        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        mesh = new THREE.Mesh(geometry, material);

        geometry.center();
        mesh.scale.set(10,10,10);

        group.add(mesh);
    });
};


// INIT
//loadObject("./stls/Turntable Movement Panel.stl");

camera.position.set(0, 1000, 1200);
camera.lookAt(0, 0, 0);     


// RENDER LOOP
function animate() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


//TODO: make display show up on github pages