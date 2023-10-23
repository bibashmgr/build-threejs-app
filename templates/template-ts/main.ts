import "./style.css";

// src
import Experience from "./src/Experience.ts";

new Experience(
  document.querySelector("canvas.experience-canvas") as HTMLElement | null
);
