import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";
import * as Noise from "./scripts/noise.js";
// import * as SpaceInvader from "./spaceInvader.js";

window.onwheel = moveMoon;

let height = canvas.height;
let width = canvas.width;
let positionOfMoon = Utils.degrees(200) + Math.random() * Utils.degrees(140);
let radiusX = width / 2;
let radiusY = (height / 12) * 9;
let moonFase = Utils.randomNumber(0, 4);

// list to keep diffren durations (I need les than 500 => dont make it a part of the object "star")
let duration = [];

let framecount = 0;


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

}


function drawBackground() {
    // draws a solid colored background over the whole canvas
    context.fillStyle = "#0c1445";
    context.fillRect(0, 0, width, height);


}

// sets up the objects for the program. Also draws the first frame/desides which "moonFase" to draw.
function setup() {

    drawBackground();

    // maakt 500 verschillende x & y waarden in het object "star"
    for (let i = 0; i < 500; i++) {
        let star = {
            x: Math.random() * width,
            y: Math.random() * height,
            blink: false,
            duration: Utils.randomNumber(50, 100)
        };
        stars.push(star);
    }
    drawMoon();
    drawBackgroundMountain();

    // filling the "duration" list with randomnumbers(x,y) that dictate the length of time of the blinking/twinkle action of the "stars".

    for (let i = 0; i <= 10; i++) {

        // 20,50 werkt zeer goed

        duration[i] = Utils.randomNumber(20, 60);

    }

    console.log(stars);
    console.log(duration);
}

function drawStars() {

    drawBackground();
    for (let i = 0; i < stars.length; i++) {
        for (let j = 0; j <= 10; j++) {
            // every "[duration]" frames change the "state" of the "stars" => blink or not
            if (framecount % duration[j] == 0) {



                for (let i = 0; i < stars.length; i++) {
                    stars[i].blink = false;
                }


                let randomStars = Utils.randomNumber(50, 100);

                for (let i = 0; i < randomStars; i++) {

                    let iStar = Utils.randomNumber(0, 499);
                    stars[iStar].blink = true;

                }

            }
        }
    }

    for (let i = 0; i < stars.length; i++) {

        let star = stars[i];

        // draws dots on the background on the layer between the "sky" and the "mountains".
        // based on the value of "blink" the stars will be drawn as "twinkels" instead of samll dots.
        if (star.blink == false) {
            context.fillStyle = "white";
            Utils.fillCircle(star.x, star.y, 2);


        } else {
            drawStarTwinkle(star.x, star.y);
            context.fillStyle = "white";
        }


    }

    framecount++;
    drawMoon();
    drawBackgroundMountain();
    signature((width - 150), (height - 125));
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

// function that choses the correct moon based on the "moonFase" VAR.
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

// function that drawst the alternative "stars" 

function drawStarTwinkle(x, y) {
    context.beginPath();
    context.moveTo(x, y + 1);
    context.arcTo(x, y, x + 1, y, 7);
    context.arcTo(x, y, x, y - 1, 7);
    context.arcTo(x, y, x - 1, y, 7);
    context.arcTo(x, y, x, y + 1, 7);
    context.fill();
}

function signature(x, y) {

    context.fillStyle = "#d8d97e";
    context.fillRect(x, y, 25, 50); // Scaled down from (100, 150, 50, 100)
    context.fillRect(x + 100, y, 25, 50);   // Scaled down from (300, 150, 50, 100)
    context.fillRect(x + 25, y + 25, 25, 75); // Scaled down from (150, 200, 50, 150)
    context.fillRect(x + 75, y + 25, 25, 75); // Scaled down from (250, 200, 50, 150)
    context.fillRect(x + 50, y, 25, 25);  // Scaled down from (200, 150, 50, 50)
    context.fillRect(x + 50, y + 50, 25, 25); // Scaled down from (200, 250, 50, 50)
    context.fillRect(x, y + 75, 25, 25);  // Scaled down from (100, 300, 50, 50)
    context.fillRect(x + 100, y + 75, 25, 25); // Scaled down from (300, 300, 50, 50)

}