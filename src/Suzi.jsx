import { useGLTF } from "@react-three/drei";
import { applyProps } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import * as THREE from "three";
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture";

export default function Suzi(props) {
  const { scene, materials } = useGLTF("./suzane.glb");
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.receiveShadow = obj.castShadow = true;
      }
    });
    console.log(new THREE.CanvasTexture())

    applyProps(materials.default, {
      color: "orange",
      roughness: 0.18,
      // !버전 이슈!
        // normalMap: new THREE.CanvasTexture(
        //   new FlakesTexture(),
        //   THREE.UVMapping,
        //   THREE.RepeatWrapping,
        //   THREE.RepeatWrapping
        // ),
        //   "normalMap-repeat": [20, 20],
        //   normalScale: [0.1, 0.1],
    });
  });

  return <primitive object={scene} {...props} />;
}
