import React, { useEffect, useRef } from 'react'
import { Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

import { IconLink } from '@/components/helper'
import { IoPerson, IoGameController } from 'react-icons/io5'
import { SiPixiv, SiTwitter, SiSoundcloud, SiGithub } from 'react-icons/si'

import AboutMe from './AboutMe'
import GameScreen from './GameScreen'
import { SpineObj } from '@/components/templates'


const Top: React.FC = () => {
  const links = [
    { title: "GitHub", url: "https://github.com/citrono-lemon", icon: SiGithub, color: "#112233" },
    { title: "Twitter", url: "https://twitter.com/citrono_lemon", icon: SiTwitter, color: "#112233" },
    { title: "SoundCloud", url: "https://soundcloud.com/citrono_lemon", icon: SiSoundcloud, color: "#112233" },
    { title: "Pixiv", url: "https://pixiv.me/citrono_lemon", icon: SiPixiv, color: "#112233" },
  ]

  const bodyRef = useRef(null);
  const [aboutMeDialogOpen, setAboutMeDialogOpen] = React.useState<boolean>(false)

  useEffect(() => {
  }, [])

  return (
    <div ref={bodyRef} className="bg-white shadow-md p-10 animate-slideIn">
      {/* タイトル */}
      <h1 className="text-5xl text-center"> CITRONO </h1>

      <SpineObj width={150} height={150} className="fixed right-0 md:bottom-10 bottom-30" />

      {/* アバター */}
      <div className="my-5 flex justify-center">
        <div className="bg-gray-100 shadow-md p-10">
          <img src="/images/author.png" alt="Author Profile" className="shadow-md w-32 h-32 rounded-full" />
          <div className="mt-2">
            <div className="flex items-center justify-center">
              <IoPerson className="text-md" /> レモン
            </div>
            <div className="flex justify-center mt-2">
              <Chip
                className=""
                label="ABOUT ME"
                component="a"
                variant="outlined"
                onClick={() => setAboutMeDialogOpen(true)}
                clickable
              />
            </div>
          </div>
        </div>
      </div>

      {/* ゲーム */}
      <GameScreen />

      {/* SNSリンク */}
      <div className="flex items-center mb-1 justify-center">
        {links.map(v => (
          <IconLink href={v.url} hint={v.title} key={v.title}>
            <v.icon className="text-5xl m-4" color={v.color} />
          </IconLink>
        ))
        }
      </div>

      <AboutMe open={aboutMeDialogOpen} onClick={() => setAboutMeDialogOpen(false)} />


    </div >
  )
}

export default Top