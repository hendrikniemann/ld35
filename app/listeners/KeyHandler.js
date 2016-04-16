export default class KeyHandler {
  constructor() {
    this.keyDownListeners = {};
    this.keyUpListeners = {};
    this.onKeyDownListener = window.addEventListener('keydown', ({ key }) => {
      if (this.keyDownListeners[key]) {
        this.keyDownListeners[key](key);
      }
    });
    this.onKeyUpListener = window.addEventListener('keyup', ({ key }) => {
      if (this.keyUpListeners[key]) {
        this.keyUpListeners[key](key);
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
  }
}
