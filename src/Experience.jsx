import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Html,
  OrbitControls,
  Text,
  TransformControls,
} from "@react-three/drei";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  useFrame((state, delta) => {
    // 매 프레임마다 인자로 받은 함수가 실행됨
    // state : three 관련 객체 (scene, camera, renderer...)
    // delta : 프레임 사이 경과 시간
    // cubeRef.current.rotation.x += 0.01;
    // cubeRef.current.rotation.y += 0.01;
    // cubeRef.current.rotation.z += 0.01;
  });

  useFrame((state) => {
    // const angle = state.clock.elapsedTime; // 경과된 시간을 각도로 표현
    // state.camera.position.x = Math.sin(angle) * 8; // -8 ~ 8
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0); // 원점에 고정
  });

  return (
    <>
      <OrbitControls makeDefault /> {/* 카메라 자체 회전 */}
      {/* scene 의 축 */}
      <axesHelper scale={10} />
      {/* 형광등 */}
      <ambientLight intensity={0.5} />
      {/* 태양광 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      {/* <Html
        position={[0, 4, 0]}
        wrapperClass="label"
        center
        distanceFactor={10}
        // occlude={[cubeRef, sphereRef]} // 가려질 때 사라질 메쉬 지정
      >
        안녕하세요
      </Html> */}
      {/* 풍선처럼 움직이는 효과 */}
      <Float speed={7} floatIntensity={7}>
        <Text
          font="..\public\NotoSansKR-Medium.otf"
          fontSize={1.5}
          color="salmon"
          position={[0, 1.8, 0]}
          maxWidth={4}
          textAlign="center"
        >
          R3F
        </Text>
      </Float>
      <group>
        <TransformControls object={sphereRef} /> {/* 메쉬 자체 이동 */}
        <mesh position-x={-2} ref={sphereRef}>
          {/* 3D 요소 위에 뜨게됨 */}
          {/* <Html wrapperClass="label2" center>
            구체입니다
          </Html> */}
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
          {/* material 에 상관없이 평면 geometry 는 광원에 상관 없음 */}
          <circleGeometry />
          <meshBasicMaterial color="#5D6D7E" />
        </mesh>
      </group>
    </>
  );
}
