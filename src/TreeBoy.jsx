import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function TreeBoy(props) {
  const treeBoy = useGLTF("./TreeBoy.glb");

  const animations = useAnimations(treeBoy.animations, treeBoy.scene);
  //   console.log(animations);

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    treeBoy.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
      }
    });

    // const action = animations.actions.Idle;
    // console.log(action)
    // action.play();

    // window.setTimeout(() => {
    //     animations.actions.Run.play();
    //     animations.actions.Idle.crossFadeFrom(); // 자연스러운 액션 전환
    // }, 2000)
  }, [treeBoy]);

  useEffect(() => {
    animations.actions[animationName].play();
    animations.actions[animationName].reset().fadeIn(0.5).play(); // 시작할 액션
    return () => {
      animations.actions[animationName].fadeOut(0.5); // 사라질 액션
    };
  }, [animationName]);

  return <primitive object={treeBoy.scene} {...props} />;
}
