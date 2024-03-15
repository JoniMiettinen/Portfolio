/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Aliaksandr.melas (https://sketchfab.com/alexandr.melas)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/billions-stars-skybox-hdri-panorama-7e3e8f94810b44dd837bacad6c65b5e8
Title: Billions stars Skybox HDRI panorama
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import starScene from '../assets/3d/billions_stars_skybox_hdri_panorama.glb'
import { useFrame } from '@react-three/fiber'

const StarSky = ({ isRotating }) => {
  const star = useGLTF(starScene);
  const starRef = useRef();

  useFrame((_, delta) => {
    if (isRotating){
        starRef.current.rotation.y += 0.15 * delta
    }
    })
  return (
    <mesh ref={starRef} scale={800}>
    <primitive object={star.scene}/>
    </mesh>
  );
}

export default StarSky;

// <group {...props} dispose={null}>
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.Object_4.geometry}
    //     material={materials.material}
    //     rotation={[Math.PI / 2, 0, 0]}
    //   />
    // </group>
