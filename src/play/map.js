import { sprite } from '../asprite';

import Viewport from '../viewport';

import * as v from '../vec2';
import Pool from 'poolf';

export default function Map(play, ctx, bs) {

  const { canvas, 
          events,
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  let disciples;

  const frameByRole = {
    'WATER': (item) => {
      let waterBitmask = frames['waterBitmask'];

      let nS = disciples.getNeighbors(item.pos);
      let bitmaskKey = disciples.getBitmaskTextureKey('WATER', nS);

      return waterBitmask[bitmaskKey];
    },
    'GROUND': () => {
      return frames['earth'];
    }
  };

  let tileSize = bs.tileSize;

  let dGround = zeroLayer;

  let tiles0 = new Pool(() => sprite(frames['earth']), {
    name: 'Disciples Tiles 0',
    warnLeak: 10000
  });
  let viewport0 = new Viewport({
    vWidth: bs.disciples.width + tileSize,
    vHeight: bs.disciples.height + tileSize,
    getPosition: ({ pos }) => {
      return v.cscale(pos, tileSize);
    },
    onOn: (item) => {
      let sp = tiles0.acquire(_ => {
        _.height = tileSize;
        _.width = tileSize;
      });
      dGround.add(sp);

      let { tile: { role } } = item;

      let frame = frameByRole[role](item);

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

  let minX,
      maxX,
      minY,
      maxY;

  this.init = data => {
    disciples = data.disciples;

    let { width: wW, height: wH } = disciples;

    let { width, height, 
          minimap: { width: miniW } } = bs;

    minX = - tileSize * 10,
    maxX = (wW * tileSize) - (width - miniW * 1.5),
    minY = - tileSize * 10,
    maxY = (wH * tileSize) - height * 0.8;

    disciples.each((pos, tile) => {
      viewport0.addChild({
        pos,
        tile
      });
    });

  };

  this.viewFrame = () => {
    let res = viewport0.viewFrame();
    return res;
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

  const handleMouse = () => {
    const { epos } = events.data;

    if (!epos) {
      return;
    }

    let v = vEdge(epos);

    viewport0.drag(v, -8);
    viewport0.commitDrag([minX,
                          maxX,
                          minY,
                          maxY]);
  };

  this.update = delta => {
    viewport0.update(delta);

    handleMouse();
  };


  this.render = () => {
    
  };
  
}
