import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience";
import "./App.css";
import Suzi from "./Suzi";
import {
  AccumulativeShadows,
  Caustics,
  Center,
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import Diamond from "./Diamond";
// import { EffectComposer } from "postprocessing";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Example from "./Example";

function App() {
  const onCreated = (state) => {
    // const gl = state.gl;
    // gl.setClearColor('#0000ff', 1)

    const scene = state.scene;
    scene.background = new THREE.Color("#ff0000");
  };

  return (
    <Canvas
      shadows
      // camera={{
      //   // 실습 1
      //   fov: 45,
      //   near: 0.1,
      //   far: 200,
      //   position: [-2.5, 2, 8],
      // }}
      // camera={{ position: [8, 1.5, 8], fov: 25 }} // 실습 3
      camera={
        {
          position: [0, 0.2, 4.6],
          fov: 30
        }
      }
    >
      {/* <Experience /> */}

      {/* 실습 1 */}
      {/* <color args={["#f0f0f0"]} attach="background" />
      <Environment files="./aerodynamics_workshop_1k.hdr" />
      <OrbitControls makeDefault />
      <AccumulativeShadows
        temporal
        frames={100}
        color="orange"
        colorBlend={2}
        alphaTest={0.8}
        toneMapped
        opacity={1}
        scale={12}
        position={[0, -0.5, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={10}
          ambient={0.5}
          intensity={1}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>
      <Diamond rotation={[0, 0, 0.75]} position={[2, -0.18 + 0.5, 0]} />
      <Caustics // 물체가 투명할 때, 투영되는 값 
        color="3f85a1"
        position={[0, -0.5, 0]}
        lightSource={[5, 5, -10]}
        worldRadius={0.01}
        intensity={0.005}
      >
        <mesh castShadow receiveShadow position={[-2, 1 + 0.5, -1]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            rotation={1024}
            distortion={0.25}
            color="#3f85a1"
            thickness={1}
            anisotropy={1}
          />
        </mesh>
      </Caustics>
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={2} mipmapBlur levels={8} />
      </EffectComposer> */}
      {/* 실습 3 */}
      {/* <color args={["goldenrod"]} attach="background" />
      <Environment preset="city" />
      <OrbitControls />
      <AccumulativeShadows
        temporal
        frames={100}
        color="orange"
        colorBlend={2}
        alphaTest={0.9}
        toneMapped
        opacity={2}
        scale={12}
      >
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.5}
          intensity={1}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>

      <Center top>
        <Suzi rotation={[-0.63, 0, 0]} scale={2} />
      </Center>
      <Center top position={[-2, 0, 1]}>
        <mesh castShadow>
          <sphereGeometry args={[0.25, 64, 64]} />
          <meshStandardMaterial color="lightblue" />
        </mesh>
      </Center>

      <Center top position={[2.5, 0, 1]}>
        <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="indianred" />
        </mesh>
      </Center> */}

      {/* 실습 7 */}
      <ambientLight intensity={1} />
      <Center position={[0, -2, 0]}>
        <Example />
      </Center>
    </Canvas>
  );
}

export default App;
