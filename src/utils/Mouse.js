import EventEmitter from 'events';

import Experience from '../Experience.js';

export default class Mouse extends EventEmitter {
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

    window.addEventListener('mousemove', (event) => {
      this.cursorPosition.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.cursorPosition.y = (-event.clientY / this.sizes.height) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      this.scrollPosition.x = window.scrollX;
      this.scrollPosition.y = window.scrollY;
    });
  }
}
