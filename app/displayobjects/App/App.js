import { Container } from 'pixi.js';
import Game from '../Game';
/**
 * Main App Display Object
 *
 * Adds a background and some bunnies to it's self
 *
 * @exports App
 * @extends ScaledContainer
 */
export default class App extends Container {
  constructor(...args) {
    super(...args);
    this.game = new Game();
    this.addChild(this.game);
  }

  run(delta) {
    this.game.run(delta);
  }
}
