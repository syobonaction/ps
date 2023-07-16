'use client'

import { MeshProps } from "@react-three/fiber"

const Box: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props} castShadow>
      <boxGeometry />
      <meshPhysicalMaterial  color={"white"} />
    </mesh>
  )
}

export default Box