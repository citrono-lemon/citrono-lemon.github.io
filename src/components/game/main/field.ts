import { FIELD_OFFSET } from "../environment"
import { Mino } from "./mino"

/**
 * フィールドの作成、更新を行うクラス
 */
export type FieldObj = 'None' | 'Block' | 'Wall' | 'TopPos'
export class Field {
  // 盤面は10x20だが、壁も含めて12x22とする
  static size = new Phaser.Geom.Rectangle(0, 0, 12, 24)

  static offset = FIELD_OFFSET

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
   * 横一列にブロックが揃っているラインの確認
   * @returns 全ブロックがそろっているラインの配列
   */
  checkLine() {
    const lines = this._field
      .map((v, i) =>
        v.find((f) => f == "None") === undefined ? i : -1)
      .filter((f) => f != -1)
    return lines
  }

  removeLine(line: number) {
    for (let y = line; y >= 0; y--) {
      this._field[line].forEach((_, idx) => {
        if (y >= 1) {
          if (this._field[line - 1][idx] == 'Block' || this._field[line - 1][idx] == 'None') {
            this._field[line][idx] = this._field[line - 1][idx]
          }
        }
        else {
          if (this._field[line - 1][idx] == 'Block' || this._field[line - 1][idx] == 'None') {
            this._field[line][idx] = 'None'
          }
        }
      })
    }
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
