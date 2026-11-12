import * as THREE from 'three';
import Application from '../Application';

export default class Computer {
    application: Application;
    scene: THREE.Scene;
    resources: any;
    bakedModel: any;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.bakeModel();
        this.setModel();
    }

    bakeModel() {
        const gltf = this.resources.items.gltfModel.computerSetupModel;
        gltf.scene.scale.set(900, 900, 900);
        gltf.scene.position.set(292.06, -243.72, 622.75);

        // Adjust monitor to face straight ahead perpendicular to look direction
        const monitor = gltf.scene.getObjectByName('Monitor');
        if (monitor) {
            monitor.rotation.y = -9.10 * Math.PI / 180;
        }

        // Adjust chair position and rotation so it does not block the desk
        const chair = gltf.scene.getObjectByName('Chair');
        if (chair) {
            chair.position.set(-0.85, 0.073, 0.50);
            chair.rotation.y = 0.40;
        }

        const texLoader = new THREE.TextureLoader();

        // 1. Mobile screen -> Dharshan's LinkedIn profile view
        texLoader.load('models/NewWorkspace/textures/linkedin_profile.png', (t) => {
            t.flipY = false;
            gltf.scene.traverse((e: any) => {
                if (e.isMesh && e.material && e.material.name === 'Phone Screen Final') {
                    e.material.map = t;
                    e.material.needsUpdate = true;
                }
            });
        });

        // 2. Laptop screen -> Developer IDE / AI Workbench code view
        texLoader.load('models/NewWorkspace/textures/laptop_screen.png', (t) => {
            t.flipY = false;
            gltf.scene.traverse((e: any) => {
                if (e.isMesh && e.material && e.material.name === 'Display and Camera') {
                    e.material.map = t;
                    e.material.needsUpdate = true;
                }
            });
        });

        // 3. Hide Screen Final mesh so it doesn't block the interactive CSS3D iframe
        gltf.scene.traverse((e: any) => {
            if (e.isMesh && e.material && e.material.name === 'Screen Final') {
                e.visible = false;
            }
        });

        // Studio lighting for modern PBR materials on white/light background
        const amb = new THREE.AmbientLight(0xffffff, 2.2);
        const dir1 = new THREE.DirectionalLight(0xffffff, 2.4);
        dir1.position.set(600, 1800, 1200);
        const dir2 = new THREE.DirectionalLight(0xddeeff, 1.4);
        dir2.position.set(-800, 1400, -300);
        const dir3 = new THREE.DirectionalLight(0xfff5ee, 1.0);
        dir3.position.set(0, 1200, -800);
        this.scene.add(amb, dir1, dir2, dir3);

        this.bakedModel = { getModel: () => gltf.scene };
    }

    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }
}
