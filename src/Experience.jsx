import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  // const { delay, duration, strength, mode } = useControls({
  //   delay: { value: [0.5, 1] },
  //   duration: { value: [0.1, 0.3] },
  //   strength: { value: [0.2, 0.4] },
  //   mode: { options: Object.keys(GlitchMode) },
  // });
  // const { blendFunction } = useControls({
  //   blendFunction: { options: Object.keys(BlendFunction) },
  // });
  // const { offset, darkness, blendFunction } = useControls({
  //   offset: { value: 0.3, min: -10, max: 10, step: 0.01 },
  //   darkness: { value: 0.9, min: -10, max: 10, step: 0.01 },
  //   blendFunction: { options: Object.keys(BlendFunction) },
  // });
  const {focusDistance, focalLength, bokehScale} = useControls({
    focusDistance: {
      value: 0.003,
      min: 0,
      max: 1
    },
    focalLength: {
      value: 0.005,
      min: 0,
      max: 1
    },
    bokehScale: {
      value: 16,
      min: 0,
      max: 100
    }
  })

  return (
    <>
      <color args={["#000"]} attach="background" />
      <Perf position="top-left" />

      <OrbitControls enableDamping={false} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <group>
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
        </mesh>

        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial
            color="blue"
            // toneMapped={false}
            // emissive="white"
            // emissiveIntensity={2}
          />
        </mesh>

        <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </group>

      <EffectComposer multisampling={8}>
        {/* <Glitch
          delay={delay}
          duration={duration}
          strength={strength}
          mode={GlitchMode[mode]}
        />
        <Noise premultiply blendFunction={BlendFunction[blendFunction]} /> */}
        {/* <Vignette
          offset={offset}
          darkness={darkness}
          blendFunction={BlendFunction[blendFunction]}
        /> */}
        {/* <Bloom mipmapBlur intensity={1} luminanceThreshold={1} /> */}
        <DepthOfField focusDistance={focusDistance} focalLength={focalLength} bokehScale={bokehScale} />
      </EffectComposer>
    </>
  );
}
