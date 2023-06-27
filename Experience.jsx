import * as THREE from "three";

export default function Experience() {
  return (
    <>
      <group>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="#82E0AA" />
        </mesh>

        <mesh position-x={2} scale={1.5}>
          <boxGeometry />
          <meshBasicMaterial color="#F9E79F" />
        </mesh>

        <mesh
          position-y={-1}
          rotation-x={THREE.MathUtils.degToRad(-90)}
          scale={10}
        >
          <circleGeometry />
          <meshBasicMaterial color="#5D6D7E" />
        </mesh>
      </group>
    </>
  );
}
