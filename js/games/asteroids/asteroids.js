
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

/**
 * Render the Ellipse.
 */
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
 * Create an Asteroid object.
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

/**
 * Render the Asteroid.
 */
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

/**
 * Translate the Asteroid by a difference of diffX and diffY.
 * @param {number} diffX
 * @param {number} diffY
 */
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

/**
 * Rotate the Asteroid by a number of degrees.
 * @param {number} degrees
 */
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

function Ship(g2d, centerPoint, radius, color) {

    let ship = Object.create(Ship.prototype);

    ship.g2d = g2d;

    ship.centerPoint = centerPoint;

    ship.radius = radius;

    ship.steps = [ 0, 14 * Math.PI / 16, 18 * Math.PI / 16 ];

    ship.direction = 0;

    ship.moment = { "x": 20, "y": 0 };

    ship.color = color;

    return ship;

}

Ship.prototype.render = function () {
    this.g2d.moveTo(this.centerPoint.x, this.centerPoint.y);
    this.g2d.beginPath();

    for (var i = 0; i < this.steps.length; i++) {
        var theta = this.steps[i];

        var x = this.centerPoint.x + this.radius * Math.cos(theta);
        var y = this.centerPoint.y + this.radius * Math.sin(theta);

        this.g2d.lineTo(x, y);
    }

    this.g2d.closePath();
    this.g2d.strokeStyle = this.color;
    this.g2d.lineWidth = 1;
    this.g2d.stroke();
}

Ship.prototype.translate = function (diffX, diffY) {
    var newX = this.centerPoint.x + diffX;
    var newY = this.centerPoint.y + diffY;

    // console.log("oldX: " + this.centerPoint.x + ", oldY: " + this.centerPoint.y + ", newX: " + newX + ", newY: " + newY);

    this.centerPoint.x = newX;
    this.centerPoint.y = newY;

    if ((this.centerPoint.x - this.radius) > 640) {
        this.centerPoint.x = 0 - this.radius;
    }
    else if ((this.centerPoint.x + this.radius) < 0) {
        this.centerPoint.x = 640 + this.radius;
    }

    if ((this.centerPoint.y - this.radius) > 480) {
        this.centerPoint.y = 0 - this.radius;
    }
    else if ((this.centerPoint.y + this.radius) < 0) {
        this.centerPoint.y = 480 + this.radius;
    }
}

Ship.prototype.rotate = function (degrees) {
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
    this.direction = translatedPoints[0];
}

Ship.prototype.accelerate = function (acceleration) {
    var theta = this.steps[0];
    var frontOfShipX = (this.centerPoint.x + this.radius * Math.cos(theta));
    var frontOfShipY = (this.centerPoint.y + this.radius * Math.sin(theta));
    var changeInX = (frontOfShipX - this.centerPoint.x);
    var changeInY = (frontOfShipY - this.centerPoint.y);

    this.moment = { "x": changeInX, "y": changeInY };

    var addToX = acceleration * this.moment.x;
    var addToY = acceleration * this.moment.y;

    console.log("acceleration: " + acceleration + ", addToX: " + addToX + ", addToY: " + addToY + ", moment: (x: " + this.moment.x + ", y: " + this.moment.y);

    return { "x": addToX, "y": addToY };

    // this.translate(addToX, addToY);
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
    },
    {
        "renderable": new Ship(g2d, { "x": 320, "y": 240 }, 20, "yellow"),
        "translation": { "x": 0, "y": 0 },
        "rotation": 0
    }
);

// Rotation model for ship
var shipRotationAcceleration = 0;
var shipMaxPositiveRotationalAcceleration = 5.0;
var shipMaxNegativeRotationalAcceleration = -5.0;
var shipRotationalDrag = 0.01;
var shipRotationalDragPeriod = 1000/30;
var shipRotationEventKeyDown = false;

// Horizontal model for ship
var shipAcceleration = { "x": 0, "y": 0 };
var shipHorizontalAcceleration = 0;
var shipMaxHorizontalAcceleration = 5.0;
var shipMinHorizontalAcceleration = -5.0;
var shipHorizontalDrag = 0;
var shipHorizontalDragPeriod = 1000/30;
var shipHorizontalEventKeyDown = false;

var lastUpdateTime = (new Date()).getTime();
var currentUpdateTime = 0;
var updateDelta = 0;


const update = () => {
    for (var i = 0; i < gameObjects.length; i++) {
        var nextGameObject = gameObjects[i];
        var nextRenderable = nextGameObject.renderable;
        var nextTranslation = nextGameObject.translation;
        var nextRotation = nextGameObject.rotation;

        nextRenderable.translate(nextTranslation.x, nextTranslation.y);
        nextRenderable.rotate(nextRotation);
    }

    // Simulate rotational drag...hmm
    if (!shipRotationEventKeyDown) {
        currentUpdateTime = (new Date()).getTime();
        updateDelta = (currentUpdateTime-lastUpdateTime);
  
        if(updateDelta > shipRotationalDragPeriod) {
            if (shipRotationAcceleration < 0) {
                shipRotationAcceleration += shipRotationalDrag
            }
            else if (shipRotationAcceleration > 0) {
                shipRotationAcceleration -= shipRotationalDrag
            }
        }
    }

    var ship = gameObjects[2].renderable;
    
    ship.rotate(shipRotationAcceleration);
    ship.translate(shipAcceleration.x, shipAcceleration.y);
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
}

const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);
  
    if(delta > interval) {
        update();
        draw();

        lastTime = currentTime - (delta % interval);
    }
}

addEventListener("keyup", function(event) {
    if (event.keyCode == 37) { // Left
        shipRotationEventKeyDown = false;
    }
    else if (event.keyCode == 39) { // Right
        shipRotationEventKeyDown = false;
    }
    else if (event.keyCode == 38) { // Up
        shipHorizontalEventKeyDown = false;
    }
    else {
        console.log("keycode: " + event.keyCode);
    }
});

addEventListener("keydown", function(event) {
    if (event.keyCode == 37) { // Left
        if (shipRotationAcceleration > shipMaxNegativeRotationalAcceleration) {
            shipRotationAcceleration -= 0.2;
            shipRotationEventKeyDown = true;
        }
    }
    else if (event.keyCode == 39) { // Right
        if (shipRotationAcceleration < shipMaxPositiveRotationalAcceleration) {
            shipRotationAcceleration += 0.2;
            shipRotationEventKeyDown = true;
        }
    }
    else if (event.keyCode == 38) { // Up
        if (shipHorizontalAcceleration < shipMaxHorizontalAcceleration) {
            shipHorizontalAcceleration += 0.001;
            shipHorizontalEventKeyDown = true;

            var ship = gameObjects[2].renderable;

            shipAcceleration = ship.accelerate(shipHorizontalAcceleration);
        }
    }
    else if (event.keyCode == 27) {
        shipRotationAcceleration = 0;
        shipHorizontalAcceleration = 0;
        shipAcceleration = { "x": 0, "y": 0 };
        shipRotationEventKeyDown = false;
    }
    else {
        console.log("keycode: " + event.keyCode);
    }
});

gameLoop();
