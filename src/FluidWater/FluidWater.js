import React, { Component } from 'react';
import styled from 'react-emotion';
import {
  withDeviceMotion,
  withDeviceOrientation,
  withWindowSize
} from 'react-fns';
import { compose } from 'recompose';
import { Engine, Render, World } from 'matter-js';
import flatten from 'lodash/flatten';
import MakeGround from './MakeGround';
import ApplyAccelerationIncludingGravity from './ApplyAccelerationIncludingGravity';
import HandleGravityDirectionChange from './HandleGravityDirectionChange';
import ResizeCanvasRenderer from './ResizeCanvasRenderer';
import MakeBalls from './MakeBalls';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
`;

class FluidWater extends Component {
  constructor(props) {
    super(props);
    this.Container = React.createRef();
    this.engine = Engine.create();
    this.canvasRenderer = null;
  }

  componentDidMount() {
    this.Initialize();
  }
  componentDidUpdate(prevProps) {
    const { accelerationIncludingGravity, gamma } = this.props;

    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      ResizeCanvasRenderer();
    }
    HandleGravityDirectionChange(this.engine.world, gamma);

    if (Math.abs(accelerationIncludingGravity.x) > 40) {
      this.balls.forEach(item => {
        ApplyAccelerationIncludingGravity(item, accelerationIncludingGravity);
      });
    }
  }

  Initialize = () => {
    this.canvasRenderer = Render.create({
      element: this.Container.current,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false
      }
    });
    Render.setPixelRatio(this.canvasRenderer, window.devicePixelRatio);
    this.balls = MakeBalls();

    World.add(
      this.engine.world,
      flatten([
        // MakeSoftBody(),
        this.balls,
        MakeGround()
      ])
    );

    // run the engine
    Engine.run(this.engine);

    // run the renderer
    Render.run(this.canvasRenderer);
  };

  render() {
    return <Container innerRef={this.Container} />;
  }
}

export default compose(
  withDeviceMotion,
  withDeviceOrientation,
  withWindowSize
)(FluidWater);
