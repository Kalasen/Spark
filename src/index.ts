import { Game } from "./game.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const game = new Game(canvas);

window["onClickClear"] = () => game.clear();