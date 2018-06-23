import { Bodies } from 'matter-js';

export default ballData => {
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
