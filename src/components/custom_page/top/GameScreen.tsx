import React from 'react'

import { IoGameController } from 'react-icons/io5'
import { Tooltip } from '@material-ui/core'


import dynamic from 'next/dynamic'
const Game = dynamic(
  () => import('../../game/Game'),
  { ssr: false }
)

type Props = {
  className?: string
}

const GameScreen: React.FC<Props> = ({ className }) => {
  const [gameScreenOpen, setGameScreenOpen] = React.useState<boolean>(true)
  const [gameStartAnim, setGameStartAnim] = React.useState<boolean>(false)

  return (
    <div className={className + " flex flex-col items-center justify-center"}> {
      gameScreenOpen ? (
        <div className="p-1 rounded-xl bg-gray-700 shadow-2xl animate-slideIn">
          <Game className="justify-center" />
        </div>)
        : (
          <Tooltip title={"Tetris Game"} placement="top"><div>
            <IoGameController
              className={`
                ${gameStartAnim && "animate-openExpand"}
                text-5xl text-green-500 cursor-pointer
                hover:opacity-50 hover:scale-110
                transition duration-300 ease-in-out
              `}
              onClick={() => setGameStartAnim(true)}
              onAnimationEnd={() => setGameScreenOpen(true)}
            />
          </div></Tooltip>
        )
    } </div>
  )
}

export default GameScreen