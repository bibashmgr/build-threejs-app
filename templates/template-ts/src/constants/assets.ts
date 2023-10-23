export type Asset = {
  name: string;
  type: "gltfModel" | "texture" | "cubeTexture" | "audio" | "video" | "font";
  path: string;
};

export const assets: Asset[] = [
  {
    name: "boxModel",
    type: "gltfModel",
    path: "models/boxModel.glb",
  },
  {
    name: "boxTexture",
    type: "texture",
    path: "textures/boxTexture.png",
  },
];
