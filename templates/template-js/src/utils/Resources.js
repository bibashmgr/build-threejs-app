import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();

    this.assets = assets;

    this.items = {
      gltfModel: {},
      texture: {},
      cubeTexture: {},
      audio: {},
      font: {},
      video: {},
    };
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    this.loaders = {
      gltfLoader: new GLTFLoader().setDRACOLoader(dracoLoader),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      audioLoader: new THREE.AudioLoader(),
      fontLoader: new FontLoader(),
    };
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "gltfModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "texture") {
        this.loaders.textureLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load([asset.path], (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "audio") {
        this.loaders.audioLoader.load(asset.path, (buffer) => {
          this.singleAssetLoaded(asset, buffer);
        });
      } else if (asset.type === "font") {
        this.loaders.fontLoader.load(asset.path, (buffer) => {
          this.singleAssetLoaded(asset, buffer);
        });
      } else if (asset.type === "video") {
        let video = {};
        let videoTexture = {};

        video[asset.name] = document.createElement("video");
        video[asset.name].src = asset.path;
        video[asset.name].muted = true;
        video[asset.name].playsInline = true;
        video[asset.name].autoplay = true;
        video[asset.name].loop = true;
        video[asset.name].play();

        videoTexture[asset.name] = new THREE.VideoTexture(video[asset.name]);
        videoTexture[asset.name].flipY = true;
        videoTexture[asset.name].minFilter = THREE.NearestFilter;
        videoTexture[asset.name].magFilter = THREE.NearestFilter;
        videoTexture[asset.name].generateMipmaps = false;
        videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;

        this.singleAssetLoaded(asset, videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.type] = { ...this.items[asset.type], [asset.name]: file };
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
