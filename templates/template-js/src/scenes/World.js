import Experience from '../Experience.js';

// scenes
import Environment from './Environment.js';
import Box from './Box.js';
import Plane from './Plane.js';

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

  resize() {
    if (this.box) {
      this.box.resize();
    }
    if (this.plane) {
      this.plane.resize();
    }
    if (this.environment) {
      this.environment.resize();
    }
  }

  update() {
    if (this.box) {
      this.box.update();
    }
    if (this.plane) {
      this.plane.update();
    }
    if (this.environment) {
      this.environment.update();
    }
  }
}
