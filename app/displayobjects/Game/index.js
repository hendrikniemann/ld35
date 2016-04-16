import { Container } from 'pixi.js';
import Player from '../Player';
import Stats from './Stats';
import KeyHandler from '../../listeners/KeyHandler';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE } from '../../constants/states';

export default class Game extends Container {
  constructor() {
    super();
    this.player = new Player();
    this.stats = new Stats();

    this.handler = new KeyHandler();
    this.isMovingLeft = false;
    this.isMovingRight = false;

    const setPlayerType = type => () => { this.player.type = type; };
    this.handler.addKeyDownListener('q', setPlayerType(CIRCLE));
    this.handler.addKeyDownListener('w', setPlayerType(SQUARE));
    this.handler.addKeyDownListener('e', setPlayerType(TRIANGLE));
    this.handler.addKeyDownListener('r', setPlayerType(HEXAGON));
    this.handler.addKeyDownListener(['ArrowLeft', 'j'], () => { this.isMovingLeft = true; });
    this.handler.addKeyDownListener(['ArrowRight', 'k'], () => { this.isMovingRight = true; });
    this.handler.addKeyUpListener(['ArrowLeft', 'j'], () => { this.isMovingLeft = false; });
    this.handler.addKeyUpListener(['ArrowRight', 'k'], () => { this.isMovingRight = false; });

    this.addChild(this.player);
  }

  run(delta) {
    if (this.isMovingLeft) {
      this.player.x = Math.max(this.player.x - delta * 6, 32);
    }
    if (this.isMovingRight) {
      this.player.x = Math.min(this.player.x + delta * 6, 368);
    }
  }
}
