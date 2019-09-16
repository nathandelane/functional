function Level1() {
    
    let level1 = Object.create(Level1.prototype);

    level1.tileMap = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1
    ]

    return level1;

}

Level1.prototype.render = function (g2d) {
    var tileMapLength = this.tileMap.length;

    console.log("tileMapLength: " + tileMapLength);

    for (var i = 0; i < tileMapLength; i++) {
        if (this.tileMap[i] === 1) {
            var tile = new Tile();

            console.log("x: " + ((i % 40) + (i * 16)) + ", y: " + Math.floor((i / 40) * 16));

            tile.render(g2d, (i % 40) + (i * 16), Math.floor((i / 40) * 16));
        }
    }
}