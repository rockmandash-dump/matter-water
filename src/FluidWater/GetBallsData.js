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

  return ballData;
};
