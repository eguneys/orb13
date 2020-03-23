import DisciplesView from './disciples';

import { rect } from '../dquad/rect';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    let margin = 20;


    let tileSize = 20;
    let disciplesWidth = width * 0.8,
        disciplesHeight = height * 0.8,
        disciplesX = margin,
        disciplesY = margin,
        disciplesArea = rect(disciplesX, disciplesY, 
                             disciplesWidth, disciplesHeight);

    let miniWidth = width * 0.3,
        miniHeight = miniWidth,
        miniX = width - miniWidth,
        miniY = disciplesY,
        miniArea = rect(miniX, miniY, miniWidth, miniHeight);

    return {
      width,
      height,
      tileSize,
      disciples: disciplesArea,
      minimap: miniArea
    };
  })();

  let dDisciples = new DisciplesView(this, ctx, bs);

  this.init = data => {
    dDisciples.init({});
  };

  this.update = delta => {
    dDisciples.update(delta);
  };


  this.render = () => {
    dDisciples.render();
  };
  
}
