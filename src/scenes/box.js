// src
import Experience from '../experience.js';

// helpers
import BakedModel from '../helpers/bakeModel.js';

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    this.bakeBox();
    this.setBox();
  }

  bakeBox() {
    this.model = new BakedModel(
      this.resources.items.boxModel,
      this.resources.items.boxTexture,
      1
    );
  }

  setBox() {
    this.actualModel = this.model.getModel();
    this.actualModel.position.y = 1;
    this.scene.add(this.actualModel);
  }

  animateBox() {
    this.actualModel.rotation.x = this.time.elapsed * 0.0005;
    this.actualModel.rotation.y = this.time.elapsed * 0.0005;
    this.actualModel.rotation.z = this.time.elapsed * 0.0005;
  }

  resize() {}

  update() {
    this.animateBox();
  }
}
