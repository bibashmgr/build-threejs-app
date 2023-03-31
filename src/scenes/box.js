import * as THREE from 'three';

// src
import Experience from '../experience.js';

// helpers
import BakedModel from '../helpers/bakeModel.js';

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
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
    this.actualModel.rotation.x += 0.01;
    this.actualModel.rotation.y += 0.01;
    this.actualModel.rotation.z += 0.01;
  }

  resize() {}

  update() {
    this.animateBox();
  }
}
