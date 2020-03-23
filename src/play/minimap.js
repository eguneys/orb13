import { sprite } from '../asprite';

import { makeFrameByRoleMini } from './util';

export default function Minimap(play, ctx, bs) {

  const { frames, layers: { zeroLayer, oneLayer, twoLayer } } = ctx;

  let { width, height } = bs.minimap;
  let bigTileSize = bs.tileSize,
      halfBigTileSize = bigTileSize * 0.5;

  let bO = [bs.minimap.x,
            bs.minimap.y];

  let mO = [
    bs.minimap.width * 0.05,
    bs.minimap.height * 0.08
  ];

  let scaleMinimap;

  const { textures } = ctx;

  let tileSizeX,
      tileSizeY;
  
  let minimapSizeW,
      minimapSizeH;

  let dMap,
      dViewFrame;

  let frameByRole;

  let disciples;

  this.init = data => {
    disciples = data.disciples;

    frameByRole = makeFrameByRoleMini(frames, disciples);

    tileSizeY = (width - 30 * 2.0) / disciples.width;
    tileSizeX = tileSizeY * 1.2;

    minimapSizeW = tileSizeX * disciples.width;
    minimapSizeH = tileSizeY * disciples.height;

    scaleMinimap = (tileSizeX / bigTileSize);

    disciples.each((pos, tile) => {

      let frame = frameByRole[tile.role](pos);

      let sp = sprite(frame);
      sp.width = tileSizeX;
      sp.height = tileSizeY;
      sp.position.set(bO[0] + mO[0] + pos[0] * tileSizeX,
                      bO[1] + mO[1] + pos[1] * tileSizeY);
      oneLayer.add(sp);
    });
  };
  
  this.update = delta => {
    let viewFrame = play.viewFrame();

    let vFWidth = tileSizeX / scaleMinimap,
        vFHeight = tileSizeY / scaleMinimap;

    let vFX = (viewFrame[0] + 5) * tileSizeX,
        vFY = viewFrame[1] * tileSizeY;

    dViewFrame.position.set(bO[0] + mO[0] + vFX, bO[1] + mO[0] + vFY);
    dViewFrame.width = vFWidth;
    dViewFrame.height = vFHeight;
  };

  const initContainer = () => {
    const bg = sprite(frames['minimap']);
    bg.width = width;
    bg.height = height;
    bg.position.set(...bO);
    oneLayer.add(bg);

    dViewFrame = sprite(frames['miniFrame']);
    twoLayer.add(dViewFrame);
  };
  initContainer();

  this.render = () => {
  };

}
