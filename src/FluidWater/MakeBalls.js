import { Bodies } from 'matter-js';
import times from 'lodash/times';

export default () => {
  const radius = 10;
  let ballData = [];

  times(Math.floor(window.innerWidth / radius), xIndex => {
    times(Math.floor(window.innerHeight / 8 / radius), yIndex => {
      ballData.push({
        x: 5 + radius * 2 * xIndex,
        y: 5 + radius * 2 * yIndex,
        radius: radius
      });
    });
  });

  return ballData.map(item => {
    const { x, y, radius } = item;
    const ball = Bodies.circle(x, y, radius, {
      render: {
        fillStyle: '#0496ff'
        // strokeStyle: '#0496ff',
        // lineWidth: 10
      }
    });
    ball.restitution = 0.2;

    // ballA.frictionAir = 0.00000000001;

    return ball;
  });
};
