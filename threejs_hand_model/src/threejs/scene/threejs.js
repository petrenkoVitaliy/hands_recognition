/**
  tip: this code was legacy even at the planning stage... don't try to understand it 
*/
import * as THREE from "three";

import modelTexture from "../../model_data/hand_map.jpg";
import { CONFIGS, MODEL_NAMES, MODELS } from "../config";
import { SceneRenders } from "./sceneRenders/index";
import { saveImage, downloadObject } from "./helpers";

// DEFAULT_CONFIG,
// TOP_CONFIG,
// BOTTOM_CONFIG,
// MODIFIED_LIGHT_CONFIG,
// MODIFIED_LIGHT_CONFIG2,

export function createScene(
  ref,
  CONFIG_TYPE = "MODIFIED_LIGHT_CONFIG2",
  currentModel = MODEL_NAMES.SPOKE,
  isDownloadingImages = false,
  updateProgressStatus = () => {}
) {
  const CONFIG = CONFIGS[CONFIG_TYPE];
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
  loadEnvironment();
  loadHemisphereLight();
  loadDirectionalLight();
  loadModel(modelObj, modelTexture);

  let isActive = true;

  getRender(
    CONFIG,
    isDownloadingImages,
    rotateThisFckHand,
    camera,
    renderer,
    scene,
    currentModel,
    () => isActive,
    updateProgressStatus
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
  updateProgressStatus
) {
  const { rotation: rotationConfig } = CONFIG;
  const [frontAngles, backAngles] = rotationConfig.anglesLimits;
  const progressNextStep =
    (frontAngles[1] - frontAngles[0] + backAngles[1] - backAngles[0]) /
    rotationConfig.anglrStep /
    100;

  const savedImages = [];
  let index = 0;

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

    const nextAngle = rotateThisFckHand(angle, camera);
    renderer.render(scene, camera);

    savedImages.push(saveImage(renderer, index, mode));
    index++;
    if (isActive()) {
      setTimeout(function () {
        requestAnimationFrame(() => render(nextAngle));
      }, 1000 / rotationConfig.fps);
    } else {
      return;
    }
  };

  return render;
}
