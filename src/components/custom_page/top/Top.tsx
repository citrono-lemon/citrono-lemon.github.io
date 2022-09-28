import React, { useEffect, useRef } from 'react'

import Image from 'next/image'

import AboutMe from './AboutMe'
import GameScreen from './GameScreen'
import { SpineObj } from '@/components/templates'


const Top: React.FC = () => {
  const bodyRef = useRef(null);

  return (
    <div ref={bodyRef} style={{ backgroundImage: "url(public/lemon.png)" }}>


      <div className=" bg-white bg-opacity-75 flex items-center justify-center h-screen">
        <div className="justify-center  text-4xl">

        </div>
        <div className="">
          <AboutMe />
        </div>
      </div>

      <SpineObj width={150} height={150} className="fixed -right-8 top-0 md:top-1/3 lg:right-1/4 animate-fadeIn" />


      <footer className="fixed bottom-0 w-full">
        <p className="p-2 text-center text-lg"> © 2021- レモン/CITRONO.</p>
      </footer>
    </div >
  )
}

export default Top