const CAMERA_FOV: number = 75;
const CAMERA_ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
const CAMERA_NEAR_PLANE: number = 0.1;
const CAMERA_FAR_PLANE: number = 1000;

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

let geometry1: THREE.BoxGeometry;
let geometry2: THREE.DodecahedronBufferGeometry;

let material1: THREE.MeshNormalMaterial;
let material2: THREE.MeshNormalMaterial;

let mesh1: THREE.Mesh;
let mesh2: THREE.Mesh;

start();

function start() {
	init();
	setupScene();
	setupActors();
	setupRenderer();
	setupEvents();
}

function init() {
	renderer = new THREE.WebGLRenderer();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT_RATIO, CAMERA_NEAR_PLANE, CAMERA_FAR_PLANE);

	geometry1 = new THREE.BoxGeometry(1, 1, 1);
	geometry2 = new THREE.DodecahedronBufferGeometry(0.5);

	material1 = new THREE.MeshNormalMaterial();
	material2 = new THREE.MeshNormalMaterial();

	mesh1 = new THREE.Mesh(geometry1, material1);
	mesh2 = new THREE.Mesh(geometry2, material2);
}

function setupScene() {
	camera.position.z = 5;
}

function setupActors() {
	scene.add(mesh1);
	scene.add(mesh2);

	mesh1.position.x = -1;
	mesh2.position.x = 1;
}

function setupRenderer() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(update);
	document.body.appendChild(renderer.domElement);
}

function setupEvents() {
	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('contextmenu', onContextMenu, false);
}

function update(time: number) {
	mesh1.rotation.x = time / 2000;
	mesh1.rotation.y = time / 1000;

	mesh2.rotation.x = time / 2000;
	mesh2.rotation.y = time / 1000;

	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event: MouseEvent) {
	event.preventDefault();

	switch (event.which) {
		case 1:
			console.log("Event 1");
			break;
		case 2:
			console.log("Event 2");
			break;
		case 3:
			console.log("Event 3");
			break;
	}
}

function onDocumentMouseUp(event: MouseEvent) {
	event.preventDefault();

	switch (event.which) {
		case 1: 
			console.log("Event Up 1");
			break;
		case 2:
			console.log("Event Up 2");
			break;
		case 3:
			console.log("Event Up 3");
			break;
	}
}

function onDocumentMouseMove(event: MouseEvent) {
	event.preventDefault();

	console.log("Mouse X: " + event.x);
	console.log("Mouse Y: " + event.y);
}

function onContextMenu(event: Event) {
	event.preventDefault();
}