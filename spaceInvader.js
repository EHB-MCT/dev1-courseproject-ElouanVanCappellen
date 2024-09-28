let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");
"use strict";

backGround();
signature();

function backGround() {
    context.fillStyle = "black"
    context.beginPath();
    context.rect(50, 50, 350, 350)
    context.fill();
}
function signature() {
    context.fillStyle = "#d8d97e"
    context.beginPath();
    context.rect(100, 150, 50, 100);
    context.rect(300, 150, 50, 100);
    context.rect(150, 200, 50, 150);
    context.rect(250, 200, 50, 150);
    context.rect(200, 150, 50, 50);
    context.rect(200, 250, 50, 50);
    context.rect(100, 300, 50, 50);
    context.rect(300, 300, 50, 50);
    context.fill();
}