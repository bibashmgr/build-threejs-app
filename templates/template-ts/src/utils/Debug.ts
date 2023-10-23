import * as dat from "dat.gui";

export default class Debug {
  active: boolean;
  gui: dat.GUI;

  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.gui = new dat.GUI();
    }
  }
}
