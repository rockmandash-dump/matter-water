import times from 'lodash/times';

export default () => {
  const radius = 5;
  const sides = 3;
  let ballData = [];

  times(Math.floor(window.innerWidth / radius), xIndex => {
    times(Math.floor(window.innerHeight / 8 / radius), yIndex => {
      ballData.push({
        x: 5 + radius * 2 * xIndex,
        y: 5 + radius * 2 * yIndex,
        sides,
        radius
      });
    });
  });

  return ballData.slice(0, 500);
};
