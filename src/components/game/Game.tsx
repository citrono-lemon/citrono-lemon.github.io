import React, { useEffect, useState } from 'react'
// import 'phaser'
import MainScene from './main/main';
import TitleScene from './title';

import 'phaser/plugins/spine/dist/SpinePlugin'


const config: Phaser.Types.Core.GameConfig = {
  width: 640,
  height: 384,
  type: Phaser.AUTO,
  pixelArt: false,
  backgroundColor: 0xcdcdcd,

  scale: {
    mode: Phaser.Scale.FIT,
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