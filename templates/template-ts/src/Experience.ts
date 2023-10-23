import * as THREE from "three";

import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";

// utils
import Debug from "./utils/Debug.ts";
import Sizes from "./utils/Sizes.ts";
import Time from "./utils/Time.ts";
import Mouse from "./utils/Mouse.ts";
import Resources from "./utils/Resources.ts";

// config
import { assets } from "./constants/assets.ts";

// world
import World from "./scenes/World.ts";

export default class Experience {
  static instance: Experience | null;
  canvas: HTMLElement | null;
  sizes: Sizes;
  time: Time;
  debug: Debug;
  mouse: Mouse;
  resources: Resources;
  scene: THREE.Scene;
  camera: Camera;
  renderer: Renderer;
  world: World;

  constructor(canvas?: HTMLElement | null) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    this.canvas = canvas;
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.mouse = new Mouse();
    this.scene = new THREE.Scene();
    this.resources = new Resources(assets);

    this.camera = new Camera();
    this.renderer = new Renderer();

    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
