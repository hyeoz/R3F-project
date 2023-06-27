import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import TreeBoy from "./TreeBoy";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />
      <OrbitControls makeDefault />

      <group>
        <TreeBoy position-y={-0.9} />
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
