import * as THREE from 'three';

// src
import Experience from '../experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 1.5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;

    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    // this.ambientLight = new THREE.AmbientLight('#ffffff', 1);
    // this.scene.add(this.ambientLight);
  }

  resize() {}

  update() {}
}
