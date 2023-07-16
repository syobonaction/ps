'use client'

import * as THREE from 'three'
import { MeshProps } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import vertexJitter from "../shaders/vertexJitter"
import fragmentAffine from "../shaders/fragmentAffine"

const Wall: React.FC<MeshProps> = (props) => {
  const geometry = new THREE.BoxGeometry(20, 5, 1, 20, 5, 1);
  const texture = useTexture('./blender/brick1.png')
  texture.repeat.set(10, 10)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <mesh {...props} scale={1} geometry={geometry}>
      <shaderMaterial 
        attach='material'
        vertexShader={vertexJitter}
        fragmentShader={fragmentAffine}
        uniforms={{uTexture: {value: texture}, uJitterLevel: {value: 175}, repeat: {value: [10, 5]}}}
      />
    </mesh>
  )
}

export default Wall