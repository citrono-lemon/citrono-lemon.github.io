import 'phaser'

import { TILE_SIZE } from '../environment'
import { Mino, MinoType } from './mino'
import { Field } from './field'

class MainScene extends Phaser.Scene {
  private _frame: number = 0
  private _fallCount: number = 0
  private _counter: Phaser.GameObjects.Text
  private _pointerText: Phaser.GameObjects.Text
  private _tetrimino: Mino = new Mino('O' as MinoType)
  private _field: Field = new Field()
  private _state: State = new State()

  private _score: number = 0
  private _level: number = 1
  private _lev_table: number[] =
    [60, 55, 50, 45, 40, 35, 30, 27, 24, 21, 19, 17, 15, 14, 13, 12, 11, 10]

  private _objs: Phaser.GameObjects.Rectangle[] = []

  constructor() {
    super({
      key: 'Main',
    })
  }

  preload(): void {
    console.log('preload')
  }

  create(): void {
    this.cameras.main.fadeIn(700)

    this._pointerText = this.add.text(10, 10, "", { fontSize: '14px' })
    this._counter = this.add.text(10, 34, this._frame.toString(), { fontSize: '14px' });
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M).on('down', () => {
      this._tetrimino = new Mino('O' as MinoType)
    }, this)

    this.input.keyboard.addKey('s').on('down', () => {
      const prev = this._tetrimino.position
      const current = this._tetrimino.move('Down', this._field).position
      if (prev == current) {
        this._field.put(this._tetrimino)
        this._tetrimino = this._tetrimino = new Mino('O' as MinoType)
      }
      this._fallCount = 0
    }, this)
    this.input.keyboard.addKey('r').on('down', () => {
      this._tetrimino.rotate('Clockwise', this._field)
    })
    this.input.keyboard.addKey('e').on('down', () => {
      this._tetrimino.rotate('Counterclockwise', this._field)
    })
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).on('down', () => {
      for (let i = 0; i < 64; i++) {
        const prev = this._tetrimino.position
        const current = this._tetrimino.move('Down', this._field).position
        if (prev == current) {
          break;
        }
      }
      this._fallCount = 99999
    }, this)
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).on('down', () => {
      this._tetrimino.move('Left', this._field)
    }, this)
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).on('down', () => {
      this._tetrimino.move('Right', this._field)
    }, this)
  }

  /**
   * メインループフレーム
   */
  update(): void {
    this._frame += 1
    this._counter.setText(this._frame.toString())
    this._pointerText.setText(`(${this.input.activePointer.worldX.toFixed(0)}, ${this.input.activePointer.worldY.toFixed(0)})`)

    this.draw()

    // 60フレームに一度テトリミノを落とす
    this._fallCount++
    if (this._fallCount > 60) {
      const prev = this._tetrimino.position
      const current = this._tetrimino.move('Down', this._field).position
      if (prev == current) {
        console.log(this._field)
        this._field.put(this._tetrimino)

        const lines = this._field.checkLine()
        if (lines.length > 0) {
          lines.sort((a, b) => b - a).forEach((v) => {
            this._field.removeLine(v)
          })
        }

        const m: MinoType[] = ['I', 'O', 'S', 'Z', 'J', 'L', 'T']
        this._tetrimino = this._tetrimino = new Mino(
          m[Math.floor(Math.random() * m.length)] as MinoType
        )
      }
      this._fallCount = 0
    }

  }

  draw() {
    // 描写を全削除
    while (this._objs.length != 0) {
      const r = this._objs.pop()
      r.destroy()
    }
    // フィールドのイメージを作成
    this._field.field.forEach((row, y) => {
      row.forEach((c, x) => {
        switch (c) {
          case "None":
            break;
          case "Block":
            this._objs.push(
              this.add.rectangle(
                x * TILE_SIZE.width + Field.offset.x,
                y * TILE_SIZE.height + Field.offset.y,
                TILE_SIZE.width - 1, TILE_SIZE.height - 1, 0x343434
              )
            )
            break;
          case "Wall":
            this._objs.push(
              this.add.rectangle(
                x * TILE_SIZE.width + Field.offset.x,
                y * TILE_SIZE.height + Field.offset.y,
                TILE_SIZE.width, TILE_SIZE.height, 0x123456
              )
            )
            break;
        }
      })
    })

    // テトリミノのイメージを作成
    this._tetrimino.parts.forEach((row, y) => {
      row.forEach((c, x) => {
        switch (c) {
          case "None":
            break;
          case "Block":
            this._objs.push(
              this.add.rectangle(
                (x + this._tetrimino.position.x) * TILE_SIZE.width + Field.offset.x,
                (y + this._tetrimino.position.y) * TILE_SIZE.height + Field.offset.y,
                20 - 1, 20 - 1, 0xff0000
              )
            )
            break;
        }
      })
    })
  }
}


type StateProp = 'Play' | 'Pause' | 'Animate'
class State {
  private _state: StateProp

  private _stateGraph = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0]
  ]

  to(s: StateProp) {
    this._state = s
    return this
  }

  get state(): StateProp {
    return this._state
  }
}

export default MainScene