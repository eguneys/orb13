import { sprite } from '../asprite';

import Disciples from '../disciples';
import Map from './map';
import Minimap from './minimap';

export default function DisciplesView(play, ctx, bs) {

  let dMap = new Map(this, ctx, bs);
  let dMini = new Minimap(this, ctx, bs);

  this.init = data => {
    let disciples = new Disciples();
    disciples.init({map: 0 });

    dMap.init({disciples});
    dMini.init({disciples});
  };

  this.viewFrame = () => dMap.viewFrame();

  this.update = delta => {
    dMap.update(delta);
    dMini.update(delta);
  };


  this.render = () => {
    dMap.render();
    dMini.render();
  };
  
}
