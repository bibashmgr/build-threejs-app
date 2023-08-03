# Three.js Boilerplate

A boilerplate/starter project for quickly building three.js app using Vite & Three.

## Quick Start:

__To create a project, simply run:__

```bash
npx build-threejs-app <project-name>
```

__Install the dependencies:__

```
npm install
```

__Run app in development:__

```
npm run dev
```

## Dependencies:

| Package                                         | Version                                                                          |
| ----------------------------------------------- | :------------------------------------------------------------------------------- |
| [vite](packages/vite)                           | ![vite version](https://img.shields.io/npm/v/vite.svg?label=%20)                 |
| [three](packages/three)                         | ![three](https://img.shields.io/npm/v/three?label=%20)                           |
| [events](packages/events)                       | ![events](https://img.shields.io/npm/v/events?label=%20)                         |
| [vite-plugin-glsl](packages/vite-glsl-plugin)   | ![vite-plugin-glsl](https://img.shields.io/npm/v/vite-plugin-glsl?label=%20)     |
| [gsap](packages/gsap)   | ![vite-plugin=glsl](https://img.shields.io/npm/v/gsap?label=%20)     |
| [dat.gui](packages/dat.gui)   | ![vite-plugin=glsl](https://img.shields.io/npm/v/dat.gui?label=%20)     |

## Project Structure:

```
public\
  |--models\          # Contain gltf models
  |--textures\        # Contain textures
src\
  |--constants\       # Contain environment variables and configuration related things
  |--helpers\         # Contain helper classes & functions
  |--scenes\          # Contain scenes & objects
  |--shaders\         # Contain shaders
  |--utils\           # Contain utility classes & functions
  |--Camera.js        # Handle cameras & controls
  |--Experience.js    # Handle experience & scenes
  |--Renderer.js      # Handle renderers
index.html            
main.js
style.css             # Custom styling
```
