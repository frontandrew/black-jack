export class CardHand {
  x: number
  y: number
  sprites: HTMLImageElement
  constructor(src: string, x: number, y: number) {
    this.x = x
    this.y = y
    this.sprites = new Image()
    this.sprites.src = src
  }

  draw(c: CanvasRenderingContext2D) {
    this.sprites.onload = () => {
      c.drawImage(this.sprites, this.x, this.y)
    }
  }
}
