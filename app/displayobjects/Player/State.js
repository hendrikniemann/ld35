import { Sprite, Texture } from 'pixi.js';

import { TRIANGLE, SQUARE, HEXAGON, CIRCLE } from '../../constants';

import circleTexture from './circle.png';
import triangleTexture from './triangle.png';
import squareTexture from './square.png';
import hexagonTexture from './hexagon.png';

const textures = {
  [TRIANGLE]: Texture.fromImage(triangleTexture),
  [CIRCLE]: Texture.fromImage(circleTexture),
  [SQUARE]: Texture.fromImage(squareTexture),
  [HEXAGON]: Texture.fromImage(hexagonTexture),
};

export default class State extends Sprite {
  constructor(type) {
    super(textures[type]);
    this.position.set(0, 0);
    this.pivot.set(32, 32);
  }
}
