import { Pixel } from './pixel.js';

export class Game {
    ctx: CanvasRenderingContext2D;

    pixels: Map<[number, number], Pixel> = new Map();

    isMouseButtonDown = false;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "#00F";

        canvas.addEventListener("mousedown", ev => this.onMouseUpdate(ev));
        canvas.addEventListener("mousemove", ev => this.onMouseUpdate(ev));
        canvas.addEventListener("mouseup", ev => this.onMouseUpdate(ev));

        window.setInterval(() => this.update(), 1000/60);
    }
    
    private drawPixel(x: number, y: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
    }
    
    private update() {
        // TODO: Physics
        var newPixels = new Map();
        this.pixels.forEach(pixel => {
        
            // Acceleration from gravity
            //pixel.dy -= 9.8 / 60 * 0.1;
            pixel.dy = 1;
            
            let targetX = pixel.x + pixel.dx;
            let targetY = pixel.y + pixel.dy;
            
            if (targetY >= 0 && targetX >= 0 && targetY < this.canvas.height && targetX < this.canvas.width &&
                !this.pixels.has([targetX, targetY])) {
                // Move due to velocity
                // TODO: Update pixels map keys
                this.pixels.delete([pixel.x, pixel.y]);
                pixel.x += pixel.dx;
                pixel.y += pixel.dy;
                newPixels.set([pixel.x, pixel.y], pixel);
            }
        });
        this.pixels = newPixels;

        window.requestAnimationFrame(() => this.render());
    }

    private render() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.pixels.forEach(pixel => {
            this.drawPixel(pixel.x, pixel.y, "#00F");
        });
    }

    private onMouseUpdate(ev: MouseEvent) {
        if (ev.buttons == 0)
            return;

        if (!this.pixels.has([ev.offsetX,ev.offsetY]))
            this.pixels.set([ev.offsetX, ev.offsetY], new Pixel(ev.offsetX, ev.offsetY));
    }

    clear() {
        this.pixels.clear();
    }
}