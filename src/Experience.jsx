import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls enableDamping={false} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh position={[0, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>
        {/* <RigidBody colliders="trimesh"> */}
        <RigidBody
          colliders={false} // 사용자 지정 충돌체 사용
          position={[1, 1, -0.25]}
          rotation={[Math.PI / 3, 0, 0]}
          scale={[2, 1, 1]}
        >
          {/* <mesh position={[2, 2, 0]} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="#F9E79F" />
          </mesh> */}
          {/* 여러 개의 메쉬도 하나의 강체로 인식 가능 */}
          {/* <mesh position={[2, 2, -1.4]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="#f9e70f" />
          </mesh>
          <mesh position={[2,2,0.4]}>
            <boxGeometry args={[1, 0.5, 2]} />
            <meshStandardMaterial color="#f9e70f" />
          </mesh> */}
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[1, 0.1, 3]}
            position={[0, 0, -2]}
            // rotation={[Math.PI / 3,0, 0]}
            // scale={[10, 1, 1]}
          />
          <mesh>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <mesh
            position-y={-1}
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={10}
          >
            <circleGeometry />
            <meshStandardMaterial color="#5D6D7E" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
