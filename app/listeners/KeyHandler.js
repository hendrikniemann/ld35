export default class KeyHandler {
  constructor() {
    this.keyDownListeners = {};
    this.keyUpListeners = {};
    this.onKeyDownListener = window.addEventListener('keydown', ({ code }) => {
      if (this.keyDownListeners[code]) {
        this.keyDownListeners[code](code);
      }
    });
    this.onKeyUpListener = window.addEventListener('keyup', ({ code }) => {
      if (this.keyUpListeners[code]) {
        this.keyUpListeners[code](code);
      }
    });
  }

  addKeyDownListener(key, fun) {
    if (typeof key === 'object') {
      key.forEach(singleKey => this.addKeyDownListener(singleKey, fun));
    } else {
      this.keyDownListeners[key] = fun;
    }
  }

  addKeyUpListener(key, fun) {
    if (typeof key === 'object') {
      key.forEach(singleKey => this.addKeyUpListener(singleKey, fun));
    } else {
      this.keyUpListeners[key] = fun;
    }
  }

  cleanup() {
    window.removeEventListener(this.onKeyDownListener);
    window.removeEventListener(this.onKeyUpListener);
  }
}
