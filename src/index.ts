let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let geometry: THREE.BoxGeometry;
let material: THREE.MeshNormalMaterial;
let mesh: THREE.Mesh;

const camera_fov: number = 75;
const camera_aspect_ratio: number = window.innerWidth / window.innerHeight;
const camera_near_plane: number = 0.1;
const camera_far_plane: number = 1000;

init();

function init() {

	camera = new THREE.PerspectiveCamera(camera_fov, camera_aspect_ratio, camera_near_plane, camera_far_plane);
	camera.position.z = 5;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry(2, 2, 2);
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	mesh.position.x = 1;
	mesh.position.z = -2;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);
}

function animation(time: number) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render(scene, camera);
}