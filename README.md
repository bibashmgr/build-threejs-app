# Three.js Boilerplate

A boilerplate/starter project for quickly building three.js app using Vite & Three.

## Quick Start:

__Clone the repo:__

```
git clone --depth 1 https://github.com/bibashmgr/vite-three-js-boilerplate
cd vite-three-js-boilerplate
```

__Install the dependencies:__

```
npm install
```

## Commands:

__Run app in development:__

```
npm run dev
```

## Packages:

| Package                                         | Version                                                                    |
| ----------------------------------------------- | :------------------------------------------------------------------------- |
| [vite](packages/vite)                           | ![vite version](https://img.shields.io/npm/v/vite.svg?label=%20)           |
| [three](packages/three)                         | ![three](https://img.shields.io/npm/v/three?label=%20)                     |
| [events](packages/three)                        | ![events](https://img.shields.io/npm/v/events?label=%20)                   |

## Project Structure:

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```
