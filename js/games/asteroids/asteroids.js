
const randomInt = (max) => {
    return Math.random() * max;
}

/**
 * Ellipse object, which is the base for an Asteroid.
 * @param {CanvasRenderingContext2D} g2d 
 * @param {number} centerX 
 * @param {number} centerY 
 * @param {number} radiusX 
 * @param {number} radiusY 
 * @param {string} color 
 */
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

/**
 * 
 * @param {CanvasRenderingContext2D} g2d 
 * @param {object} centerPoint 
 * @param {object} radiusDims 
 * @param {number} numberOfSides 
 * @param {string} color 
 */
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

    if ((this.centerPoint.x - this.radiusDims.width) > 640) {
        this.centerPoint.x = 0 - this.radiusDims.width;
    }
    else if ((this.centerPoint.x + this.radiusDims.width) < 0) {
        this.centerPoint.x = 640 + this.radiusDims.width
    }

    if ((this.centerPoint.y - this.radiusDims.height) > 480) {
        this.centerPoint.y = 0 - this.radiusDims.height;
    }
    else if ((this.centerPoint.y + this.radiusDims.height) < 0) {
        this.centerPoint.y = 480 + this.radiusDims.height;
    }
}

Asteroid.prototype.rotate = function (degrees) {
    var radiansToTranslate = degrees * Math.PI / 180;
    var translatedPoints = [];

    for (var i = 0; i < this.steps.length; i++) {
        var nextPoint = this.steps[i];
        var calculation = (nextPoint + radiansToTranslate);

        if (calculation > (2 * Math.PI)) {
            var difference = calculation - (2 * Math.PI);

            calculation = difference;
        }
        else if (calculation < 0) {
            var difference = (2 * Math.PI) + calculation;

            calculation = difference;
        }

        translatedPoints.push(calculation);
    }

    this.steps = translatedPoints.slice(0);
}

/////////////////////////////////////////////////////////////////////////
// Start of application
const start = (width, height) => {
    var canvas = document.getElementById("canvas0");

    canvas.width = width;
    canvas.height = height;

    var c = canvas.getContext("2d");

    return c;
}

var g2d = start(640, 480);

// y = new Ellipse(g2d, 100, 100, 50, 50, "red");
// y.render();

var fps = 30;
var interval = 1000/fps;
var lastRender = 0;
var lastTime = (new Date()).getTime();
var currentTime = 0;
var delta = 0;

var gameObjects = [];
gameObjects.push(
    { 
        "renderable": new Asteroid(g2d, { "x": 100, "y": 100 }, { "width": 21, "height": 31}, 11, "gray"), 
        "translation": { "x": 0.7, "y": 0.3 },
        "rotation": 0.5
    },
    { 
        "renderable": new Asteroid(g2d, { "x": 300, "y": 320 }, { "width": 19, "height": 18}, 13, "red"), 
        "translation": { "x": -0.9, "y": 0.2 },
        "rotation": -0.5
    }
);

// var x = new Asteroid(g2d, { "x": 100, "y": 100 }, { "width": 21, "height": 31}, 11, "gray");

const update = () => {
    for (var i = 0; i < gameObjects.length; i++) {
        var nextGameObject = gameObjects[i];
        var nextRenderable = nextGameObject.renderable;
        var nextTranslation = nextGameObject.translation;
        var nextRotation = nextGameObject.rotation;

        nextRenderable.translate(nextTranslation.x, nextTranslation.y);
        nextRenderable.rotate(nextRotation);
    }
    // x.translate(0.7, 0.3);
    // x.rotate(0.5);
}

const clearCanvas = () => {
    g2d.clearRect(0, 0, 640, 480);
}

const draw = () => {
    clearCanvas();

    for (var i = 0; i < gameObjects.length; i++) {
        var nextGameObject = gameObjects[i];
        var nextRenderable = nextGameObject.renderable;

        nextRenderable.render();
    }
    // x.render();
}

const loop = () => {
    window.requestAnimationFrame(loop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);
  
    if(delta > interval) {
        update();
        draw();

        lastTime = currentTime - (delta % interval);
    }
}

loop();

// y = new Asteroid(g2d, { "x": 200, "y": 200}, { "width": 31, "height": 17}, 11, "gray");
// y.render();
// y.translate(30, 50);
// y.render();