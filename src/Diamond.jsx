import { Caustics, CubeCamera, MeshRefractionMaterial, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react"
import {RGBELoader} from 'three-stdlib'
import {useControls} from 'leva'

export default function Diamond(props) {
    const ref = useRef();
    const {nodes} = useGLTF('./gem3.glb');
    const texture = useLoader(RGBELoader, './aerodynamics_workshop_1k.hdr');
    const config = useControls({
        bounces: {
            value: 3, min: 0, max: 8, step: 1
        },
        aberrationStength: {
            value: 0.03, min: 0, max: 0.1, step: 0.01
        },
        ior: {
            value: 2.75, min: 0, max: 10,
        },
        fresnel: {
            value: 1, min: 0, max: 1,
        },
        color: 'white',
        fastChroma: true
    })

    return (
        // <CubeCamera resolution={256} frames={1} envMap={texture}>
        //     {(texture) => {
                <Caustics 
                ior={1.8}
                backside
                backsideIOR={1.1}
                    color={config.color}
                    position={[0, -0.5, 0]}
                    lightSource={[5,5,-10]}
                    worldRadius={0.1}
                    intensity={0.1}
                >
                    <mesh castShadow ref={ref} geometry={nodes.dobj.geometry} {...props}>
                        <MeshRefractionMaterial envMap={texture} {...config} toneMapped={false} />
                    </mesh>
                </Caustics>
        //     }}
        // </CubeCamera>
    )
}