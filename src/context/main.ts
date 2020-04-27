import { createContext } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import jsonData from "../data/openforge_models.json";

const contructorThreeObjects = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera.position.x = 60;
  camera.position.y = 45;
  camera.position.z = 45;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.15;
  controls.dampingFactor = 0.1;
  controls.enableZoom = true;
  controls.enablePan = true;
  const modelsData = jsonData;
  return {
    controls,
    renderer,
    camera,
    modelsData,
  };
};
const mainContext = {
  ...contructorThreeObjects(),
  scene: new THREE.Scene(),
  containerId: "stlViewer",
};

export type MainContextType = typeof mainContext;

export const threeContext = createContext(mainContext);
export const currentState = mainContext;
