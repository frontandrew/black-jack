// Это класс для создание, и отрисовки обьектов на холсте
export class DrawSprite {
  x: number
  y: number
  sprites: HTMLImageElement
  pointX: number
  pointY: number
  move: boolean
  constructor(src: string, x: number, y: number) {
    this.x = x
    this.y = y
    this.sprites = new Image()
    this.sprites.src = src
    this.pointX = 800
    this.pointY = 250
    this.move = false
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprites, this.x, this.y)
  }

  drawDeck(ctx: CanvasRenderingContext2D, sum: number) {
    let indent = 0

    for (let i = 0; i < sum; i++) {
      indent += 3
      ctx.drawImage(this.sprites, this.x + indent, this.y)
    }
  }

  drawTable(ctx: CanvasRenderingContext2D, width: number, heght: number) {
    ctx.drawImage(this.sprites, this.x, this.y, width, heght)
  }

  moveCard(y: number, player: { suit: string; value: string }[]) {
    if (player.length === 0) {
      this.x = 810
      this.y = 300
      return
    }
    const index = player.length - 1
    this.pointX = 300 + index * 70
    this.pointY = y
    this.move = true
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.move) {
      this.draw(ctx)

      if (this.y < this.pointY) {
        this.y += 10
      }
      if (this.x > this.pointX) {
        this.x -= 10
      }
      if (this.y > this.pointY) {
        this.y -= 10
      }
    }
  }
}
