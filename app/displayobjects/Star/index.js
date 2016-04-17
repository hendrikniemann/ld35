import { Sprite, Texture } from 'pixi.js';
import img from './star.png';
import { STAR } from '../../constants';

const texture = Texture.fromImage(img);

export default class Star extends Sprite {
  constructor() {
    super(texture);
    this.type = STAR;
    this.pivot.set(15, 15);
  }
}
