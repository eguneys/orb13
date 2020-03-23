export function makeFrameByRole(frames, disciples) {
  return {
    'WATER': (pos) => {
      let waterBitmask = frames['isobitmaskWater'];

      let nS = disciples.getNeighbors(pos);
      let bitmaskKey = disciples.getBitmaskTextureKey('WATER', nS);

      return waterBitmask[bitmaskKey];
    },
    'GROUND': () => {
      return frames['isoearth'];
    },
    'MOUNTAIN': (pos) => {
      return frames['isoearth'];
    }
  };
};

export function makeFrameByRoleMini(frames, disciples) {
  return {
    'WATER': (pos) => {
      let waterBitmask = frames['waterBitmask'];

      let nS = disciples.getNeighbors(pos);
      let bitmaskKey = disciples.getBitmaskTextureKey('WATER', nS);

      return waterBitmask[bitmaskKey];
    },
    'GROUND': () => {
      return frames['earth'];
    },
    'MOUNTAIN': () => {
      return frames['earth'];
    }
  };
};
