'use client'

import { MeshProps } from "@react-three/fiber"

const Floor: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshPhysicalMaterial color="white" />
    </mesh>
  )
}

export default Floor