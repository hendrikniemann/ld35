import { STAR, HEART } from '../constants';
import R from 'ramda';

export const isType = R.ifElse(
  R.isArrayLike,
  (types, item) => R.contains(item.type, types),
  (type, item) => item.type === type
);
export const isGood = isType([STAR, HEART]);
