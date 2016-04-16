/**
 * App.js
 *
 * The main entry point, appends PIXI to the DOM
 * and starts a render and animation loop
 *
 */

import './index.html';
import pixi from 'pixi.js';
import App from './displayobjects/App/App';

const renderer = pixi.autoDetectRenderer(400, 800, { backgroundColor: 0x1099bb });

let app;
try {
  app = new App();
} catch (error) {
  const div = document.createElement('div');
  div.style.backgroundColor = 'red';
  div.style.padding = '50px';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.color = 'white';
  div.innerHTML = error.message;
  document.body.appendChild(div);
  throw error;
}

document.body.appendChild(renderer.view);

let t0 = window.performance.now();

function animate() {
  renderer.render(app);
  const t1 = window.performance.now();
  app.run(1);
  t0 = t1;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
