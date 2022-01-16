import React from 'react'
import { SiPixiv, SiTwitter, SiSoundcloud, SiGithub } from 'react-icons/si'

// Not Use
const Profile: React.FC = () => {
  return (
    <div className="h-64 w-64 bg-indigo-400">
      About Me
      <div className="flex items-center mb-1 justify-center">
        <SiTwitter className="text-2xl m-2" href="https://twitter.com/citrono_lemon" />
        <SiPixiv className="text-2xl m-2" />
        <SiSoundcloud className="text-2xl m-2" />
        <SiGithub className="text-2xl m-2" />
      </div>
    </div>
  )
}

export default Profile
