const CAMERA_FOV: number = 75;
const CAMERA_ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
const CAMERA_NEAR_PLANE: number = 0.1;
const CAMERA_FAR_PLANE: number = 1000;
const VECTOR_THREE_ZERO: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let spotLight: THREE.SpotLight;
let hemisphereLight: THREE.HemisphereLight;
let clock: THREE.Clock;
let cameraPivot: THREE.Object3D;
let loader: THREE.TextureLoader;

let geometry1: THREE.BoxGeometry;
let geometry2: THREE.SphereGeometry;

let material1: THREE.MeshStandardMaterial;
let material2: THREE.MeshStandardMaterial;

let mesh1: THREE.Mesh;
let mesh2: THREE.Mesh;

let matrix: THREE.Matrix4; 

let isMouseDown: boolean;
let mousePos: THREE.Vector2;
let raycaster: THREE.Raycaster;

let targetPos: THREE.Vector3;

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
	clock = new THREE.Clock();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT_RATIO, CAMERA_NEAR_PLANE, CAMERA_FAR_PLANE);
	cameraPivot = new THREE.Object3D();
	spotLight = new THREE.SpotLight(0xffffbb, 2);
	hemisphereLight = new THREE.HemisphereLight(0x443333, 0x111122);
	loader = new THREE.TextureLoader();

	geometry1 = new THREE.BoxGeometry(1, 1, 1);
	geometry2 = new THREE.SphereGeometry(0.5, 16, 16);

	material1 = new THREE.MeshStandardMaterial({
		map: loader.load('/assets/texture/crate/crate_diffuse.jpg'),
		normalMap: loader.load('/assets/texture/crate/crate_normal.jpg')
    });
	material2 = new THREE.MeshStandardMaterial({
		map: loader.load('/assets/texture/rock/rock_diffuse.jpg'),
		normalMap: loader.load('/assets/texture/rock/rock_normal.jpg')
	});

	mesh1 = new THREE.Mesh(geometry1, material1);
	mesh2 = new THREE.Mesh(geometry2, material2);

	matrix = new THREE.Matrix4();

	isMouseDown = false;
	mousePos = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	targetPos = new THREE.Vector3();
}

function setupScene() {
	scene.add(camera);
	scene.add(cameraPivot);
	scene.add(spotLight);
	scene.add(hemisphereLight);

	scene.background = new THREE.Color(0x333333);

	camera.parent = cameraPivot;
	camera.position.z = 3;
	camera.lookAt(VECTOR_THREE_ZERO);

	spotLight.position.set(0.5, 0, 1);
	spotLight.position.multiplyScalar(700);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 512;
	spotLight.shadow.mapSize.height = 512;
	spotLight.shadow.camera.near = 200;
	spotLight.shadow.camera.far = 1500;
	spotLight.shadow.camera.fov = 40;
	spotLight.shadow.bias = - 0.005;
}

function setupActors() {
	scene.add(mesh1);
	scene.add(mesh2);

	mesh1.position.x = -1;
	mesh2.position.x = 1;

	targetPos = mesh1.position;
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
	cameraPivot.position.lerp(targetPos, 0.1);

	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event: MouseEvent) {
	event.preventDefault();

	isMouseDown = true;

	switch (event.which) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
	}
}

function onDocumentMouseUp(event: MouseEvent) {
	event.preventDefault();
		
	isMouseDown = false;

	switch (event.which) {
		case 1: 
			raycaster.setFromCamera(mousePos, camera);
			const intersects = raycaster.intersectObjects(scene.children);

			if (intersects.length > 0) {
				targetPos = intersects[0].object.position;
            }
			break;
		case 2:
			break;
		case 3:
			break;
	}
}

function onDocumentMouseMove(event: MouseEvent) {
	event.preventDefault();

	mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;

	if (event.which == 1 && isMouseDown) {
		cameraPivot.rotateY(event.movementX * Math.PI/180);
		cameraPivot.rotateX(event.movementY * Math.PI/180);
    }
}

function onContextMenu(event: Event) {
	event.preventDefault();
}