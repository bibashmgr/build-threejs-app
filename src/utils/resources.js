import * as THREE from 'three';
import { EventEmitter } from 'events';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// src
import Experience from '../experience.js';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath('/draco/');
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

    this.loaders.ktx2Loader = new KTX2Loader();
    this.loaders.ktx2Loader.setTranscoderPath('/basis/');
    this.loaders.ktx2Loader.detectSupport(this.renderer.webglRenderer);

    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.audioLoader = new THREE.AudioLoader();
    this.loaders.fontLoader = new FontLoader();
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'basicTexture') {
        this.loaders.ktx2Loader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'normalTexture') {
        this.loaders.textureLoader.load(asset.path, (file) => {
          file.encoding = THREE.SRGBColorSpace;
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === 'audio') {
        this.loaders.audioLoader.load(asset.path, (buffer) => {
          this.singleAssetLoaded(asset, buffer);
        });
      } else if (asset.type === 'font') {
        this.loaders.fontLoader.load(asset.path, (buffer) => {
          this.singleAssetLoaded(asset, buffer);
        });
      } else if (asset.type === 'video') {
        this.video = {};
        this.videoTexture = {};

        this.video[asset.name] = document.createElement('video');
        this.video[asset.name].src = asset.path;
        this.video[asset.name].muted = true;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(
          this.video[asset.name]
        );
        this.videoTexture[asset.name].flipY = true;
        this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].generateMipmaps = false;
        this.videoTexture[asset.name].encoding = THREE.SRGBColorSpace;

        this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit('ready');
    }
  }
}
