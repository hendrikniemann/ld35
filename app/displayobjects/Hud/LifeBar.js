import { Container } from 'pixi.js';
import R from 'ramda';

import Heart from '../Heart';

export default class LifeBar extends Container {
  constructor(initLife) {
    super();
    this.lifes = R.times(() => new Heart(), 10);
    this.lifes.forEach((sprite, index) => {
      sprite.position.set(375 - index * 22, 5);
      this.addChild(sprite);
    });
    this.life = initLife;
  }

  set life(amount) {
    this.lifes.forEach((sprite, index) => { sprite.renderable = index < amount; });
    return amount;
  }
}
