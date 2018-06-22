import round from 'lodash/round';

const getDeviceOrientationJSON = (alpha, beta, gamma, absolute) => ({
  alpha,
  beta,
  gamma,
  absolute
});

const getDeviceOrientationJSONRound = (alpha, beta, gamma, absolute) => {
  const decimal = 0;
  return {
    alpha: round(alpha, decimal),
    beta: round(beta, decimal),
    gamma: round(gamma, decimal),
    absolute: round(absolute, decimal)
  };
};

export { getDeviceOrientationJSON, getDeviceOrientationJSONRound };
