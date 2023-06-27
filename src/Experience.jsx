import * as THREE from "three";
import { Gltf, OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Model from "./Model";

export default function Experience() {
  // const model = useLoader(GLTFLoader, "./books_with_magnifier.glb");
  // console.log(model);

  const model = useGLTF("./books_with_magnifier.glb")

  return (
    <>
      <Perf position="top-left" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow shadow-normalBias={0.03} />
      <OrbitControls makeDefault />
      <group>
        {/* <primitive object={model.scene} scale={10} position-y={-0.7} /> */}
        {/* drei 방식을 사용하면 draco 압축 제공 */}
        {/* <Gltf src="./books_with_magnifier.glb" scale={10} /> */}

        <Model scale={10} />

        <mesh
          receiveShadow
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </group>
    </>
  );
}
