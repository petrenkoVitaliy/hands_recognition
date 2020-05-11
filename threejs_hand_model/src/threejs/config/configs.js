import { CONFIG } from "./base_config";

export const DEFAULT_CONFIG = {
  mode: "default",
  ...CONFIG,
};

export const TOP_CONFIG = {
  mode: "top", // camera from top (camera.initPosition[1] => 5 => 8)
  ...CONFIG,

  camera: {
    initPosition: [6.5, 8, 0.2],
  },

  model: {
    ...CONFIG.model,
    position: {
      x: 0,
      y: 5.5,
      z: 0,
    },
  },
};

export const BOTTOM_CONFIG = {
  mode: "bottom", // camera from bottom (camera.initPosition[1] => 5 => 3)
  ...CONFIG,

  camera: {
    initPosition: [6.5, 3, 0.2],
  },
};

export const MODIFIED_LIGHT_CONFIG = {
  mode: "modified_top", // light modified
  ...CONFIG,
  directionalLight: {
    ...CONFIG.directionalLight,
    lightPosition: [10, 10, 0],
    lightTargetPosition: [-100, 0, 0],
  },
};

export const MODIFIED_LIGHT_CONFIG2 = {
  mode: "modified_light_2", // light modified
  ...CONFIG,
  directionalLight: {
    ...CONFIG.directionalLight,
    lightPosition: [10, 10, 0],
    lightTargetPosition: [100, 0, 0],
  },
};
