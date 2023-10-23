import Experience from "../Experience.js";

// helpers
import ModelBaker from "../helpers/ModelBaker.js";

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.parameters = {
      rotationSpeed: 0.0005,
      size: 1,
    };

    this.bakeModel();
    this.setModel();
  }

  bakeModel() {
    this.bakedModel = new ModelBaker(
      this.resources.items.gltfModel.boxModel,
      this.resources.items.texture.boxTexture,
      this.parameters.size
    );
  }

  setModel() {
    this.model = this.bakeModel.getModel();
    this.model.position.y = 1;
    this.scene.add(this.model);

    if (this.debug.active) {
      this.debug.gui
        .add(this.parameters, "rotationSpeed", 0, 0.01)
        .name("Box Speed")
        .step(0.001);
      this.debug.gui
        .add(this.parameters, "size", 0.5, 2)
        .name("Box Size")
        .onChange((value) => {
          this.model.scale.set(value, value, value);
        });
    }
  }

  animateBox() {
    this.model.rotation.x = this.time.elapsed * this.parameters.rotationSpeed;
    this.model.rotation.y = this.time.elapsed * this.parameters.rotationSpeed;
  }

  resize() {}

  update() {
    this.animateBox();
  }
}
