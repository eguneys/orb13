import { sprite } from '../asprite';

import Viewport from '../viewport';

import * as v from '../vec2';
import Pool from 'poolf';

import { makeFrameByRole } from './util';

export default function Map(play, ctx, bs) {

  const { canvas, 
          events,
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  let frameByRole;

  let disciples;

  let tileSize = bs.tileSize,
      halfTileSize = tileSize * 0.5;

  const mapToScreen = pos => {
    return [pos[0] * halfTileSize - pos[1] * halfTileSize,
            pos[0] * halfTileSize + pos[1] * halfTileSize];    
  };

  const screenToMap = pos => {
    return [Math.round((pos[0] / halfTileSize + 
                        pos[1] / halfTileSize) / 2),
            Math.round((pos[1] / halfTileSize - 
                        pos[0] / halfTileSize) / 2)];
  };


  let dGround = zeroLayer;

  let tiles0 = new Pool(() => sprite(frames['isoearth']), {
    name: 'Disciples Tiles 0',
    warnLeak: 10000
  });
  let viewport0 = new Viewport({
    vWidth: bs.disciples.width + tileSize,
    vHeight: bs.disciples.height + tileSize,
    getPosition: ({ pos }) => {
      // http://clintbellanger.net/articles/isometric_math/
      return mapToScreen(pos);
    },
    onOn: (item) => {
      let sp = tiles0.acquire(_ => {
        _.height = tileSize;
        _.width = tileSize;
      });
      dGround.add(sp);

      let { tile: { role } } = item;

      let frame = frameByRole[role](item.pos);

      sp.frame = frame;

      item.dO = sp;
    },
    onOff: (item) => {
      item.dO.remove();
      tiles0.release(item.dO);

      delete item.dO;
    },
    onView: ({ dO, tile }, visiblePos) => {
      dO.position.x = visiblePos[0];
      dO.position.y = visiblePos[1];
    }
  });

  this.init = data => {
    disciples = data.disciples;

    frameByRole = makeFrameByRole(frames, disciples);

    disciples.each((pos, tile) => {
      viewport0.addChild({
        pos,
        tile
      });
    });

  };

  this.viewFrame = () => {
    let res = viewport0.viewFrame();
    return screenToMap(res);
  };

  const vEdge = pos => {
    let { width, height } = bs;

    let edgeLimit = height * 0.16;

    let edgeX = 0,
        edgeY = 0;

    if (pos[0] < edgeLimit && pos[0] > 0) {
      edgeX = -1;
    } else if (pos[0] > width - edgeLimit && pos[0] < width) {
      edgeX = 1;
    }
    if (pos[1] < edgeLimit && pos[1] > 0) {
      edgeY = -1;
    } else if (pos[1] > height - edgeLimit && pos[1] < height) {
      edgeY = 1;
    }

    return [edgeX, edgeY];    
  };

  const scrollBoundPoss = pos => {
    return pos[0] > -10 && 
      pos[1] > -1 &&
      pos[0] < disciples.width - 8 &&
      pos[1] < disciples.height - 4;
  };

  const handleMouse = () => {
    const { epos } = events.data;

    if (!epos) {
      return;
    }

    let v = vEdge(epos);

    viewport0.drag(v, -8);

    let vF = viewport0.viewFrame();

    if (scrollBoundPoss(screenToMap(vF))) {
      viewport0.commitDrag();
    } else {
      viewport0.undoDrag();
    }
  };

  this.update = delta => {
    viewport0.update(delta);

    handleMouse();
  };


  this.render = () => {
    
  };
  
}
