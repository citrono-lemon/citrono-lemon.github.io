import React from 'react'
import { Post } from '@/libs/api'

interface Props {
  className?: string
}

const Works: React.FC<Props> = ({ className }) => {

  return (
    <div className="bg-white shadow-md p-10">
      {/* タイトル */}
      <h1 className="text-5xl text-center"> Works </h1>

      まだありません😇

    </div >
  )
}

export default Works