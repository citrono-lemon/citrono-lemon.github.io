// 四角形のサイズは20x20
export const TILE_SIZE = new Phaser.Geom.Rectangle(0, 0, 20, 20)

// ボードのオフセット
export const FIELD_OFFSET = new Phaser.Math.Vector2(TILE_SIZE.width / 2 + 40, TILE_SIZE.height / 2)