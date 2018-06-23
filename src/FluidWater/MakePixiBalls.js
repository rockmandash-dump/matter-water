import { Graphics } from 'pixi.js';

export default ballData => {
  return ballData.map(item => {
    const { x, y, radius } = item;
    const ball = new Graphics();
    ball.lineStyle(0);
    ball.beginFill(0x0496ff);
    ball.drawCircle(x, y, radius);
    ball.endFill();
    return ball;
  });
};
