import { point } from './asprite';

const wholeFrame = (scene, image, w, h = w) =>
      scene.texture(image)
      .frame(point(), point(w, h));

const makeFrame = atlas => (x, y, w, h = w) => 
      atlas.frame(point(x, y),
                  point(w, h));

const bitmaskFrames = (mFrame, x, y, sz) => {
  let res = {};
  
  res.ne = mFrame(x + sz * 0, y, sz);
  res.n  = mFrame(x + sz * 1, y, sz);
  res.nw = mFrame(x + sz * 2, y, sz);

  res.e = mFrame(x + sz * 0, y + sz * 1, sz);
  res.m = mFrame(x + sz * 1, y + sz * 1, sz);
  res.w = mFrame(x + sz * 2, y + sz * 1, sz);

  res.se = mFrame(x + sz * 0, y + sz * 2, sz);
  res.s  = mFrame(x + sz * 1, y + sz * 2, sz);
  res.sw = mFrame(x + sz * 2, y + sz * 2, sz);

  return res;
};

export default function makeSprites(scene, assets) {

  const tilesAtlas = scene.texture(assets['tiles']),
        minimapAtlas = scene.texture(assets['minimap']);

  const tilesFrame = makeFrame(tilesAtlas);
  const minimapFrame = makeFrame(minimapAtlas);

  return {
    'borderTop': wholeFrame(scene, assets['bordertop'], 64 * 10, 16),
    'borderRight': minimapFrame(176, 224, 128),
    'borderBottom': minimapFrame(16, 352, 288, 16),
    'minimap': minimapFrame(0, 0, 128),
    'earth': tilesFrame(0, 0, 16),
    'waterBitmask': bitmaskFrames(tilesFrame, 64, 32, 16),
    'miniFrame': tilesFrame(0, 16, 16)
  };
}
