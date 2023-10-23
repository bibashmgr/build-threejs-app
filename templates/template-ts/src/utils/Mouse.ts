import EventEmitter from "events";

// src
import Experience from "../Experience.ts";

// utils
import Sizes from "./Sizes.ts";

type PlanePosition = {
  x: number;
  y: number;
};

export default class Mouse extends EventEmitter {
  experience: Experience | null;
  sizes: Sizes;
  cursorPosition: PlanePosition;
  scrollPosition: PlanePosition;

  constructor() {
    super();

    this.experience = new Experience();
    this.sizes = this.experience.sizes;

    this.cursorPosition = {
      x: window.scrollX,
      y: window.scrollY,
    };
    this.scrollPosition = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (event) => {
      this.cursorPosition.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.cursorPosition.y = (-event.clientY / this.sizes.height) * 2 + 1;
    });

    window.addEventListener("scroll", () => {
      this.scrollPosition.x = window.scrollX;
      this.scrollPosition.y = window.scrollY;
    });
  }
}
