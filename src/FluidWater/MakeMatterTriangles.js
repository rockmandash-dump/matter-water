import { Bodies } from 'matter-js';

export default trianglesData => {
  return trianglesData.map(item => {
    const { x, y, sides, radius } = item;
    const triangle = Bodies.polygon(
      x,
      y,
      sides,
      radius
      // , {
      // render: {
      // fillStyle: '#0496ff'
      // strokeStyle: '#0496ff',
      // lineWidth: 10
      // }
      // }
    );
    triangle.restitution = 0.2;

    // triangle.frictionAir = 0.00000000001;

    return triangle;
  });
};
