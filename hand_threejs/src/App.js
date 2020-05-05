import React, { Component } from "react";
import { threeJs } from "./ThreeJs";

class App extends Component {
  componentDidMount() {
    threeJs(this.mount);
  }

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
export default App;
