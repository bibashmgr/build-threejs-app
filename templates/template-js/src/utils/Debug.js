import * as dat from 'dat.gui';

export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.gui = new dat.GUI();
    }
  }
}
