import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

import { IconLink } from '@/components/helper'
import { IoPerson, IoGameController, IoMail } from 'react-icons/io5'
import { SiPixiv, SiTwitter, SiSoundcloud, SiGithub } from 'react-icons/si'
import { ImSoundcloud2 } from 'react-icons/im'

type Props = {
}

const links = [
  { title: "GitHub", url: "https://github.com/citrono-lemon", icon: SiGithub, color: "#181717" },
  { title: "Twitter", url: "https://twitter.com/citrono_lemon", icon: SiTwitter, color: "#1DA1F2" },
  { title: "SoundCloud", url: "https://soundcloud.com/citrono_lemon", icon: ImSoundcloud2, color: "#FF3300" },
  { title: "Pixiv", url: "https://pixiv.me/citrono_lemon", icon: SiPixiv, color: "#0096FA" },
]

const AboutMe: React.FC<Props> = ({ }) => {

  return (

    <div className="md:flex items-center justify-center bg-white bg-opacity-60 rounded-3xl py-6 md:px-10">
      <img src="images/author.jpg" alt="Author Profile" className="shadow-md w-32 h-32 rounded-full" />
      <div className="flex-col justify-center px-3 py-5">
        <div className="flex items-center">
          <IoPerson className="mr-1" /> レモン
        </div>
        <div className="flex items-center">
          <IoMail className="mr-1" /> citrono.lemon@gmail.com
        </div>
        <div className="flex items-center mb-1 justify-center">
          {links.map(v => (
            <IconLink href={v.url} hint={v.title} key={v.title}>
              <v.icon className="md:text-4xl text-5xl md:m-2 m-5" color={v.color} />
            </IconLink>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default AboutMe
