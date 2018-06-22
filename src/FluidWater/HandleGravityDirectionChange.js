import { scaleLinear } from 'd3-scale';

const ScalerGravityX = scaleLinear()
  .domain([-90, 90])
  .range([-1, 1]);

export default (world, gamma) => {
  world.gravity.x = ScalerGravityX(gamma);
};
