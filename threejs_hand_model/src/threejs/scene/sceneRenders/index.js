import {
  loadEnvironment,
  loadHemisphereLight,
  loadDirectionalLight,
  loadModel,
  rotateThisFckHand,
  loadCanvas,
} from "./sceneRenders";

export const SceneRenders = (CONFIG, scene) => {
  const wrappedFunctions = {};

  Object.entries({
    loadEnvironment: loadEnvironment,
    loadHemisphereLight: loadHemisphereLight,
    loadDirectionalLight: loadDirectionalLight,
    loadModel: loadModel,
    rotateThisFckHand: rotateThisFckHand,
    loadCanvas: loadCanvas,
  }).forEach(([key, value]) => {
    wrappedFunctions[key] = (...args) => value(...args, CONFIG, scene);
  });

  return wrappedFunctions;
};
