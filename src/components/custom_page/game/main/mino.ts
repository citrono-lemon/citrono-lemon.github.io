import { Field, FieldObj } from "./field"

export type MinoType = 'I' | 'O' | 'S' | 'Z' | 'J' | 'L' | 'T'
export type MinoDirection = 'Up' | 'Right' | 'Down' | 'Left'
/**
 * テトリミノを作成・変換するクラス
 */
export class Mino {
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
  move(dir: 'Up' | 'Right' | 'Down' | 'Left', field: Field): Mino {
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
