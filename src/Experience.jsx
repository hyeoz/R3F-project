import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  const gltf = useGLTF("./books_with_magnifier.glb");

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls enableDamping={false} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      {/* 현재 예제에서는 그룹 사용하지 않아도 됨 */}
      {/* <group> */}
      {/* <mesh
        ref={sphereRef}
        position-x={-2}
        onClick={(event) => {
          event.stopPropagation();
          console.log(event.face, "FACE"); // 이벤트가 발생한 위치벡터
          console.log(event.normal, "NORMAL"); // 이벤트가 발생한 방향벡터
        }}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer"; // 가장 상위 돔 선택하여 바꿈
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="#82E0AA" />
      </mesh>
      <mesh
        ref={cubeRef}
        position-x={2}
        scale={1.5}
        onClick={(event) => {
          event.stopPropagation();
          console.log(event, "===> CUBE");
          cubeRef.current.material.color.set("#00ff00");
        }}
      >
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
      </mesh> */}
      {/* </group> */}

      <primitive
        object={gltf.scene}
        scale={10}
        position-y={-1}
        onClick={(event) => {
          console.log(event, "GLTF"); // 각 노드가 모여 만들어진 메쉬라, 겹쳐진 부분을 클릭하면 event 가 1~메쉬 개수 만큼 이벤트가 발생함
          event.stopPropagation();
        }}
      />
      <mesh
        position-y={-1}
        rotation-x={THREE.MathUtils.degToRad(-90)}
        scale={10}
      >
        <circleGeometry />
        <meshStandardMaterial color="#5D6D7E" />
      </mesh>
    </>
  );
}
