import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const CHARACTER_HEIGHT = 1.79;
const CAPSULE_RADIUS = 0.3;

export default function Character() {
  const model = useGLTF("./Robot.glb");
  const [subKeys, getSubKeys] = useKeyboardControls();

  const playActionNameRef = useRef();
  const modelRef = useRef();

  const animations = useAnimations(model.animations, model.scene);
  // const { animationName } = useControls({
  //   animationName: {
  //     value: "Idle",
  //     options: animations.names,
  //   },
  // });

  // useEffect(() => {
  //   const action = animations.actions[animationName];
  //   action.reset().fadeIn(0.5).play();

  //   return () => {
  //     action.fadeOut(0.5);
  //   };
  // }, [animationName]);

  const playAction = useCallback((actionName) => {
    // 플레이중
    if (playActionNameRef.current === actionName) return;

    const action = animations.actions[actionName];
    const prevAction = animations.actions[playActionNameRef.current];

    action?.reset().fadeIn(0.5).play();
    prevAction?.fadeOut(0.5);

    playActionNameRef.current = actionName;
  }, []);

  useFrame((state, delta) => {
    const keys = getSubKeys();
    // console.log(keys)

    if (keys.forward || keys.leftward || keys.rightward || keys.backward) {
      // 방향 키보드 액션이 있으면서
      if (keys.walk) {
        // 걷기 기보드 액션이 동시에 눌리면
        playAction("Walk");
      } else {
        playAction("Run");
      }
    } else {
      playAction("Idle");
    }

    // 캐릭터를 카메라 방향으로 회전
    const camera = state.camera;
    const model = modelRef.current;

    const modelPosition = new THREE.Vector3();
    model?.getWorldPosition(modelPosition);
    const angleCameraDirectionAxisY =
      Math.atan2(
        camera.position.x - modelPosition.x,
        camera.position.z - modelPosition.z
      ) + Math.PI; // 카메라를 바라보는게 아닌 카메라 반대를 바라보게

    const rotateQuaternion = new THREE.Quaternion();
    rotateQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angleCameraDirectionAxisY
    );

    // 두번째 인자(5도) 만큼 회전하다가 첫번째 인자만큼 회전했을 때 멈춤
    model?.quaternion.rotateTowards(
      rotateQuaternion,
      THREE.MathUtils.degToRad(5)
    );
  });

  useEffect(() => {
    // traverse -> scene 의 반복문 (순회)
    model.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <RigidBody colliders={false} position={[0.1, 10, 0]}>
      <CapsuleCollider
        args={[CHARACTER_HEIGHT / 2 - CAPSULE_RADIUS, CAPSULE_RADIUS]}
      />
      <primitive
        object={model.scene}
        position-y={-CHARACTER_HEIGHT / 2}
        castShadow
        ref={modelRef}
      >
        <axesHelper />
      </primitive>
    </RigidBody>
  );
}
