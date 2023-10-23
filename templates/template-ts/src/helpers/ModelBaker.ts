import * as THREE from "three";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class ModelBaker {
  model: GLTF;
  texture: THREE.Texture;
  scale: number;
  material: THREE.MeshBasicMaterial;

  constructor(model: GLTF, texture: THREE.Texture, scale: number) {
    this.model = model;
    this.texture = texture;

    this.texture.flipY = false;
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });

    this.model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (scale) child.scale.set(scale, scale, scale);
        child.material.map = this.texture;
        child.material = this.material;
      }
    });

    return this;
  }

  getModel(): THREE.Group<THREE.Object3DEventMap> {
    return this.model.scene;
  }
}
