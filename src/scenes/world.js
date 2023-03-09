import * as THREE from 'three';

// src
import Experience from '../experience.js';

// scenes
import Environment from './environment.js';
import Model from './model.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.model = new Model();
    });
  }

  resize() {}

  update() {
    if (this.model) {
      this.model.update();
    }
    if (this.environment) {
      this.environment.update();
    }
  }
}
