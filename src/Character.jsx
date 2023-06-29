import { forwardRef, useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const CHARACTER_HEIGHT = 1.79;
const CAPSULE_RADIUS = 0.6;
const WALK_SPEED = 1;
const RUN_SPEED = 2;

const getDirectionOffset = (keys) => {
  let directionOffset = 0; // w
  if (keys.forward) {
    if (keys.leftward) {
      directionOffset = Math.PI / 4; // w+a (45)
    } else if (keys.rightward) {
      directionOffset = -Math.PI / 4; // w+d (-45)
    }
  } else if (keys.backward) {
    if (keys.leftward) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a (135)
    } else if (keys.rightward) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d (-135)
    } else {
      directionOffset = Math.PI; // s (180)
    }
  } else if (keys.leftward) {
    directionOffset = Math.PI / 2; // a (90)
  } else if (keys.rightward) {
    directionOffset = -Math.PI / 2; // d (-90)
  }
  return directionOffset;
};

function Character({ orbitControls }, ref) {
  const model = useGLTF("./Robot.glb");
  const [subKeys, getSubKeys] = useKeyboardControls();

  const playActionNameRef = useRef();
  const modelRef = useRef();
  // const rigidRef = useRef();
  const speedRef = useRef(0); // state 로 관리 안하는 이유 -> state 사용 시 리렌더링

  const rigidRef = ref;

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
    // 액션간 전환 자연스럽게
    action.enabled = true;

    if (playActionNameRef.current) {
      const prevAction = animations.actions[playActionNameRef.current];

      if (
        playActionNameRef.current === "Walk" ||
        playActionNameRef.current === "Run"
      ) {
        const ratio = action.getClip().duration / prevAction.getClip().duration;
        action.time = prevAction.time * ratio;
      } else {
        action.time = 0.0;
        action.setEffectiveTimeScale(1.0);
        action.setEffectiveWeight(1.0);
      }

      action.crossFadeFrom(prevAction, 0.5, true);
      action.play();
    } else {
      action.play();
    }

    // action?.reset().fadeIn(0.5).play();
    // prevAction?.fadeOut(0.5);

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
        speedRef.current = WALK_SPEED;
      } else {
        playAction("Run");
        speedRef.current = RUN_SPEED;
      }
    } else if (keys.jump) {
      playAction("Jump");
    } else {
      playAction("Idle");
      speedRef.current = 0; // 멈춤
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
      angleCameraDirectionAxisY + getDirectionOffset(keys)
    ); // x,y,z 세 개의 축으로 회전하게 되면 회전할 당시 축 하나가 고정되게 되는데, (짐벌락) quaternion 사용 시 모든 방향 동시에 회전하기 때문에 이 이슈를 해결할 수 있음 (하지만 180도 이상 한 번에 회전하지 못한다는 문제가 있음)

    // 두번째 인자(5도) 만큼 회전하다가 첫번째 인자만큼 회전했을 때 멈춤
    model?.quaternion.rotateTowards(
      rotateQuaternion,
      THREE.MathUtils.degToRad(5)
    );

    // 방향벡터를 이용해 캐릭터 이동
    const walkDirection = new THREE.Vector3();
    camera.getWorldDirection(walkDirection);
    walkDirection.y = 0; // 카메라가 하늘을 바라볼 때도 바닥에서만 이동할 수 있도록
    walkDirection.normalize(); // 항상 크기가 1인 단위벡터여야 하기때문에
    walkDirection.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      getDirectionOffset(keys)
    ); // a,s,d 를 눌러 카메라 방향과 다른 방향을 보게 될 때 보정

    const deltaX = walkDirection.x * speedRef.current * delta;
    const deltaZ = walkDirection.z * speedRef.current * delta;

    const currentX = rigidRef.current.translation().x + deltaX; // position 아님
    const currentY = rigidRef.current.translation().y;
    const currentZ = rigidRef.current.translation().z + deltaZ;

    rigidRef.current.setTranslation({ x: currentX, y: currentY, z: currentZ });

    // 카메라가 항상 캐릭터를 바라보도록
    camera.position.x += deltaX; // 이동하는 만큼 카메라 포지션도 이동
    camera.position.z += deltaZ;

    if (orbitControls) {
      // camera.lookAt() 보다 ref 가 상위라서 ref 사용
      orbitControls.current.target.set(currentX, currentY, currentZ);
    }
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

  useEffect(() => {
    rigidRef.current.lockRotations(true); // 회전하는 경우, 물리법칙이 작용되는 RigidBody 에는 회전이 적용될 필요가 없기때문에 rotation 을 잠굼
  }, []);

  return (
    <RigidBody colliders={false} position={[0.1, 10, 0]} ref={rigidRef}>
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

export default forwardRef(Character);
