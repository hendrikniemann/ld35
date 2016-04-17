import { TRIANGLE, SQUARE, HEXAGON, CIRCLE, STAR, HEART } from '../../constants';
import R from 'ramda';

const chains = [
  [null, HEART],
  [null, TRIANGLE],
  [null, SQUARE],
  [null, HEXAGON],
  [null, CIRCLE],
  [STAR, STAR, HEART],
  [STAR, STAR, TRIANGLE],
  [STAR, STAR, SQUARE],
  [STAR, STAR, HEXAGON],
  [STAR, STAR, CIRCLE],
  [TRIANGLE, TRIANGLE],
  [SQUARE, SQUARE],
  [HEXAGON, HEXAGON],
  [CIRCLE, CIRCLE],
  [STAR, STAR],
  [STAR, STAR, STAR],
  [STAR, STAR, STAR, STAR],
  [STAR, STAR, STAR, STAR, STAR, STAR],
  [STAR, null, null, STAR, STAR, STAR],
  [null, STAR, STAR, STAR, null, null, null],
];

const nextChain = [null, null, CIRCLE, null, STAR, STAR, STAR];
export function nextType() {
  if (nextChain.length === 0) {
    chains[Math.floor(Math.random() * chains.length)].forEach(elem => {
      nextChain.push(elem);
    });
  }
  return nextChain.shift();
}

const zickzack = [0.5, 0.25, 0.5, 0.75];
const leftright = [0.5, 0.5, 0.3, 0.5, 0.7, 0.5, 0.5];
const funcs = [
  index => zickzack[index % 4],
  index => Math.sin(index / 6 * Math.PI) / 2 + 0.5,
  index => leftright[Math.floor(index / 2)],
];

let nextPosChain = R.repeat(0.5, 10);
export function nextPosition() {
  if (nextPosChain.length === 0) {
    nextPosChain = R.times(funcs[Math.floor(Math.random() * funcs.length)], 12);
  }
  return nextPosChain.shift();
}
