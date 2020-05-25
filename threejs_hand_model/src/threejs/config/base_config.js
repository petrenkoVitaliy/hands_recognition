import modelSpokeObj from "../../model_data/hand-spoke_model.obj";
import modelDefaultObj from "../../model_data/hand_model.OBJ";
import modelSimpleObj from "../../model_data/simple_2.obj";

export const MODEL_NAMES = {
  SPOKE: "spoke",
  DEFAULT: "default",
  SIMPLE: "simple",
};
export const MODELS = {
  [MODEL_NAMES.SPOKE]: modelSpokeObj,
  [MODEL_NAMES.DEFAULT]: modelDefaultObj,
  [MODEL_NAMES.SIMPLE]: modelSimpleObj,
};

export const CONFIG = {
  canvas: {
    size: {
      width: 640,
      height: 400,
    },
    zoom: 45,
    aspect: 2,
    near: 0.1,
    far: 100,
    backgroundColor: "white",
  },

  directionalLight: {
    lightPosition: [0, 10, 0],
    lightTargetPosition: [-5, 0, 0],
    lightColor: 0xffffff,
    lightIntensity: 1,
  },

  hemisphereLight: {
    skyColor: 0xb1e1ff,
    groundColor: 0xb97a20,
    intensity: 1,
  },

  model: {
    position: {
      x: 0,
      y: 6,
      z: 0,
    },
    rotation: {
      x: (180 * Math.PI) / 180,
      z: (40 * Math.PI) / 180,
    },
  },

  enviroment: {
    planeSize: 0,
    texture:
      //"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRz5Kb14xfZqJ6tn4um89LrIu1pj1GvCpBmz4MjKJSG0upwbvZM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRoyi6kR6WXNBQtbNBCFjXZ20mVYuK5h6IAT1_EOjBb5I5Fj-qs&usqp=CAU",
    //"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjCwyor7RBevslmGefydtbHMsEOgDdgA7k8E0xU5DgRB1J3otM&usqp=CAU",
    rotationX: Math.PI * -0.5,
  },

  camera: {
    initPosition: [6.5, 5, 0.2],
  },

  rotation: {
    anglesLimits: [
      [-1, 1],
      [2, 4],
    ],

    fps: 60,
    anglrStep: 0.01,

    initAngle: 0,
    radius: 6,
    lookinigVector: [0, 5.5, 0],
  },
};
