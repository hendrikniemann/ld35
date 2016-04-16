import pixi from 'pixi';
import TEXTURE from './diagnostic.png';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class Background extends pixi.Container {

  constructor() {
    super();

    const bg = pixi.Sprite.fromImage(TEXTURE);
    this.addChild(bg);
  }
}
