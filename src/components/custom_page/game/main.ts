import 'phaser'

const TILE_SIZE = new Phaser.Geom.Rectangle(0, 0, 20, 20)
// Board Sizeは10x20だが、壁も含めて12x22とする

class MainScene extends Phaser.Scene {
  private _frame: number = 0
  private _fallCount: number = 0
  private _counter: Phaser.GameObjects.Text
  private _pointerText: Phaser.GameObjects.Text
  private _tetrimino: Mino = new Mino('O' as MinoType)
  private _field: Field = new Field()

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
        this._field.put(this._tetrimino)
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

/**
 * フィールドの作成、更新を行うクラス
 */
type FieldObj = 'None' | 'Block' | 'Wall' | 'TopPos'
class Field {
  static size = new Phaser.Geom.Rectangle(0, 0, 12, 24)
  static offset = new Phaser.Math.Vector2(TILE_SIZE.width / 2 + 40, TILE_SIZE.height / 2)

  private _field: FieldObj[][] = Array.from(new Array(Field.size.height), () => new Array(Field.size.width).fill("None"))

  constructor() {
    this._createWall()
    console.log(this._field)
  }

  /**
   * 四隅に壁を作る
   */
  private _createWall() {
    const xLen = this._field[0].length
    const yLen = this._field.length
    this._field.forEach((_, idx) => {
      this._field[idx][0] = 'Wall'
      this._field[idx][xLen - 1] = 'Wall'
    })
    this._field[0].fill('TopPos')
    this._field[1].fill('TopPos')
    this._field[2].fill('TopPos')
    this._field[yLen - 1].fill('Wall')
  }

  /**
   * _field getter
   */
  get field() {
    return this._field
  }


  /**
   * テトリミノをフィールドに設置する
   * @param mino 設置するテトリミノ
   */
  put(mino: Mino) {
    mino.parts.forEach((r, y) => {
      r.forEach((c, x) => {
        // ブロックじゃないところは無視
        if (c != 'Block') {
          return
        }
        // 配列サイズを超えないように
        if (y + mino.position.y >= Field.size.height || x + mino.position.x >= Field.size.width) {
          return
        }
        // テトリミノの部分をブロックに変換する
        const fieldPos = this._field[y + mino.position.y][x + mino.position.x]
        if (fieldPos == 'None' || fieldPos == 'Wall') {
          this._field[y + mino.position.y][x + mino.position.x] = 'Block'
        }
      })
    })
  }
}

type MinoType = 'I' | 'O' | 'S' | 'Z' | 'J' | 'L' | 'T'
type Direction = 'Up' | 'Right' | 'Down' | 'Left'
/**
 * テトリミノを作成・変換するクラス
 */
class Mino {
  private _type: MinoType
  // テトリミノの位置
  private _position: Phaser.Math.Vector2
  // テトリミノの状態
  private _partsState: number
  private _parts: FieldObj[][][]

  constructor(t: MinoType) {
    this._partsState = 0
    this._type = t
    let parts: string[][][]
    switch (this._type) {
      case 'O':
        parts = [[
          ['X', 'X'],
          ['X', 'X']
        ]]
        break
      case 'T':
        parts = [[
          [' ', ' ', ' '],
          ['X', 'X', 'X'],
          [' ', 'X', ' ']
        ], [
          [' ', 'X', ' '],
          ['X', 'X', ' '],
          [' ', 'X', ' ']
        ], [
          [' ', 'X', ' '],
          ['X', 'X', 'X'],
          [' ', ' ', ' ']
        ], [
          [' ', 'X', ' '],
          [' ', 'X', 'X'],
          [' ', 'X', ' ']
        ]]
        break
      case 'I':
        parts = [[
          [' ', 'X', ' ', ' '],
          [' ', 'X', ' ', ' '],
          [' ', 'X', ' ', ' '],
          [' ', 'X', ' ', ' '],
        ], [
          [' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' '],
          ['X', 'X', 'X', 'X'],
          [' ', ' ', ' ', ' '],
        ]]
        break
      case 'S':
        parts = [[
          [' ', 'X', 'X'],
          ['X', 'X', ' '],
          [' ', ' ', ' ']
        ], [
          ['X', ' ', ' '],
          ['X', 'X', ' '],
          [' ', 'X', ' ']
        ]]
        break
      case 'Z':
        parts = [[
          ['X', 'X', ' '],
          [' ', 'X', 'X'],
          [' ', ' ', ' ']
        ], [
          [' ', ' ', 'X'],
          [' ', 'X', 'X'],
          [' ', 'X', ' ']
        ]]
        break
      case 'J':
        parts = [[
          [' ', 'X', ' '],
          [' ', 'X', ' '],
          ['X', 'X', ' ']
        ], [
          ['X', ' ', ' '],
          ['X', 'X', 'X'],
          [' ', ' ', ' ']
        ], [
          [' ', 'X', 'X'],
          [' ', 'X', ' '],
          [' ', 'X', ' ']
        ], [
          [' ', ' ', ' '],
          ['X', 'X', 'X'],
          [' ', ' ', 'X']
        ]]
        break
      case 'L':
        parts = [[
          [' ', 'X', ' '],
          [' ', 'X', ' '],
          [' ', 'X', 'X']
        ], [
          [' ', ' ', ' '],
          ['X', 'X', 'X'],
          ['X', ' ', ' ']
        ], [
          ['X', 'X', ' '],
          [' ', 'X', ' '],
          [' ', 'X', ' ']
        ], [
          [' ', ' ', 'X'],
          ['X', 'X', 'X'],
          [' ', ' ', ' ']
        ]]
        break
    }
    // 上記テトリミノのXで表記したものを正式名称に変更する
    this._parts = parts.map(p =>
      p.map(q =>
        q.map(r =>
          r == 'X' ? 'Block' as FieldObj : 'None' as FieldObj
        )
      )
    )
    this._position = new Phaser.Math.Vector2(5, 1)
  }

  /**
   * テトリミノを一マス移動させる
   * @param dir 移動する方向
   * @param field フィールドクラス
   * @returns this
   */
  move(dir: Direction, field: Field): Mino {
    let tmp = new Phaser.Math.Vector2(this._position)
    switch (dir) {
      case "Down":
        tmp.y += 1
        break
      case "Left":
        tmp.x -= 1
        break
      case "Right":
        tmp.x += 1
        break
    }
    if (!this._collide(tmp, field)) {
      this._position = new Phaser.Math.Vector2(tmp)
    }
    return this
  }

  /**
   * テトリミノを回転させる
   * @param dir: 'Clockwise' | 'Counterclockwise' 回転方向
   * @param field フィールドクラス
   * @returns this
   */
  rotate(dir: 'Clockwise' | 'Counterclockwise', field: Field): Mino {
    const prevState = this._partsState
    const c = (this._partsState +
      (dir == 'Clockwise' ? + 1 : this._parts.length - 1)
    ) % this._parts.length

    this._partsState = c

    // 衝突した場合は、1x1領域(Iミノの場合2x2)移動させて、コライドしないポジションを見つける
    if (this._collide(this._position, field)) {
      let rotatable = false
      let result = new Phaser.Math.Vector2(0, 0)
      let checklist: Phaser.Math.Vector2[] = []
      if (this._type == 'I') {
        // [0,0], [1,0], [-1,0],..., [0,1],... という移動先一覧を作る
        const yMapper = [0, 1, 2, -1, -2]
        const xMapper = [0, 1, -1, 2, -2]
        checklist = yMapper.map((y) => {
          return xMapper.map((x) => {
            return new Phaser.Math.Vector2(x, y)
          })
        }).flat()
        checklist.shift()
      }
      else {
        // [0,0], [1,0], [-1,0],..., [0,1],... という移動先一覧を作る
        const yMapper = [0, 1, -1]
        const xMapper = [0, 1, -1]
        checklist = yMapper.map((y) => {
          return xMapper.map((x) => {
            return new Phaser.Math.Vector2(x, y)
          })
        }).flat()
        checklist.shift()
      }
      // 全移動先のうち、最初に衝突しないものを取得
      checklist.forEach((v) => {
        if (!this._collide(new Phaser.Math.Vector2(this._position).add(new Phaser.Math.Vector2(v)), field)) {
          rotatable = true
          result = v
          return
        }
      })
      // 移動して回転可能ならば、ずらす
      if (rotatable) {
        this._position = this._position.add(result)
      }
      // 移動しても回転不可能ならば、前の回転に戻す
      else {
        this._partsState = prevState
      }
      return this
    }

    return this
  }

  /**
   * フィールドとの衝突判定を行う
   * @param pos テトリミノの場所
   * @param field フィールドクラス
   * @returns 衝突ならtrue
   */
  _collide(pos: Phaser.Math.Vector2, field: Field): boolean {
    let collision = false
    this._parts[this._partsState].forEach((r, y) => {
      if (collision) return
      r.forEach((c, x) => {
        if (c == 'Block') {
          if (y + pos.y >= Field.size.height || x + pos.x >= Field.size.width) {
            return
          }
          const fieldPos = field.field[y + pos.y][x + pos.x]
          if (fieldPos == 'Block' || fieldPos == 'Wall') {
            collision = true
            return false
          }
        }
      })
    })
    return collision
  }

  /**
   * _position Getter / Setter
   */
  get position() {
    return this._position
  }
  set position(pos: Phaser.Math.Vector2) {
    this._position = pos
  }

  get parts() {
    return this._parts[this._partsState]
  }
}

export default MainScene