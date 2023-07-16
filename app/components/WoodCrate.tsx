'use client'

import { useMemo } from "react"
import { MeshProps, useLoader } from "@react-three/fiber"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useTexture } from "@react-three/drei"
import { Mesh } from "three"
import vertexJitter from "../shaders/vertexJitter"
import fragmentAffine from "../shaders/fragmentAffine"

const WoodCrate: React.FC<MeshProps> = (props) => {
  const model = useLoader(OBJLoader, './blender/crate.obj')
  const texture = useTexture('./blender/crate1_diffuse.png')
  
  const geometry = useMemo(() => {
    let g

    model.traverse((c) => {
        if(c.type === "Mesh") {
            const _c = c as Mesh
            g = _c.geometry
        }
    })
    return g
  }, [model])

  return (
    <mesh 
      {...props}
      geometry={geometry}
      scale={1}
      castShadow
    >
      <shaderMaterial 
        attach='material'
        vertexShader={vertexJitter}
        fragmentShader={fragmentAffine}
        uniforms={{uTexture: {value: texture}, uJitterLevel: {value: 175}, repeat: {value: [1, 1]}}}
      />
    </mesh>
  )
}

export default WoodCrate