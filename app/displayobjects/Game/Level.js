import { Container } from 'pixi.js';

export default class Level extends Container {
  constructor() {
    this.shapes = [];


  }

  run(delta) {
    this.children.forEach(child => { child.y += delta; });
    this.children.filter(child => child.y > 900).forEach(this.removeChild.bind(this));
  }
}
