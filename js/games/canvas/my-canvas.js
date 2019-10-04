var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var canvas = document.querySelector("canvas");
canvas.width = windowWidth;
canvas.height = windowHeight;

var c = canvas.getContext("2d");

var x = 200;
var y = 200;
var dx = 4;
var dy = 4;
var radius = 30;

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function animate() {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        c.clearRect(0, 0, windowWidth, windowHeight);

        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();

        if (x + radius > windowWidth || x - radius < 0) {
            dx = -dx;
        }

        if (y + radius > windowHeight || y - radius < 0) {
            dy = -dy;
        }

        x += dx;
        y += dy;
    }
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

startAnimating(30);