import { OrbitControls, SoftShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import Character from "./Character";
import { Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault enablePan={false} />

      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight position={[0, 1, 2]} intensity={1} castShadow />

      <Environment preset="city" intensity={1} />
      <SoftShadows size={8} focus={0} samples={8} />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh position={[4, 10, 0]} castShadow receiveShadow>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>
        <RigidBody colliders="trimesh">
          <mesh
            position={[1, 1, -5.25]}
            rotation={[Math.PI * 0.3, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[5, 1, 0.25]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <mesh
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={100}
            receiveShadow
          >
            <planeGeometry />
            <meshStandardMaterial color="#5d6d72" />
          </mesh>
        </RigidBody>
        <Character />
      </Physics>
    </>
  );
}
