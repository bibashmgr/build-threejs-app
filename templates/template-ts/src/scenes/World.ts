import Experience from "../Experience.ts";

// utils
import Resources from "../utils/Resources.ts";

// scenes
import Environment from "./Environment.ts";
import Box from "./Box.js";
import Plane from "./Plane.js";

export default class World {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  environment: Environment;
  box: Box;
  plane: Plane;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.box = new Box();
      this.plane = new Plane();
    });
  }

  resize() {
    if (this.environment) {
      this.environment.resize();
    }
    if (this.box) {
      this.box.resize();
    }
    if (this.plane) {
      this.plane.resize();
    }
  }

  update() {
    if (this.environment) {
      this.environment.update();
    }
    if (this.box) {
      this.box.update();
    }
    if (this.plane) {
      this.plane.update();
    }
  }
}
