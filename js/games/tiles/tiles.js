function Game(dimensions, backgroundColor, fps, interval) {

    let game = Object.create(Game.prototype);

    game.dimensions = dimensions;

    game.backgroundColor = backgroundColor;

    var canvas = document.getElementById("canvas0");

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    game.g2d = canvas.getContext("2d");

    game.fps = fps;

    game.interval = interval;

    game.lastTime = (new Date()).getTime();

    game.lastRender = 0;

    game.somethingChanged = true;

    return game;

}

Game.prototype.update = function () {

}

Game.prototype.draw = function () {
    if (this.somethingChanged) {
        this.g2d.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

        var levelOne = new Level1();
        levelOne.render(this.g2d);

        this.somethingChanged = false;
    }
}

Game.prototype.loop = function () {
    window.requestAnimationFrame(this.loop);

    var currentTime = (new Date()).getTime();
    var delta = (currentTime - this.lastTime);
  
    if (delta > this.interval) {
        this.update();
        this.draw();

        this.lastTime = currentTime - (delta % this.interval);
    }
}

const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);

    var currentTime = (new Date()).getTime();
    var delta = (currentTime - game.lastTime);
  
    if (delta > game.interval) {
        game.update();
        game.draw();

        game.lastTime = currentTime - (delta % game.interval);
    }
}

/////////////////////////////////////////////////////////////////////////
// Start of application
var game = new Game({ "width": 640, "height": 480 }, "black", 30, (1000/0.5));

gameLoop();