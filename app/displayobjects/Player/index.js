import { Container } from 'pixi.js';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE } from '../../constants/states';
import State from './State';

export default class Player extends Container {
  constructor() {
    super();

    this.states = {};
    this.types = [CIRCLE, SQUARE, TRIANGLE, HEXAGON];
    this.types.forEach(this.addState.bind(this));
    this.currentType = 0;
    this.states[this.types[this.currentType]].renderable = true;
    this.x = 200;
    this.y = 700;
  }

  addState(type) {
    const state = new State(type);
    this.states[type] = state;
    state.renderable = false;
    this.addChild(state);
  }

  get type() {
    return this.types[this.currentType];
  }

  set type(nextType) {
    this.currentType = this.types.indexOf(nextType);
    this.states[nextType].renderable = true;

    this.types
      .filter(type => type !== nextType)
      .map(type => this.states[type])
      .forEach(state => { state.renderable = false; });
  }
}
