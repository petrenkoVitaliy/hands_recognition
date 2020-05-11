export const HAND_SIDE = {
  FRONT: "front",
  BACK: "back",
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
    backgroundColor: "black",
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
    //planeSize: 40,
    texture: "", //https://threejsfundamentals.org/threejs/resources/images/checker.png
    rotationX: Math.PI * -0.5,
  },

  camera: {
    initPosition: [6.5, 5, 0.2],
  },

  rotation: {
    anglesLimits: {
      [HAND_SIDE.FRONT]: [-1, 1],
      [HAND_SIDE.BACK]: [2, 4],
    },
    fps: 60,
    anglrStep: 0.01,

    initAngle: 0,
    radius: 6,
    lookinigVector: [0, 5.5, 0],
  },
};
