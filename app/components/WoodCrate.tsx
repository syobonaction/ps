'use client'

import { useMemo } from "react"
import { MeshProps, useLoader } from "@react-three/fiber"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useTexture } from "@react-three/drei"
import vertexJitter from "../shaders/vertexJitter"
import { Mesh } from "three"
import fragmentAffine from "../shaders/fragmentAffine"

const WoodCrate: React.FC<MeshProps> = (props) => {
  const crateModel = useLoader(OBJLoader, './blender/crate.obj')
  const crateTexture = useTexture('./blender/crate1_diffuse.png')
  
  const geometry = useMemo(() => {
    let g

    crateModel.traverse((c) => {
        if(c.type === "Mesh") {
            const _c = c as Mesh
            g = _c.geometry
        }
    })
    return g
  }, [crateModel])

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
        uniforms={{uTexture: {value: crateTexture}, uJitterLevel: {value: 175}}}
      />
    </mesh>
  )
}

export default WoodCrate