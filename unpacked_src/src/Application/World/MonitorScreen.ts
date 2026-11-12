import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import Application from '../Application';
import EventEmitter from '../Utils/EventEmitter';

const SCREEN_SIZE = { w: 1280, h: 671 };

export default class MonitorScreen extends EventEmitter {
    application: Application;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    sizes: any;
    resources: any;
    screenSize: THREE.Vector2;
    camera: any;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    mouseClickInProgress: boolean;
    shouldLeaveMonitor: boolean;
    inComputer: boolean;
    prevInComputer: boolean;

    constructor() {
        super();
        this.application = new Application();
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.sizes = this.application.sizes;
        this.resources = this.application.resources;
        this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
        this.camera = this.application.camera;
        this.position = new THREE.Vector3(0, 950, 257.5);
        this.rotation = new THREE.Euler(0, 0, 0);
        this.mouseClickInProgress = false;
        this.shouldLeaveMonitor = false;

        this.initializeScreenEvents();
        this.createIframe();
    }

    initializeScreenEvents() {
        document.addEventListener('mousemove', (event: any) => {
            if (event.target && event.target.id === 'computer-screen') {
                event.inComputer = true;
            }
            this.inComputer = event.inComputer;
            if (this.inComputer && !this.prevInComputer) {
                this.camera.trigger('enterMonitor');
            }
            if (!this.inComputer && this.prevInComputer && !this.mouseClickInProgress) {
                this.camera.trigger('leftMonitor');
            }
            if (!this.inComputer && this.mouseClickInProgress && this.prevInComputer) {
                this.shouldLeaveMonitor = true;
            } else {
                this.shouldLeaveMonitor = false;
            }
            this.application.mouse.trigger('mousemove', [event]);
            this.prevInComputer = this.inComputer;
        }, false);

        document.addEventListener('mousedown', (event: any) => {
            this.inComputer = event.inComputer;
            this.application.mouse.trigger('mousedown', [event]);
            this.mouseClickInProgress = true;
            this.prevInComputer = this.inComputer;
        }, false);

        document.addEventListener('mouseup', (event: any) => {
            this.inComputer = event.inComputer;
            this.application.mouse.trigger('mouseup', [event]);
            if (this.shouldLeaveMonitor) {
                this.camera.trigger('leftMonitor');
                this.shouldLeaveMonitor = false;
            }
            this.mouseClickInProgress = false;
            this.prevInComputer = this.inComputer;
        }, false);
    }

    createIframe() {
        const container = document.createElement('div');
        container.style.width = this.screenSize.width + 'px';
        container.style.height = this.screenSize.height + 'px';
        container.style.opacity = '1';
        container.style.background = '#0b0f19';
        container.style.overflow = 'hidden';
        container.style.borderRadius = '4px';

        const iframe = document.createElement('iframe');
        iframe.onload = () => {
            if (iframe.contentWindow) {
                window.addEventListener('message', (event) => {
                    const evt: any = new CustomEvent(event.data.type, {
                        bubbles: true,
                        cancelable: false,
                    });
                    evt.inComputer = true;
                    if (event.data.type === 'mousemove') {
                        const clRect = iframe.getBoundingClientRect();
                        const { top, left, width, height } = clRect;
                        const widthRatio = width / SCREEN_SIZE.w;
                        const heightRatio = height / SCREEN_SIZE.h;
                        evt.clientX = Math.round(event.data.clientX * widthRatio + left);
                        evt.clientY = Math.round(event.data.clientY * heightRatio + top);
                    } else if (event.data.type === 'keydown' || event.data.type === 'keyup') {
                        evt.key = event.data.key;
                    }
                    iframe.dispatchEvent(evt);
                });
            }
        };

        iframe.src = '/os/index.html';
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('dev')) {
            iframe.src = 'http://localhost:3000/';
        }
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.padding = '0px';
        iframe.style.boxSizing = 'border-box';
        iframe.style.opacity = '1';
        iframe.id = 'computer-screen';
        iframe.title = 'DharshanOS';

        container.appendChild(iframe);
        this.createCssPlane(container);
    }

    createCssPlane(element: HTMLElement) {
        const object = new CSS3DObject(element);
        object.position.copy(this.position);
        object.rotation.copy(this.rotation);
        // Scale to match widescreen monitor mesh (661.2 x 346.5)
        object.scale.set(0.5165, 0.5165, 1);
        this.cssScene.add(object);

        const material = new THREE.MeshLambertMaterial();
        material.side = THREE.DoubleSide;
        material.opacity = 0;
        material.transparent = true;
        material.blending = THREE.NoBlending;

        const geometry = new THREE.PlaneGeometry(661.2, 346.5);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        this.scene.add(mesh);
    }

    update() {}
}
