import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";
import * as Noise from "./scripts/noise.js"

window.onwheel = moveMoon;

let height = canvas.height;
let width = canvas.width;
let positionOfMoon = Utils.degrees(200) + Math.random() * Utils.degrees(140);
let radiusX = width / 2;
let radiusY = (height / 12) * 9;
let moonFase = Utils.randomNumber(0, 4);

let counter = 0;


// objecten maken voor de posities van de "sterren".
let stars = [];

// draws the first frame.
setup();
// animated function.
drawStars();

/**
 * @param {WheelEvent} e;
 */
function moveMoon(e) {
    positionOfMoon += (e.deltaY / 20);
    console.log(e.deltaY);
}

function drawMoon() {

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
    drawMoonFase(circleX, circleY);

    // console.log(circleX);
    // console.log(circleY);





    //                                    ------------------------------------!!!  S.O.S !!!------------------------------------


    // circleX += e.deltaY;
    // // nakijken of de maan niet te ver is aan de linker/rechter kant is va de canvas. Resultaten zijn gebaseerd op de CircleX variabele.
    // if (circleX <= Utils.degrees(140)) {
    //     // up
    //     circleX = 140;
    // } else if (circleX >= Utils.degrees(200)) {
    //     // down
    //     circleX = 200
    // }

    //                                    ------------------------------------!!!  S.O.S !!!------------------------------------
}


function drawBackground() {
    // draws a solid colored background over the whole canvas
    context.fillStyle = "#0c1445";
    context.fillRect(0, 0, width, height);


}

// sets up the objects for the program.
function setup() {

    drawBackground();

    // maakt 500 verschillende x & y waarden in het object "star"
    for (let i = 0; i < 500; i++) {
        let star = {
            x: Math.random() * width,
            y: Math.random() * height,
        };
        stars.push(star);
    }
    drawMoon();
    drawBackgroundMountain();

}

function drawStars() {

    drawBackground();

    let twinkle = false;

    // draws dots on the background on the layer between the "sky" and the "mountains".

    // werk niet als verwacht omdat hij de var twinkle elke frame vervangt
    for (let i = 0; i < stars.length; i++) {

        if (counter < 50) {
            if (i <= Utils.randomNumber(0, 150)) {
                twinkle = true;
            } else {
                twinkle = false;
            }
        } else {
            counter = 0;
        }




        // counter var zorgdt voor het tekenen van 500 sterren voor de volgende frame
        // should be 500
        // if (counter >= 5) {
        //     twinkle = true;
        //     // should be 1000
        // } else if (counter >= 10) {
        //     twinkle = false;
        //     counter = 0;
        // }


        let star = stars[i];


        if (twinkle == false) {
            context.fillStyle = "white";
            Utils.fillCircle(star.x, star.y, 2);
            // twinkle = false;
            counter++;

        } else {
            // if (i >= 4 && i <= 10) {
            drawStarTwinkle(star.x, star.y);
            // twinkle = false;
            // } else {
            context.fillStyle = "white";
            //     Utils.fillCircle(star.x, star.y, 2);
            // }
        }


    }
    drawMoon();
    drawBackgroundMountain();
    signature();
    requestAnimationFrame(drawStars);
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
function drawMoonFase(x, y) {
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


function drawStarTwinkle(x, y) {
    context.beginPath();
    context.moveTo(x, y + 1);
    context.arcTo(x, y, x + 1, y, 7);
    context.arcTo(x, y, x, y - 1, 7);
    context.arcTo(x, y, x - 1, y, 7);
    context.arcTo(x, y, x, y + 1, 7);
    context.fill();
}

function signature() {
    context.fillStyle = "black";
    context.font = "normal 10pt Arial"
    context.fillText("Elouan Van Cappellen", (width - 160), (height - 20))
}