import * as THREE from "three";
import { OrbitControls, SoftShadows, Environment } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";

import Character from "./Character";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const SHADOW_CAMERA_SIZE = 20;

export default function Experience() {
  const orbitControlsRef = useRef();
  const lightRef = useRef(); // 광원
  const shadowCameraRef = useRef(); // 절두체 (그림자가 표현되는 범위)
  const rigidRef = useRef();

  const scene = useThree((state) => state.scene);

  // 그림자를 생성하는 카메라도 캐릭터를 계속 따라다니도록* 복습 필요
  useFrame(() => {
    if (rigidRef.current) {
      const trans = rigidRef.current.translation();
      const currentX = trans.x;
      const currentY = trans.y;
      const currentZ = trans.z;

      const characterPos = new THREE.Vector3(currentX, currentY, currentZ); // 캐릭터 위치
      const lightReverseDirection = new THREE.Vector3(0, 1, 1).normalize(); // 캐릭터를 기준으로 빛이 내려오는 반대 방향벡터 구하기
      const currentPos = lightReverseDirection
        .multiplyScalar(8) // 캐릭터와 광원 사이의 거리만큼
        .add(characterPos); // 캐릭터 포지션 더해주기

      if (lightRef) {
        lightRef.current.target.position.copy(characterPos); // 광원의 target = 캐릭터
        lightRef.current.position.copy(currentPos); 
      }
    }
  });

  useEffect(() => {
    shadowCameraRef.current = new THREE.CameraHelper(
      lightRef.current.shadow.camera
    );
    scene.add(shadowCameraRef.current);
    scene.add(lightRef.current.target);

    return () => {
      scene.remove(shadowCameraRef.current);
      scene.remove(lightRef.current?.target);
    };
  }, [lightRef.current]);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault enablePan={false} ref={orbitControlsRef} />

      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight
        position={[0, 1, 1]}
        intensity={1}
        castShadow
        ref={lightRef}
        shadow-normalBias={0.1} // 그림자 확대 시 노이즈 보정
        // 임시방안 -> 절두체 크기를 키운다
        // shadow-mapSize={[1024 * 4, 1024 * 4]}
        // shadow-camera-near={1}
        // shadow-camera-far={25}
        // shadow-camera-top={SHADOW_CAMERA_SIZE}
        // shadow-camera-bottom={-SHADOW_CAMERA_SIZE}
        // shadow-camera-right={SHADOW_CAMERA_SIZE}
        // shadow-camera-left={-SHADOW_CAMERA_SIZE}
      />

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
        <Character orbitControls={orbitControlsRef} ref={rigidRef} />
      </Physics>
    </>
  );
}
