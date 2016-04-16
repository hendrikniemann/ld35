import Shape from '../Shape';

export default class ShapePool {
  constructor(type, amount = 3) {
    this.items = [];
    this.type = type;
    for (let i = 0; i < amount; ++i) {
      this.items.push(new Shape(type));
    }
  }

  get() {
    if (this.items.length === 0) {
      this.items.push(new Shape(this.type));
    }
    return this.items.pop();
  }

  return(shape) {
    this.items.push(shape);
  }
}
