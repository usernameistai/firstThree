import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// let you control the camera with the mouse


const scene = new THREE.Scene();

//   in brackets below (Field of View, Aspect Ratio of users browser window(w/h), next two -> view frustum (close as you want, as far as you want) from the camera)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// need a renderer for the camera
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio ); // set pixel ratio to the window pixel ratio of the device
renderer.setSize( window.innerWidth, window.innerHeight )  ; // Make it a full screen canvas
camera.position.setZ(30);// This move the position of the camera along the z-axis

renderer.render( scene, camera );

// Torus

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });// wrapping paper for geometry, Standard reacts to light bouncing off it, basic doesn't
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xfffff); // 0x lets you know working with hexadecimal literal
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff); // light up everything in the room
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight); // shows where the cource of the lght is coming from
const gridHelper = new THREE.GridHelper(200, 50); // draws a 2D grid on the scene
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); // listen to DOM events on the mouse and position accordingly

function addStar() {
  const geometry= new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );
  // Create random position for star to be at
  const [ x, y, z, ] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 )); // picks a random number between 100 and -100
  
  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const daveTexture = new THREE.TextureLoader().load('David.jpg');

const dave = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: daveTexture }));

scene.add(dave);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

dave.position.z = -5;
dave.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  dave.rotation.y += 0.01;
  dave.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation loop

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  moon.rotation.x += 0.005;

  dave.rotation.x += 0.01;
  dave.rotation.y += 0.005;
  dave.rotation.z += 0.01;
  
  renderer.render( scene, camera );
} 

animate();