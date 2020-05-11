/**
  tip: this code was legacy even at the planning stage... don't try to understand it 
*/
import * as THREE from "three";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import modelTexture from "../../model_data/hand_map.jpg";
import { CONFIGS, MODEL_NAMES, MODELS } from "../config";

// DEFAULT_CONFIG,
// TOP_CONFIG,
// BOTTOM_CONFIG,
// MODIFIED_LIGHT_CONFIG,
// MODIFIED_LIGHT_CONFIG2,
const currentModel = MODEL_NAMES.SPOKE;
const modelObj = MODELS[currentModel];

const CONFIG_TYPE = "MODIFIED_LIGHT_CONFIG2";
const CONFIG = CONFIGS[CONFIG_TYPE];

export function threeJs(ref) {
  const scene = new THREE.Scene();

  const [camera, renderer] = loadCanvas(scene, ref);
  loadEnvironment(scene);
  loadHemisphereLight(scene);
  loadDirectionalLight(scene);
  loadModel(scene);

  const initIndex = 1604;

  const { rotation: rotationConfig } = CONFIG;
  const [frontAngles, backAngles] = rotationConfig.anglesLimits;
  const isDownloadingImages = 0;

  let index = initIndex;
  const savedImages = [];

  function render(angle) {
    const { rotation: rotationConfig } = CONFIG;
    resizeRendererToDisplaySize(renderer, camera);

    if (angle < frontAngles[0]) {
      angle = frontAngles[0];
    }
    if (angle > frontAngles[1] && angle < backAngles[0]) {
      angle = backAngles[0];
    }
    if (angle > backAngles[1]) {
      angle = frontAngles[0];

      if (isDownloadingImages) {
        downloadImages(initIndex, savedImages, currentModel);
        return;
      }
    }

    const nextAngle = rotateThisFckHand(angle, camera);
    renderer.render(scene, camera);

    savedImages.push(saveImage(renderer, index));
    console.log(index++);
    setTimeout(function () {
      requestAnimationFrame(() => render(nextAngle));
    }, 1000 / rotationConfig.fps);
  }

  render(frontAngles[0]);
}

//----------------------------------
function saveImage(renderer, index) {
  const { mode } = CONFIG;

  const image = renderer.domElement.toDataURL("image/png");
  const name = `image_${index}_${mode}`;
  return { image, name };
}

function downloadImages(initIndex, savedImages, className) {
  let result = "";

  const downloadImage = (index) => {
    if (!savedImages[index]) {
      console.log(result);
      return;
    }
    console.log(index);
    const { name, image } = savedImages[index];
    const a = document.createElement("a");
    a.href = image;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    result += `${index + initIndex},${name},${className}\n`;

    setTimeout(() => downloadImage(index + 1), 100);
  };

  downloadImage(0);
}

function rotateThisFckHand(angle, camera) {
  const { rotation: rotationConfig, camera: cameraConfig } = CONFIG;
  camera.position.x = rotationConfig.radius * Math.cos(angle);
  camera.position.z = rotationConfig.radius * Math.sin(angle);
  camera.position.y = cameraConfig.initPosition[1]; // wrong!
  angle += rotationConfig.anglrStep;

  const lookAtVector = new THREE.Vector3(...rotationConfig.lookinigVector);
  camera.lookAt(lookAtVector);

  return angle;
}

function resizeRendererToDisplaySize(renderer, camera) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    const canvas = renderer.domElement;

    renderer.setSize(width, height, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

function loadEnvironment(scene) {
  const { enviroment: environmentConfig } = CONFIG;

  const loader = new THREE.TextureLoader();
  const texture = loader.load(environmentConfig.texture);
  const repeats = environmentConfig.planeSize / 2;

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneBufferGeometry(
    environmentConfig.planeSize,
    environmentConfig.planeSize
  );

  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = environmentConfig.rotationX;
  scene.add(mesh);
}

function loadCanvas(scene, ref) {
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

function loadHemisphereLight(scene) {
  const { hemisphereLight: hemisphereLightConfig } = CONFIG;
  const skyColor = hemisphereLightConfig.skyColor;
  const groundColor = hemisphereLightConfig.groundColor;
  const intensity = hemisphereLightConfig.intensity;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);
}

function loadDirectionalLight(scene) {
  const { directionalLight: directionalLightConfig } = CONFIG;

  const light = new THREE.DirectionalLight(
    directionalLightConfig.lightColor,
    directionalLightConfig.lightIntensity
  );

  light.position.set(...directionalLightConfig.lightPosition);
  light.target.position.set(...directionalLightConfig.lightTargetPosition);
  scene.add(light);
  scene.add(light.target);
}

function loadModel(scene) {
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
