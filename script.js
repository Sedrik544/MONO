// --- KONFIGURACE ---
let scene, camera, renderer, crystal, particles;
const cursor = document.getElementById('cursor');

// --- INICIALIZACE 3D SCÉNY ---
function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Hlavní objekt - Geometrický krystal
    const geometry = new THREE.OctahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        emissive: 0xc5a059,
        emissiveIntensity: 0.3
    });
    crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // Digitální prach (Particles)
    const partGeom = new THREE.BufferGeometry();
    const partCount = 2000;
    const posArray = new Float32Array(partCount * 3);

    for(let i=0; i < partCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    partGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({ size: 0.005, color: 0xc5a059 });
    particles = new THREE.Points(partGeom, partMat);
    scene.add(particles);

    // Osvětlení
    const pointLight = new THREE.PointLight(0xc5a059, 2, 10);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    animate();
}

// --- SMYČKA ANIMACE ---
function animate() {
    requestAnimationFrame(animate);
    
    // Konstantní rotace
    crystal.rotation.y += 0.002;
    crystal.rotation.z += 0.001;
    particles.rotation.y -= 0.0003;
    
    renderer.render(scene, camera);
}

// --- EVENT LISTENERY (Živost systému) ---
window.addEventListener('mousemove', (e) => {
    // 1. Pohyb vlastního kurzoru
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // 2. Parallax efekt krystalu (reakce na pohyb myši)
    if(crystal) {
        const xNormalized = (e.clientX / window.innerWidth - 0.5) * 2;
        const yNormalized = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Jemné naklánění krystalu podle myši
        crystal.rotation.x = yNormalized * 0.4;
        crystal.rotation.y = xNormalized * 0.4 + (Date.now() * 0.001); // Kombinace s auto-rotací
    }
});

// Responzivita (aby to vypadalo skvěle všude)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start systému
init3D();
