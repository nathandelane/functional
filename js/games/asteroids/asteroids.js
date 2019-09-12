
const start = (width, height) => {
    var canvas = document.getElementById("canvas0");

    canvas.width = width;
    canvas.height = height;

    var c = canvas.getContext("2d");

    return c;
}

const randomInt = (max) => {
    return Math.random() * max;
}

function Ellipse(g2d, centerX, centerY, radiusX, radiusY, color) {

    let ellipse = Object.create(Ellipse.prototype);

    ellipse.g2d = g2d;

    ellipse.centerX = centerX;

    ellipse.centerY = centerY;

    ellipse.radiusX = radiusX;

    ellipse.radiusY = radiusY;

    ellipse.color = color;

    return ellipse;

}

Ellipse.prototype.render = function () {
    var step = 2 * Math.PI / 45;

    this.g2d.moveTo(this.centerX, this.centerY);
    this.g2d.beginPath();

    for (var theta = 0; theta <= 2 * Math.PI; theta += step) {
        var x = this.centerX + this.radiusX * Math.cos(theta);
        var y = this.centerY + this.radiusY * Math.sin(theta);

        console.log("x: " + x + ", y: " + y);

        this.g2d.lineTo(x, y);
    }

    this.g2d.closePath();
    this.g2d.strokeStyle = this.color;
    this.g2d.lineWidth = 3;
    this.g2d.stroke();
}

function Asteroid(g2d, centerPoint, radiusDims, numberOfSides, color) {

    let asteroid = Object.create(Asteroid.prototype);

    asteroid.g2d = g2d;

    asteroid.centerPoint = centerPoint;

    asteroid.radiusDims = radiusDims;
    
    asteroid.numberOfSides = numberOfSides;

    asteroid.color = color;

    asteroid.steps = [];

    for (var i = 0; i <= asteroid.numberOfSides; i++) {
        var nextRandom = Math.random() * (2 * Math.PI);

        asteroid.steps.push(nextRandom);
    }

    asteroid.steps = asteroid.steps.sort();

    return asteroid;

}

Asteroid.prototype.render = function () {
    console.log("steps: " + this.steps);

    this.g2d.moveTo(this.centerPoint.x, this.centerPoint.y);
    this.g2d.beginPath();

    for (var i = 0; i < this.steps.length; i++) {
        var theta = this.steps[i];

        var x = this.centerPoint.x + this.radiusDims.width * Math.cos(theta);
        var y = this.centerPoint.y + this.radiusDims.height * Math.sin(theta);

        this.g2d.lineTo(x, y);
    }

    theta += 2 * Math.PI;

    this.g2d.lineTo(this.centerPoint.x + this.radiusDims.width * Math.cos(theta), this.centerPoint.y + this.radiusDims.height * Math.sin(theta));

    this.g2d.closePath();
    this.g2d.strokeStyle = this.color;
    this.g2d.lineWidth = 3;
    this.g2d.stroke();
}

Asteroid.prototype.translate = function (diffX, diffY) {
    this.centerPoint.x = this.centerPoint.x + diffX;
    this.centerPoint.y = this.centerPoint.y + diffY;

    if ((this.centerPoint.x - this.radiusDims.x) > 640) {
        this.centerPoint.x = 0;
    }
    if ((this.centerPoint.y - this.radiusDims.y) > 480) {
        this.centerPoint.y = 0;
    }
}

Asteroid.prototype.rotate = function (degrees) {
    console.log("degrees: " + degrees);

    var radiansToTranslate = degrees * Math.PI / 180;
    var translatedPoints = [];

    console.log("radians: " + radiansToTranslate);

    for (var i = 0; i < this.steps.length; i++) {
        var nextPoint = this.steps[i];
        var calculation = (nextPoint + radiansToTranslate);

        console.log("nextPoint: " + nextPoint + ", calculation: " + calculation);

        if (calculation > (2 * Math.PI)) {
            var difference = calculation - (2 * Math.PI);

            calculation = difference;
        }

        translatedPoints.push(calculation);
    }

    this.steps = translatedPoints.slice(0);
}

/////////////////////////////////////////////////////////////////////////
// Start of application
var g2d = start(640, 480);

// y = new Ellipse(g2d, 100, 100, 50, 50, "red");
// y.render();

var fps = 30;
var interval = 1000/fps;
var lastRender = 0;
var lastTime = (new Date()).getTime();
var currentTime = 0;
var delta = 0;

var numberOfFrames = 30;

var x = new Asteroid(g2d, { "x": 100, "y": 100 }, { "width": 21, "height": 31}, 11, "gray");

function update() {
    x.translate(0.7, 0.3);
    x.rotate(0.5);
}

function clearCanvas() {
    g2d.clearRect(0, 0, 640, 480);
    console.log("Cleared");
}

function draw() {
    clearCanvas();

    x.render();
}

function loop() {
    window.requestAnimationFrame(loop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);
  
    if(delta > interval) {
        update();
        draw();

        lastTime = currentTime - (delta % interval);

        numberOfFrames++;
    }
}

loop();

// y = new Asteroid(g2d, { "x": 200, "y": 200}, { "width": 31, "height": 17}, 11, "gray");
// y.render();
// y.translate(30, 50);
// y.render();