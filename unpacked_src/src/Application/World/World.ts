import Application from '../Application';
import ComputerSetup from './Computer';
import MonitorScreen from './MonitorScreen';
import AudioManager from '../Audio/AudioManager';

export default class World {
    application: Application;
    scene: any;
    resources: any;
    computerSetup: ComputerSetup;
    monitorScreen: MonitorScreen;
    audioManager: AudioManager;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup - ONLY the modern computer workspace
            this.computerSetup = new ComputerSetup();
            this.monitorScreen = new MonitorScreen();
            this.audioManager = new AudioManager();
        });
    }

    update() {
        if (this.monitorScreen)
            this.monitorScreen.update();
        if (this.audioManager)
            this.audioManager.update();
    }
}
