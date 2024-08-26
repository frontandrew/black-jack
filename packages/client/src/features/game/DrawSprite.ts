/**
 * Класс для создание, и отрисовки объектов на холсте
 */
export class DrawSprite {
  x: number
  y: number
  sprites: HTMLImageElement
  constructor(src: string, x: number, y: number) {
    this.x = x
    this.y = y
    this.sprites = new Image()
    this.sprites.src = src
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprites, this.x, this.y)
  }

  drawTable(ctx: CanvasRenderingContext2D, width: number, heght: number) {
    ctx.drawImage(this.sprites, this.x, this.y, width, heght)
  }
}
