import { Container } from 'pixi.js';
import { Howler, Howl } from 'howler';
import Eventify from 'eventify';
import R from 'ramda';

import Player from '../Player';
import Stats from './Stats';
import Hud from '../Hud';
import Level from '../Level';
import KeyHandler from '../../listeners/KeyHandler';
import { TRIANGLE, SQUARE, HEXAGON, CIRCLE, STAR } from '../../constants';
import audioUri from './audio.wav';
import starsUri from './stars.wav';
import { isGood } from '../../util/istype';

Howler.volume(0.3);

const sounds = new Howl({
  urls: [audioUri],
  sprite: {
    error: [0, 260],
    pickup: [268, 410],
  },
});

const stars = new Howl({
  urls: [starsUri],
  sprite: {
    1: [0, 395],
    2: [410, 395],
    3: [817, 395],
    4: [1226, 395],
    5: [1633, 395],
    6: [2042, 395],
  },
});

const play = sound => () => sounds.play(sound);

export default class Game extends Container {
  constructor() {
    super();
    Eventify.enable(this);
    this.player = new Player();
    this.stats = new Stats(this);
    this.hud = new Hud(this);
    this.level = new Level(this);
    this.level.on('collect', item => {
      if (isGood(item)) {
        this.trigger('collect', item.type);
      } else {
        if (item.type === this.player.type) {
          this.trigger('collect', item.type);
        } else {
          this.trigger('error', item.type);
        }
      }
    });
    this.level.on('delete', R.unless(isGood, () => this.trigger('error')));
    this.on('error', play('error'));
    let starCombo = 0;
    this.on('collect', R.ifElse(
      R.equals(STAR),
      () => stars.play(Math.min(6, ++starCombo)),
      R.pipe(play('pickup'), () => { starCombo = 0; })
    ));
    this.on('error', () => { starCombo = 0; });

    this.handler = new KeyHandler();
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.paused = false;

    this.stats.on('life', R.when(R.gte(0), () => this.trigger('gameover')));

    this.on('gameover', () => { this.paused = true; });
    this.on('pause', () => { this.paused = true; });
    this.on('unpause', () => {
      if (this.stats.life === 0) {
        this.trigger('start');
      }
      this.paused = false;
    });

    const setPlayerType = type => () => { this.player.type = type; };
    this.handler.addKeyDownListener('KeyQ', setPlayerType(CIRCLE));
    this.handler.addKeyDownListener('KeyW', setPlayerType(SQUARE));
    this.handler.addKeyDownListener('KeyE', setPlayerType(TRIANGLE));
    this.handler.addKeyDownListener('KeyR', setPlayerType(HEXAGON));
    this.handler.addKeyDownListener('Space', () => this.player.shiftIt());
    this.handler.addKeyDownListener('Escape', () => {
      if (this.paused) {
        this.trigger('unpause');
      } else {
        this.trigger('pause');
      }
    });
    this.handler.addKeyDownListener(['ArrowLeft', 'KeyJ'], () => { this.isMovingLeft = true; });
    this.handler.addKeyDownListener(['ArrowRight', 'KeyK'], () => { this.isMovingRight = true; });
    this.handler.addKeyUpListener(['ArrowLeft', 'KeyJ'], () => { this.isMovingLeft = false; });
    this.handler.addKeyUpListener(['ArrowRight', 'KeyK'], () => { this.isMovingRight = false; });

    this.addChild(this.player);
    this.addChild(this.level);
    this.addChild(this.hud);
  }

  run(delta) {
    if (this.paused) {
      return;
    }
    if (this.isMovingLeft) {
      this.player.x = Math.max(this.player.x - delta * 6, 32);
    }
    if (this.isMovingRight) {
      this.player.x = Math.min(this.player.x + delta * 6, 368);
    }
    this.level.run(delta);
  }
}
