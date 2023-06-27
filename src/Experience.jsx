import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  // const controls = useControls({position: -2}) // 기본값 추가 가능
  // console.log(controls) // 객체로 출력됨
  const { position, color, visible, interval } = useControls('folder1', {
    // 구조분해할당 가능
    position: {
      // value: -2,
      // min: -4,
      // max: 4,
      // step: 0.01,
      value: { x: -2, y: 0 }, // vector 사용 가능
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
    interval: {
      min: -3,
      max: 3,
      value: [-2, 2]
    },
  });
  const {select} = useControls('folder2', { // 첫번째 인자는 선택사항, 폴더명으로 묶을 수 있음
    
    clickMe: button(() => {
      alert('hello world')
    }),
    select: {
      options: ['CASE1', 'CASE2', 'CASE3']
    }
  })

  console.log(select)

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <group>
        {/* <mesh ref={sphereRef} position-x={position}> */}
        <mesh
          ref={sphereRef}
          position={[position.x, position.y, 0]}
          visible={visible}
        >
          {" "}
          {/* vector 사용 시 수정 */}
          <sphereGeometry />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh ref={cubeRef} position-x={interval[1]} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="#F9E79F" />
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
    </>
  );
}
