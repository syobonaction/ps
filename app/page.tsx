'use client'

import { Canvas, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Floor from "./components/Floor"
import Box from "./components/Box"
import PointLight from "./components/PointLight"
import OrbitControls from "./components/OrbitControls"

const Home = () => {
  const box = useLoader(GLTFLoader, './blender/crate.gltf')

  return (
   <div className="w-screen h-screen">
    <Canvas 
      shadows
      className="bg-black"
      camera={{
        position: [-6, 7, 7],
      }}
    >
      <ambientLight color={"white"} intensity={0.3} />
      <PointLight position={[0, 3, 0]} />
      <primitive object={box.scene} position={[0, 0, 0]}/>
      <Box position={[3, 2, 0]} />
      <OrbitControls />
      <Floor />
    </Canvas>
    <input />
   </div>
  )
}

export default Home