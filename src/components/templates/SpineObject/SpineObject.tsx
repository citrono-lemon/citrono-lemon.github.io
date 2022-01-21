import React, { useEffect, useState } from 'react'
import 'phaser'
import { IonPhaser } from '@ion-phaser/react'

import 'phaser/plugins/spine/dist/SpinePlugin'

class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    })
  }
  preload(): void {
    this.cameras.main.setBackgroundColor('rgba(255, 0, 0, 0.3)');

    // this.load.spine("player")
    this.load.setPath('/images/Spine/')
    this.load.spine("spineboy", "boy.json", "boy.atlas")
  }

  create(): void {
    const player = this.add.spine(100, 100, "spineboy", "idle", true).setScale(0.2, 0.2)
    player.setMix("idle", "walk", 0.3)
    player.setMix("walk", "idle", 0.3)

    this.input.on('pointerdown', () => {
      console.log("Scene change")
      player.setAnimation(0, "walk",)
      player.on("complete", () => {
        player.setAnimation(0, "idle", true)
      })
    })
  }

}

const config: Phaser.Types.Core.GameConfig = {
  width: 200,
  height: 200,
  type: Phaser.AUTO,
  pixelArt: false,
  transparent: true,
  input: false,

  scale: {
    mode: Phaser.Scale.FIT,
    //mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    parent: 'spineObj',
  },

  scene: [TitleScene],
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
  }
};
class PhaserSpine extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}


const SpineObject: React.FC<{ className?: string }> = ({ className }) => {
  useEffect(() => {
    const game = new PhaserSpine(config)
  }, []);
  return (
    <div id="spineObj" className={className}>
    </div >
  )
}

export default SpineObject