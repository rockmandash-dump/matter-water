import React, { Component } from 'react';
import styled from 'react-emotion';
import { withDeviceMotion, withDeviceOrientation } from 'react-fns';
import { compose } from 'recompose';
import {
  Engine,
  // Render,
  World
} from 'matter-js';
import flatten from 'lodash/flatten';
import MakeGround from './MakeGround';
import ApplyAccelerationIncludingGravity from './ApplyAccelerationIncludingGravity';
import HandleGravityDirectionChange from './HandleGravityDirectionChange';
import MakeMatterTriangles from './MakeMatterTriangles';

import GetTrianglesData from './GetTrianglesData';

import { Application, Graphics, Sprite, settings, particles } from 'pixi.js';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
`;
// const CanvasForMatter = styled.canvas`
//   /* display: none; */
//   position: relative;
// `;

const CanvasForPixi = styled.canvas`
  position: relative;
`;

class FluidWater extends Component {
  constructor(props) {
    super(props);
    // this.CanvasForMatter = React.createRef();
    this.CanvasForPixi = React.createRef();

    this.TrianglesData = GetTrianglesData();

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
      this.MatterTriangles.forEach(item => {
        ApplyAccelerationIncludingGravity(item, accelerationIncludingGravity);
      });
    }
  }

  InitializeMatter = () => {
    // this.MatterRenderer = Render.create({
    //   canvas: this.CanvasForMatter.current,
    //   engine: this.engine,
    //   options: {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //     background: 'transparent',
    //     wireframes: false
    //   }
    // });
    // Render.setPixelRatio(this.MatterRenderer, window.devicePixelRatio);
    // this.MatterBalls = MakeMatterBalls(this.MatterBallsData);
    this.MatterTriangles = MakeMatterTriangles(this.TrianglesData);

    World.add(this.engine.world, flatten([this.MatterTriangles, MakeGround()]));

    Engine.run(this.engine);
    // Render.run(this.MatterRenderer);
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

    this.generatePixiTrianglesTexture();

    this.PixiTriangles = this.MakePixiTriangles(this.TrianglesData);

    this.particleContainer = new particles.ParticleContainer(
      this.TrianglesData.length,
      {
        position: true,
        rotation: true
      }
    );

    this.PixiTriangles.forEach(item => {
      this.particleContainer.addChild(item);
    });

    this.PixiApp.stage.addChild(this.particleContainer);

    this.PixiApp.ticker.add(() => {
      this.MatterTriangles.forEach((item, index) => {
        this.PixiTriangles[index].position = item.position;
        this.PixiTriangles[index].rotation = item.angle;
      });
    });
  };
  generatePixiTrianglesTexture = () => {
    const scale = 2; // radius 5
    const polygonData = [
      0,
      8.7 / scale,
      15 / scale,
      0,
      15 / scale,
      17.4 / scale
    ];
    let graphic = new Graphics();
    graphic.lineStyle(0, 0, 1);
    graphic.beginFill(0x0496ff);
    graphic.drawPolygon(polygonData);
    graphic.endFill();
    this.PixiTrianglesTexture = this.PixiApp.renderer.generateTexture(
      graphic,
      settings.SCALE_MODE,
      window.devicePixelRatio
    );
  };
  MakePixiTriangles = trianglesData => {
    return trianglesData.map(item => {
      const sprite = new Sprite(this.PixiTrianglesTexture);
      sprite.anchor.x = 0.65;
      sprite.anchor.y = 0.5;
      return sprite;
    });
  };

  render() {
    return (
      <Container>
        {/* <CanvasForMatter innerRef={this.CanvasForMatter} /> */}
        <CanvasForPixi innerRef={this.CanvasForPixi} />
      </Container>
    );
  }
}

export default compose(
  withDeviceMotion,
  withDeviceOrientation
)(FluidWater);
