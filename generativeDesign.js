import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";
import * as Noise from "../scripts/noise.js"

let height = canvas.height;
let width = canvas.width;

drawBackground();
drawBackgroundMountain();
drawMountian();


function drawBackground() {
    context.fillStyle = "blue";
    context.fillRect(0, 0, width, height);
}

function drawBackgroundMountain() {
    context.fillStyle = "white"
    for (let i = 0; i < width; i++) {
        let y = Noise.perlinNoise(i / 125) * 400 + 10;
        context.fillRect(i, y, 5, height);
    }
}

function drawMountian() {
    // draws mountains using the perlin noise script
    context.fillStyle = "green";
    for (let i = 0; i < width; i++) {
        let y = Noise.perlinNoise(i / 150) * 200 + 220;
        context.fillRect(i, y, 2, height);


    }
}

