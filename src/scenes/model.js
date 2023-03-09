import * as THREE from 'three';

// src
import Experience from '../experience.js';

export default class Model {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    let boxGeo = new THREE.BoxGeometry(1, 1, 1);
    let boxMat = new THREE.MeshNormalMaterial();
    this.box = new THREE.Mesh(boxGeo, boxMat);

    this.scene.add(this.box);
  }

  setAnimation() {
    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;
    this.box.rotation.z += 0.01;
  }

  resize() {}

  update() {
    this.setAnimation();
  }
}
