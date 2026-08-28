import Navbar from "./Navbar"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { RxMove } from "react-icons/rx";

function Model() {
  const { scene } = useGLTF("/3D/scene.gltf");

  return <primitive object={scene} scale={500} position={[0, -1.5, 0]}/>;
}

function Hero() {
  return (
    <div id="home" className="hero">
      <Navbar />
      <Canvas shadows camera={{position: [0, 3, 5]}}>
        <ambientLight intensity={2} />
        <directionalLight position={[50, 50, 50]} />
        <Model />

        <OrbitControls />
      </Canvas>

      <div className="move-hint">
        <RxMove size={30} />
        <span>rotate</span>
      </div>

    </div>
  )
}

export default Hero