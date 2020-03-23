import DisciplesView from './disciples';

import { rect } from '../dquad/rect';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    let tileSize = 40;

    let bTop = rect(
      0, 0,
      width,
      tileSize * 1.5
    );

    let bBottomWidth = width,
        bBottomHeight = tileSize * 1.5,
        bBottomX = 0,
        bBottomY = height - bBottomHeight,
        bBottomArea = rect(bBottomX, bBottomY,
                           bBottomWidth, bBottomHeight);


    let bLeft = rect(
      0, bTop.y1,
      tileSize * 1.5,
      height - bBottomHeight
    );

    let disciplesWidth = width - bLeft.width,
        disciplesHeight = height - bBottomHeight,
        disciplesX = bLeft.x1,
        disciplesY = bTop.y1,
        disciplesArea = rect(disciplesX, disciplesY, 
                             disciplesWidth, disciplesHeight);

    let miniWidth = width * 0.3,
        miniHeight = miniWidth * 0.8,
        miniX = width - miniWidth,
        miniY = disciplesY,
        miniArea = rect(miniX, miniY, miniWidth, miniHeight);


    let bRightWidth = miniWidth,
        bRightHeight = height - miniY - bBottomHeight - miniHeight,
        bRightX = miniX,
        bRightY = miniY + miniHeight,
        bRightArea = rect(bRightX, bRightY,
                          bRightWidth, bRightHeight);

    return {
      width,
      height,
      tileSize,
      disciples: disciplesArea,
      minimap: miniArea,
      bRight: bRightArea,
      bTop,
      bBottom: bBottomArea,
      bLeft
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
