import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import Experience from "./Experience";
import "./App.css";

function App() {
  return (
    <Canvas
      // orthographic // 원근감이 없는 카메라
      // camera={{
      //   // fov: 45, // 화각 (deg 사용)
      //   zoom: 50,
      //   near: 0.1,
      //   far: 200,
      //   position: [3, 2, 6],
      // }}
      /* renderer 설정 (특별한 상황이 아니라면 그대로 사용) */
      // dpr={[1,2]} // 해상도
      // gl={{
      //   antialias: true,
      //   toneMapping: THREE.LinearToneMapping,
      //   outputEncoding: THREE.LinearEncoding // deprecated
      // }}
    >
      <Experience />
    </Canvas>
  );
}

export default App;
