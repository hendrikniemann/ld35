import { Container, Text } from 'pixi.js';
import Player from '../Player';
import Stats from './Stats';
import Level from '../Level';
import KeyHandler from '../../listeners/KeyHandler';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE } from '../../constants/states';

export default class Game extends Container {
  constructor() {
    super();
    this.player = new Player();
    this.stats = new Stats();
    this.level = new Level();

    this.handler = new KeyHandler();
    this.isMovingLeft = false;
    this.isMovingRight = false;

    const setPlayerType = type => () => { this.player.type = type; };
    this.handler.addKeyDownListener('KeyQ', setPlayerType(CIRCLE));
    this.handler.addKeyDownListener('KeyW', setPlayerType(SQUARE));
    this.handler.addKeyDownListener('KeyE', setPlayerType(TRIANGLE));
    this.handler.addKeyDownListener('KeyR', setPlayerType(HEXAGON));
    this.handler.addKeyDownListener('Space', () => this.player.shiftIt());
    this.handler.addKeyDownListener(['ArrowLeft', 'KeyJ'], () => { this.isMovingLeft = true; });
    this.handler.addKeyDownListener(['ArrowRight', 'KeyK'], () => { this.isMovingRight = true; });
    this.handler.addKeyUpListener(['ArrowLeft', 'KeyJ'], () => { this.isMovingLeft = false; });
    this.handler.addKeyUpListener(['ArrowRight', 'KeyK'], () => { this.isMovingRight = false; });

    this.text = new Text('0', { font: '10px "Roboto Mono"', fill: 'white', align: 'left' });
    this.text.position.set(5, 5);
    this.addChild(this.text);

    this.addChild(this.player);
    this.addChild(this.level);
  }

  run(delta) {
    this.text.text = this.level.children.length.toString() + '\n' + this.level.newPos;
    if (this.isMovingLeft) {
      this.player.x = Math.max(this.player.x - delta * 6, 32);
    }
    if (this.isMovingRight) {
      this.player.x = Math.min(this.player.x + delta * 6, 368);
    }
    this.level.run(delta);
  }
}
