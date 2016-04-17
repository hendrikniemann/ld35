import { Sprite, Texture, SCALE_MODES } from 'pixi.js';
import heart from './heart.png';
import { HEART } from '../../constants';

const texture = Texture.fromImage(heart, false, SCALE_MODES.NEAREST);

export default class Heart extends Sprite {
  constructor() {
    super(texture);
    this.scale.set(2, 2);
    this.type = HEART;
  }
}
