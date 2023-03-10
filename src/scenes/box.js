import * as THREE from 'three';

// src
import Experience from '../experience.js';

// helpers
import BakedModel from '../helpers/bakeModel.js';

export default class Model {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.bakeModel();
    this.setModel();
  }

  bakeModel() {
    this.model = new BakedModel(
      this.resources.items.boxModel,
      this.resources.items.boxTexture,
      1
    );
  }

  setModel() {
    this.actualModel = this.model.getModel();
    this.scene.add(this.actualModel);
  }

  setAnimation() {
    this.actualModel.rotation.x += 0.01;
    this.actualModel.rotation.y += 0.01;
    this.actualModel.rotation.z += 0.01;
  }

  resize() {}

  update() {
    this.setAnimation();
  }
}
