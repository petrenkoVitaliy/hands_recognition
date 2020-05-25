import React, { Component } from "react";
import Select from "react-select";

import { createScene } from "./threejs/scene";

import "./index.css";

export default class Dashboard extends Component {
  state = {
    progressStatus: 0, //400 => 100
  };

  componentDidMount() {
    this.changeSceneConfig();
  }

  updateProgressStatus = (progressStatus) => {
    this.setState({ progressStatus });
  };

  changeSceneConfig = (isDownloadable = false) => {
    const {
      values: { configType, currentModel, lightType },
    } = this.props;
    this.stopScene && this.stopScene();
    this.stopScene = createScene(
      this.mount,
      configType,
      lightType,
      currentModel,
      isDownloadable,
      this.updateProgressStatus
    );
  };

  render() {
    const {
      values = {},
      setFieldValue,
      currentModelOptions,
      configTypeOptions,
      lightTypeOptions,
    } = this.props;
    const { progressStatus } = this.state;

    return (
      <>
        <div className="dashboardWrapper">
          <div className="formWrapper">
            <div className="formItem">
              <Select
                options={currentModelOptions}
                name="currentModel"
                value={
                  currentModelOptions
                    ? currentModelOptions.find(
                        (option) => option.value === values.currentModel
                      )
                    : ""
                }
                onChange={(option) =>
                  setFieldValue("currentModel", option.value)
                }
              />
            </div>
            <div className="formItem">
              <Select
                options={configTypeOptions}
                name="configType"
                value={
                  configTypeOptions
                    ? configTypeOptions.find(
                        (option) => option.value === values.configType
                      )
                    : ""
                }
                onChange={(option) => setFieldValue("configType", option.value)}
              />
            </div>
            <div className="formItem">
              <Select
                options={lightTypeOptions}
                name="lightType"
                value={
                  lightTypeOptions
                    ? lightTypeOptions.find(
                        (option) => option.value === values.lightType
                      )
                    : ""
                }
                onChange={(option) => setFieldValue("lightType", option.value)}
              />
            </div>
            <div className="formButton">
              <button onClick={() => this.changeSceneConfig()}>Rerender</button>
            </div>
            <div className="formButton">
              <button onClick={() => this.changeSceneConfig(true)}>
                Generate
              </button>
            </div>
          </div>
          <progress value={progressStatus} max="100">
            {`${progressStatus}%`}
          </progress>
        </div>

        <div id="verybadhack" ref={(ref) => (this.mount = ref)} />
      </>
    );
  }
}
