import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let group, mesh;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 10000);

// LIGHT (required)
const light = new THREE.DirectionalLight(0xff00f0, 1);
light.position.set(100,100,100);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LOAD STL
const loadObject = () => {
    const loader = new STLLoader();
    loader.load("./stls/Turntable Movement Panel.stl", function (geometry) {
        group = new THREE.Group();
        scene.add(group);

        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        mesh = new THREE.Mesh(geometry, material);

        geometry.center();
        mesh.scale.set(10,10,10);

        group.add(mesh);
    });
};

// GUI
const createGUI = () => {
    let guiEvents = {
        spinRight: function (e) {
            group.rotation.y -= 0.25
            controls.update()
        },
        spinLeft: function () {
            group.rotation.y += 0.25
            controls.update()
        },
        forward: function () {
            group.rotation.x -= 0.25
            controls.update()
        },
        backward: function () {
            group.rotation.x += 0.25
            controls.update()
        },
        right: function () {
            group.rotation.z += 0.25
            controls.update()
        },
        left: function () {
            group.rotation.z -= 0.25
            controls.update()
        },
    }

    let gui = new GUI()

    const guiConfig = [
        {
            name: "SpinRight",
            functionKey: "spinRight",
        },
        {
            name: "SpinLeft",
            functionKey: "spinLeft",
        },
        {
            name: "Forward",
            functionKey: "forward",
        },
        {
            name: "Backward",
            functionKey: "backward",
        },
        {
            name: "Right",
            functionKey: "right",
        },
        {
            name: "Left",
            functionKey: "left",
        },
    ]

    guiConfig.forEach(config => {
        gui.add(guiEvents, config.functionKey).name(config.name)
    })
}

// INIT
loadObject();
createGUI();

camera.position.set(0, 1000, 1200);
camera.lookAt(0, 0, 0);     


// RENDER LOOP
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


//TODO: implement orbital controls