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

let gridHelper: THREE.GridHelper;

let isMouseDown: boolean;
let mousePos: THREE.Vector2;
let raycaster: THREE.Raycaster;

let pivotTargetPos: THREE.Vector3;
let cameraTargetPos: THREE.Vector3;
var particleSystem1: import("./lib/partykals/particles_system");
var particleSystem2: import("./lib/partykals/particles_system");

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

	gridHelper = new THREE.GridHelper(10, 10);

	mesh1 = new THREE.Mesh(geometry1, material1);
	mesh2 = new THREE.Mesh(geometry2, material2);

	mesh1.name = "crate";
	mesh2.name = "rock";

	isMouseDown = false;
	mousePos = new THREE.Vector2(-1, -1);
	raycaster = new THREE.Raycaster();

	pivotTargetPos = new THREE.Vector3();
	cameraTargetPos = new THREE.Vector3();

	particleSystem1 = new Partykals.ParticlesSystem({
		container: scene,
		particles: {
			startAlpha: 1,
			endAlpha: 0,
			startSize: 0.2,
			endSize: 0.9,
			ttl: 0.4,
			offset: new Partykals.Randomizers.SphereRandomizer(0.9, 0.3, 0, 0, 0),
			startColor: new Partykals.Randomizers.ColorsRandomizer(new THREE.Color(0.5, 0.2, 0), new THREE.Color(1, 0.5, 0)),
			endColor: new Partykals.Randomizers.ColorsRandomizer(new THREE.Color(0.75, 0.2, 0.1), new THREE.Color(1, 0.25, 0.3)),
			blending: "additive",
		},
		system: {
			particlesCount: 2500,
			scale: 400,
			depthWrite: false,
			emitters: new Partykals.Emitter({
				onInterval: new Partykals.Randomizers.MinMaxRandomizer(35, 85),
				interval: new Partykals.Randomizers.MinMaxRandomizer(0, 0.015),
			}),
			speed: 1,
			onUpdate: (system: import("./lib/partykals/particles_system")) => {
				system.particleSystem.rotation.y += system.dt;
			},
			ttl: 0
		}
	});

	particleSystem2 = new Partykals.ParticlesSystem({
		container: scene,
		particles: {
			startAlpha: 1,
			endAlpha: 0,
			startSize: new Partykals.Randomizers.MinMaxRandomizer(0.1, 0.5),
			endSize: new Partykals.Randomizers.MinMaxRandomizer(0.5, 2),
			ttl: 1,
			velocity: new Partykals.Randomizers.SphereRandomizer(0.5, 1, 0, 0, 0),
			startColor: new Partykals.Randomizers.ColorsRandomizer(new THREE.Color(0.5, 0.2, 0), new THREE.Color(1, 0.5, 0)),
			endColor: new THREE.Color(0, 0, 0.5),
			blending: "additive",
			worldPosition: true,
			rotation: new Partykals.Randomizers.MinMaxRandomizer(0, 6.28319),
			rotationSpeed: new Partykals.Randomizers.MinMaxRandomizer(-10, 10),
		},
		system: {
			particlesCount: 500,
			scale: 400,
			depthWrite: false,
			emitters: new Partykals.Emitter({
				onInterval: new Partykals.Randomizers.MinMaxRandomizer(250, 500),
				interval: 1,
			}),
			speed: 1,
			ttl: 0
		}
	});
}

function setupScene() {
	scene.add(camera);
	scene.add(cameraPivot);
	scene.add(spotLight);
	scene.add(hemisphereLight);
	scene.add(gridHelper);
	scene.background = new THREE.Color(0x333333);

	camera.parent = cameraPivot;
	camera.position.z = 3;
	camera.lookAt(VECTOR_THREE_ZERO);
	cameraPivot.rotation.x = -0.7;
	cameraPivot.rotation.y = 0.2;
	
	raycaster.layers.set(1);

	spotLight.position.set(0.2, 1.5, 1);
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

	mesh1.layers.enable(1);
	mesh2.layers.enable(1);

	particleSystem1.particleSystem.position.x = mesh1.position.x;
	particleSystem2.particleSystem.position.x = mesh2.position.x;

	pivotTargetPos = mesh1.position;
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
	document.addEventListener('keyup', onDocumentKeyUp, false);
}

function update(time: number) {
	var dt = clock.getDelta();

	raycaster.setFromCamera(mousePos, camera);
	const intersects = raycaster.intersectObjects(scene.children);

	if (intersects.length > 0) {
		if (intersects[0].object.name == "crate")
			particleSystem1.ttl = 0.3;
		else if (intersects[0].object.name == "rock")
			particleSystem2.ttl = 0.3;
	}

	particleSystem1.update(dt);
	particleSystem2.update(dt);

	cameraPivot.position.lerp(pivotTargetPos, 0.1);
	
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
				pivotTargetPos = intersects[0].object.position;
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

	if (isMouseDown) {
		switch (event.which) {
			case 1:
				cameraPivot.rotateY(event.movementX * Math.PI / 360);
				cameraPivot.rotateX(event.movementY * Math.PI / 360);
				break;
			case 2:
				break;
			case 3:
				camera.position.z += event.movementY * 0.01;
				break;
		}
    }
}

function onDocumentKeyUp(event: KeyboardEvent) {
	event.preventDefault();

	switch (event.code) {
		case "Space":
			gridHelper.visible = !gridHelper.visible;
			break;
    }
}

function onContextMenu(event: Event) {
	event.preventDefault();
}