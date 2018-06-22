import React, { Component } from 'react';
import FluidWater from './FluidWater';
import DeviceMotionOrientationData from './DeviceMotionOrientationData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DeviceMotionOrientationData />
        <FluidWater />
      </div>
    );
  }
}

export default App;
