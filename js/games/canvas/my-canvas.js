var windowWidth = 640; //window.innerWidth;
var windowHeight = 480; //window.innerHeight;

var canvas = document.querySelector("canvas");
canvas.width = windowWidth;
canvas.height = windowHeight;

var c = canvas.getContext("2d");

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > windowWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > windowHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        circle.draw();
    }
}

var radius = 30;
var x = Math.random() * (windowWidth - radius - 1) + radius;
var y = Math.random() * (windowHeight - radius - 1) + radius;
var dx = (Math.random() - 0.5) * 8;
var dy = (Math.random() - 0.5) * 8;

var circle = new Circle(x, y, dx, dy, radius);

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function drawFrame() {
    c.clearRect(0, 0, windowWidth, windowHeight);

    circle.update();
}

function animate() {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        drawFrame();
    }
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

startAnimating(30);