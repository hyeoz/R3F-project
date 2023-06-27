import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

function App() {
  return (
    <Canvas>
      {/* <mesh>
        <meshNormalMaterial attach="material" />
        <boxGeometry args={[2, 2, 2]} attach="geometry" />
      </mesh> */}
      <Experience />
    </Canvas>
  );
}

export default App;
