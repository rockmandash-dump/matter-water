import { Body } from 'matter-js';
export default (item, accelerationIncludingGravity) => {
  Body.setVelocity(item, {
    x: -accelerationIncludingGravity.x,
    y: -10
  });
};
