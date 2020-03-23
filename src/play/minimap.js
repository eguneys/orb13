import { sprite } from '../asprite';

export default function Minimap(play, ctx, bs) {

  const { frames, layers: { zeroLayer, oneLayer, twoLayer } } = ctx;

  let { width, height } = bs.minimap;
  let bigTileSize = bs.tileSize;

  let bO = [bs.minimap.x,
            bs.minimap.y];

  let mO = [
    bs.minimap.width * 0.05,
    bs.minimap.height * 0.08
  ];

  let scaleMinimap;

  const { textures } = ctx;

  let mapMargin = 10;

  let tileSize;

  let minimapSizeW,
      minimapSizeH;

  let dMap,
      dViewFrame;

  let disciples;

  const frameByRole = {
    'WATER': (pos) => {
      let waterBitmask = frames['waterBitmask'];

      let nS = disciples.getNeighbors(pos);
      let bitmaskKey = disciples.getBitmaskTextureKey('WATER', nS);

      return waterBitmask[bitmaskKey];
    },
    'GROUND': () => {
      return frames['earth'];
    }
  };

  this.init = data => {
    disciples = data.disciples;

    tileSize = (width - mapMargin * 2.0) / disciples.width;

    minimapSizeW = tileSize * disciples.width;
    minimapSizeH = tileSize * disciples.height;

    scaleMinimap = (tileSize / bigTileSize);

    disciples.each((pos, tile) => {

      let frame = frameByRole[tile.role](pos);

      let sp = sprite(frame);
      sp.width = tileSize;
      sp.height = tileSize;
      sp.position.set(bO[0] + mO[0] + pos[0] * tileSize,
                      bO[1] + mO[1] + pos[1] * tileSize);
      oneLayer.add(sp);
    });
  };
  
  this.update = delta => {
    let viewFrame = play.viewFrame();

    let vFWidth = viewFrame[2] * scaleMinimap,
        vFHeight = viewFrame[3] * scaleMinimap;

    let vFX = viewFrame[0] * scaleMinimap,
        vFY = viewFrame[1] * scaleMinimap;

    if (vFX < 0) {
      vFWidth += vFX;
      vFX = 0;
    }
    if (vFY < 0) {
      vFHeight += vFY;
      vFY = 0;
    }

    if (vFX + vFWidth > minimapSizeW) {
      vFWidth = minimapSizeW - vFX;
      vFX = minimapSizeW - vFWidth;
    }

    if (vFY + vFHeight > minimapSizeH) {
      vFHeight = minimapSizeH - vFY;
      vFY = minimapSizeH - vFHeight;
    }

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
