var canvas = document.getElementById("canvas0");

canvas.width = 640;
canvas.height = 480;

var backgroundImage = new Image();
backgroundImage.src = "./solitaire-board_640x480.png";

var c = canvas.getContext("2d");

backgroundImage.onload = function () {
    c.drawImage(backgroundImage, 0, 0);
}

