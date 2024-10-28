/**@type {CanvasRenderingContext2D} */
let context;

setupCanvasContext();

export default context;

function setupCanvasContext() {
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
}



