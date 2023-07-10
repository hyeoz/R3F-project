/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
// import { applyProps } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import * as THREE from "three";
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture.js";

export default function Suzi(props) {
  const { scene, materials } = useGLTF("./monkey.glb");
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.receiveShadow = obj.castShadow = true;
      }
    });
    const texture = new THREE.CanvasTexture(
      new FlakesTexture(),
      THREE.UVMapping,
      THREE.RepeatWrapping,
      THREE.RepeatWrapping
    );
    console.log(texture, materials.default);

    // !버전 이슈 해결!
    materials.default.color = new THREE.Color("orange");
    materials.default.roughness = 0.18;
    materials.default.metalness = 1;
    materials.default.normalMap = texture;
    materials.default.normalMap.repeat = new THREE.Vector2(20, 20);
    materials.default.normalScale = new THREE.Vector2(0.05, 0.05);
  });

  return <primitive object={scene} {...props} />;
}
