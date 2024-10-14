// Configuración de la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Añadir controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añadir inercia al movimiento
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; // Deshabilitar desplazamiento en espacio de la pantalla
controls.minDistance = 2; // Distancia mínima de zoom
controls.maxDistance = 50; // Distancia máxima de zoom

// Cargar el entorno HDRI usando RGBELoader
const rgbeLoader = new THREE.RGBELoader();
rgbeLoader.load('goegap_road_2k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    // Cargar el modelo GLTF después de cargar el HDRI
    const loader = new THREE.GLTFLoader();
loader.load('https://raw.githubusercontent.com/dfernandezy/dfernandezy.github.io/main/three/scene.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    model.position.set(0, -1, 0);
    model.scale.set(1, 1, 1);

    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    animate();
}, undefined, function (error) {
    console.error('Error al cargar el modelo:', error);
});
}, undefined, function (error) {
    console.error('Error al cargar el HDRI:', error);
});

// Añadir luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Configurar la cámara
camera.position.z = 5;

// Animación de la escena
// Animación de la escena
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.0008;
    renderer.render(scene, camera);
}

// Ajustar el tamaño del canvas al redimensionar la ventana
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
