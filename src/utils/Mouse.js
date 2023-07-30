import EventEmitter from 'events';

export default class Mouse extends EventEmitter {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
    this.inComputer = false;

    this.on('mousemove', (event) => {
      if (event.clientX && event.clientY) {
        this.x = event.clientX;
        this.y = event.clientY;
      }

      this.inComputer = event.inComputer ? true : false;
    });
  }
}
