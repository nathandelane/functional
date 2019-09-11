function Game(canvas, width, height) {

    let game = Object.create(Game.prototype);
    
    game.canvas = canvas;

    game.width = width;

    game.height = height;

    return game;

}

Game.prototype.draw = function () {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    var backgroundImage = new Image();

    backgroundImage.src = Data.getBackgroundImagePath();

    var c = this.canvas.getContext("2d");

    backgroundImage.onload = function () {
        c.drawImage(backgroundImage, 0, 0);
    }
}