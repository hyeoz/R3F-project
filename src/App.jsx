import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { KeyboardControls } from "@react-three/drei";

import "./App.css";

function App() {
  return (
    <KeyboardControls
      map={[
        {
          name: "forward",
          keys: ["ArrowUp", "KeyW"],
        },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "walk", keys: ["Shift"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas shadows>
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
