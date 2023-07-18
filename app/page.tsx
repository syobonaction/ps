'use client'

import { Canvas } from "@react-three/fiber"
import { Sky, KeyboardControls, PointerLockControls } from "@react-three/drei"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import Floor from "./components/Floor"
import Wall from "./components/Wall"
import PointLight from "./components/PointLight"
import OrbitControls from "./components/OrbitControls"
import WoodCrate from "./components/WoodCrate"
import { Suspense } from "react"
import Player from "./components/Player"

const Home = () => {
  return (
   <div className="w-screen h-screen">
    <h1 className="
      absolute 
      z-10 
      w-screen 
      font-filgaia 
      animate-bounce 
      text-6xl 
      text-amber-200 
      text-center 
      mt-24 
      pt-36
      drop-shadow-[0_1.2px_1.2px_rgba(255,255,0,0.8)]
      hover:cursor-pointer"
    >
      PRESS START
    </h1>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
      ]}
    >
      <Canvas 
        shadows
        className="bg-black"
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <Suspense>
          <Sky sunPosition={[100, 20, 100]} />
          <PointLight position={[0, 3, 0]} />
          <Physics>
            <RigidBody colliders={"hull"}>
              <WoodCrate position={[5, 0, 0]} rotation={[0, 15.7, 0]}/>
            </RigidBody>
            <RigidBody colliders={"hull"}>
              <WoodCrate position={[5, 0, 2]} rotation={[0, 15.7, 0]}/>
            </RigidBody>
            <RigidBody colliders={"hull"}>
              <WoodCrate position={[5, 2, 0]} rotation={[0, 15.7, 0]}/>
            </RigidBody>
            <RigidBody colliders={"hull"}>
              <Wall position={[10, 0, 0]} rotation={[0, 4.7, 0]}/>
            </RigidBody>
            <RigidBody colliders={"hull"}>
              <Wall position={[0, 0, -10]} rotation={[0, 0, 0]}/>
            </RigidBody>
            <OrbitControls />
            {/* <Player /> */}
            <Floor />
            <CuboidCollider position={[0, -0.5, 0]} args={[20, 0.5, 20]} />
          </Physics>
          {/* <PointerLockControls /> */}
        </Suspense>
      </Canvas>
    </KeyboardControls>
   </div>
  )
}

export default Home