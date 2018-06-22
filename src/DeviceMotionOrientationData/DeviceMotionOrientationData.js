import React, { Component } from 'react';
import { getDeviceMotionJSONRound } from './getDeviceMotionJSON';
import { getDeviceOrientationJSONRound } from './getDeviceOrientationJSON';
import styled from 'react-emotion';
import { withDeviceMotion, withDeviceOrientation } from 'react-fns';
import { compose } from 'recompose';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.75rem;
  color: black;
  z-index: 2;
`;

class DeviceMotionOrientationData extends Component {
  render() {
    const {
      // withDeviceMotion
      acceleration,
      accelerationIncludingGravity,
      rotationRate,
      interval,
      // withDeviceOrientation
      alpha,
      beta,
      gamma,
      absolute
    } = this.props;
    // classToPlain

    return (
      <Container>
        <p>withDeviceMotion</p>
        <pre>
          {JSON.stringify(
            getDeviceMotionJSONRound(
              acceleration,
              accelerationIncludingGravity,
              rotationRate,
              interval
            ),
            null,
            2
          )}
        </pre>
        <p>withDeviceOrientation</p>
        <pre>
          {JSON.stringify(
            getDeviceOrientationJSONRound(alpha, beta, gamma, absolute),
            null,
            2
          )}
        </pre>
      </Container>
    );
  }
}

export default compose(
  withDeviceMotion,
  withDeviceOrientation
)(DeviceMotionOrientationData);
