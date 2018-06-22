import round from 'lodash/round';

const getDeviceMotionJSON = (
  acceleration,
  accelerationIncludingGravity,
  rotationRate,
  interval
) => ({
  acceleration: {
    x: acceleration.x,
    y: acceleration.y,
    z: acceleration.z
  },
  accelerationIncludingGravity: {
    x: accelerationIncludingGravity.x,
    y: accelerationIncludingGravity.y,
    z: accelerationIncludingGravity.z
  },
  rotationRate: {
    alpha: rotationRate.alpha,
    beta: rotationRate.beta,
    gamma: rotationRate.gamma
  },
  interval
});

const getDeviceMotionJSONRound = (
  acceleration,
  accelerationIncludingGravity,
  rotationRate,
  interval
) => {
  const decimal = 0;
  return {
    acceleration: {
      x: round(acceleration.x, decimal),
      y: round(acceleration.y, decimal),
      z: round(acceleration.z, decimal)
    },
    accelerationIncludingGravity: {
      x: round(accelerationIncludingGravity.x, decimal),
      y: round(accelerationIncludingGravity.y, decimal),
      z: round(accelerationIncludingGravity.z, decimal)
    },
    rotationRate: {
      alpha: round(rotationRate.alpha, decimal),
      beta: round(rotationRate.beta, decimal),
      gamma: round(rotationRate.gamma, decimal)
    },
    interval
  };
};

export { getDeviceMotionJSON, getDeviceMotionJSONRound };
