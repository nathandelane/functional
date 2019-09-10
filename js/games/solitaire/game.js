function Game(canvas) {

    let game = Object.create(Game.prototype)
    
    game.canvas = canvas

    return game;

}