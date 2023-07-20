'use client'

import * as THREE from "three"
import { extend, Canvas, ReactThreeFiber } from "@react-three/fiber"
import { KeyboardControls, CameraControls, Text } from "@react-three/drei"
import { Physics, CuboidCollider } from "@react-three/rapier"
import Floor from "./components/Floor"
import Wall from "./components/Wall"
import WoodCrate from "./components/WoodCrate"
import { useMemo, Suspense } from "react"
import Player from "./components/Player"
import { Effects } from '@react-three/drei'
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { CrtShader } from "./components/shaders/CrtShader"

extend({ ShaderPass, UnrealBloomPass })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'unrealBloomPass': ReactThreeFiber.Node<UnrealBloomPass, typeof UnrealBloomPass>
    }
  }
}


const Home = () => {
  const cameraSettings = {
    fov: 60,
    aspect: 1920 / 1080,
    near: 1.0,
    far: 1000.0,
  }

  const camera = new THREE.PerspectiveCamera(cameraSettings.fov, cameraSettings.aspect, cameraSettings.near, cameraSettings.far)
  const aspect = useMemo(() => new THREE.Vector2(1280, 1280), [])

  camera.position.set(0, 20, 25);

  return (
   <div className="w-screen h-screen">
    {/* <h1 className="
      absolute 
      z-10 
      w-screen 
      font-filgaia 
      animate-bounce 
      text-6xl 
      text-amber-300 
      text-center 
      mt-24 
      pt-36
      drop-shadow-[0_1.2px_1.2px_rgba(255,255,0,0.8)]
      hover:cursor-pointer"
    >
      PRESS START
    </h1> */}
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
        camera={camera}
        gl={{ antialias: false }}
        dpr={2}
        style={{ imageRendering: 'pixelated' }}
      >
        <Suspense>
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <CameraControls camera={camera} />
          <Physics debug>
            <WoodCrate position={[5, 0, 0]} rotation={[0, 15.7, 0]}/>
            <WoodCrate position={[5, 0, 2]} rotation={[0, 15.7, 0]}/>
            <WoodCrate position={[5, 2, 0]} rotation={[0, 15.7, 0]}/>
            <Wall position={[10, 0, 0]} rotation={[0, 0, 0]}/>
            <Wall position={[0, 0, -10]} rotation={[0, 4.7, 0]}/>
            <Player position={[0, 0, 5]} />
            <Floor />
            <CuboidCollider position={[0, -0.5, 0]} args={[20, 0.5, 20]} />
          </Physics>
          <fog attach="fog" color="#ffffff" near={50} far={300} />
          <Effects>
            <shaderPass attach="passes" args={[CrtShader]} />
            {/* <unrealBloomPass attach="passes" args={[aspect, 0.1, 0, 0]} /> */}
          </Effects>
        </Suspense>
      </Canvas>
    </KeyboardControls>
   </div>
  )
}

export default Home