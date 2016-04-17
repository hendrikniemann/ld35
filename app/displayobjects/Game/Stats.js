import { STAR, HEART } from '../../constants';
import Eventify from 'eventify';

export default class Stats {
  constructor(game) {
    Eventify.enable(this);
    this.score = 0;
    this.combo = 0;
    this.life = 5;
    game.on('collect', this.collect.bind(this));
    game.on('error', this.error.bind(this));
    game.on('start', () => {
      this.score = 0;
      this.combo = 0;
      this.life = 5;
    });
  }

  addScore(amount) {
    this.score += amount + amount * this.combo / 10;
    this.trigger('score', this.score);
  }

  collect(type) {
    if (type === STAR) {
      this.addScore(20);
    } else if (type === HEART) {
      this.life++;
      this.trigger('life', this.life);
    } else {
      this.addScore(50);
      this.combo++;
      this.trigger('combo', this.combo);
    }
  }

  error() {
    this.life--;
    this.combo = 0;
    this.trigger('life', this.life);
    this.trigger('combo', this.combo);
  }
}
