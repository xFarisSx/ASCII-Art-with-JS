export class Cell{
    constructor(x, y, color, symbol){
        this.x = x
        this.y = y
        this.color = color
        this.symbol = symbol
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillText(this.symbol, this.x, this.y)
        }
}