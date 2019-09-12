
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

    console.log("centerX: " + centerX + ", centerY: " + centerY + ", radiusX: " + radiusX + ", radiusY: " + radiusY);

    return ellipse;

}

Ellipse.prototype.render = function () {
    var step = 2 * Math.PI / 90;

    console.log("step: " + step);

    this.g2d.moveTo(this.centerX, this.centerY);
    this.g2d.beginPath();

    console.log("centerX: " + this.centerX + ", centerY: " + this.centerY + ", radiusX: " + this.radiusX + ", radiusY: " + this.radiusY);

    for (var theta = 0; theta <= 2 * Math.PI; theta += step) {
        var x = this.centerX + this.radiusX * Math.cos(theta);
        var y = this.centerY + this.radiusY * Math.sin(theta);

        console.log("x: " + x + ", y: " + y);

        this.g2d.lineTo(x, y);
    }

    this.g2d.closePath();
    this.g2d.stroke();
}

// Start of application
var g2d = start(640, 480);

var circle = new Ellipse(g2d, 100, 100, 50, 50, "red");
circle.render();