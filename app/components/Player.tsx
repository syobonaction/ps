import * as THREE from "three"
import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import { useRef } from "react"

interface PlayerProps {
  position: [x: number, y:number, z:number]
}

const Player: React.FC<PlayerProps> = ({position}) => {
  const ref = useRef<any>()
  const [sub, get] = useKeyboardControls()

  const SPEED = 5
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()

  useFrame((state) => {
    const {forward, backward, left, right } = get()
    
    if(ref.current) {
      const velocity = ref.current.linvel()
      frontVector.set(0, 0, Number(backward) - Number(forward))
      sideVector.set(Number(left) - Number(right), 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    }
  })

  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={position} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
        <mesh>
          <boxGeometry />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Player