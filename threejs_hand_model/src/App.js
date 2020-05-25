import React, { Component } from "react";
import { Formik } from "formik";

import {
  MODEL_NAMES,
  CONFIGS_LIST,
  LIGHT_CONFIGS_LIST,
} from "./threejs/config";

import Dashboard from "./Dashboard";

const currentModelOptions = Object.entries(MODEL_NAMES).map(
  ([label, value]) => ({
    value,
    label,
  })
);

const configTypeOptions = CONFIGS_LIST.map((value) => ({
  value,
  label: value,
}));

const lightTypeOptions = LIGHT_CONFIGS_LIST.map((value) => ({
  value,
  label: value,
}));

export default class App extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          configType: CONFIGS_LIST[0],
          lightType: LIGHT_CONFIGS_LIST[0],
          currentModel: MODEL_NAMES.SIMPLE,
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Dashboard
            values={values}
            setFieldValue={setFieldValue}
            handleSubmit={handleSubmit}
            currentModelOptions={currentModelOptions}
            configTypeOptions={configTypeOptions}
            lightTypeOptions={lightTypeOptions}
          />
        )}
      </Formik>
    );
  }
}
