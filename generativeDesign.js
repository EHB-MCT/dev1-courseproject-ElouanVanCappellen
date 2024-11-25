import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";
import * as Noise from "./scripts/noise.js"

let height = canvas.height;
let width = canvas.width;
let positionOfMoon = Utils.degrees(200) + Math.random() * Utils.degrees(140);
let radiusX = width / 2;
let radiusY = (height / 12) * 9;
let moonFase = Utils.randomNumber(0, 4);

let stars = [];

drawBackground();
init();
drawBackgroundMountain();


function init() {

    let x = width / 2;
    let y = height;


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Referenced from https://medium.com/@codewithmarish/simple-elliptical-animation-with-canvas-in-javascript-19995fe8142a        //
    // Code written by With Marish                                                                                                  //
    // Adapted by Elouan Van Cappellen for the DEV1 course @ Erasmushogeschool Brussel course project                               //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // draws the path of the "moon". For testing!
    // helps to visualise if the "moon" is on the correct x & y coordinate.
    // context.strokeStyle = "red";
    // Utils.strokeEllipse(x, y, radiusX, radiusY);

    // Calculate circle position based on position of top half of a cricle.
    let circleX = radiusX * Math.cos(positionOfMoon) + x;
    let circleY = radiusY * Math.sin(positionOfMoon) + y;


    // draws the "moon" itself

    // context.fillStyle = "#F6F1D5";
    // Utils.fillCircle(circleX, circleY, 80);
    drawMoon(circleX, circleY);

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

        let star = {
            x: Math.random() * width,
            y: Math.random() * height,
        };

        context.fillStyle = "white";
        Utils.fillCircle(star.x, star.y, 2);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Referenced from https://dev.to/gabriellend/how-to-animate-the-moon-with-the-canvas-element-2kk5                              //
// Code written by Gabrielle Davidson                                                                                           //
// Adapted by Elouan Van Cappellen for the DEV1 course @ Erasmushogeschool Brussel course project                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// functie dat kiest welke maan fase getekent word volgens de waarde van de variabele "moonFase"
function drawMoon(x, y) {
    context.fillStyle = "#F6F1D5";

    if (moonFase == 0) {

        context.beginPath();
        context.arc(x, y, 60, (Math.PI / 180) * 40, (Math.PI / 180) * 320);
        context.bezierCurveTo(x - 70, y - 100, x - 70, y + 100, x + 47, y + 38);
        context.fill();

    } else if (moonFase == 1) {

        context.beginPath();
        context.arc(x, y, 60, (Math.PI / 180) * 40, (Math.PI / 180) * 320);
        context.bezierCurveTo(x - 40, y - 75, x - 40, y + 75, x + 46, y + 38);
        context.fill();

    } else if (moonFase == 2) {

        context.beginPath();
        context.arc(x, y, 60, (Math.PI / 180) * 30, (Math.PI / 180) * 330);
        context.bezierCurveTo(x - 10, y - 40, x - 10, y + 40, x + 51, y + 32);
        context.fill();

    } else {

        Utils.fillCircle(x, y, 60);

    }
}   