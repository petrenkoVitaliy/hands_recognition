import React, { Component } from "react";
import { Formik } from "formik";

import { MODEL_NAMES, CONFIGS_LIST } from "./threejs/config";

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

export default class App extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          configType: CONFIGS_LIST[0],
          currentModel: MODEL_NAMES.SPOKE,
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Dashboard
            values={values}
            setFieldValue={setFieldValue}
            handleSubmit={handleSubmit}
            currentModelOptions={currentModelOptions}
            configTypeOptions={configTypeOptions}
          />
        )}
      </Formik>
    );
  }
}
