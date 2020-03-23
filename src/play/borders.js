import { sprite } from '../asprite';

export default function Borders(play, ctx, bs) {

  const { canvas, 
          events,
          layers: { scene, oneLayer }, 
          frames } = ctx;

  this.init = data => {

    let dBorderTop = sprite(frames['borderTop']);
    dBorderTop.width = bs.bBottom.width;
    dBorderTop.height = bs.bBottom.height;

    let dBorderLeft = sprite(frames['borderTop']);
    dBorderLeft.width = bs.bLeft.width;
    dBorderLeft.height = bs.bLeft.height;
    dBorderLeft.position.set(bs.bLeft.x, bs.bLeft.y);

    let dBorderRight = sprite(frames['borderRight']);
    dBorderRight.width = bs.bRight.width;
    dBorderRight.height = bs.bRight.height;
    dBorderRight.position.set(bs.bRight.x, bs.bRight.y);

    let dBorderBottom = sprite(frames['borderBottom']);
    dBorderBottom.width = bs.bBottom.width;
    dBorderBottom.height = bs.bBottom.height;
    dBorderBottom.position.set(bs.bBottom.x, bs.bBottom.y);

    oneLayer.add(dBorderTop);
    oneLayer.add(dBorderLeft);
    oneLayer.add(dBorderRight);
    oneLayer.add(dBorderBottom);
  };

  this.update = delta => {
  };


  this.render = () => {
    
  };
  
}
