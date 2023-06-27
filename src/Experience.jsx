import {
  AccumulativeShadows,
  ContactShadows,
  OrbitControls,
  RandomizedLight,
  SoftShadows,
  Stats,
  useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const lightRef = useRef();
  const shadowCameraRef = useRef();

  // const scene = useThree((state) => state.scene);

  // useEffect(() => {
  //   // shadow camera helper 는 아직 없음
  //   shadowCameraRef.current = new THREE.CameraHelper(
  //     lightRef.current.shadow.camera
  //   );
  //   scene.add(shadowCameraRef.current);

  //   return () => {
  //     scene.remove(shadowCameraRef.current);
  //   };
  // }, [lightRef.current]); // 광원이 변경되는 순간 실행

  // useFrame(() => {
  //   shadowCameraRef.current.update();
  // });

  // 광원을 메쉬처럼 출력
  // 광원 ref, type,  크기
  useHelper(lightRef, THREE.DirectionalLightHelper, 0.5);
  
  // soft shadow
  // const { enabled, ...config } = useControls({
    //   enabled: true,
    //   size: { value: 25, min: 0, max: 100 },
    //   focus: { value: 0, min: 0, max: 2 },
    //   samples: { value: 10, min: 1, max: 20, step: 1 },
    // });
    
      useFrame((state, delta) => {
        cubeRef.current.rotation.x += delta;
    
        const time = state.clock.elapsedTime;
        cubeRef.current.position.x = 2 + Math.sin(time);
      });

      const {...args} = useControls('contact shadows', {
        color: '#1d8f75',
        opacity: {value: 0.4, min: 0, max: 1},
        blur: {value: 2.8, min: 0, max: 10}
      })

  return (
    <>
      <Stats />
      <OrbitControls enableDamping={false} />
      <ambientLight intensity={0.5} />
      {/* 그림자를 만들 광원에 설정 */}
      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
        ref={lightRef}
        // castShadow
        // type 공식문서에서 확인
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={3}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-right={10}
        shadow-camera-left={-10}
      />
      <group>
        {/* 그림자를 만들 메쉬에 설정 */}
        <mesh ref={sphereRef} position={[-2, 0, 0]} castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
        </mesh>
        <mesh ref={cubeRef} position-x={2} scale={1.5} castShadow receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#F9E79F" />
        </mesh>
        {/* <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
          receiveShadow // 그림자를 보여줄 평면에 설정
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh> */}
      </group>

      {/* {enabled && <SoftShadows {...config} />} */}
      {/* 정적 그림자, randomized light 를 사직으로 가짐 */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={20}
        color="#316d39"
        opacity={0.7}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* 그림자를 표시할 별도의 평면이 추가되며 정적 / 동적 모두 가능 */}
      <ContactShadows position={[0, -0.99, 0]} scale={10} resolution={512} far={5} frames={Infinity} {...args} />
    </>
  );
}
