import { Container } from 'pixi.js';
import ShapePool from './ShapePool';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE } from '../../constants/states';

const types = [CIRCLE, SQUARE, TRIANGLE, HEXAGON];
const randomType = () => types[Math.floor(Math.random() * 4)];

export default class Level extends Container {
  constructor() {
    super();
    this.pos = 0;
    this.newPos = 0;
    this.speed = 2;

    this.pools = {
      [TRIANGLE]: new ShapePool(TRIANGLE, 20),
      [CIRCLE]: new ShapePool(CIRCLE, 20),
      [SQUARE]: new ShapePool(SQUARE, 20),
      [HEXAGON]: new ShapePool(HEXAGON, 20),
    };

    this.createNewChildren(30);
  }

  run(delta) {
    let remove = false;
    for (let i = 0; i < this.children.length; ++i) {
      this.getChildAt(i).position.y += delta * this.speed;
      if (this.getChildAt(i).position.y > 900) {
        remove = i;
      }
    }
    if (remove !== false) {
      this.removeChildAt(remove);
    }
    this.pos += delta * this.speed;
    this.newPos += delta * this.speed;

    if (this.speed * 5000 < this.pos) {
      this.speed++;
    }

    if (this.children.length < 20) {
      this.createNewChildren(5);
    }
  }

  createNewChildren(amount) {
    for (let i = 0; i < amount; ++i) {
      const shape = this.pools[randomType()].get();
      shape.x = 30 + Math.round(Math.random() * 340);
      shape.y = this.newPos;
      this.addChild(shape);
      this.newPos -= 100;
    }
  }
}
