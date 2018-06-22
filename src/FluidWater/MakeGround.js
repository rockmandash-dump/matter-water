import { Bodies } from 'matter-js';

export default () => {
  const thick = 100;
  const options = { isStatic: true };
  const groundsData = [
    {
      direction: 'top',
      x: window.innerWidth / 2,
      y: -(thick / 2),
      width: window.innerWidth,
      height: thick
    },
    {
      direction: 'bottom',
      x: window.innerWidth / 2,
      y: window.innerHeight + thick / 2,
      width: window.innerWidth,
      height: thick
    },
    {
      direction: 'left',
      x: -(thick / 2),
      y: window.innerHeight / 2,
      width: thick,
      height: window.innerHeight
    },
    {
      direction: 'right',
      x: window.innerWidth + thick / 2,
      y: window.innerHeight / 2,
      width: thick,
      height: window.innerHeight
    }
  ];
  return groundsData.map(item => {
    const { x, y, width, height } = item;
    return Bodies.rectangle(x, y, width, height, options);
  });
};
