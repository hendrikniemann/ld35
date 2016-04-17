import R from 'ramda';

export default class Pool {
  constructor(create, amount = 3) {
    this.items = R.times(create, amount);
    this.create = create;
  }

  get() {
    if (this.items.length === 0) {
      this.items.push(this.create());
    }
    return this.items.pop();
  }

  return(item) {
    this.items.push(item);
  }
}
