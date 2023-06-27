import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls: OrbitControls }); // 강제로 컴포넌트화 시킴

export default function Experience() {
  const three = useThree();
  const cubeRef = useRef();

  useFrame((state, delta) => {
    // 매 프레임마다 인자로 받은 함수가 실행됨
    // state : three 관련 객체 (scene, camera, renderer...)
    // delta : 프레임 사이 경과 시간
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.z += 0.01;
  });

  useFrame((state) => {
    const angle = state.clock.elapsedTime; // 경과된 시간을 각도로 표현
    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;
    state.camera.lookAt(0, 0, 0); // 원점에 고정
  });

  return (
    <>
      {/* 형광등 */}
      <ambientLight intensity={0.5} />
      {/* 태양광 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      {/* R3F 컴포넌트는 소문자로 시작 (three.js class 와 충돌 가능성) */}
      <orbitControls args={[three.camera, three.gl.domElement]} />
      <group>
        <mesh position-x={-2}>
          <sphereGeometry />
          {/* light 의 영향을 받지 않음 */}
          {/* <meshBasicMaterial color="#82E0AA" /> */}
          <meshStandardMaterial color="#82E0AA" />
        </mesh>

        {/* dom 에 접근하기 위해서 useRef 사용 */}
        <mesh position-x={2} position-y={1} scale={1.5} ref={cubeRef}>
          <boxGeometry />
          {/* <meshBasicMaterial color="#F9E79F" /> */}
          <meshStandardMaterial color="#F9E79F" />
        </mesh>

        <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)} // raidan 으로 변환 필요
          scale={10}
        >
          <circleGeometry />
          <meshBasicMaterial color="#5D6D7E" />
        </mesh>
      </group>
    </>
  );
}
