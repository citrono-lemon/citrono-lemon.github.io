import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

import { IoPerson, IoMail } from 'react-icons/io5'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { SpineObj } from '@/components/templates'

type Props = {
  open: boolean,
  onClick: () => void
}

const AboutMe: React.FC<Props> = ({ open, onClick }) => {

  return (

    <Dialog
      open={open}
      onClose={onClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="bg-gray-100 shadow-md">
        {"ABOUT ME"}
      </DialogTitle>
      <DialogContent>
        <div className="my-5 flex justify-center">
          <img src="images/author.png" alt="Author Profile" className="shadow-md w-32 h-32 rounded-full" />
          <div className="mx-5 my-2 flex-col justify-center">
            <div className="flex items-center">
              <IoPerson className="text-md" /> レモン
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-md" /> 滋賀県
            </div>
            <div className="flex items-center">
              <IoMail className="text-md" /> contact@citrono.dev
            </div>
          </div>
        </div>
        ゲームを作るためにプログラミングと絵と音楽の勉強をしています。メインは多分フロントエンドエンジニアの何でも屋さんです。
        <DialogContentText id="alert-dialog-description">
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClick}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AboutMe