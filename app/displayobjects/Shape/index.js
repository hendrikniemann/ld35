import { Sprite, Texture } from 'pixi.js';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE } from '../../constants/states';

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

export default class Shape extends Sprite {
  constructor(type) {
    super(textures[type]);
    this.pivot.set(20, 20);
  }
}
