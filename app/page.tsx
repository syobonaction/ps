'use client'

import { Canvas } from "@react-three/fiber"
import Floor from "./components/Floor"
import Wall from "./components/Wall"
import PointLight from "./components/PointLight"
import OrbitControls from "./components/OrbitControls"
import WoodCrate from "./components/WoodCrate"

const Home = () => {
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
      <WoodCrate position={[5, 0, 0]} rotation={[0, 15.7, 0]}/>
      <WoodCrate position={[5, 0, 2]} rotation={[0, 15.7, 0]}/>
      <WoodCrate position={[5, 2, 0]} rotation={[0, 15.7, 0]}/>
      <Wall position={[10, 2, 0]} rotation={[0, 4.7, 0]}/>
      <OrbitControls />
      <Floor rotation={[Math.PI * -0.5, 0, 0]}/>
    </Canvas>
    <input />
   </div>
  )
}

export default Home