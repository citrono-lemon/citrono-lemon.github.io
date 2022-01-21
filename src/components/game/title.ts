import 'phaser'
// import '@azerion/phaser-spine'

const TILE_SIZE = new Phaser.Geom.Rectangle(0, 0, 20, 20)
// Board Sizeは10x20だが、壁も含めて12x22とする

class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    })
  }
  preload(): void {
    // this.load.spine("player")
    this.load.setPath('/images/Spine/')
    this.load.image("pp", "sd_player.png")
    this.load.spine("player", "sd_player.json", "sd_player.atlas")
    this.load.spine("aaa", "boy.json", "boy.atlas")
    console.log('preload')
  }

  create(): void {

    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0)

    this.add.text(10, 10, "TETRIS", { fontSize: "32px" })

    this.add.text(10, 60, "まだ開発中です……")
    this.add.text(10, 80, "画面をタップすればゲームスタート")
    this.add.text(10, 130, "←→:テトリミノ左右移動")
    this.add.text(10, 150, "S:テトリミノ下移動")
    this.add.text(10, 170, "SPACE: テトリミノ落下")
    this.add.text(10, 190, "E: 回転")

    //this.add.sprite(200, 400, "pp")
    this.add.spine(100, 200, "aaa", "Idle", true).setScale(0.25, 0.25)


    this.input.once('pointerdown', () => {
      console.log("Scene change")
      this.cameras.main.fadeOut(300)
        .on('camerafadeoutcomplete', function () {
          this.scene.start('Main');
        }, this);
    })
  }

  /**
   * メインループフレーム
   */
  update(): void {
  }
}

export default TitleScene