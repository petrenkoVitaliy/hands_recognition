import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";

export function rotateThisFckHand(angle, camera, CONFIG) {
  const { rotation: rotationConfig, camera: cameraConfig } = CONFIG;
  camera.position.x = rotationConfig.radius * Math.cos(angle);
  camera.position.z = rotationConfig.radius * Math.sin(angle);
  camera.position.y = cameraConfig.initPosition[1]; // wrong!
  angle += rotationConfig.anglrStep;

  const lookAtVector = new THREE.Vector3(...rotationConfig.lookinigVector);
  camera.lookAt(lookAtVector);

  return angle;
}

// export function resizeRendererToDisplaySize(renderer, camera) {
//   const canvas = renderer.domElement;
//   const width = canvas.clientWidth;
//   const height = canvas.clientHeight;
//   const needResize = canvas.width !== width || canvas.height !== height;

//   if (needResize) {
//     const canvas = renderer.domElement;

//     renderer.setSize(width, height, false);
//     camera.aspect = canvas.clientWidth / canvas.clientHeight;
//     camera.updateProjectionMatrix();
//   }
// }

export function loadEnvironment(CONFIG, scene) {
  const { enviroment: environmentConfig } = CONFIG;

  const loader = new THREE.TextureLoader();
  const texture = loader.load(environmentConfig.texture);
  const repeats = environmentConfig.planeSize / 300;

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.repeat.set(repeats, repeats);

  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  let planeGeo;
  if (environmentConfig.planeSize) {
    planeGeo = new THREE.CylinderGeometry(10, 80, 1000, 1000);
    planeGeo.translate(0, -50, 0);
    planeGeo.rotateX(-Math.PI * 0.5);
  }

  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.envMap = 1000;
  mesh.rotation.x = environmentConfig.rotationX;
  scene.add(mesh);
}

export function loadCanvas(ref, CONFIG, scene) {
  const { camera: cameraConfig } = CONFIG;
  const { canvas: canvasConfig } = CONFIG;

  const camera = new THREE.PerspectiveCamera(
    canvasConfig.zoom,
    canvasConfig.aspect,
    canvasConfig.near,
    canvasConfig.far
  );
  camera.position.set(...cameraConfig.initPosition);

  const controls = new OrbitControls(camera, ref);
  controls.target.set(0, 5, 0); // ??
  controls.update();
  scene.background = new THREE.Color(canvasConfig.backgroundColor);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(canvasConfig.size.width, canvasConfig.size.height);
  ref.appendChild(renderer.domElement);
  return [camera, renderer];
}

export function loadHemisphereLight(CONFIG, scene) {
  const { hemisphereLight: hemisphereLightConfig } = CONFIG;
  const skyColor = hemisphereLightConfig.skyColor;
  const groundColor = hemisphereLightConfig.groundColor;
  const intensity = hemisphereLightConfig.intensity;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);
}

export function loadDirectionalLight(prevLight, CONFIG, scene) {
  if (prevLight) {
    scene.remove(prevLight);
  }
  const { directionalLight: directionalLightConfig } = CONFIG;
  const randomColor = `#${"0123456789abcdef"
    .split("")
    .map(function (v, i, a) {
      return i > 5 ? null : a[Math.floor(Math.random() * 16)];
    })
    .join("")}`;

  const configLightColor = directionalLightConfig.lightColor;
  const lightColor = Array.isArray(configLightColor)
    ? randomColor
    : configLightColor;

  const configLightTargetPosition = directionalLightConfig.lightTargetPosition;

  const randomPosition = Math.floor(Math.random() * 200) - 100;
  const lightTargetPosition = !configLightTargetPosition[0]
    ? [randomPosition, 0, 0]
    : configLightTargetPosition;

  const light = new THREE.DirectionalLight(
    lightColor,
    directionalLightConfig.lightIntensity
  );

  light.position.set(...directionalLightConfig.lightPosition);
  light.target.position.set(...lightTargetPosition);

  scene.add(light);
  scene.add(light.target);

  return light;
}

export function loadModel(modelObj, modelTexture, CONFIG, scene) {
  const { model: modelConfig } = CONFIG;
  const objLoader = new OBJLoader2();
  const textureLoader = new THREE.TextureLoader();
  const map = textureLoader.load(modelTexture);
  const material = new THREE.MeshPhongMaterial({ map });

  objLoader.load(modelObj, (root) => {
    root.traverse(function (node) {
      if (node.isMesh) {
        node.material = material;
      }
    });
    root.position.x = modelConfig.position.x;
    root.position.y = modelConfig.position.y;
    root.position.z = modelConfig.position.z;
    root.rotateX(modelConfig.rotation.x);
    root.rotateZ(modelConfig.rotation.z);
    scene.add(root);
  });
}
