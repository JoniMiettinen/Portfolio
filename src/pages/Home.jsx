import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Bird from '../models/Bird';
import HomeInfo from '../components/HomeInfo';
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons';
import AnimeSky from '../models/AnimeSky';
import PineIsland from '../models/PineIsland';
import { OrbitControls, useCamera } from '@react-three/drei';

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)

  useEffect(() => {
    if(isPlayingMusic){
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])
  
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let ScreenPosition = [0, -17.5, -53];
    let rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      screenScale = [50, 50, 50];
    } else {
      screenScale = [75, 75, 75];
    }

    return [screenScale, ScreenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, ScreenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      ScreenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      ScreenPosition = [0, -4, -4];
    }

    return [screenScale, ScreenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <OrbitControls /> {/* This fixes the sticky touch move on mobile */}
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={3} />
          <Bird />
          <AnimeSky isRotating={isRotating}/>
          <PineIsland
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
      <div className='absolute bottom-2 left-2'>
        <img 
          src={!isPlayingMusic ? soundoff : soundon}
          alt='sound'
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  )
}

export default Home