import { sprite } from '../asprite';

import Disciples from '../disciples';
import IsoMap from './isomap';
import Minimap from './minimap';
import Borders from './borders';

export default function DisciplesView(play, ctx, bs) {

  let dIsoMap = new IsoMap(this, ctx, bs);
  let dMini = new Minimap(this, ctx, bs);
  let dBorders = new Borders(this, ctx, bs);

  this.init = data => {
    let disciples = new Disciples();
    disciples.init({map: 0 });

    dIsoMap.init({disciples});
    dMini.init({disciples});

    dBorders.init({});

  };

  this.viewFrame = () => dIsoMap.viewFrame();

  this.update = delta => {
    dIsoMap.update(delta);
    dMini.update(delta);
    dBorders.update(delta);
  };

  this.render = () => {
    dIsoMap.render();
    dMini.render();
    dBorders.render();
  };
  
}
