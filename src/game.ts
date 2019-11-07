import { Pixel } from './pixel.js';

export class Game {
    ctx: CanvasRenderingContext2D;

    pixels: Pixel[] = [];

    isMouseButtonDown = false;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d");
        this.drawPixel(275, 175, "#EDC9AF");

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
        for (let pixel of this.pixels) {
            // Acceleration from gravity
            //pixel.dy -= 9.8 / 60 * 0.1;
            pixel.dy = 1;

            let targetX = pixel.x + pixel.dx;
            let targetY = pixel.y + pixel.dy;

            if (targetY >= 0 && targetX >= 0 && targetY < this.canvas.height && targetX < this.canvas.width &&
                !this.pixels.some(blocker => blocker.x === pixel.x && blocker.y === targetY)) {
                // Move due to velocity
                pixel.x += pixel.dx;
                pixel.y += pixel.dy;
            }
        }

        window.requestAnimationFrame(() => this.render());
    }

    private render() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        for (let pixel of this.pixels) {
            this.drawPixel(pixel.x, pixel.y, "#00F");
        }
    }

    private onMouseUpdate(ev: MouseEvent) {
        if (ev.buttons == 0)
            return;

        if (!this.pixels.some(pixel => ev.offsetX == pixel.x && ev.offsetY == pixel.y))
            this.pixels.push(new Pixel(ev.offsetX, ev.offsetY));
    }

    clear() {
        this.pixels.length = 0;
    }
}