import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MainContextType } from "../../context/main";

interface removeEntityProps {
  context: MainContextType;
  model: string;
}

const regexLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const removeEntity = ({ context, model }: removeEntityProps) => {
  const { scene, renderer, controls, camera } = context;
  const object = scene.getObjectByProperty("name", model);
  if (object) scene.remove(object);
  var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

export interface STLViewerProps {
  context: MainContextType;
  model: string;
  container: Element;
  onError: (...args: any[]) => void;
}

function STLViewer({ context, container, model, onError }: STLViewerProps) {
  const { renderer, camera } = context;
  renderer.setSize(container!.clientWidth, container!.clientHeight);
  container!.appendChild(renderer.domElement);

  window.addEventListener(
    // put on The componentn on mount
    "resize",
    function () {
      renderer.setSize(container!.clientWidth, container!.clientHeight);
      camera.aspect = container!.clientWidth / container!.clientHeight;
      camera.updateProjectionMatrix();
    },
    false
  );

  const loader = new STLLoader();
  loadSTL({ context, loader, model, onError });
}

export interface loadSTLProps extends Omit<STLViewerProps, "container"> {
  loader: STLLoader;
}

const loadSTL = ({ context, loader, model, onError }: loadSTLProps) => {
  const { renderer, controls, camera, scene } = context;

  const modelUrl = model.match(regexLink);
  let urlSTL = `${process.env.PUBLIC_URL}/models/${model}.stl`;
  if (modelUrl) {
    urlSTL = modelUrl[0];
  }

  loader.load(
    urlSTL,
    function (geometry) {
      var material = new THREE.MeshPhongMaterial({
        color: 0xff5533,
        specular: 100,
        shininess: 0,
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.name = model;
      scene.add(mesh);

      // Compute the middle
      var middle = new THREE.Vector3();
      geometry.computeBoundingBox();
      geometry.boundingBox!.getCenter(middle);

      // Center it
      mesh.position.x = -1 * middle.x;
      mesh.position.y = -1 * middle.y;
      mesh.position.z = -1 * middle.z;

      // Pull the camera away as needed
      var largestDimension = Math.max(
        geometry.boundingBox!.max.x,
        geometry.boundingBox!.max.y,
        geometry.boundingBox!.max.z
      );

      camera.position.z = largestDimension * 2;

      var animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    },
    () => {},
    function (err) {
      console.error(err, "An error happened");
      onError(true);
    }
  );
};
export default STLViewer;
