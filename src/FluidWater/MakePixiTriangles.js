import { Graphics } from 'pixi.js';

let graphic = new Graphics();
graphic.lineStyle(0, 0, 1);
graphic.beginFill(0x0496ff);
graphic.drawPolygon([0, 8.7, 15, 0, 15, 17.4]);
graphic.endFill();
let texture = renderer.generateTexture(graphic);

export default (trianglesData, renderer) => {
  return trianglesData.map(item => {
    const sprite = new Sprite(this.LittleBubbleTexture);

    // const { x, y } = item;

    // graphic.anchor.x = 0.5;
    // graphic.anchor.y = 0.5;
    // graphic.pivot.x = 0.1;
    // graphic.pivot.y = 0.1;

    return texture;
  });
};
