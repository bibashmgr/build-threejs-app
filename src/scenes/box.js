import Experience from '../Experience.js';

// helpers
import BakedModel from '../helpers/BakeModel.js';

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    this.paramters = {
      rotationSpeed: 0.0005,
      size: 1,
    };

    this.bakeBox();
    this.setBox();
  }

  bakeBox() {
    this.model = new BakedModel(
      this.resources.items.gltfModel.boxModel,
      this.resources.items.texture.boxTexture,
      this.paramters.size
    );
  }

  setBox() {
    this.actualModel = this.model.getModel();
    this.actualModel.position.y = 1;
    this.scene.add(this.actualModel);
  }

  setDebugger() {
    this.experience.gui
      .add(this.paramters, 'rotationSpeed', 0, 0.01)
      .name('Box Speed')
      .step(0.001);
    this.experience.gui
      .add(this.paramters, 'size', 0.5, 2)
      .onChange((value) => {
        this.actualModel.scale.set(value, value, value);
      });
  }

  animateBox() {
    this.actualModel.rotation.x =
      this.time.elapsed * this.paramters.rotationSpeed;
    this.actualModel.rotation.y =
      this.time.elapsed * this.paramters.rotationSpeed;
  }

  resize() {}

  update() {
    this.animateBox();
  }
}
