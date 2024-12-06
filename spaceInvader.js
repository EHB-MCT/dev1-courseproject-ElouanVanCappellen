let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

background();
signature();

export function backGround() {
    context.fillStyle = "black"
    context.fillRectrect(50, 50, 350, 350)
}

export function signature() {
    context.fillStyle = "#d8d97e"
    context.fillRect(100, 150, 50, 100);
    context.fillRect(300, 150, 50, 100);
    context.fillRect(150, 200, 50, 150);
    context.fillRect(250, 200, 50, 150);
    context.fillRect(200, 150, 50, 50);
    context.fillRect(200, 250, 50, 50);
    context.fillRect(100, 300, 50, 50);
    context.fillRect(300, 300, 50, 50);
}