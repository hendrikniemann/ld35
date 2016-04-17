import { Container, Text } from 'pixi.js';
import eventify from 'eventify';
import { pause, gameover } from './badges';

import LifeBar from './LifeBar';

const font = { font: '15px "Roboto Mono"', fill: 'white', align: 'left' };

export default class Hud extends Container {
  constructor(game) {
    super();
    eventify.enable(this);

    const stats = game.stats;
    this.lifeBar = new LifeBar(stats.life);
    this.addChild(this.lifeBar);
    this.oldLife = stats.life;

    this.score = new Text('Score: 0', font);
    this.score.position.set(5, 5);
    this.addChild(this.score);

    this.combo = new Text('Combo: 0', font);
    this.combo.position.set(5, 23);
    this.addChild(this.combo);

    this.addChild(pause);
    this.addChild(gameover);

    stats.on('life', val => { this.lifeBar.life = val; });
    stats.on('score', val => { this.score.text = `Score: ${val}`; });
    stats.on('combo', val => { this.combo.text = `Combo: ${val}`; });

    game.on('pause', () => { pause.renderable = true; });
    game.on('unpause', () => { pause.renderable = false; });
    game.on('gameover', () => { gameover.renderable = true; });
    game.on('start', () => { gameover.renderable = false; });
  }
}
