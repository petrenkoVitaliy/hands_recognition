import React, { Component } from "react";
import { threeJs } from "./threejs/scene";

export default class App extends Component {
  componentDidMount() {
    threeJs(this.mount);
  }

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
