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

export const TOP_CONFIG_1 = {
  mode: "top1",
  ...CONFIG,

  canvas: {
    ...CONFIG.canvas,
    zoom: 25,
  },

  camera: {
    initPosition: [6.5, 12, 0.2],
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

export const TOP_CONFIG_2 = {
  mode: "top2",
  ...CONFIG,

  canvas: {
    ...CONFIG.canvas,
    zoom: 38,
  },

  camera: {
    initPosition: [6.5, 10, 0.2],
  },

  model: {
    ...CONFIG.model,
    position: {
      x: 0,
      y: 6,
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

export const BOTTOM_CONFIG_1 = {
  mode: "bottom1",
  ...CONFIG,

  camera: {
    initPosition: [6.5, 2, 0.2],
  },
};

export const BOTTOM_CONFIG_2 = {
  mode: "bottom2",
  ...CONFIG,

  camera: {
    initPosition: [6.5, 1, 0.2],
  },
};

export const COMPOSED_LIGHT_CONFIG = {
  mode: "composed_light",
  ...CONFIG,
  directionalLight: {
    ...CONFIG.directionalLight,
    lightTargetPosition: [],
    lightColor: [],
  },
};

export const COMPOSED_LIGHT_CONFIG_TEXTURE = {
  mode: "composed_light_texture",
  ...CONFIG,
  directionalLight: {
    ...CONFIG.directionalLight,
    lightTargetPosition: [],
    lightColor: [],
  },
  enviroment: {
    ...CONFIG.enviroment,
    planeSize: 4000,
  },
};

export const DEFAULT_LIGHT_CONFIG = {
  mode: "default_light",
  ...CONFIG,
};

export const MODIFIED_LIGHT_CONFIG = {
  mode: "modified_light", // light modified
  ...CONFIG,
  directionalLight: {
    ...CONFIG.directionalLight,
    lightPosition: [10, 10, 0],
    lightTargetPosition: [-100, 0, 0],
  },
};

export const MODIFIED_LIGHT_CONFIG2 = {
  mode: "modified_light2",
  ...CONFIG,
  directionalLight: {
    ...CONFIG.directionalLight,
    lightPosition: [10, 10, 0],
    lightTargetPosition: [100, 0, 0],
  },
};
