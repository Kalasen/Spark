export class Pixel {    
    dx = 0;
    dy = 0;
    constructor(public x: number, public y: number) {
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}