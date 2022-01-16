import React from 'react'
import 'tailwindcss/tailwind.css'

interface Props {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className=" bg-gray-100">
      <p className="p-2 text-center text-lg"> © 2021- レモン/CITRONO.</p>
    </footer>
  )
}

export default Footer