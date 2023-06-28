import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CylinderCollider, Physics, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();
  const twister = useRef();
  const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const model = useGLTF("./books.glb"); // 모델에 충돌체를 적용할 때는 적합한 충돌체의 종류를 설정하는 것이 중요

  // useFrame((state, delta) => {
  //   const time = state.clock.getElapsedTime(); // 시간에 대한 라디안 각도

  //   // 회전
  //   const euler = new THREE.Euler(0, time, 0); // 오일러 각도 (회전)
  //   const quaternion = new THREE.Quaternion(); // 오일러 값을 사원수 (또는 해밀턴수, 복소수를 확장해 만든 수 체계) 로 변환
  //   quaternion.setFromEuler(euler);
  //   twister.current.setNextKinematicRotation(quaternion);
  //   // 이동
  //   const x = Math.cos(time) * 2; // -2 ~ 2
  //   twister.current.setNextKinematicTranslation({ x, y: 0.8, z: 0 });
  // });

  const cubeJump = () => {
    console.log(cube.current, "===> Rigid body ref");
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 }, true); // y축 방향으로 5만큼 이동하는 힘을 준다 / 2번재 인자를 이용해 sleep mode 에서 깨움
    // cube.current.applyTorqueImpulse({ x: 0, y: -1, z: 0 }); // y축 방향으로 1만큼 회전하는 힘을 준다
    // force 를 주고 몇 초간 기다리면 sleep mode 에 빠진다
    if (cube.current.isSleeping()) {
      // 방법 1
      console.log("Im sleeping");
      cube.current.wakeUp();
    }
  };

  const onCollisionEvent = (event) => {
    console.log(
      `${event.target.rigidBodyObject.name} is crashed to ${event.other.rigidBodyObject.name}`
    );

    hitSound.currentTime = 0; // 0초부터 시작하도록
    hitSound.volume = Math.random();
    hitSound.play();
  };

  return (
    <>
      <Perf />
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />

      <OrbitControls makeDefault />

      <Physics debug gravity={[0, -9.81, 0]}>
        {/* <RigidBody
          colliders="ball"
          position={[-1.5, 2, 0]}
          restitution={1}
          name="sphere"
        >
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody
          position={[1.5, 2, 0]}
          ref={cube}
          // gravityScale={0.5} // 중력의 기본값은 [0, -9.81, 0]
          // restitution={0.5} // 반발력의 기본값은 0, 부딪히는 메쉬 모두 1인 경우 멈추지 않고 튀김
          // friction={0} // 마찰력의 기본값은 0.7
          // mass={0.1} // 질량
          name="box"
          onCollisionEnter={onCollisionEvent}
          // onSleep={() => console.log('SLEEPING')}
          // onWake={() => console.log('WAKE UP')}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody
          type="kinematicPosition"
          ref={twister}
          position={[0, -0.5, 0]}
          name="stick"
        >
          <mesh scale={[0.5, 0.5, 4]}>
            <boxGeometry />
            <meshStandardMaterial color="yellow" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          type="fixed"
          restitution={1}
          friction={1}
          mass={1}
          name="floor"
        >
          <mesh
            receiveShadow
            position-y={-1.25}
            rotation-x={THREE.MathUtils.degToRad(-90)}
            scale={10}
          >
            <planeGeometry />
            <meshStandardMaterial color="#5D6D7E" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={"trimesh"} position={[0, 5, 0]}>
          {/* <CylinderCollider args={[0.5, 1.25]} /> */}
          <primitive object={model.scene} scale={5} position-y={-0.5}>
            <axesHelper />
          </primitive>
        </RigidBody>
      </Physics>
    </>
  );
}
