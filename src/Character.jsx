import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const CHARACTER_HEIGHT = 1.79;
const CAPSULE_RADIUS = 0.3;

export default function Character() {
  const model = useGLTF("./Robot.glb");

  // const animations = useAnimations(model.animations, model.scene);
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

  useEffect(() => {
    // traverse -> scene 의 반복문 (순회)
    model.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <RigidBody colliders={false} position={[0.1, 10, 0]}>
      <CapsuleCollider
        args={[CHARACTER_HEIGHT / 2 - CAPSULE_RADIUS, CAPSULE_RADIUS]}
      />
      <primitive object={model.scene} position-y={-CHARACTER_HEIGHT / 2} castShadow>
        <axesHelper />
      </primitive>
    </RigidBody>
  );
}
