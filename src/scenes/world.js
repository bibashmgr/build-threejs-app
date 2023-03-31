import * as THREE from 'three';

// src
import Experience from '../experience.js';

// scenes
import Environment from './environment.js';
import Box from './box.js';
import Plane from './plane.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.box = new Box();
      this.plane = new Plane();
    });
  }

  resize() {}

  update() {
    if (this.box) {
      this.box.update();
    }
    if (this.environment) {
      this.environment.update();
    }
  }
}
