import React, { useEffect, useState } from 'react'
// import 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import MainScene from './main/main';
import TitleScene from './title';

import 'phaser/plugins/spine/dist/SpinePlugin'
import { useRouter } from 'next/router';


const config: Phaser.Types.Core.GameConfig = {
  width: 300,
  height: 500,
  type: Phaser.AUTO,
  pixelArt: false,
  backgroundColor: 0xcdcdcd,

  scale: {
    mode: Phaser.Scale.FIT,
    //mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    parent: 'game',
  },

  scene: [TitleScene, MainScene],
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: SpinePlugin, mapping: 'spine' }
    ]
  }
};
class Tetris extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}


const Game: React.FC<{ className?: string }> = ({ className }) => {
  useEffect(() => {
    // setGame(new Tetris(config))
    const g = new Tetris(config)
    return () => {
      g?.plugins.removeScenePlugin('SpinePlugin')
      g?.destroy(true)
    }
  }, []);
  return (
    <div id="game" className={className}>
    </div >
  )
}

export default Game