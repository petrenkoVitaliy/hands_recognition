/**
  tip: this code was legasy even at the planning stage... don't try to understand it 
*/
import * as THREE from "three";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import fileOBJ from "./obj/hand.OBJ";
import fileJPG from "./obj/hand_mapNew.jpg";

export function threeJs(ref) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(840, 640);
  ref.appendChild(renderer.domElement);

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(6.5, 5, 0.2);

  const controls = new OrbitControls(camera, ref);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const skyColor = 0xb1e1ff;
    const groundColor = 0xb97a20;
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const objLoader = new OBJLoader2();
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(fileJPG);
    const material = new THREE.MeshPhongMaterial({ map: map });

    objLoader.load(fileOBJ, (root) => {
      root.traverse(function (node) {
        if (node.isMesh) node.material = material;
      });
      root.position.x = 0;
      root.position.y = 6;
      root.position.z = 0;
      root.rotateX((180 * Math.PI) / 180);
      root.rotateZ((40 * Math.PI) / 180);
      scene.add(root);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  let angle = 0;
  // 1 -> -1
  // 2 -> 4
  let radius = 6;
  function rotateThisFckHand() {
    //console.log(camera.position);
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    angle += 0.005;
    console.log(angle);
    const lookAtVector = new THREE.Vector3(0, 5.5, 0);
    camera.lookAt(lookAtVector);
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    rotateThisFckHand();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
