import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.module.min.js';
import { locations } from './impact-data.js';

class ImpactMap3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.globe = null;
        this.markers = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.tooltip = document.getElementById('tooltip');
        this.loading = document.getElementById('loading');
        this.hoveredMarker = null;
        
        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();
        this.loadGlobe();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        
        // Add fog for depth
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    }

    setupCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(0, 5, 10);
    }

    setupRenderer() {
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    setupControls() {
        // Import OrbitControls dynamically
        import('https://cdn.skypack.dev/three@0.174.0/examples/jsm/controls/OrbitControls.js')
            .then(({ OrbitControls }) => {
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableDamping = true;
                this.controls.dampingFactor = 0.05;
                this.controls.minDistance = 3;
                this.controls.maxDistance = 20;
                this.controls.maxPolarAngle = Math.PI * 0.8;
                this.controls.autoRotate = true;
                this.controls.autoRotateSpeed = 0.5;
            });
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        this.scene.add(directionalLight);

        // Point light for rim lighting
        const pointLight = new THREE.PointLight(0x4CAF50, 0.5, 30);
        pointLight.position.set(-10, 5, -10);
        this.scene.add(pointLight);
    }

    async loadGlobe() {
        try {
            // Import GLTFLoader dynamically
            const { GLTFLoader } = await import('https://cdn.skypack.dev/three@0.174.0/examples/jsm/loaders/GLTFLoader.js');
            
            const loader = new GLTFLoader();
            
            loader.load(
                'assets/india/scene.gltf',
                (gltf) => {
                    this.globe = gltf.scene;
                    
                    // Scale and position the globe
                    this.globe.scale.setScalar(2);
                    this.globe.position.set(0, 0, 0);
                    
                    // Enable shadows
                    this.globe.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            
                            // Enhance materials
                            if (child.material) {
                                child.material.needsUpdate = true;
                            }
                        }
                    });
                    
                    this.scene.add(this.globe);
                    this.createMarkers();
                    this.hideLoading();
                },
                (progress) => {
                    console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
                },
                (error) => {
                    console.error('Error loading GLTF:', error);
                    this.hideLoading();
                }
            );
        } catch (error) {
            console.error('Error importing GLTFLoader:', error);
            this.hideLoading();
        }
    }

    createMarkers() {
        locations.forEach((location, index) => {
            const markerGroup = new THREE.Group();
            
            // Convert lat/lng to 3D coordinates
            const position = this.latLngToVector3(location.lat, location.lng, 2.1);
            
            // Create marker geometry (sphere)
            const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            const markerMaterial = new THREE.MeshPhongMaterial({
                color: 0x4CAF50,
                emissive: 0x004d00,
                shininess: 100
            });
            
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.copy(position);
            marker.userData = { location: location, index: index };
            
            // Create pulsing ring effect
            const ringGeometry = new THREE.RingGeometry(0.08, 0.12, 16);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x4CAF50,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(position);
            ring.lookAt(new THREE.Vector3(0, 0, 0));
            
            // Create connecting line to surface
            const lineGeometry = new THREE.BufferGeometry();
            const surfacePosition = this.latLngToVector3(location.lat, location.lng, 2.0);
            const linePoints = [surfacePosition, position];
            lineGeometry.setFromPoints(linePoints);
            
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x4CAF50,
                transparent: true,
                opacity: 0.6
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            
            markerGroup.add(marker);
            markerGroup.add(ring);
            markerGroup.add(line);
            
            this.scene.add(markerGroup);
            this.markers.push({ group: markerGroup, marker: marker, ring: ring, data: location });
        });
    }

    latLngToVector3(lat, lng, radius) {
        // Convert latitude and longitude to 3D coordinates
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
        
        return new THREE.Vector3(x, y, z);
    }

    setupEventListeners() {
        // Mouse move for tooltip
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            this.handleMouseMove(event);
        });

        // Click events
        window.addEventListener('click', (event) => {
            this.handleClick(event);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Disable auto-rotation on user interaction
        if (this.controls) {
            this.controls.addEventListener('start', () => {
                this.controls.autoRotate = false;
            });
        }
    }

    handleMouseMove(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const markerMeshes = this.markers.map(m => m.marker);
        const intersects = this.raycaster.intersectObjects(markerMeshes);
        
        if (intersects.length > 0) {
            const intersectedMarker = intersects[0].object;
            const markerData = this.markers.find(m => m.marker === intersectedMarker);
            
            if (markerData && this.hoveredMarker !== markerData) {
                this.showTooltip(event, markerData.data);
                this.hoveredMarker = markerData;
                
                // Highlight effect
                markerData.marker.material.emissive.setHex(0x006600);
                markerData.ring.material.opacity = 0.6;
                document.body.style.cursor = 'pointer';
            }
        } else {
            if (this.hoveredMarker) {
                this.hideTooltip();
                this.hoveredMarker.marker.material.emissive.setHex(0x004d00);
                this.hoveredMarker.ring.material.opacity = 0.3;
                this.hoveredMarker = null;
                document.body.style.cursor = 'default';
            }
        }
    }

    handleClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const markerMeshes = this.markers.map(m => m.marker);
        const intersects = this.raycaster.intersectObjects(markerMeshes);
        
        if (intersects.length > 0) {
            const intersectedMarker = intersects[0].object;
            const location = intersectedMarker.userData.location;
            
            // You can add click functionality here
            console.log('Clicked on:', location.name);
            
            // Example: Focus camera on clicked marker
            this.focusOnMarker(intersectedMarker.position);
        }
    }

    focusOnMarker(position) {
        if (this.controls) {
            // Animate camera to focus on the marker
            const targetPosition = position.clone().multiplyScalar(1.5);
            
            // Simple animation - you could use GSAP or Tween.js for smoother animations
            const startPosition = this.camera.position.clone();
            const duration = 1000; // 1 second
            const startTime = Date.now();
            
            const animateCamera = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                this.camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
                this.controls.target.lerp(position, easeProgress);
                
                if (progress < 1) {
                    requestAnimationFrame(animateCamera);
                }
            };
            
            animateCamera();
        }
    }

    showTooltip(event, location) {
        const tooltip = this.tooltip;
        const tooltipName = document.getElementById('tooltip-name');
        const tooltipBeneficiaries = document.getElementById('tooltip-beneficiaries');
        const tooltipBudget = document.getElementById('tooltip-budget');
        
        tooltipName.textContent = location.name;
        tooltipBeneficiaries.textContent = location.beneficiaries;
        tooltipBudget.textContent = location.budget;
        
        tooltip.style.left = event.clientX + 'px';
        tooltip.style.top = event.clientY + 'px';
        tooltip.classList.add('visible');
    }

    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    hideLoading() {
        setTimeout(() => {
            this.loading.classList.add('hidden');
        }, 500);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Animate marker rings
        this.markers.forEach((markerData, index) => {
            const time = Date.now() * 0.001;
            const ring = markerData.ring;
            
            // Pulsing effect
            const scale = 1 + Math.sin(time * 2 + index) * 0.1;
            ring.scale.setScalar(scale);
            
            // Rotation
            ring.rotation.z += 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the 3D Impact Map when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImpactMap3D();
});

// Export for potential external use
export default ImpactMap3D;