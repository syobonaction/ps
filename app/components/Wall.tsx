'use client'

import { Mesh } from "three"
import { MeshProps, useLoader } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import vertexJitter from "../shaders/vertexJitter"
import fragmentAffine from "../shaders/fragmentAffine"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useMemo } from 'react'

const Wall: React.FC<MeshProps> = (props) => {
  const model = useLoader(OBJLoader, './blender/wall.obj')
  const texture = useTexture('./blender/brick1.png')

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
      scale={1} 
      geometry={geometry}
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

export default Wall