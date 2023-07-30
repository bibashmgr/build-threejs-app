import * as THREE from 'three';

import Experience from '../Experience.js';

// shaders
import vertexShader from '../shaders/vertex_shader.glsl';
import fragmentShader from '../shaders/fragment_shader.glsl';

export default class Plane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setPlane();
  }

  setPlane() {
    this.geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {},
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);

    this.plane.rotation.x = Math.PI / 2;
  }

  resize() {}

  update() {}
}
