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

const zickzack = R.flatten(R.repeat([0.5, 0.25, 0.5, 0.75], 3));
const funcs = [
  index => zickzack[index],
  index => Math.sin(index / 6) / 2 + 0.5,
];

let nextPosChain = R.repeat(0.5, 10);
export function nextPosition() {
  if (nextPosChain.length === 0) {
    nextPosChain = R.times(funcs[Math.floor(Math.random() * funcs.length)], 12);
  }
  return nextPosChain.shift();
}
