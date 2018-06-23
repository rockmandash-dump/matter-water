import React, { Component } from 'react';
import styled from 'react-emotion';
import { withDeviceMotion, withDeviceOrientation } from 'react-fns';
import { compose } from 'recompose';
import { Engine, Render, World } from 'matter-js';
import flatten from 'lodash/flatten';
import MakeGround from './MakeGround';
import ApplyAccelerationIncludingGravity from './ApplyAccelerationIncludingGravity';
import HandleGravityDirectionChange from './HandleGravityDirectionChange';
import MakeMatterBalls from './MakeMatterBalls';
import MakePixiBalls from './MakePixiBalls';
import GetBallsData from './GetBallsData';
import { Application } from 'pixi.js';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
`;
const CanvasForMatter = styled.canvas`
  /* display: none; */
  position: relative;
`;

const CanvasForPixi = styled.canvas`
  position: relative;
`;

class FluidWater extends Component {
  constructor(props) {
    super(props);
    this.CanvasForMatter = React.createRef();
    this.CanvasForPixi = React.createRef();
    this.ballsData = GetBallsData();

    this.engine = Engine.create();
  }

  componentDidMount() {
    this.InitializeMatter();
    this.InitializePixi();
  }
  componentDidUpdate(prevProps) {
    const { accelerationIncludingGravity, gamma } = this.props;

    HandleGravityDirectionChange(this.engine.world, gamma);

    if (Math.abs(accelerationIncludingGravity.x) > 40) {
      this.MatterBalls.forEach(item => {
        ApplyAccelerationIncludingGravity(item, accelerationIncludingGravity);
      });
    }
  }

  InitializeMatter = () => {
    this.MatterRenderer = Render.create({
      canvas: this.CanvasForMatter.current,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false
      }
    });
    Render.setPixelRatio(this.MatterRenderer, window.devicePixelRatio);
    this.MatterBalls = MakeMatterBalls(this.ballsData);

    World.add(
      this.engine.world,
      flatten([
        // MakeSoftBody(),
        this.MatterBalls,
        MakeGround()
      ])
    );

    // run the engine
    Engine.run(this.engine);

    // run the renderer
    Render.run(this.MatterRenderer);
  };
  InitializePixi = () => {
    this.PixiApp = new Application(window.innerWidth, window.innerHeight, {
      resolution: window.devicePixelRatio,
      view: this.CanvasForPixi.current,
      autoResize: true,
      transparent: true
    });

    this.PixiApp.renderer.plugins.interaction.autoPreventDefault = false;
    this.PixiApp.renderer.view.style.touchAction = 'auto';

    this.PixiBalls = MakePixiBalls(this.ballsData);

    this.PixiBalls.forEach(item => {
      this.PixiApp.stage.addChild(item);
    });

    this.PixiApp.ticker.add(() => {
      // console.log(this.PixiBalls[0]);
      // console.log(this.MatterBalls[0].position);
      // console.log(this.MatterBalls[0].angle);
      this.MatterBalls.forEach((item, index) => {
        this.PixiBalls[index].position.set(item.position.x, item.position.y);
        // this.PixiBalls[index].rotation = item.angle;
      });
    });
  };

  render() {
    return (
      <Container>
        <CanvasForMatter innerRef={this.CanvasForMatter} />
        <CanvasForPixi innerRef={this.CanvasForPixi} />
      </Container>
    );
  }
}

export default compose(
  withDeviceMotion,
  withDeviceOrientation
)(FluidWater);
