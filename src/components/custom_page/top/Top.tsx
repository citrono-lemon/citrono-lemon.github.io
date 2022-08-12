import React, { useEffect, useRef } from 'react'

import Image from 'next/image'

import AboutMe from './AboutMe'
import GameScreen from './GameScreen'
import { SpineObj } from '@/components/templates'


const Top: React.FC = () => {
  const bodyRef = useRef(null);

  return (
    <div ref={bodyRef} style={{ backgroundImage: "url(public/lemon.png)" }}>


      <div className="flex items-center justify-center h-screen  bg-white bg-opacity-75">
        <AboutMe />
      </div>
      <SpineObj width={150} height={150} className="fixed right-0 bottom-10 md:bottom-1/3 md:right-1/4 animate-fadeIn" />
      <div className="fixed right-1/2 top-10 md:top-1/3 text-4xl">
        CITRONO
      </div>

      <footer className="fixed bottom-0 w-full">
        <p className="p-2 text-center text-lg"> © 2021- レモン/CITRONO.</p>
      </footer>
    </div >
  )
}

export default Top