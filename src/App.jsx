import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import Experience from "./Experience";
import "./App.css";

function App() {
  const onCreated = (state) => {
    // const gl = state.gl;
    // gl.setClearColor('#0000ff', 1)

    const scene = state.scene;
    scene.background = new THREE.Color('#ff0000')
  }

  return (
    <Canvas
      shadows
    >
      <Experience />
    </Canvas>
  );
}

export default App;
