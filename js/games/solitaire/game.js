function Game(canvas, width, height) {

    let game = Object.create(Game.prototype);
    
    game.canvas = canvas;

    game.width = width;

    game.height = height;

    return game;

}