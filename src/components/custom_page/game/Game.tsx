import React, { useEffect, useState } from 'react'
import 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import MainScene from './main';
import TitleScene from './title';

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
};
class Tetris extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}


const Game: React.FC<{ className?: string }> = ({ className }) => {
  useEffect(() => {
    const game = new Tetris(config)
  }, []);
  return (
    <div id="game" className={className}>
    </div >
  )
}

export default Game