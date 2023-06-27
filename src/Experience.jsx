import {
  Cloud,
  Environment,
  OrbitControls,
  Sky,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  // const { sunPosition } = useControls({
  //   sunPosition: { value: [1, 2, 3] }, // 태양의 위치는 광원의 위치와 맞추는 것이 좋음
  // });
  const { intensity } = useControls({
    intensity: { value: 1, min: 0, max: 12 }, // 태양의 위치는 광원의 위치와 맞추는 것이 좋음
  });

  return (
    <>
      {/* <fog attach="fog" color="gray" near={1} far={10} /> */}
      {/* <Sky sunPosition={sunPosition} />
      <Cloud color="white" position={[-4, 5, -25]} speed={1} />
      <Cloud color="white" position={[-4, 5, 0]} speed={1} />
      <Cloud color="white" position={[-4, 5, 25]} speed={1} /> */}
      <Environment
        background
        // files={[
        //   "./posx.jpg",
        //   "./negx.jpg",
        //   "./posy.jpg",
        //   "./negy.jpg",
        //   "./posz.jpg",
        //   "./negz.jpg",
        // ]} // old school
        // preset="sunset" // drei 가 제공하는 저해상도 hrdi
        files="./hdri/lake_pier_4k.hdr" // new
      />
      <Perf position="top-left" />
      <OrbitControls enableDamping={false} />
      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} /> */}

      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3, color: "#ff0000" }}
        environment="sunset"
        preset="soft"
        intensity={1.6}
      >
        <group>
          <mesh ref={sphereRef} position-x={-2}>
            <sphereGeometry />
            <meshStandardMaterial color="#82E0AA" envMapIntensity={intensity} />
          </mesh>
          <mesh ref={cubeRef} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial
              color="#F9E79F"
              envMapIntensity={intensity} // 환경으로 인한 조명 세기
            />
          </mesh>
          {/* <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshStandardMaterial color="#5D6D7E" envMapIntensity={intensity} />
        </mesh> */}
        </group>
      </Stage>
    </>
  );
}
