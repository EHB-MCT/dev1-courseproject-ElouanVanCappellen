import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";
import * as Noise from "../scripts/noise.js"

let height = canvas.height;
let width = canvas.width;
let positionOfMoon = Utils.randomNumber(Math.PI, (2 * Math.PI));
let radiusX = width / 2;
let radiusY = (height / 12) * 9;


drawBackground();
drawMoon();
drawBackgroundMountain();


function drawMoon() {

    let x = width / 2;
    let y = height;


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Referenced from https://medium.com/@codewithmarish/simple-elliptical-animation-with-canvas-in-javascript-19995fe8142a        //
    // Written by Code With Marish                                                                                                  //
    // Adapted by Elouan Van Cappellen for the DEV1 course @ Erasmushogeschool Brussel course project                               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // draws the path of the "moon".
    // helps to visualise if the "moon" is on the correct x & y coordinate.
    // context.strokeStyle = "red";
    // Utils.strokeEllipse(x, y, radiusX, radiusY);

    // Calculate circle position based on position of top half of a cricle.
    let circleX = radiusX * Math.cos(positionOfMoon) + x;
    let circleY = radiusY * Math.sin(positionOfMoon) + y;


    // draws the "moon" itself
    context.fillStyle = "#F6F1D5";
    Utils.fillCircle(circleX, circleY, 80);

    console.log(circleX);
    console.log(circleY);
}


function drawBackground() {
    // draws a solid colored background over the whole canvas
    context.fillStyle = "#0c1445";
    context.fillRect(0, 0, width, height);
    drawStars();

}

function drawStars() {
    // draws dots on the background on the layer between the "sky" and the "mountains".
    for (let i = 0; i < 500; i++) {

        let x = Math.random() * width;
        let y = Math.random() * height;

        context.fillStyle = "white";
        Utils.fillCircle(x, y, 2);
    }
}

function drawBackgroundMountain() {

    // draws "mountains" using the perlin noise script

    context.fillStyle = "#4c408e"
    for (let i = 0; i < width; i++) {
        let y = Noise.perlinNoise(i / 150) * 400 + 310;
        context.fillRect(i, y, 5, height);
    }


    context.fillStyle = "#38285c";
    for (let i = 0; i < width; i++) {
        let y = Noise.perlinNoise(i / 200) * 200 + 520;
        context.fillRect(i, y, 2, height);


    }
}