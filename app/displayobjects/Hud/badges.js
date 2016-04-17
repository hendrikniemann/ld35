import { Sprite, Texture, SCALE_MODES } from 'pixi.js';
import badgeUri from './badge.png';
import pauseUri from './pause.png';
import gameoverUri from './gameover.png';

const badgeTexture = Texture.fromImage(badgeUri, false, SCALE_MODES.NEAREST);

export const pause = new Sprite(badgeTexture);
pause.addChild(new Sprite(Texture.fromImage(pauseUri, false, SCALE_MODES.NEAREST)));
pause.getChildAt(0).position.set(25, 10);
pause.position.set(50, 300);
pause.scale.set(3, 3);
pause.renderable = false;

export const gameover = new Sprite(badgeTexture);
gameover.addChild(new Sprite(Texture.fromImage(gameoverUri, false, SCALE_MODES.NEAREST)));
gameover.getChildAt(0).position.set(10, 10);
gameover.position.set(50, 300);
gameover.scale.set(3, 3);
gameover.renderable = false;
