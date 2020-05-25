/**
  tip: this code was legacy even at the planning stage... don't try to understand it 
*/
import * as THREE from "three";

import modelTexture from "../../model_data/hand_map.jpg";
import { CONFIGS, MODELS, LIGHT_CONFIGS } from "../config";
import { SceneRenders } from "./sceneRenders/index";
import { saveImage, downloadObject, mergeLightConfig } from "./helpers";

export function createScene(
  ref,
  CONFIG_TYPE,
  LIGHT_TYPE,
  currentModel,
  isDownloadingImages = false,
  updateProgressStatus = () => {}
) {
  const CONFIG = mergeLightConfig(
    CONFIGS[CONFIG_TYPE],
    LIGHT_CONFIGS[LIGHT_TYPE]
  );
  const modelObj = MODELS[currentModel];

  const scene = new THREE.Scene();
  const {
    loadEnvironment,
    loadHemisphereLight,
    loadDirectionalLight,
    loadModel,
    rotateThisFckHand,
    loadCanvas,
  } = SceneRenders(CONFIG, scene);
  const canvasContainer = document.getElementById("verybadhack");
  canvasContainer.childNodes[0] &&
    canvasContainer.removeChild(canvasContainer.childNodes[0]);

  const [camera, renderer] = loadCanvas(ref);
  const initLight = loadDirectionalLight("");
  loadEnvironment();
  loadHemisphereLight();
  loadModel(modelObj, modelTexture);

  let isActive = true;
  const rerenderLight = (light = initLight) => loadDirectionalLight(light);

  getRender(
    CONFIG,
    isDownloadingImages,
    rotateThisFckHand,
    camera,
    renderer,
    scene,
    currentModel,
    () => isActive,
    updateProgressStatus,
    rerenderLight
  )();

  return () => (isActive = false);
}

function getRender(
  CONFIG,
  isDownloadingImages,
  rotateThisFckHand,
  camera,
  renderer,
  scene,
  currentModel,
  isActive,
  updateProgressStatus,
  rerenderLight
) {
  const { rotation: rotationConfig } = CONFIG;
  const [frontAngles, backAngles] = rotationConfig.anglesLimits;
  const progressNextStep =
    (frontAngles[1] - frontAngles[0] + backAngles[1] - backAngles[0]) /
    rotationConfig.anglrStep /
    100;

  const savedImages = [];
  let index = 0;
  let light;

  const render = (angle = frontAngles[0]) => {
    const { rotation: rotationConfig, mode } = CONFIG;
    if (angle < frontAngles[0]) {
      angle = frontAngles[0];
    }

    if (angle > frontAngles[1] && angle < backAngles[0]) {
      angle = backAngles[0];
    }

    if (angle > backAngles[1]) {
      angle = frontAngles[0];
      if (isDownloadingImages) {
        downloadObject(savedImages, currentModel, CONFIG.mode);
        console.log(savedImages);
        return;
      }
      index = 0;
    }

    if (
      Math.floor(index / progressNextStep) >
      Math.floor((index - 1) / progressNextStep)
    ) {
      updateProgressStatus(Math.floor(index / progressNextStep));
    }

    light = rerenderLight(light);
    const nextAngle = rotateThisFckHand(angle, camera);
    renderer.render(scene, camera);

    savedImages.push(saveImage(renderer, index, mode));
    index++;

    if (isActive()) {
      setTimeout(
        () =>
          setTimeout(function () {
            requestAnimationFrame(() => render(nextAngle));
          }, 1000 / rotationConfig.fps),
        isDownloadingImages && index === 2 ? 1000 : 0
      );
    } else {
      return;
    }
  };

  return render;
}
