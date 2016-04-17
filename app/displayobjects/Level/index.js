import { Container } from 'pixi.js';
import Pool from '../../util/Pool';
import eventify from 'eventify';
import Shape from '../Shape';
import Star from '../Star';
import Heart from '../Heart';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE, STAR, HEART } from '../../constants';
import { nextType, nextPosition } from './chainer';
import R from 'ramda';

const levels = [
  1000, 2500, 5000, 10000, 16000, 25000, 40000, 55000, 75000, 100000, 130000, 160000,
];

export default class Level extends Container {
  constructor(game) {
    super();
    eventify.enable(this);
    this.player = game.player;
    this.pos = 0;
    this.newPos = 0;
    this.speed = 2;
    this.baseSpeed = 2;
    this.rota = 0;
    this.difficulty = 0;

    this.pools = {
      [TRIANGLE]: new Pool(() => new Shape(TRIANGLE), 10),
      [CIRCLE]: new Pool(() => new Shape(CIRCLE), 10),
      [SQUARE]: new Pool(() => new Shape(SQUARE), 10),
      [HEXAGON]: new Pool(() => new Shape(HEXAGON), 10),
      [STAR]: new Pool(() => new Star(), 10),
      [HEART]: new Pool(() => new Heart(), 10),
    };

    game.on('collect', R.when(R.equals(STAR), () => {
      this.speed = Math.min(this.baseSpeed + 2, this.speed + 0.3);
    }));

    this.createNewChildren(30);
  }

  run(delta) {
    if (this.difficulty < 12 && this.pos > levels[this.difficulty]) {
      this.difficulty++;
      this.baseSpeed += 0.5;
      this.trigger('levelup', this.difficulty);
    }
    if (this.speed > this.baseSpeed) {
      this.speed -= 0.005;
    }
    this.rota = (this.rota + 0.01) % 2;
    const remove = [];
    for (let i = 0; i < this.children.length; ++i) {
      const child = this.getChildAt(i);
      if (
        child.y <= 700 &&
        child.y + delta * this.speed > 700 &&
        Math.abs(child.x - this.player.x) < 30
      ) {
        remove.push(child);
        this.trigger('collect', child);
      } else {
        child.position.y += delta * this.speed;
        if (child.position.y > 850) {
          remove.push(child);
          this.trigger('delete', child);
        }
        if (child.type !== HEART) {
          child.rotation = this.rota * Math.PI;
        }
      }
    }
    remove.forEach(this.removeChild.bind(this));
    this.pos += delta * this.speed;
    this.newPos += delta * this.speed;

    if (this.children.length < 20) {
      this.createNewChildren(5);
    }
  }

  createNewChildren(amount) {
    for (let i = 0; i < amount; ++i) {
      const nextTypeVal = nextType();
      if (nextTypeVal) {
        const child = this.pools[nextTypeVal].get();
        child.x = 30 + nextPosition() * 340;
        child.y = this.newPos;
        this.addChild(child);
      }
      this.newPos -= 120 + this.difficulty * 10;
    }
  }
}
