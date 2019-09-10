var hiddenCanvas = document.getElementById("canvas0");

hiddenCanvas.width = window.innerWidth;
hiddenCanvas.height = window.innerHeight;

var c = hiddenCanvas.getContext("2d");

c.fillRect(100, 100, 100, 100);

var activeCanvas = document.getElementById("canvas1");

activeCanvas.width = window.innerWidth;
activeCanvas.height = window.innerHeight;

var cx = activeCanvas.getContext("2d");


console.log(hiddenCanvas);
console.log(activeCanvas);

