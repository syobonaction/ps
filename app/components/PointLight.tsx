'use client'

import { MeshProps } from "@react-three/fiber"

const PointLight: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props} >
      <pointLight castShadow />
      <meshPhongMaterial emissive={"yellow"}  />
    </mesh>
  )
}

export default PointLight